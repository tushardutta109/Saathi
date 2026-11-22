import express from 'express';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

// POST /api/prescriptions/analyze
router.post('/analyze', async (req, res) => {
    try {
        const { image } = req.body;
        if (!image) {
            return res.status(400).json({ success: false, message: 'Image data is required' });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ success: false, message: 'GEMINI_API_KEY is missing in backend/.env' });
        }

        // Initialize Gemini AI Client
        const ai = new GoogleGenAI({ apiKey });

        // Base64 clean karein aur MimeType extract karein
        let mimeType = 'image/jpeg';
        let base64Data = image;

        if (image.includes(',')) {
            const parts = image.split(',');
            base64Data = parts[1];
            const mimeMatch = parts[0].match(/:(.*?);/);
            if (mimeMatch) mimeType = mimeMatch[1];
        }

        // Prompt instructions for Gemini Vision
        const prompt = `
You are an expert, compassionate senior-friendly medical assistant.
Analyze this doctor prescription image carefully (whether handwritten or printed).
Extract all medicines, dosages, instructions, and timings.

Return strictly a valid JSON object matching this exact structure:
{
  "isPrescription": true,
  "doctorName": "Doctor name with qualifications (if readable, else 'Prescribed Doctor')",
  "clinicName": "Clinic or Hospital name (if readable)",
  "patientName": "Patient name (if readable)",
  "date": "Prescription date",
  "medicines": [
    {
      "id": "presc-1",
      "name": "Medicine name and strength (e.g. Telmisartan 40mg)",
      "dosage": "e.g. 1 tablet",
      "time": "Standard time format like '8:00 AM' (morning), '2:00 PM' (afternoon), or '9:00 PM' (night)",
      "timingDetailEn": "e.g. After Breakfast / Empty Stomach",
      "timingDetailHi": "हिंदी में विवरण (जैसे: नाश्ते के बाद / खाली पेट)",
      "purpose": "Why this medicine is given (e.g. Blood Pressure, Diabetes, Pain Relief)",
      "status": "upcoming",
      "icon": "💊"
    }
  ],
  "instructionsEn": "General doctor advice or precautions in English",
  "instructionsHi": "डॉक्टर की सलाह या सावधानियां सरल हिंदी में",
  "audioSummaryEn": "A friendly 2-sentence summary in English for senior read-aloud",
  "audioSummaryHi": "बुजुर्गों के लिए सरल 2 वाक्यों का हिंदी सारांश ताकि ऐप इसे बोलकर सुना सके"
}
`;

        // Call Gemini Vision Model
        console.log('[Saathi] Calling Gemini API with model: gemini-2.5-flash');
        console.log('[Saathi] Image mimeType:', mimeType, '| base64 length:', base64Data.length);
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: prompt },
                        {
                            inlineData: {
                                mimeType,
                                data: base64Data,
                            },
                        },
                    ],
                },
            ],
            config: {
                responseMimeType: 'application/json'
            },
        });

        console.log('[Saathi] Gemini response received. Text length:', response.text?.length);
        
        const parsedData = JSON.parse(response.text);
        console.log('[Saathi] ✅ Parsed prescription data - Doctor:', parsedData.doctorName);
        return res.json({ success: true, data: parsedData });
    } catch (error) {
        console.error('❌ Gemini Prescription OCR Error:', error.message);
        console.error('Full error:', error);
        
        let userMessage = 'Failed to analyze prescription';
        if (error.message?.includes('API_KEY')) {
            userMessage = 'Invalid GEMINI_API_KEY. Please check your API key in backend/.env file.';
        } else if (error.message?.includes('fetch failed') || error.message?.includes('ENOTFOUND')) {
            userMessage = 'Cannot connect to Google AI servers. Check your internet connection.';
        } else if (error.message?.includes('quota') || error.message?.includes('429')) {
            userMessage = 'API quota exceeded. Please wait a few minutes and try again.';
        } else if (error.message?.includes('JSON')) {
            userMessage = 'AI returned invalid response. Please try again with a clearer photo.';
        }
        
        return res.status(500).json({
            success: false,
            message: userMessage,
            error: error.message,
        });
    }
});

export default router;