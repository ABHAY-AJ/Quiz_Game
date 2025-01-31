# Live Link
- [Quiz_Game](https://quiz-game-jbbf.onrender.com/)


# Quiz Game

A fun and interactive quiz game built with React, featuring a dynamic quiz interface, a scoring system, and a leaderboard.

## Prerequisites

Before running the app, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)

## Setup Instructions

### Step 1: Clone the Repository

Clone the repository to your local machine by running the following commands:

```bash
git clone https://github.com/ABHAY-AJ/Quiz_Game.git
npm install

cd frontend

```

### Step 2: Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
npm install
```

### Step 3: Set Up the Backend (Optional)

If you wish to use your own backend API (for scoring, leaderboard, etc.), follow these steps:

1. Set up your backend server using technologies like **Node.js**, **Express**, and **MongoDB** (or any other backend stack of your choice).
2. Update the API endpoints in the `Quiz.js` and `Leaderboard.js` files to point to your backend server.
   
   For example, replace:

   ```javascript
   axios.get("http://localhost:5000/api");
   ```

   with:

   ```javascript
   axios.get("https://your-backend-url/api");
   ```

   Ensure that the API server is running and accessible before testing the app.

### Step 4: Run the App

To start the development server, run the following command:

```bash
npm start
```

The app will be available at `http://localhost:3000` in your browser.

# ScreenShots

![alt text](./screenShots/Screenshot%202025-01-31%20075614.png)
![alt text](./screenShots/Screenshot%202025-01-31%20075655.png)
![alt text](./screenShots/Screenshot%202025-01-31%20075717.png)
![alt text](./screenShots/Screenshot%202025-01-31%20075731.png)
