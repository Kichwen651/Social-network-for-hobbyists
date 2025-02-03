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

###  Installation

## backend
1.Set up a virtual environment:
pipenv install
pipenv shell
2.Install the required Python dependencies:
pipenv install -r requirements.txt
3.Configure the environment variables for your project 
4.Run database migrations to set up the database:
flask db init
flask db migrate -m""
flask db upgrade
5.Start the Flask development server:
flask run
## frontend
1.Navigate to the frontend directory 
cd frontend
2.Install the required Node.js dependencies:
npm install
3.Start the frontend development server:
npm start


### Prerequisites

- Python 3.8+
- PostgreSQL (for production) or SQLite (for local development)
- Node.js (for frontend development)
- pip (Python package installer)

### Git repo link

https://github.com/Kichwen651/Social-network-for-hobbyists

### live demo
https://www.loom.com/share/0e569b3b79b0465d91a5916f258708db?sid=061dd34f-eca9-4f08-bb56-10631bc6fa9e

https://www.loom.com/share/fcb4086e52bc421498da0aa5d5337c1b?sid=36bae4f2-7e41-40bc-ae43-f49b9d504917

### Vercel frontend
https://hobbies-umber.vercel.app/


