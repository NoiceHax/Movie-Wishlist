Movie Wishlist App 🎬
Overview

The Movie Wishlist App is a modern web application built with React for the frontend and Node.js + Express with MongoDB for the backend. It allows users to create, manage, and track movies they want to watch. The app focuses on providing a smooth, responsive, and intuitive experience for movie enthusiasts.

Features

View Wishlist – See a list of all movies added, including title, year, and watched status.

Add Movies – Add new movies with a title and release year using a simple form.

Delete Movies – Remove movies from your wishlist with a single click.

Toggle Watched Status – Mark movies as watched or unwatched.

Dynamic Updates – Frontend updates automatically when movies are added, deleted, or toggled.

Responsive Design – Works seamlessly on mobile, tablet, and desktop.

Error Handling – Alerts and logs for failed network requests to improve user feedback.

Tech Stack

Frontend: React, Tailwind CSS, Axios, React Router v6

Backend: Node.js, Express.js

Database: MongoDB (Atlas cluster)

Deployment: Frontend on Netlify, Backend on Render

Folder Structure
frontend/
 ├─ src/
 │  ├─ components/       # Reusable components like MovieCard, AddMovieForm
 │  ├─ pages/            # Main pages like Wishlist
 │  ├─ api/              # Axios API calls
 │  └─ App.jsx
backend/
 ├─ index.js             # Server entry
 ├─ routes/              # Express routes for movies
 ├─ controllers/         # Controller logic for CRUD operations
 └─ config/              # Database connection setup

API Endpoints
Method	Endpoint	Description
GET	/api/movies	Fetch all movies
POST	/api/movies	Add a new movie
PATCH	/api/movies/:id	Toggle watched status
DELETE	/api/movies/:id	Delete a movie
Getting Started

Clone the repository

git clone <repo-url>
cd project


Setup Backend

cd backend
npm install
npm start


Make sure to create a .env file with your MongoDB URI.

Setup Frontend

cd frontend
npm install
npm run dev


The app should now be running on http://localhost:5173.

Live Demo

Frontend deployed on Netlify

Backend deployed on Render

(Insert links here once deployed)

Future Improvements

User authentication with JWT

Personalized wishlists for multiple users

Movie search via external APIs (e.g., OMDB)

Ratings, reviews, and recommendations

Credits

Built using React, Tailwind CSS, Node.js, Express, MongoDB

Inspired by personal project ideas to manage movie lists efficiently