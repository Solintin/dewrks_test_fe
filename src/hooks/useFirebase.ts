// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCbexGsqKQZLg9b8QglMF3FGdwde8UCMXs",
//   authDomain: "e-mr-ed431.firebaseapp.com",
//   projectId: "e-mr-ed431",
//   storageBucket: "e-mr-ed431.firebasestorage.app",
//   messagingSenderId: "926471592573",
//   appId: "1:926471592573:web:09a569ef4548b5149d2f14",
//   measurementId: "G-1XS2FHK3GJ",
// };

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCbexGsqKQZLg9b8QglMF3FGdwde8UCMXs",
//   authDomain: "e-mr-ed431.firebaseapp.com",
//   projectId: "e-mr-ed431",
//   storageBucket: "e-mr-ed431.firebasestorage.app",
//   messagingSenderId: "926471592573",
//   appId: "1:926471592573:web:09a569ef4548b5149d2f14",
//   measurementId: "G-1XS2FHK3GJ"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// npm install firebase







// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbexGsqKQZLg9b8QglMF3FGdwde8UCMXs",
  authDomain: "e-mr-ed431.firebaseapp.com",
  projectId: "e-mr-ed431",
  storageBucket: "e-mr-ed431.firebasestorage.app",
  messagingSenderId: "926471592573",
  appId: "1:926471592573:web:09a569ef4548b5149d2f14",
  measurementId: "G-1XS2FHK3GJ",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Messaging
export const messaging =
  typeof window !== "undefined" ? getMessaging(app) : null;

// Request permission and get token
export async function requestNotificationPermission() {
  try {
    // Request permission
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      // Get token
      if (messaging) {
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });
        console.log(`Getting Token: ${token}`);
        return token;
      }
    }
  } catch (error) {
    console.error("Error getting notification permission:", error);
  }
  return null;
}

// Listen to incoming messages
export function onMessageListener() {
  return new Promise((resolve) => {
    if (messaging) {
      onMessage(messaging, (payload: any) => {
        resolve(payload);
      });
    }
  });
}
