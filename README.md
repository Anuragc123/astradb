# Social Media Analysis App

A web-based application for analyzing social media data, built using **Vite**, **React**, and **Node.js**. This app allows users to gain insights from social media posts through interactive visualizations and analytical tools.

---

## Features

- **User-friendly Interface**: Built with React for a smooth and dynamic user experience.
- **Data Analysis**: Extract insights from social media posts using backend APIs.
- **Customizable Inputs**: Upload your data and configure analysis parameters.
- **Real-time Analytics**: Generate visual reports and results on the go.

---

## Tech Stack

### Frontend
- **React** (with Vite)
- **JavaScript**
- **Tailwind CSS**

### Backend
- **Node.js**
- **Express.js**
- **DataStax Astra DB**

---

## Prerequisites

1. *Node.js* (v18+ recommended)
2. *npm* or *yarn*
3. *DataStax Astra DB*:
   - Create an account on [Astra DB](https://www.datastax.com/astra).
   - Obtain your *Astra DB Application Token* and *Database URL Endpoint*.
4. *LangFlow Workflow*:
   - Configure your workflow in [LangFlow](https://langflow.org/).
   - Obtain the *LangFlow Workflow Token* for integration.
5. *Gemini API Token*:
   - Set up your access to the *Gemini Generative AI API*.
   - Obtain the *Gemini API Key* for generating insights.

---

## How to Run
1. Clone the repository:
   ```bash
   git clone https://github.com/Anuragc123/social-media-analysis.git
   cd social-media-analysis
   
2. Install dependencies for backend and frontend:
   ```bash
   cd backend && npm install && cd ..
   cd frontend && npm install && cd ..

3. Set up environment variables:
   - Create a .env file in the main directory with the following variables:
     ```env
     APPLICATION_TOKEN_AZURE=<your-astra-db-application-token>
     ASTRA_DB_URL_AZURE=<your-astra-db-endpoint>
     GEMINI_API_KEY=<your-gemini-api-key>
     GEMINI_API_URL=<your-gemini-api-url>

   
4. Start the backend:
   ```bash
   cd backend
   nodemon server.js
   
5. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   
6. Open your browser at [http://localhost:5173](http://localhost:5173).


