import express from 'express';

const router = express.Router();

// GET /api/voice/tts?text=...&lang=bn
router.get('/tts', async (req, res) => {
    try {
        const { text, lang = 'hi' } = req.query;
        if (!text) {
            return res.status(400).json({ error: 'Text query parameter is required' });
        }

        let targetTl = (lang || 'hi').toLowerCase();
        // Assamese uses Bengali audio stream for natural pronunciation
        if (targetTl === 'as') targetTl = 'bn';

        // Clean text and normalize Assamese characters for Bengali engine
        let cleanText = text
            .replace(/[*_~#]/g, '')
            .replace(/\u09F0/g, '\u09B0') // Assamese Ra (ৰ) -> Bengali Ra (র)
            .replace(/\u09F1/g, '\u09AC') // Assamese Wa (ৱ) -> Bengali Ba (ব)
            .trim();

        // Truncate to safe length for query param
        const truncatedText = cleanText.length > 200 ? cleanText.substring(0, 200) : cleanText;
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(truncatedText)}&tl=${targetTl}&client=tw-ob`;

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://translate.google.com/'
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch TTS from upstream' });
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        res.set({
            'Content-Type': 'audio/mpeg',
            'Content-Length': buffer.length,
            'Cache-Control': 'public, max-age=86400',
        });

        return res.send(buffer);
    } catch (error) {
        console.warn('Backend TTS Error (falling back to client speech):', error.message);
        return res.status(500).json({ error: 'TTS conversion failed', details: error.message });
    }
});

export default router;
