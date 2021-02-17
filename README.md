# time-tracker

# Index

- [Progress and Plan](#Progress-and-Plan)
- [Stack](#Stack)
- [Design](#Design)
  - [Routes](#Routes)
  - [Project Organization](#Project-Organization)
- [Models](#Models)

# Progress and Plan

## Key

- 🏁 : in progress
- ❌ : not done
- ✅ : complete

## Outline

- User application 🏁
  - Handle users 🏁
    - utilizes JWTs & bcryptjs ✅
    - Register: username, email, password, verify password ✅
      - notify user of bad register attempts ❌
    - Login: username & password ✅
      - notify user of bad login attempts ❌
    - Logout ✅
    - Delete Account ❌
    - Edit account ❌
- Functionality 🏁
  - Activity handling
    - \<user> can create new \<activity> types ✅
    - \<user> can delete \<activity> types ❌
  - Logger
    - \<user> can log times for an \<activity> ✅
    - \<user> can select specific start&end time of activity ❌
    - \<user> can use a clock to start and end activity ❌
  - Log View
    - \<user> can view all of their time logs in chronological order ✅
    - \<user> can delete a log via the chronological order list ✅
    - \<user> can view charts of times recorded for various \<activity> 🏁
      - month view ❌
        - view past months ❌
      - year view ❌
        - view past years ❌

# Stack

## MERN Stack

- MongoDB
- Express
- React
- Node

## Frontend

- React app
  - useContext: to keep track of user & how page should display
    - userContext
  - axios: for http req/res
  - useHistory: to keep track of routes

## Backend

- Node
- express
- mongoose
- cors : cross origin resource sharing
  - can specify which origins can access the api
  - only secure through browser, not command line
- detenv
- bcryptjs
- jsonwebtoken

# Design

## Routes

### File: `routes/userRouter`

### Route: `api/users/`

- ALL 🏁:
  - DONE ✅
    - register, login, validateToken
  - TO DO ❌
    - delete, edituser, activities, addactivity
- POST
  - `api/users/register` : Create a new account ✅
    - body
      - username: \<string>
      - password: \<string>
      - verifyPassword: \<string>
      - email: \<email>
  - `/users/login` : Log in ✅
    - body
      - username: \<string>
      - password: \<string>
  - `/users/validateToken` : validates if user logged in ✅
    - header
      - key: x-auth-token
      - value: \<string>
  - `/users/addactivity` : add new activity type ✅
    - header
      - key: x-auth-token
      - value: \<string>
    - body
      - activity: \<string>
- GET
  - `api/users/` : get user data from jwt ✅
    - header
      - key: x-auth-token
      - value: \<string>
  - `api/users/activities` : returns users activity types ✅
    - header
      - key: x-auth-token
      - value: \<string>
- DELETE
  - `api/delete` : delete a user ❌
    - header
      - key: x-auth-token
      - value: \<string>
    - body
      - username: \<string>
  - `api/edituser` : edit user info ❌
    - header
      - key: x-auth-token
      - value: \<string>
    - body
      - to be determined

### File: `routes/logRouter`

### Route: `api/log/`

- POST
  - `api/log/new`: creates new log ✅
    - header
      - key: x-auth-token
      - value: \<string>
    - body
      - activity: \<string>
      - date: UTC time
      - minutes: \<int>
- GET
  - `api/log/getlogs`: gets all logs for the user ✅
    - header
      - key: x-auth-token
      - value: \<string>

## Project Organization

#### NEEDS UPDATING

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

# Models

## User:

- username: string
- email: email
- password: string
- activities[Activity]: array of Activity
- accountCreated: Date
- lastSeen: Date

## Event Log:

- userid: string
- startTime: Date
- minutes:
- eventType: string
