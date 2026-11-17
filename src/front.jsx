
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Front() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  useEffect(() => {
    const updateAuth = () => {
      setLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    window.addEventListener('authChanged', updateAuth);

    return () => {
      window.removeEventListener('authChanged', updateAuth);
    };
  }, []);

  return (
    <div className="hero">
      <div className="hero-content">
        <span className="hero-tag">WELCOME TO FIN-X</span>

        <h1>
          Know Your Spending.
          <br />
          <span>Grow Your Savings.</span>
        </h1>

        <p>
          Manage your income, track your expenses and take
          control of your financial journey with Fin-X.
        </p>

        {!loggedIn && (
          <div className="hero-buttons">
            <button onClick={() => navigate('/signup')}>
              Login
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                navigate('/signup', {
                  state: { mode: 'signup' }
                })
              }
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Front;
