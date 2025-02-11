# IRCTC Management System API

## Overview

This is the backend API for a Railway Management System. It handles user authentication, train management, booking seats, and more. This API is built using Express.js, PostgreSQL, JWT Authentication, and other essential technologies.

## API Endpoints

### 1. **User Registration (POST /api/auth/register)**

- **URL**: `http://localhost:5000/api/auth/register`
- **Body (JSON)**:
  ```json
  {
    "username": "sunny_bhopal",
    "email": "sunny.bhopal@example.com",
    "password": "password123",
    "role": "user"
  }


Success Response:

Code: 201 Created
Body: json
{
  "user": {
    "id": 1,
    "username": "sunny_bhopal",
    "email": "sunny.bhopal@example.com",
    "role": "user"
  }
}

Error Response:

Code: 400 Bad Request
Body:json

{
  "message": "Username already exists"
}


### 2.User Login (POST /api/auth/login)
URL: http://localhost:5000/api/auth/login

Body (JSON):
{
  "email": "sunny.bhopal@example.com",
  "password": "password123"
}

Success Response:

Code: 200 OK
Body:

{
  "token": "your_jwt_token_here"
}

Error Response:

Code: 400 Bad Request
Body:
json
{
  "message": "Invalid credentials"
}


### 3. Book a Seat (POST /api/bookings/book)
URL: http://localhost:5000/api/bookings/book

Headers:

Authorization: Bearer your_jwt_token_here
Body (JSON):
{
  "train_id": 1
}
Success Response:

Code: 201 Created
Body:

{
  "booking": {
    "id": 1,
    "train_id": 1,
    "user_id": 1,
    "created_at": "2025-02-12T08:30:00Z"
  }
}
Error Response:

Code: 400 Bad Request
Body:

{
  "message": "No available seats"
}

### 4. Get Booking Details (GET /api/bookings/booking/:booking_id)
URL: http://localhost:5000/api/bookings/booking/1

Headers:

Authorization: Bearer your_jwt_token_here
Success Response:

Code: 200 OK
Body:

{
  "booking": {
    "id": 1,
    "train_id": 1,
    "user_id": 1,
    "created_at": "2025-02-12T08:30:00Z"
  }
}
Error Response:

Code: 404 Not Found
Body:

{
  "message": "Booking not found"
}
### 5. Add a Train (POST /api/trains/add)
URL: http://localhost:5000/api/trains/add

Headers:

Authorization: Bearer your_jwt_token_here (Admin)
Body (JSON):
{
  "train_name": "Shatabdi Express",
  "source": "Bhopal",
  "destination": "Indore",
  "sourceStationTime": "10:00",
  "destStationTime": "12:00",
  "total_seats": 100,
  "available_seats": 100,
  "ticket_price": 500
}
Success Response:

Code: 201 Created
Body:
{
  "message": "Train added successfully",
  "train": {
    "id": 1,
    "train_name": "Shatabdi Express",
    "source": "Bhopal",
    "destination": "Indore",
    "sourceStationTime": "10:00",
    "destStationTime": "12:00",
    "total_seats": 100,
    "available_seats": 100,
    "ticketPrice": 500
  }
}
Error Response:

Code: 400 Bad Request
Body:

{
  "message": "All fields are required"
}

### 6. Get  Trains by source and destination  (GET /api/trains)
URL: http://localhost:5000/api/trains?source=Bhopal&destination=Indore

Success Response:

Code: 200 OK
Body:

{
  "trains": [
   {
      "id": 1,
      "train_name": "Shatabdi Express",
      "source": "Bhopal",
      "destination": "Indore",
      "sourceStationTime": "10:00",
      "destStationTime": "12:00",
      "total_seats": 100,
      "available_seats": 100,
      "ticketPrice": 500
    }
  ]
}
Error Response:

Code: 404 Not Found
Body:

{
  "message": "No trains found between the specified source and destination"
}
### 7. Get Train by ID (GET /api/trains/api/trains/:trainId)
URL: http://localhost:5000/api/trains/api/trains/1

Success Response:

Code: 200 OK
Body:

{
  "train": {
    "id": 1,
    "train_name": "Shatabdi Express",
    "source": "Bhopal",
    "destination": "Indore",
    "sourceStationTime": "10:00",
    "destStationTime": "12:00",
    "total_seats": 100,
    "available_seats": 100,
    "ticketPrice": 500
  }
}
Error Response:

Code: 404 Not Found
Body:

{
  "message": "Train not found"
}
