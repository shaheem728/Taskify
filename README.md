# 💻 Tech Stack:
![MongoDB](https://img.shields.io/badge/mongodb-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Node.js](https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwindcss&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

# Taskify

 A task management application with an intuitive user interface to create, update, and track tasks efficiently.

## Functionalities Implemented:

- **User Dashboard** – View assigned tasks, track progress, and get task insights.
- **Task Management** – Create, update, and track tasks with due dates and priorities.
- **Automated Status** Updates – Task status changes automatically based on the checklist.
- **Team Collaboration** – Assign tasks to multiple users and track completion.
- **Priority & Progress Tracking** – Categorize tasks by priority and monitor completion levels.
- **Task Report Downloads** – Export task data for analysis and tracking.
- **Attachments Support** – Add and access task-related file links easily.
- **Mobile Responsive UI** – Seamless experience on desktop, tablet, and mobile.
- **Dockerized Deployment:** Set up and run the application easily using Docker and Docker Compose.
## Prerequisites

- [Docker](https://www.docker.com/) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/) installed.

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/shaheem728/Taskify.git
cd Taskify
```
### Step 2: Set Up the Environment Variables

Create a .env file:
```
touch .env
```
Add the following environment variables to the .env file:
```
MONGO_URI=
JWT_SECRET=saskk123kksslkal334
ADMIN_INVITE_TOKEN=12345
PORT=8800
```

### Step 3: Build and Run the Application with Docker

Build and start the application using Docker Compose:
```
docker-compose up --build
```
The application will be available at http://localhost:5173 (or the port configured in your docker-compose.yml).

## Step 4: Access the Application
Open your browser and navigate to http://localhost:5173.

Start interacting with AiBot and explore its featur




