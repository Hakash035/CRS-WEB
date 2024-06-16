import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore/lite"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // Firebase Config Here
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);
