// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFigkRE4cPv99RIr-gTCAQqKgEYXT0334",
  authDomain: "medislot-dhilip.firebaseapp.com",
  projectId: "medislot-dhilip",
  storageBucket: "medislot-dhilip.firebasestorage.app",
  messagingSenderId: "694504699637",
  appId: "1:694504699637:web:b6d425c2a6c474899877bc",
  measurementId: "G-8ZYR55S3LN"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
