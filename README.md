# IndiaPropertyFinder Deployment Guide

This guide provides instructions on how to deploy the IndiaPropertyFinder application to Vercel.

## Prerequisites

- A [Vercel](https://vercel.com) account.
- [Vercel CLI](https://vercel.com/cli) installed (optional, but recommended for local testing).

## Deployment Steps

### 1. Connect to Vercel

You can deploy by connecting your GitHub/GitLab/Bitbucket repository to Vercel or by using the CLI.

#### Option A: Using Vercel Dashboard (Recommended)
1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).
2. Go to the [Vercel Dashboard](https://vercel.com/new).
3. Import your repository.
4. Vercel will automatically detect the Vite project.
5. **Environment Variables**: In the "Environment Variables" section, add the following:
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
6. Click **Deploy**.

#### Option B: Using Vercel CLI
1. Open your terminal in the project root.
2. Run `vercel`.
3. Follow the prompts to set up and deploy.
4. To add environment variables, use `vercel env add GEMINI_API_KEY`.

## Configuration Details

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Routing**: A `vercel.json` file has been included to handle client-side routing, ensuring that deep links work correctly.

## Environment Variables

The application requires the following environment variable to function correctly:

- `GEMINI_API_KEY`: Required for AI-powered features (if implemented).

## Local Development

To run the app locally:

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.
