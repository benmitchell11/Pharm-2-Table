import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../server/firebase'; 
import { Redirect } from 'react-router-dom';
import Navbar from './NavBar.jsx';
import '../../server/public/style/signin.scss';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in:', userCredential.user);

            
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <div className="modal">
                <div className="content">
                    <h2>Sign In</h2>
                    <form onSubmit={handleSignIn}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">Sign In</button>
                    </form>
                    {error && <div>{error}</div>}
                </div>
            </div>
        </div>
    );
};

export default SignIn;

