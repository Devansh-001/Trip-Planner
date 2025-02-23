"use client"

import Navbar from "./Components/Navbar";
import "./globals.css";
import { Provider } from "react-redux";
import store from "../app/Redux/store";
import SetUser from "./Auth/setUser";
import Toast from "./Auth/Toast";
import UserModal from "./Auth/UserModal";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        <link rel="icon" href="/android-chrome-512x512.png" type="image/png" />

        <title>AI Trip Planner</title>
        <meta name="description" content="An AI-powered trip planner that generates personalized travel itineraries based on your budget, the number of travelers, and destination." />
        <meta name="keywords" content="trip planner, AI travel, travel itinerary, budget travel, vacation planner, travel generator, trip suggestion, google gemini, travel AI, personalized itinerary" />

        <meta property="og:title" content="AI Trip Planner" />
        <meta property="og:description" content="An AI-powered trip planner that generates personalized travel itineraries based on your budget, the number of travelers, and destination." />
        <meta property="og:image" content="/trip-planner-icon.png" />
        <meta property="og:url" content="https://ai-trip-planner.netlify.app" />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content="AI Trip Planner" />
        <meta name="twitter:description" content="An AI-powered trip planner that generates personalized travel itineraries based on your budget, the number of travelers, and destination." />

      </head>
      <Provider store={store}>
        <body>
          <Toast />
          <SetUser />
          <Navbar />
          <UserModal />
          {children}
        </body>
      </Provider>
    </html>
  );
}
