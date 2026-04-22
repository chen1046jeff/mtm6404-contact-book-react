import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDatdoXvM3C_ZkBzjUzyLOT0UpAQ0nVpSM",
  authDomain: "mtm6404-contact-book-rea-3b8b5.firebaseapp.com",
  projectId: "mtm6404-contact-book-rea-3b8b5",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);