import { initializeApp } from "firebase/app";
import dotenv from 'dotenv';
import { auth } from './database.js'
import { getAuth, signInWithCustomToken } from 'firebase/auth';


dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

const app = initializeApp(firebaseConfig);
const authtentication = getAuth();

async function signInWithToken(customToken) {
  try {
    const userCredential = await signInWithCustomToken(authtentication, customToken);
    const idToken = await userCredential.user.getIdToken();
    console.log("Authenticated! ID Token:", idToken);
    return idToken;
  } catch (err) {
    console.error("Error signing in:", err.message);
    throw err
  }
}

export async function verifyToken(req, reply) {
  try {
    let token = req.headers.token;
    token = await signInWithToken(token);
    if (!token) {
      return reply.status(401).send({ error: 'Unauthorized' });
    }
    const decoded = await auth.verifyIdToken(token);
    req.user = decoded;
  } catch (err) {
    throw err
  }
}