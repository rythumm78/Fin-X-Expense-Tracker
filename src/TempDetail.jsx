
import { useState } from 'react';

function Detail() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    alert('Login form submitted with email: ' + email);
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">

          

          <form onSubmit={handleSubmit} className="expense-form">

<h2>Login Page</h2>

            <div className="input-group mb-4">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group mb-4">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-solid theme-primary">
              Login
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Detail;
