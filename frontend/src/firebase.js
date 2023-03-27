import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCrMz8AHpJFYkqU16jqhmRPbvF3z56ZyjE",
    authDomain: "respawn-2f8ea.firebaseapp.com",
    projectId: "respawn-2f8ea",
    storageBucket: "respawn-2f8ea.appspot.com",
    messagingSenderId: "959427699506",
    appId: "1:959427699506:web:bd8a270a1754c09f30ed2b",
    measurementId: "G-047ENKDP0D"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);