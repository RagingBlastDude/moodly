# Moodly: Mood Tracking App for Mental Health 🌱🧠

Moodly is a mobile mHealth application developed using [Expo](https://expo.dev) and [Firebase](https://firebase.google.com/), aimed at helping users monitor and reflect on their mental well-being through daily and weekly check-ins. This project was created for the COMP 4310: Health Informatics Final Project (Winter 2025) and integrates validated psychological scales to collect meaningful mental health data.

## 🎯 Project Purpose

Mental health is often underrepresented in digital health solutions. Moodly addresses this by incorporating scientifically-backed mood indicators into a simple, user-friendly app. The app enables both users and researchers to track and analyze mental health trends over time.

## 🧪 Research Integration

Moodly utilizes:
- **PANAS** (Positive and Negative Affect Schedule) for daily mood tracking
- **PHQ-9** (Patient Health Questionnaire) and **GAD-7** (Generalized Anxiety Disorder) for weekly self-assessments

These scales are widely used in psychology to assess emotional well-being, depressive symptoms, and anxiety severity.

## 🛠️ Features

- 🔒 Firebase Authentication (Sign Up / Sign In)
- 📆 Daily mood check-ins with emoji-style indicators (PANAS)
- 📊 Weekly surveys with PHQ-9 & GAD-7 questionnaires
- 📁 Firestore-based data storage and retrieval
- 🔔 Daily notification reminders via Expo Notifications
- 🧩 Modular file structure with Expo Router
- 💨 Tailwind styling via NativeWind
- ⚙️ Written in TypeScript using React Native

## 📂 File Structure

### Firebase login screen 
app/ ├── sign-in.tsx 

app/ ├── sign-up.tsx 

### Daily mood tracking screen (PANAS) 
app / (app) / (drawer) / (tabs) / ├── check-in.tsx 

### Weekly survey screen (PHQ-9 + GAD-7) 
app / (app) / (drawer) / (tabs) / ├── weekly.tsx 

### Home dashboard
app / (app) / (drawer) / (tabs) / ├── index.tsx 


## 🚀 Getting Started

1. **Clone the repo**  
   ```bash
   git clone https://github.com/ragingblastdude/moodly.git
   cd moodly

2. **Install dependencies**
   ```bash
   npm install

3. **Set up Firebase**
   Create a ``.env`` file with your credentials:
   ```.env
   EXPO_PUBLIC_FIREBASE_API_KEY=
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=

4. **Launch the app**
   ```bash
   npx expo start

## 📈 Potential Study Design
Moodly enables:
- Passive data collection on mood trends
- Weekly comparisons of anxiety/depression scores
- Exportable datasets for statistical analysis (ANOVA, regression)
- Custom study variables like time-of-day effects or seasonal impact

## 💡 Example Use Cases
- Daily reflection to reduce emotional avoidance
- Longitudinal self-tracking for CBT or journaling
- Research tool for participant self-reporting

## 🧪 Future Enhancements
- Mood trend visualization (charts)
- Export to CSV for researchers
- Optional anonymized data sharing

## 🔧 Dev Tips
- 🧪 Use npx expo start --dev-client to test with custom dev builds
- 🔄 React Context handles auth/session state globally
- 📱 You can test notifications using expo push:android:emulator or expo push:ios

## 📸 Screenshots

### 🏠 Home Page
The landing screen after logging in, showing prompts for daily or weekly surveys.

![Home Page](https://github.com/user-attachments/assets/5aa1236d-3f4f-49d2-972f-5097f39ac458)

---

### 📅 Daily Check-In (PANAS)
A simple interface with emojis or mood indicators to capture the user's current emotional state.

![Daily Check-In](https://github.com/user-attachments/assets/f5b74547-2085-4a5e-9c4b-2f83396d3d9c)

---

### 📈 Weekly Check-In (PHQ-9 / GAD-7)
A survey-based screen using clinically validated questions to assess anxiety and depression levels.

![Weekly Check-In 1](https://github.com/user-attachments/assets/4020a0bc-8c63-4e55-821e-7b5c2791abf0)
![Weekly Check-In 2](https://github.com/user-attachments/assets/3e17b813-e363-4dee-ab0b-1460080e07a6)

---

### 🔔 Notifications
Daily reminders to encourage users to reflect on their mood and complete check-ins regularly.

![Notifications](https://github.com/user-attachments/assets/7262d95e-b109-4ca2-b2f2-dd51bc7f185d)

## 🙏 Acknowledgements

- This project was bootstrapped using the [firebase-exporouter-app](https://github.com/aaronksaunders/firebase-exporouter-app) template by [@aaronksaunders](https://github.com/aaronksaunders).
- Special thanks to [ChatGPT (model: gpt-4o)](https://openai.com/chatgpt) for assisting with code generation, documentation, and writing guidance.

## 🧾 License
This project is licensed under the MIT License. See the LICENSE file for details.

> This app was developed as part of the COMP 4310: Health Informatics (Winter 2025) for academic purposes. 