import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore/lite"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsVSm4m8onf9PoVLWRIT6vKvnhQficdVQ",
  authDomain: "idkh-e0303.firebaseapp.com",
  projectId: "idkh-e0303",
  storageBucket: "idkh-e0303.appspot.com",
  messagingSenderId: "131403029187",
  appId: "1:131403029187:web:beab440f459dc1c9686076"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);