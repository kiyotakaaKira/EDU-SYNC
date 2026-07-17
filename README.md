# Valsia Skill Mentor – Phase 1 MVP

> **An AI-powered skill-to-job conversion engine that helps learners transform scattered skills into clear, employable career paths.**

---

## 🚩 Problem Statement

Today, students and early professionals learn skills without clarity on:
- Whether those skills are **market-relevant**
- Which **job roles** they are actually suited for
- What **exact steps** are needed to become job-ready

This results in wasted time, confusion, and poor career decisions.

---

## 💡 Solution

**Valsia Skill Mentor** analyzes a user’s existing skills and provides:
- Best-fit job role recommendations
- Job-readiness scoring
- Skill gap identification
- A clear **30-day execution roadmap**

This repository represents the **Phase-1 MVP prototype** of Valsia, focused solely on the **Skill Mentor module**.

---

## ✨ Key Features

- 🔍 **Skill Analysis Engine**  
  Evaluates user skills against real-world job requirements

- 🎯 **Job Role Mapping**  
  Suggests suitable roles with confidence scoring

- 📉 **Skill Gap Detection**  
  Identifies missing or weak skills required for target roles

- 🗓 **30-Day Action Roadmap**  
  Provides a step-by-step plan to move toward employability

- 🕹 **Gamified Dashboard (Prototype)**  
  XP, levels, journeys, and progress visualization

---

## 🧠 Why It’s Different

- Focuses on **conversion to employability**, not just learning
- Highlights **skill waste** and irrelevant learning paths
- Execution-first approach instead of generic recommendations
- Designed as a **mentor**, not a chatbot

---

## ⚙️ How to Run the Project Locally

This project is designed to run completely on **localhost** using **Docker** and a **local LLaMA-based LLM**.

---

### 🔧 Prerequisites

Ensure the following are installed on your system:

- Git
- Docker (v20+)
- Docker Compose
- Minimum 8 GB RAM (recommended for local LLM inference)

---

### 📥 Step 1: Clone the Repository

```bash
git clone https://github.com/<your-username>/valsia-skill-mentor-mvp.git
cd valsia-skill-mentor-mvp

🧠 Step 2: Download a Local LLaMA Model
Download any GGUF-compatible LLaMA / Mistral model
(7B models are recommended for local execution).

Example sources:

Hugging Face (GGUF format)

TheBloke repositories

After downloading, place the model file inside the following directory:

/models
Example:

/models/llama-2-7b.gguf
⚠️ LLM model files are not included in this repository due to size and licensing constraints.

🔐 Step 3: Environment Configuration
Create an environment file:

cp .env.example .env
Update the .env file with the following values:

LLM_PROVIDER=local
LLM_MODEL_PATH=/models/llama-2-7b.gguf
BACKEND_PORT=5000
FRONTEND_PORT=3000
No external API keys are required to run the project locally.

🐳 Step 4: Run the Project Using Docker
Start all services using Docker Compose:

docker compose up --build
This command will start:

Frontend application

Backend API server

Local LLM inference service

🌐 Step 5: Access the Application
Once the containers are running, open your browser:

Frontend: http://localhost:3000
Backend API: http://localhost:5000
🧪 How to Test the Application
Open the frontend URL in your browser

Enter sample skills (e.g., Python, SQL, React)

Submit the form

Review the generated:

Job role suggestions

Readiness score

Skill gap analysis

## 🔐 Deployment Note

This Phase-1 MVP currently runs in a secure local environment using containerized services and local LLM inference.  
For security and intellectual property reasons, a public deployment is not exposed at this stage.  

This repository focuses on demonstrating product flow, architecture, and core logic of our Educational AI SaaS..

---

## 📂 Repository Scope

### Included
- Frontend UI prototype
- Abstracted backend logic
- Mock / sample AI responses
- Screenshots of the working system
- Documentation and flow explanation

### Excluded
- Production AI prompts
- Docker images and LLM models
- Internal Dify workflows
- Supabase secrets or API keys
- Full production infrastructure

---

## 🧪 Demo Flow

1. User enters existing skills  
2. System evaluates market relevance  
3. Suitable job roles are suggested  
4. Skill gaps are identified  
5. A personalized 30-day roadmap is generated  

---

## 🚀 Future Scope (Not Part of This MVP)

- Exam preparation modules  
- Real-time mentor feedback  
- Skill validation through projects  
- Community learning rooms  
- Job application alignment  

---

## 📌 Important Note

This project is a **prototype MVP built for hackathon evaluation** and represents **Phase-1 of the Valsia platform roadmap**.

---

## 👥 Team

Built by a student VALSIA startup team focused on bridging the gap between  
learning, skills, and employability.

ADITHYAN J 
ISHACK S
TAARUNYA GIRIRAJ
PRANDYA SUNDAR

---

## 📄 License

Shared strictly for demonstration and evaluation purposes.



## 🏗 High-Level Architecture

```text
User Input (Skills)
        ↓
Skill Evaluation Engine
        ↓
Job Role Mapping + Readiness Score
        ↓
Skill Gap Analysis
        ↓
30-Day Execution Roadmap

## Note:
You May Need to Modify The Code A Little Bit To Change The API Keys To Your Specific API Keys So The Features Can Work


