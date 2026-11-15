
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState(
    location.state?.mode === 'signup' ? 'signup' : 'login'
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const cleanEmail = email.trim().toLowerCase();

    if (mode === 'signup') {
      const alreadyExists = users.some(
        (user) => user.email.toLowerCase() === cleanEmail
      );

      if (alreadyExists) {
        setError('Account already exists. Please login.');
        return;
      }

      const newUser = {
        email: cleanEmail,
        password: password
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      const foundUser = users.find(
        (user) =>
          user.email.toLowerCase() === cleanEmail &&
          user.password === password
      );

      if (!foundUser) {
        setError('Invalid email or password!');
        return;
      }
    }

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', cleanEmail);
    window.dispatchEvent(new Event('authChanged'));

    const redirectPath = location.state?.from?.pathname || '/';

    navigate(redirectPath, { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h1>

        <p className="auth-subtitle">
          {mode === 'login'
            ? 'Login to continue to Fin-X'
            : 'Sign up and start managing your money'}
        </p>

        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={
              mode === 'login' ? 'current-password' : 'new-password'
            }
            minLength={6}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button className="auth-submit" type="submit">
            {mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          {mode === 'login'
            ? "Don't have an account?"
            : 'Already have an account?'}

          <button
            type="button"
            onClick={() => {
              setError('');
              setMode(mode === 'login' ? 'signup' : 'login');
            }}
          >
            {mode === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
