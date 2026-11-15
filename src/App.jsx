
import './App.css';

import { Routes, Route } from 'react-router-dom';

import Navbar from './navbar.jsx';
import Front from './front.jsx';
import Signup from './signup.jsx';
import ProtectedRoute from './Protectedroute.jsx';
import AddExpense from './AddExpense.jsx';
import Dashboard from './Dashboard.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Front />
            </>
          }
        />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/add-expense"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <AddExpense />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Dashboard />
              </>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Front />} />
      </Routes>
    </div>
  );
}

export default App;
