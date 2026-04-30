# 💸 Expense Tracker (Fenmo Assessment)

A minimal full-stack Expense Tracker application built to record, view, and analyze personal expenses in a production-like environment.

---

## 🚀 Live Demo

* 🌐 Frontend: fenmo-sooty.vercel.app

---

## 🧠 Features

* ➕ Add new expense (amount, category, description, date)
* 📋 View all expenses in a clean UI
* 🔍 Filter expenses by category (case-insensitive)
* 🔄 Sort expenses by date (Newest / Oldest)
* 💰 Dynamic total calculation of visible expenses
* ♻️ Duplicate prevention (idempotent API behavior)
* 📄 Pagination (5 items per page)
* ⏱️ Shows transaction date and time

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js

### Deployment

* Frontend: Vercel
* Backend: Render

---

## ⚙️ Key Design Decisions

### 1. Idempotent API (Retry-safe)

To handle real-world scenarios like:

* Multiple clicks
* Network retries
* Page refresh

The backend checks for existing records before inserting, ensuring no duplicate entries.

---

### 2. Case-insensitive Filtering

Implemented using:

* Backend filtering logic (`toLowerCase()` / `LIKE` equivalent)

Improves usability and user experience.

---

### 3. In-memory Storage (Trade-off)

Due to deployment constraints with native SQLite bindings (GLIBC issues on Render), I used in-memory storage.

* Ensures reliable deployment
* Avoids native module compatibility issues
* Keeps API behavior correct

📌 Note:
In production, this would be replaced with a persistent database like PostgreSQL or SQLite.

---

### 4. Client-side Pagination

Implemented pagination on the frontend (5 items per page) for simplicity and performance given small dataset size.

---

## 📂 Project Structure

```
Fenmo/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── index.js
│
├── client/
│   ├── components/
│   ├── services/
│   ├── App.jsx
```

---

## 🧪 Handling Real-world Conditions

The application is designed to behave correctly under:

* 🔁 Retry requests → No duplicate entries
* 🔄 Page refresh → State re-fetch from API
* ⏳ Slow network → Loading states handled

---

## ⚠️ Trade-offs

* Used in-memory storage instead of a database
* No authentication (out of scope)
* Minimal UI styling (focused on clarity and functionality)

---

## ▶️ How to Run Locally

### Backend

```
cd backend
npm install
node index.js
```

### Frontend

```
cd client
npm install
npm run dev
```

---

## 📌 Future Improvements

* Persistent database (PostgreSQL / MongoDB)
* User authentication
* Expense analytics (charts)
* Server-side pagination

---

## 🙌 Author

Kunal Ashok Bamane
kunal1234.bamane@gmail.com

---