<div align="center">

# 🌼 SAATHI (साथी)
### *Technology That Speaks Your Language*
**A Senior-Friendly Companion & Digital Health Assistant**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](#)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](#)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)](#)
[![Express](https://img.shields.io/badge/Express-5.0-000000?logo=express&logoColor=white)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-Local%2FAtlas-47A248?logo=mongodb&logoColor=white)](#)
[![Gemini AI](https://img.shields.io/badge/Google%20Gemini-Vision%20AI-8E75B2?logo=google&logoColor=white)](#)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline%20Ready-5A0FC8?logo=pwa&logoColor=white)](#)

<p align="center">
  <!-- Yahan aap apna Main Banner ya Hero Image daal sakte hain -->
  <img src="screenshots/hero_banner.png" alt="Saathi Banner" width="850"/>
</p>

</div>

---

## 📖 About SAATHI

**SAATHI** ek thoughtfully designed digital companion aur healthcare platform hai, jo khas taur par **senior citizens (elderly users)** ki zarooraton ko dhyan me rakh kar banaya gaya hai. 

High-contrast readable typography, multilingual voice assistance, automated prescription reading, aur one-touch emergency helpline integration ke zariye, SAATHI technology ko har buzurgh ke liye aasan aur accessible banata hai.

---

## 📸 Screenshots Showcase

<div align="center">

| 🏠 Interactive Health Dashboard | 📄 AI Doctor Prescription Reader |
| :---: | :---: |
| <img src="screenshots/dashboard.png" width="400" alt="Dashboard Screen"/> | <img src="screenshots/prescription_reader.png" width="400" alt="Prescription OCR"/> |

| 🩺 Doctor Specialist Finder (Anatomy) | 🚨 One-Touch Emergency SOS (108 / 112) |
| :---: | :---: |
| <img src="screenshots/doctor_suggest.png" width="400" alt="Doctor Finder"/> | <img src="screenshots/sos_modal.png" width="400" alt="Emergency Modal"/> |

| 💊 Daily Pill Box Matrix & Schedule | 🎙️ Multilingual Voice Companion |
| :---: | :---: |
| <img src="screenshots/medicines.png" width="400" alt="Medicines Schedule"/> | <img src="screenshots/voice_assistant.png" width="400" alt="Voice Assistant"/> |

</div>
<img width="1477" height="811" alt="image" src="https://github.com/user-attachments/assets/a15900f3-cb30-44f5-bcb4-8d796b5c67f0" />
<img width="1478" height="811" alt="image" src="https://github.com/user-attachments/assets/1684b618-d45c-436a-8fca-0f66efa2c7d4" />
<img width="1467" height="802" alt="image" src="https://github.com/user-attachments/assets/cacb72e2-6f54-40a6-abbb-ade9a726aa49" />
<img width="1474" height="814" alt="image" src="https://github.com/user-attachments/assets/7539a249-dbf2-4e3e-b598-70fa8968fa98" />
<img width="1459" height="791" alt="image" src="https://github.com/user-attachments/assets/60a9bc4e-585a-406a-ac7b-adecddaffbec" />





---

## ✨ Key Features

### 1. 🏠 Senior-First Interactive Dashboard
* **Live Vitals & Health Metric:** Real-time animated ECG pulse wave, Heart Rate (72 bpm), Blood Pressure (120/80), SpO2 (98%), aur circular 85% Health Score gauge.
* **Family Health Overview:** Parivaar ke sadasyon (Ravi, Priya, Amit) ke health scores, active profiles aur emergency attention badges.
* **Daily Action Checklist:** Teleconsultations aur medicine refill reminders.

### 2. 📄 Multimodal AI Doctor Prescription Reader (Gemini Vision)
* Doctor ke haath se likhe ya printed parcho (Prescription) ki photo upload karne par **Google Gemini Vision AI** dawai ka naam, strength, dose, timing (before/after meal) aur doctor instructions nikaal kar automatic schedule bana deta hai.

### 3. 🎙️ "Talk to Saathi" Multilingual Voice Assistant
* **4 Languages Supported:** English, Hindi (हिंदी), Bengali (বাংলা), Assamese (অসমীয়া).
* Senior users bina type kiye bolkar bimaari, dawai ya madad ke baare me pooch sakte hain.

### 4. 🩺 Visual Doctor Suggestion by Disease
* Interactive **3D/Neon Anatomy Body Visual** – jahan dard ya takleef ho (Heart, Head, Stomach), wahan tap karke turant sahi specialist doctor (Cardiologist, Neurologist, Gastroenterologist) ki jankari paayein.

### 5. 🚨 One-Tap 24x7 Emergency SOS System
* **108 (National Free Ambulance)** aur **112 (Police & Emergency)** ke liye direct dialer.
* Family emergency contact ko WhatsApp & SMS alert ke sath live GPS location sharing.
* Senior Elderline (14567) assistance.

### 6. 💊 Smart Medicine Schedule & Pill Box
* Subah, dopahar aur raat ki dawaiyon ka status (Taken / Upcoming).
* Local MongoDB ke sath real-time synchronization.

### 7. 📱 PWA & Accessibility
* Fullscreen mode, Dark/Light theme, Service Worker offline support (`sw.js`).
* Seniors ke liye tactile audio feedback (button press sounds) aur high-contrast large fonts.

---

## 🛠️ Tech Stack

### Frontend:
* **React 18** (Modern hooks, state management)
* **Vite** (Next-gen fast frontend tooling)
* **Lucide React** (Clean, accessible icons)
* **Web Speech API & Language Detector** (Speech-to-Text & Text-to-Speech)
* **Progressive Web App (PWA)** (Service Workers & Web App Manifest)

### Backend:
* **Node.js** (JavaScript Runtime)
* **Express.js** (REST API Framework)
* **Mongoose ODM** (MongoDB Object Modeling)
* **Google Gemini AI SDK (`@google/genai`)** (Multimodal Vision OCR)
* **CORS & Dotenv** (Secure API routing & configuration)

### Database:
* **MongoDB** (Local / MongoDB Atlas for persistent storage of medicines & patient vitals)

---

## 🚀 Getting Started (Installation & Setup)

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher)
* [MongoDB](https://www.mongodb.com/try/download/community) (Local MongoDB or MongoDB Atlas URI)
* [Google AI Studio API Key](https://aistudio.google.com/app/apikey) (Free)

### 1. Clone the Repository
```bash
git clone https://github.com/tushardutta109/Saathi.git
cd Saathi
```

### 2. Backend Setup
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file inside backend folder
```

**`backend/.env` file:**
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/saathi
GEMINI_API_KEY=your_gemini_api_key_here
```

Start the backend server:
```bash
npm run dev
# Server will run at http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal window:
```bash
# In the project root folder
npm install

# Start the frontend dev server
npm run dev
# App will open at http://localhost:5173 (or 5174)
```

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/medicines` | Fetch all scheduled medicines (auto-seeds defaults if empty) |
| `POST` | `/api/medicines` | Add a new medicine |
| `POST` | `/api/medicines/bulk` | Add multiple medicines from prescription scan |
| `PATCH`| `/api/medicines/:id` | Update medicine status (`taken` / `upcoming`) |
| `DELETE`| `/api/medicines/:id` | Delete medicine record |
| `GET` | `/api/vitals` | Get latest patient vitals reading |
| `POST` | `/api/vitals` | Log new heart rate, blood pressure & SpO2 reading |
| `POST` | `/api/prescriptions/analyze` | AI Vision analysis of uploaded doctor prescription |

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

---

<div align="center">
  <b>Designed with ❤️ for Elderly Healthcare & Accessibility</b>
</div>
