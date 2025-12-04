# Cally - Scheduling Made Simple

Cally is a powerful and intuitive scheduling application designed to streamline meeting coordination. It allows users to create event types, share availability, and let others book meetings seamlessly.

## 🚀 Hosted Application

**[Live Demo](https://getcally.vercel.app)**   

## ✨ Features

-   **User Authentication**: Secure sign-up and login functionality.
-   **Dashboard**: Overview of upcoming meetings and events.
-   **Event Management**: Create, edit, and delete different event types (e.g., 30-min meeting, Consultation).
-   **Availability Settings**: Define your working hours and availability.
-   **Booking System**: Public booking pages for guests to schedule meetings.
-   **Meeting Management**: View upcoming, past, and cancelled meetings.
-   **Pagination & Filtering**: Efficiently manage large lists of meetings with month-based filtering.
-   **Profile Management**: Update user profile details and settings.
-   **Responsive Design**: Optimized for both desktop and mobile devices.

## 🛠️ Tech Stack

### Frontend
-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)

### Backend
-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Framework**: [Express.js](https://expressjs.com/)
-   **Database**: [Neon DB](https://neon.com/)
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Authentication**: JWT (JSON Web Tokens)

## 📂 Project Structure

The project is organized into two main directories:

-   **`cally/`**: Contains the Next.js frontend application.
-   **`backend/`**: Contains the Express.js backend API and Prisma database schema.


## 📡 API Endpoints

### Authentication
-   `POST /auth/sign-up`: Register a new user.
-   `POST /auth/log-in`: Login and receive a JWT.
-   `GET /auth/me`: Get current user details.
-   `PUT /auth/me`: Update user profile.
-   `DELETE /auth/me`: Delete user account.

### Events
-   `GET /events`: Get all events for the user.
-   `POST /events`: Create a new event.
-   `PUT /events/:id`: Update an event.
-   `DELETE /events/:id`: Delete an event.

### Bookings
-   `GET /bookings`: Get bookings (supports `type`, `page`, `limit`, `filter`).
