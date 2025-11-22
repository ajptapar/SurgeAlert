import { API_BASE_URL } from './config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

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
const auth = getAuth(app);

async function syncUserWithBackend(user) {
    if (!user) return;
    try {
        const token = await user.getIdToken();
        const userData = {
            email: user.email,
            fullName: user.displayName || user.email.split('@')[0],
            role: "USER"
        };

        await fetch(`${API_BASE_URL}/auth/sync-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        });
        console.log("User synced with Backend");
    } catch (error) {
        console.error("Backend sync failed:", error);
    }
}

async function handleLogout() {
    try {
        await signOut(auth);
        if (window.showView) window.showView('home');
        alert('Logged out successfully!');
    } catch (error) {
        console.error(error);
    }
}

async function handlePasswordReset() {
    const email = document.getElementById('login-email').value;
    if (!email) {
        alert('Please enter your email in the login field first.');
        return;
    }
    try {
        await sendPasswordResetEmail(auth, email);
        alert('Reset email sent!');
    } catch (error) {
        alert('Error sending reset email.');
    }
}

export function initializeAuth() {
    window.handleLogout = handleLogout;
    window.handlePasswordReset = handlePasswordReset;

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            try {
                await signInWithEmailAndPassword(auth, email, password);
                alert('Login successful!');
                loginForm.reset();
                if (window.showView) window.showView('home');
            } catch (error) {
                alert('Login failed. Check credentials.');
            }
        });
    }

    onAuthStateChanged(auth, async (user) => {
        const loginBtn = document.getElementById('login-btn');
        const logoutBtn = document.getElementById('logout-btn');
        const userName = document.getElementById('user-name');
        const mobileLoginBtn = document.getElementById('mobile-login-btn');
        const mobileLogoutBtn = document.getElementById('mobile-logout-btn');

        if (user) {
            if(loginBtn) loginBtn.style.display = 'none';
            if(logoutBtn) logoutBtn.style.display = 'inline-block';
            if(userName) {
                userName.style.display = 'inline-block';
                userName.textContent = `Welcome, ${user.email}`;
            }
            if (mobileLoginBtn) mobileLoginBtn.style.display = 'none';
            if (mobileLogoutBtn) mobileLogoutBtn.style.display = 'block';
            
            // SYNC USER
            await syncUserWithBackend(user);
        } else {
            if(loginBtn) loginBtn.style.display = 'inline-block';
            if(logoutBtn) logoutBtn.style.display = 'none';
            if(userName) userName.style.display = 'none';
            if (mobileLoginBtn) mobileLoginBtn.style.display = 'block';
            if (mobileLogoutBtn) mobileLogoutBtn.style.display = 'none';
        }
    });
}