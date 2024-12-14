# Project Setup

This repository contains a backend service built with **NestJS** and a **MongoDB** database, configured to run inside Docker containers using Docker Compose. Below are the instructions for setting up the development environment, running the services, and understanding the available configurations.

## Prerequisites

Make sure you have the following installed on your machine:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)
- **Node.js (Optional)**: For local development without Docker, [Download Node.js](https://nodejs.org/).

## Getting Started

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Set Up Environment Variables

Create a `.env` file in the root of your project with the content from the env.example file.

### 3. Build and Start the Services

You can use Docker Compose to build and start the services defined in `docker-compose.yml`. Run the following command to start the backend and MongoDB:

bash

Copy code

`docker-compose up --build`

This will:

-   Build the Docker images for the backend and MongoDB services.
-   Start the **NestJS backend** and **MongoDB** containers.
-   Map the backend service to port `3000` and MongoDB to port `27017` on your host machine.

Or you can build just the mongo container and spin up the backend code on a local development server and target the mongo container with localhost (details in env file).

### 4. Access the Application

Once the services are up, you can access the application at:

-   **Backend API**: http://localhost:3000

### 5. Running the Application Locally (Optional)

If you want to run the backend service locally outside of Docker, make sure you have **Node.js** installed. Then, follow these steps:

1.  Install the required dependencies:

    bash

    Copy code

    `pnpm install`

2.  Start the application in development mode:

    bash

    Copy code

    `pnpm start:dev`

This will start the backend service locally on port `3000` and connect it to the MongoDB instance specified in your `.env` file.

Available Scripts
-----------------

Here are some commonly used scripts for development and testing:

-   **Build the application**: `npm run build`
-   **Format the code**: `npm run format`
-   **Start the application**: `npm run start`
-   **Start the application in watch mode (dev mode)**: `npm run start:dev`
-   **Start the application in debug mode**: `npm run start:debug`
-   **Start the production build**: `npm run start:prod`
-   **Lint the code**: `npm run lint`
-   **Run tests**: `npm run test`
-   **Run tests in watch mode**: `npm run test:watch`
-   **Run tests with coverage**: `npm run test:cov`
-   **Run tests in debug mode**: `npm run test:debug`
-   **Run e2e tests**: `npm run test:e2e`

Troubleshooting
---------------

1.  **MongoDB Connection Issues**

    Ensure that the `MONGO_URI` is correctly set to connect to your MongoDB instance. If you're using Docker, the URI should be `mongodb://mongo:27017/authdb` to connect to the mongo container. If you're running MongoDB locally, use `mongodb://localhost:27017/authdb`.

2.  **JWT Secret Issues**

    Make sure that the `JWT_SECRET` environment variable is set in your `.env` file. This is required to sign and verify JWT tokens.

3.  **Permissions**

    Ensure that Docker has the necessary permissions to read and write the mounted volumes, especially if you're working on a Windows or macOS machine. Try restarting Docker if you encounter issues with volume mounts.

License
-------

This project is licensed under the MIT License - see the LICENSE file for details.