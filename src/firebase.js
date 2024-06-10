// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtPStaUqpldFgEyoTecsHZ5t3ElyJ2DD0",
  authDomain: "brokerage-house.firebaseapp.com",
  projectId: "brokerage-house",
  storageBucket: "brokerage-house.appspot.com",
  messagingSenderId: "638417885250",
  appId: "1:638417885250:web:2300f5e76c7ac7fb0e35db",
  measurementId: "G-G7N280SBMD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
