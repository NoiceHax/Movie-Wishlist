# 🎬 Movie Wishlist App

## Overview

The **Movie Wishlist App** is a modern web application that helps movie enthusiasts track the films they want to watch. Built with **React** for the frontend and **Node.js + Express** with **MongoDB** for the backend, the app provides a smooth, responsive, and intuitive experience for managing your movie wishlist.

---

## Features

* **View Wishlist** – Browse all movies in your wishlist with title, year, and watched status.
* **Add Movies** – Easily add new movies using a simple form.
* **Delete Movies** – Remove movies from your wishlist with a single click.
* **Toggle Watched Status** – Mark movies as watched or unwatched.
* **Dynamic Updates** – Changes are reflected in real-time without refreshing.
* **Responsive Design** – Works seamlessly across mobile, tablet, and desktop.
* **Error Handling** – Alerts and logs for failed network requests for better feedback.

---

## Tech Stack

* **Frontend:** React, Tailwind CSS, Axios, React Router v6
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Atlas cluster)
* **Deployment:** Frontend on Netlify, Backend on Render

---

## Folder Structure

```
frontend/
 ├─ src/
 │  ├─ components/       # Reusable components (MovieCard, AddMovieForm, etc.)
 │  ├─ pages/            # Main pages (Wishlist)
 │  ├─ api/              # Axios API calls
 │  └─ App.jsx

backend/
 ├─ index.js             # Server entry point
 ├─ routes/              # Express routes for movies
 ├─ controllers/         # CRUD controller logic
 └─ config/              # Database connection setup
```

---

## API Endpoints

| Method | Endpoint        | Description           |
| ------ | --------------- | --------------------- |
| GET    | /api/movies     | Fetch all movies      |
| POST   | /api/movies     | Add a new movie       |
| PATCH  | /api/movies/:id | Toggle watched status |
| DELETE | /api/movies/:id | Delete a movie        |

---

## Getting Started

### Clone the repository

```bash
git clone <repo-url>
cd project
```

### Setup Backend

```bash
cd backend
npm install
npm start
```

> Make sure to create a `.env` file with your MongoDB URI and any other environment variables (e.g., `PORT`, `CLIENT_URL`).

### Setup Frontend

```bash
cd frontend
npm install
npm run dev
```


---

## Live Demo

* **Frontend:** [https://moviewishlist.vercel.app](https://moviewishlist.vercel.app)
* **Backend:** [https://movie-wishlist-39p5.onrender.com](https://movie-wishlist-39p5.onrender.com)

---

## Future Improvements

* User authentication with JWT
* Personalized wishlists for multiple users
* Movie search via external APIs (e.g., OMDB)
* Ratings, reviews, and recommendations

---

## Credits

Built with **React**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB**.
Inspired by personal projects aimed at efficiently managing movie lists.
