# 🎨 Whiteboard – Online Drawing App

### 🧾 Overview
**Whiteboard** is an online drawing application that allows a single user to sketch, erase, and store their ideas digitally. It provides an intuitive canvas interface for writing or drawing and supports saving and loading board states using a cloud-based backend.

---

## 🚀 Features
- ✏️ Interactive drawing canvas  
- 🧽 Eraser and color selection tools  
- 💾 Save and load board state to the cloud  
- ⚙️ Backend built with **Spring Boot** and **MongoDB Atlas**  
- ⚡ Fast, responsive, and lightweight **React + Vite** frontend  
- 🌐 Fully deployed using **Render (backend)** and **Netlify (frontend)**  

---

## 🛠️ Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend | Spring Boot (Java 21) |
| Database | MongoDB Atlas |
| Deployment | Render (Backend), Netlify (Frontend) |

---

## ⚡ How It Works
1. The user draws or writes on the whiteboard canvas.  
2. Clicking **Save** stores the current board state in MongoDB Atlas via the Spring Boot backend.  
3. Clicking **Load** retrieves and restores the saved board state.  
4. All operations are performed for a single user session.

---

## 🌐 Live Demo
https://svwhiteboard.netlify.app/

---
