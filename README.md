

<h1 align="center">Automated Intelligent Content Authoring & Scheduling System</h1>

<p align="center">
  AI-Powered | Automated | Scalable | Multi-Platform
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js"/>
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge&logo=mongodb"/>
  <img src="https://img.shields.io/badge/AI-LLM-orange?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Scheduler-Cron-purple?style=for-the-badge"/>
</p>


---

##  About the Project

AICAS is an **AI-driven automation system** that transforms the way content is created and published.

Instead of manually writing and posting content, users can:
- Create campaigns  
- Automate content generation  
- Schedule posts  
- Publish across platforms  

All handled by a **pipeline-based intelligent system**

---

##  Key Features

- AI-generated content using LLM  
- Automated scheduling using cron  
- Multi-platform posting (Telegram, LinkedIn, etc.)  
- Retry mechanism for failures  
- Performance tracking  
- Logging system  
- Real-time news integration (GDELT)  

---

##  Architecture Flow

<p align="center">
  <img width="1024" height="572" alt="image" src="https://github.com/user-attachments/assets/221dce74-8968-4ae5-b0a2-a2fb2e8768a8" />

</p>


User → Campaign → AI Content → Scheduler → Posting Engine → Logs

graph LR
A[User] --> B[Create Campaign]
B --> C[AI Content Generation]
C --> D[Scheduler Trigger]
D --> E[Posting Engine]
E --> F[Social Platforms]
F --> G[Logs & Performance]

---

## Tech Stack

- Frontend
	•	React.js
	•	Axios
	•	Tailwind CSS

- Backend
	•	Node.js
	•	Express.js
	•	JWT Authentication
	•	Node-Cron

- Database
	•	MongoDB
	•	Mongoose

- AI & APIs
	•	LLM (Ollama / NVIDIA)
	•	GDELT API
	•	Telegram Bot API

---

## Core Modules

<img width="972" height="272" alt="Screenshot 2026-04-03 at 11 41 48 AM" src="https://github.com/user-attachments/assets/c523a025-4a6a-485c-b86c-f7c0e1750a05" />

---

## Results

<p align="center">
<img width="1470" height="956" alt="Screenshot 2026-04-02 at 8 15 24 PM" src="https://github.com/user-attachments/assets/f3b0ecbf-6b0a-40cd-b7c8-75a27ed8bad1" width="45%" />
<img width="1470" height="956" alt="Screenshot 2026-04-02 at 8 15 37 PM" src="https://github.com/user-attachments/assets/df0a1bed-8273-415b-bda1-e1a2bbcfd3ff" width="45%"  />
</p>
<p align="center">
  <img width="1470" height="956" alt="Screenshot 2026-04-02 at 8 15 46 PM" src="https://github.com/user-attachments/assets/96bd1725-d20c-4305-9f69-6a7e9e79e203" width="45%"/>
  <img width="1470" height="956" alt="Screenshot 2026-04-02 at 8 15 51 PM" src="https://github.com/user-attachments/assets/144ab1ad-9cd8-4ec9-a100-41a85f4c9b95" width="45%"/>
</p>

---
## Impact

- Reduces manual effort by 70–80%
- Automates full content lifecycle
- Improves consistency & reliability
- Enables scalable automation

⸻

## Challenges Solved
	•	 Failed posts → Retry mechanism
	•	 Duplicate content → DB validation
	•	 AI inconsistency → Prompt engineering
	•	 Async issues → Pipeline control

⸻

## Future Scope
	•	Smart AI scheduling
	•	Advanced analytics
	•	Reel/Video generation
	•	Fully autonomous AI agent
	•	SaaS deployment

---

## Installation
  - git clone https://github.com/your-username/aicas.git
  - cd aicas-backend
  - npm install
  - npm run dev

---

## Environment Variables
  - PORT=4000
  - MONGO_URI=your_mongodb_uri
  - JWT_SECRET=your_secret
  - AI_API_KEY=your_key

---
## Contributors
Under guidance of Dr. R. Venkat St. Peter’s Engineering College, Hyderabad
- Kandula Sai Gana Laxmi Rohith - Team Lead | Backend Developer
- Anchetti Deekshith - Frontend | Documentation
- Goruganti Khowshik - UI | Testing 

⸻

## Support

If you like this project, give it a ⭐ on GitHub!
