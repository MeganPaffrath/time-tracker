# time-tracker

# Index

- [Plan](#Plan)
- [Stack](#Stack)
- [Design](#Design)
  - [Functionality](#Functionality)
  - [Project Organization](#Project-Organization)
  - [Routes](#Routes)
- [Models](#Models)

# Plan

- User application
  - Handle users (utilize jwt & bcryptjs)
    - Login
      - username
      - email
      - password
    - Logout
    - Delete Account
- Functionality
  - \<user> can log times for an \<activity>
  - \<user> can view charts of times recorded for various \<activity>
    - month view
      - view past months
    - year view
      - view past years
  - \<user> can create and delete \<activity>

# Stack

## MERN Stack

- MongoDB
- Express
- React
- Node

## Frontend

- React app
  - createContext: to keep track of user & how page should display
  - axios: for http req/res

## Backend

- Node
- express
- mongoose
- cors : cross origin resource sharing
  - can specify which origins can access the api
  - only secure throught browser, not command line
- detenv
- bcryptjs
- jsonwebtoken

# Design

## Functionality

## Project Organization

- `backend/`
  - `index.js ` : sets up server and routes
  - `.env` : holds mongodb connection string && JWT secret key
  - `middleware/`
    - `auth.js` : verifies request data w/ jwt & supplies user id
  - `models/`
    - `userModel.js` : defind user
  - `routes/`
    - `userRouter.js` : routes for user
    - `timeLogRouter.js` : routes for time logs
- `frontend/`
  - `public/`
    - `index.html` : html skeleton for React
  - `src/`
    - `App.js` : holds react router and the user context
    - `index.js` : Renders the App into html
    - `style.css` : styles for the whole page
    - `components/`
      - `auth/`
        - `Login.js` : used to log in user
        - `Register.js` : used to register a user
        - `AuthOptions.js` : determines what header user sees if logged in/out
      - `pages/`
        - `Home.js` : what user sees when logged in (otherwise they see login page)
      - `layout/`
        - Header.js
        - Footer.js
    - context /
      - `UserContext.js` : initializes and holds context

## Routes

Users backend/api/users/

- POST
  - /users/register : Create a new account
  - /login : Log in
- DELETE
  - /delete : Delete a user
    - header contains auth-token
- ?
  - /edituser : edit user info

# UI Design

- Example utilizing the Recharts API to create a graph:

![Time Log](readme-content/first-sample.png)

[See Design Here](https://www.figma.com/file/hqnRBUyQbHOPRZnKp6D2Df/Time-Tracker)

# Models

## User:

- username
- email
- password
- event log topic array?

## Event Log:

- userid
- startTime
- endTime
- eventType
