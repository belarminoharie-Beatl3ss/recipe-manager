
# Recipe Manager — Multi-Page Recipe App

A multi-page recipe management application built with **React, TypeScript, Vite, React Router, TanStack Query, Axios, Tailwind CSS, and DaisyUI**.

Users can search for meals from TheMealDB, view recipe details, sign in, and manage their saved recipes using browser localStorage.

## Live Demo

**Deployed Application:**  
https://recipe-manager-fwa3yak39-belarminoharie-beatl3ss.vercel.app/

## Features

- **Meal Search:** Search for meals using TheMealDB public API.
- **Recipe Details:** View individual recipes and their ingredients.
- **User Authentication:** Sign in and maintain login state using localStorage.
- **Protected Routes:** Require authentication before accessing saved recipes.
- **Save Recipes:** Save recipes locally in the browser.
- **Saved Recipes:** View and manage saved recipes.
- **Category Filtering:** Filter saved recipes by category.
- **Edit Recipes:** Update preparation time and personal notes.
- **Delete Recipes:** Remove saved recipes.
- **Favorite Recipes:** Mark and unmark recipes as favorites.
- **Loading and Error States:** Display feedback during data requests.
- **Responsive Interface:** Styled with Tailwind CSS and DaisyUI.

## Technologies Used

- React 19
- TypeScript
- Vite
- React Router DOM
- TanStack Query
- Axios
- Tailwind CSS
- DaisyUI
- TheMealDB API
- Vercel

## Requirements

Before running the project, install:

- Node.js and npm
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/belarminoharie-Beatl3ss/recipe-manager.git
cd recipe-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file.

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

The `.env` file should contain:

```env
VITE_MEALDB_URL=https://www.themealdb.com/api/json/v1/1
```

The `.env` file is excluded from Git. The committed `.env.example` provides the required configuration.

### 4. Start the development server

```bash
npm run dev
```

Open the local address shown by Vite, usually:

```text
http://localhost:5173
```

## Production Build

To check TypeScript and generate the production build, run:

```bash
npm run build
```

The generated production files are placed in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
```

## Authentication

The application uses a simple name-based login system.

- User login information is stored in browser localStorage.
- The authentication context provides login and logout functionality.
- Protected routes redirect unauthenticated users to the login page.

## Data Storage

Saved recipes and authentication information are stored in browser localStorage.

The application uses TheMealDB API to retrieve meal information and categories.

## Deployment

The application is deployed using Vercel.

The `vercel.json` configuration provides SPA rewrites so React Router routes work when users directly visit or refresh nested URLs.

The following environment variable must be configured in Vercel:

```env
VITE_MEALDB_URL=https://www.themealdb.com/api/json/v1/1
```

## Submission

- **Repository:** [recipe-manager](https://github.com/belarminoharie-Beatl3ss/recipe-manager)
- **Branch:** `main`
- **Repository Visibility:** Public
- **Live Application:** https://recipe-manager-fwa3yak39-belarminoharie-beatl3ss.vercel.app/
