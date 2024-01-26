import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDdBHOyGq9vYNMPLoBFbtMlsLBh5opkyCI",
  authDomain: "netbuys-9eaa5.firebaseapp.com",
  projectId: "netbuys-9eaa5",
  storageBucket: "netbuys-9eaa5.appspot.com",
  messagingSenderId: "236287921921",
  appId: "1:236287921921:web:298db3d7e3eb5778f11500",
  databaseURL: "https://netbuys-9eaa5-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app); // Use getDatabase for the firestore
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth };
export { database, provider, storage };
export default app;
