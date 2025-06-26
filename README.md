# 🎓 Local Course Tracker

A fully responsive, offline-friendly web application to track your progress through video-based courses stored locally on your machine.

## ✨ Features

- ✅ Automatically detects course structure from a local folder
- 🧩 Organizes content into Modules, Chapters, and Lessons
- 📺 Built-in video player with "mark as complete" tracking
- 📊 Progress bars at module and chapter level
- 👤 Multi-user support with isolated progress
- 🗂️ Directory selection to choose where the course is stored
- 💾 All data is saved in the course folder itself (`tool-config`) for portability
- 📱 Mobile-first, accessible from phones over local network
- ⚙️ Deployable via Docker and Kubernetes

## 🧱 Project Structure

```
/Course Folder/
├── Module 1/
│ ├── Chapter 1/
│ │ ├── lesson1.mp4
│ │ ├── lesson2.mp4
│ │ └── ...
│ └── Chapter 2/
│ ├── ...
├── Module 2/
│ └── ...
├── tool-config/
│ ├── lucas.json
│ ├── ane.json
│ └── config.json
```

## 🚀 How to Run

1. Clone the repository:
   ```
   git clone https://github.com/LucasGLGoncalves/local-course-tracker.git
   cd local-course-tracker
   ```
   
3. Start the app:
   ```
   docker compose up --build
   ```

5. Open your browser at:
   Desktop: http://localhost:3000
   Mobile: http://<your-local-ip>:3000

>Note: All data is stored in the selected course folder (tool-config), so you can move the entire folder (course + progress) to any other machine and resume.

## 📦 Tech Stack

- Frontend: React + Tailwind CSS + Vite
- Backend: Node.js + Express (coming soon)
- Data Storage: JSON files in local volume
- DevOps: Docker, Kubernetes (local cluster-ready)
