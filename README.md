# time-tracker

# Plan

- User application
  - Handle users (utilize jwt & bcryptjs)
    - Login
      - name
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

# Design

## Frontend

- React application

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

# UI Design

- Example utilizing the Recharts API to create a graph:

![Time Log](readme-content/first-sample.png)

[See Design Here](https://www.figma.com/file/hqnRBUyQbHOPRZnKp6D2Df/Time-Tracker)
