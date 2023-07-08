import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBnNZ_jtB6ouqq45Y8FMqlYDPwbvWmtSMM",
    authDomain: "chit-chat-d32cf.firebaseapp.com",
    projectId: "chit-chat-d32cf",
    storageBucket: "chit-chat-d32cf.appspot.com",
    messagingSenderId: "1096969066856",
    appId: "1:1096969066856:web:b07b743fce09fbe7475edd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
