import { useNavigate } from 'react-router-dom';








function Front() {



  const navigate = useNavigate();
  return (
    <div className="hero-container">
      {/* Left Side Section */}
      <div className="hero-content">
        <h2>
          Know your spending Grow your <span className="green">Savings.</span>
        </h2>
        <h5>
          The fastest, smartest expense tracker for India. Add an expense in under 5 seconds — with budgets, recurring bills, analytics and smart insights.
        </h5>

        <div className="butn">
          <button type="button" className="btn1" onClick={() => navigate('/tempdetail')}>
            Login <span>→</span>
          </button>
          <button type="button" onClick={() => navigate('/read-blog')} className="btn2">
            Read the blog
          </button>
        </div>
      </div>

      {/* Right Side Section */}
      <div className="illustration">
        <img src="/illustration.png" alt="illustration" />
      </div>
    </div>
  );
}

export default Front;