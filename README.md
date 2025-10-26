# FOCUS: Student Body Management System

This is a Next.js application built with Firebase Studio. It serves as a comprehensive management system for a student body organization.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (using the App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Generative AI:** [Genkit](https://firebase.google.com/docs/genkit)
*   **Backend:** [Firebase](https://firebase.google.com/) (using mock data locally)

---

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your system. Version 18.x or later is recommended. You can check your version by running:

```bash
node -v
```

### Installation

1.  **Clone the repository** (or download the source code).

2.  **Navigate to the project directory:**
    ```bash
    cd your-project-folder
    ```

3.  **Install dependencies:**
    This project uses `npm` for package management. Run the following command to install all the necessary packages defined in `package.json`:
    ```bash
    npm install
    ```

### Environment Variables

For features involving Generative AI (Genkit), you will need to set up environment variables.

1.  Create a new file named `.env` in the root of your project.
2.  Add your API keys to this file. For example, if you are using Google's Gemini models, you would add:
    ```
    GEMINI_API_KEY=your_google_ai_api_key_here
    ```
    You can get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Running the Development Server

Once the dependencies are installed, you can start the local development server by running:

```bash
npm run dev
```

This will start the application on `http://localhost:9002`. You can now open this URL in your web browser to see the application running. The server will automatically reload when you make changes to the code.

---

## Available Scripts

In the `package.json` file, you will find several scripts for managing the application:

*   `npm run dev`: Starts the Next.js development server with Turbopack for faster performance.
*   `npm run build`: Compiles the application for production.
*   `npm run start`: Starts the production server after a build.
*   `npm run lint`: Runs the linter to check for code quality and style issues.
*   `npm run genkit:dev`: Starts the Genkit development server to test AI flows.
