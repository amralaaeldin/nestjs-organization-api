# Nest.js Organization API

This project is a Nest.js API for managing organizations and their members.

## Features

- **Organization Management**: Create, update, and delete organizations with fields like name, description, and members.
- **Member Management**: Invite members to organizations.
- **Authentication**: Register, login, and logout users.

## Requirements

- Node.js
- npm
- MongoDB
- Redis
- Docker (optional)

## Installation

### Without Docker

#### Step 1: Clone the Repository & Install Dependencies

Clone the repository to your local machine:

```bash
git clone https://github.com/amralaaeldin/nestjs-organization-api.git
cd nestjs-organization-api
npm install
```

#### Step 2: Define Environment Variables

Create a `.env` file in the root directory and configure your environment variables.

#### Step 3: Start the Development Server

You can start the development server using the following command:

```bash
npm run start:dev
```

### With Docker

#### Step 1: Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/amralaaeldin/nestjs-organization-api.git
cd nestjs-organization-api
```

#### Step 2: Build the Docker Image using Docker Compose

Build the Docker image using the following command:

```bash
docker-compose up --build
```

## API Documentation

The API documentation is available at `http://localhost:8080`.
