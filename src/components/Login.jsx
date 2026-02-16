import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
            sessionStorage.setItem('isAdminAuthenticated', 'true');
            navigate('/admin');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <section className="login-section section-padding">
            <div className="container">
                <div className="login-card glass mx-auto" style={{ maxWidth: '400px', padding: '40px', borderRadius: '8px' }}>
                    <h2 className="section-title text-center" style={{ marginBottom: '30px' }}>Admin <span className="heading-gold">Login</span></h2>

                    {error && (
                        <div className="error-message" style={{ color: '#ff4d4d', textAlign: 'center', marginBottom: '20px', fontSize: '0.9rem' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={credentials.username}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: '30px' }}>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
