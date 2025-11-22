import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import {
    getFirestore,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// This function will be called by main.js after the page is loaded
export function initializeAuth() {
    const firebaseConfig = {
        apiKey: "AIzaSyAIoh6tolkRR3QRh2j1qmUK8znWMoUhkBQ",
        authDomain: "surgealert-system.firebaseapp.com",
        databaseURL: "https://surgealert-system-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "surgealert-system",
        storageBucket: "surgealert-system.firebasestorage.app",
        messagingSenderId: "135598658205",
        appId: "1:135598658205:web:73839ede354c388a517a74",
        measurementId: "G-KX9RXEEG5T"
    };

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth(app);
    const db = getFirestore(app);

    // --- Helper Functions ---
    function showMessage(elementId, message, type) {
        const element = document.getElementById(elementId);
        element.textContent = message;
        element.className = `mb-4 p-3 rounded-lg text-sm ${type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`;
        element.style.display = 'block';

        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }

    async function handleLogout() {
        try {
            await signOut(auth);
            window.showView('home');
            alert('Logged out successfully!');
        } catch (error) {
            console.error('Logout error:', error);
            alert('Failed to logout. Please try again.');
        }
    }

    async function handlePasswordReset() {
        const email = document.getElementById('login-email').value;
        if (!email) {
            alert('Please enter your email address first.');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            alert('Password reset email sent! Check your inbox.');
        } catch (error) {
            console.error('Password reset error:', error);
            alert('Failed to send reset email. Please check your email address.');
        }
    }

    // --- Event Listeners and Observers ---
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (!userCredential.user.emailVerified) {
                showMessage('login-message', 'Please verify your email before logging in. Check your inbox.', 'error');
                await signOut(auth);
                return;
            }
            showMessage('login-message', 'Login successful! Redirecting...', 'success');
            document.getElementById('login-form').reset();
            setTimeout(() => {
                window.showView('home');
            }, 1000);
        } catch (error) {
            console.error('Login error:', error);
            let errorMessage = 'Login failed. Please check your credentials.';
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'No account found with this email.';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address.';
            } else if (error.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid email or password.';
            }
            showMessage('login-message', errorMessage, 'error');
        }
    });

    onAuthStateChanged(auth, async (user) => {
        const loginBtn = document.getElementById('login-btn');
        const logoutBtn = document.getElementById('logout-btn');
        const userName = document.getElementById('user-name');
        const mobileLoginBtn = document.getElementById('mobile-login-btn');
        const mobileLogoutBtn = document.getElementById('mobile-logout-btn');

        if (user && user.emailVerified) {
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
            userName.style.display = 'inline-block';
            userName.textContent = `Welcome, ${user.displayName || user.email}`;

            if (mobileLoginBtn) mobileLoginBtn.style.display = 'none';
            if (mobileLogoutBtn) mobileLogoutBtn.style.display = 'block';
        } else {
            loginBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
            userName.style.display = 'none';

            if (mobileLoginBtn) mobileLoginBtn.style.display = 'block';
            if (mobileLogoutBtn) mobileLogoutBtn.style.display = 'none';
        }
    });
    
    // Make functions available on the window object for HTML onclick attributes
    window.handleLogout = handleLogout;
    window.handlePasswordReset = handlePasswordReset;
}
