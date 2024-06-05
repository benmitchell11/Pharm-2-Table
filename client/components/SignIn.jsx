import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../../server/firebase';
import { ref, get } from 'firebase/database';
import Navbar from './NavBar.jsx';
import '../../server/public/style/signin.scss';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPendingMessage, setShowPendingMessage] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!email || !password) {
            setError("Please enter both email and password.");
            setLoading(false);
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in:', userCredential.user);

            const userRef = ref(database, 'applications/' + userCredential.user.uid);
            const snapshot = await get(userRef);
            const applicationData = snapshot.val();
            console.log('Application Data:', applicationData);

            if (applicationData && applicationData.status === "Pending") {
                console.log('Application is still pending.');
                setShowPendingMessage(true);
                await auth.signOut(); // Sign out the user if their application is still pending
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Error during sign in:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleClosePopup = () => {
        setShowPendingMessage(false);
    };

    return (
        <div>
            <Navbar />
            <div className="modal">
                <div className="content">
                    <h2>Sign In</h2>
                    <form onSubmit={handleSignIn}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" disabled={loading}>Sign In</button>
                    </form>
                    {error && <div className="error-message">{error}</div>}
                </div>
            </div>
            {showPendingMessage && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Application Pending</h3>
                        <p>Your application is still pending. You cannot sign in until it is approved.</p>
                        <button onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignIn;
