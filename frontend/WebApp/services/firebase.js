import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const config = {
  apiKey: "AIzaSyBvryg0lG5ZRHeU4ucx32Go2dD4jxWrnr4",
  authDomain: "surgealert-3be99.firebaseapp.com",
  projectId: "surgealert-3be99",
};

let auth;

export function initFirebase() {
  const app = initializeApp(config);
  auth = getAuth(app);
}

export async function loginUser(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

export function logoutUser() {
  signOut(auth);
}

export function onAuthStateChange(cb) {
  onAuthStateChanged(auth, cb);
}
