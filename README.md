# Tasks Manager

This is a task management application built with React, Zustand, Tailwind CSS, and Vite. The application allows users to create, update, and manage tasks with features like filtering, sorting, and pagination. The tasks are stored in the browser's `localStorage`, ensuring persistence across sessions.

## Features

- **CRUD Operations**: Create, read, update, and delete tasks.
- **Task Filtering**: Filter tasks by status (e.g., Not Started, In Progress, Completed).
- **Sorting**: Sort tasks alphabetically by description (ascending/descending).
- **Pagination**: View tasks with pagination controls to navigate between pages.
- **Responsive Design**: Fully responsive UI using Tailwind CSS.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Zustand**: Lightweight state management for React applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Vite**: Fast frontend build tool for development.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JooZef315/digitalhub-task.git
   cd digitalhub-task
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at http://localhost:5173

## Configuration

Environment Variables
To configure environment variables, create a .env file in the root directory:

```bash
  VITE_USERNAME=
  VITE_PASSWORD=
```

Environment variables defined in .env files are accessible via **import.meta.env** in Vite projects.

## Local Storage

Tasks are stored in the browser's localStorage. No backend is required to persist data.

## Caching

The application implements caching mechanisms to enhance performance:

- **`currentTasks` Caching**: The `currentTasks` array, which results from pagination, is cached using React's `useMemo` hook. This ensures that the tasks are only recalculated when the relevant state, such as the current page or task list, changes.
- **Local Storage as Cache**: Tasks are stored in the browser's `localStorage`, which acts as a cache for task data. This allows tasks to persist across sessions, reducing redundant data fetching.

## License

This project is licensed under the [MIT License](LICENSE).
