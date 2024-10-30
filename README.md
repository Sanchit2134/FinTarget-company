# Task Queueing System with Rate Limiting in Node.js

## Overview

This project implements a Node.js backend with a task queueing system, rate limiting, and logging. Tasks are managed for individual users, and the system ensures resilience against failures and overload through rate limiting and clustering.

## Features

- **Task Queueing**: Queues tasks for each user to be processed sequentially.
- **Rate Limiting**: Limits the number of tasks a user can perform per second and per minute to prevent abuse.
- **Logging**: Logs task completions and errors to aid in debugging and tracking.
- **Resilience**: Implements clustering to handle multiple requests simultaneously.

## Folder Structure

The project follows a modular structure to improve maintainability and readability. Here’s an overview of the main folders and files:


## Key Modules

### 1. `taskQueue.js`

- Manages the task queue for each user using a `Map`.
- Queues tasks and executes them in the order received, ensuring tasks are processed sequentially per user.

### 2. `taskLogger.js`

- Logs each task's completion to a log file along with the user ID and timestamp.

### 3. `rateLimit.js`

- Implements rate limiting by limiting the number of tasks a user can perform per second and per minute.

### 4. `taskProcessor.js`

- Simulates processing tasks asynchronously.
- Represents a placeholder for actual task processing, which could be database updates, external API calls, etc.

### 5. `index.js`

- Sets up the Express server and defines API endpoints for task creation and queue clearing.
- Includes cluster setup to handle multiple requests by spawning worker processes.

## API Endpoints

- **POST `/api/v1/tasks`**
  - Accepts a `userId` and `task` in the request body.
  - If the user exceeds the rate limit, returns `429 Too Many Requests`.
  - Otherwise, queues the task for processing.

  **Example Request Body**:
  ```json
  {
    "userId": "user123",
    "task": "Sample task data"
  }
