
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  useEffect(() => {
    const updateAuth = () => {
      setLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    window.addEventListener('storage', updateAuth);
    window.addEventListener('authChanged', updateAuth);

    return () => {
      window.removeEventListener('storage', updateAuth);
      window.removeEventListener('authChanged', updateAuth);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');

    setLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        FIN<span>-X</span>
      </Link>

      <div className="nav-links">
        <Link to="/add-expense">Add Expense</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>

      <div className="nav-actions">
        {loggedIn ? (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        ) : (
          <>
            <button onClick={() => navigate('/signup')}>
              Login
            </button>

            <button
              className="nav-signup"
              onClick={() => navigate('/signup', {
                state: { mode: 'signup' }
              })}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
