# Social Network for Hobbyists

This is a social network platform for hobbyists to connect, share posts, join groups, and engage with people who share similar interests and hobbies. Users can create and join groups, post content, and interact with others through comments, likes, and more.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Management**: Users can register, log in, and update their profiles.
- **Groups**: Users can create or join hobby-related groups, and participate in discussions.
- **Posts**: Users can create posts, attach media, and interact with posts in groups.
- **Authentication**: JWT-based authentication for secure login and API access.
- **Email Notification**: Users receive welcome emails after registration.
- **Admin Features**: Admins can manage users and groups, approve users, etc.

## Technologies Used

- **Backend**: Flask (Python Web Framework)
- **Database**: PostgreSQL (or SQLite for local development)
- **Authentication**: JWT (JSON Web Tokens)
- **Email**: Flask-Mail (for sending welcome emails)
- **Database Migration**: Alembic
- **CORS**: Flask-CORS (for enabling cross-origin resource sharing)

## Installation

### Prerequisites

- Python 3.8+
- PostgreSQL (if using PostgreSQL for production)
- pip (Python package installer)
- Node.js (for frontend development, optional)

### Steps

