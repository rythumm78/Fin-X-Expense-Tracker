import{ useState } from "react";




function ReadBlog() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const blogs = [
    {
      id: 1,
      icon: "💰",
      category: "Saving Tips",
      time: "5 min read",
      title: "5 Simple Ways to Save Money Every Month",
      description:
        "Small changes in your daily habits can help you save more money.",
      content: `Saving money does not always require a high income. It starts with small and smart decisions.

1. Create a monthly budget.
2. Track your daily expenses.
3. Avoid unnecessary shopping.
4. Set a monthly savings goal.
5. Keep some money aside for emergencies.

Remember, consistency is more important than saving a large amount once.`,
    },
    {
      id: 2,
      icon: "📊",
      category: "Budgeting",
      time: "4 min read",
      title: "How to Create a Monthly Budget",
      description:
        "Learn how to manage your income and divide your money wisely.",
      content: `A monthly budget helps you understand how much money you earn and spend.

Start by calculating your monthly income. Then divide your money into three categories:

1. Needs – Rent, groceries and bills.
2. Wants – Shopping, entertainment and eating out.
3. Savings – Money kept for future goals.

Review your budget regularly and adjust it according to your needs.`,
    },
    {
      id: 3,
      icon: "🧾",
      category: "Expense Management",
      time: "6 min read",
      title: "Why Tracking Your Expenses Matters",
      description:
        "Understand where your money goes and take control of your spending.",
      content: `Tracking expenses is one of the easiest ways to improve money management.

When you record every transaction, you can:

1. Identify unnecessary spending.
2. Understand your biggest expense categories.
3. Compare monthly spending.
4. Manage your savings goals.
5. Make better financial decisions.

Fin X helps you record your income and expenses in one place.`,
    },
    {
      id: 4,
      icon: "🏦",
      category: "Financial Planning",
      time: "5 min read",
      title: "Emergency Fund: A Beginner's Guide",
      description:
        "Understand why keeping money aside for unexpected expenses is important.",
      content: `An emergency fund is money saved for unexpected situations.

It can help you manage unexpected expenses without disturbing your regular budget.

Here are some simple steps:

1. Start with a small savings target.
2. Save a fixed amount regularly.
3. Keep emergency savings separate.
4. Avoid using this money for regular shopping.
5. Review your savings from time to time.

Building an emergency fund takes time, so start with what you can manage.`,
    },
  ];

  const activeBlog = blogs.find(
    (blog) => blog.id === selectedBlog
  );

  return (
    <div
      className="container-fluid py-5 px-4 min-vh-100"
      style={{
        backgroundColor: "#0b1120",
        color: "#ffffff",
      }}
    >
      <div className="container">

        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5">
            Financial Knowledge Hub
          </h1>

          <p
            className="mt-3"
            style={{ color: "#94a3b8", fontSize: "17px" }}
          >
            Learn smart money habits, manage expenses
            and grow your savings with Fin X.
          </p>
        </div>

        {/* Full Article */}
        {activeBlog && (
          <div
            className="card border-0 rounded-4 p-4 p-md-5 mb-5 text-white"
            style={{ backgroundColor: "#1e293b" }}
          >
            <button
              className="btn btn-outline-info align-self-start mb-4"
              onClick={() => setSelectedBlog(null)}
            >
              ← Back to Blogs
            </button>

            <div style={{ fontSize: "55px" }}>
              {activeBlog.icon}
            </div>

            <span className="text-info mt-3">
              {activeBlog.category} · {activeBlog.time}
            </span>

            <h2 className="fw-bold mt-3">
              {activeBlog.title}
            </h2>

            <p
              className="mt-3"
              style={{
                color: "#cbd5e1",
                whiteSpace: "pre-line",
                lineHeight: "2",
                fontSize: "16px",
              }}
            >
              {activeBlog.content}
            </p>

            <p className="text-success fw-bold mt-3">
              Smart Money Habits Start with Fin X.
            </p>
          </div>
        )}

        {/* Blog Cards */}
        {!activeBlog && (
          <>
            <div className="row g-4">
              {blogs.map((blog) => (
                <div
                  className="col-12 col-md-6 col-lg-3"
                  key={blog.id}
                >
                  <div
                    className="card h-100 border-0 rounded-4 p-3 text-white"
                    style={{
                      backgroundColor: "#1e293b",
                      transition: "transform 0.2s",
                    }}
                  >
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center mb-3"
                      style={{
                        height: "150px",
                        backgroundColor: "#26364d",
                        fontSize: "65px",
                      }}
                    >
                      {blog.icon}
                    </div>

                    <span className="text-info small">
                      {blog.category}
                    </span>

                    <h5 className="fw-bold mt-2">
                      {blog.title}
                    </h5>

                    <p
                      className="small flex-grow-1"
                      style={{ color: "#94a3b8" }}
                    >
                      {blog.description}
                    </p>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <small style={{ color: "#94a3b8" }}>
                        {blog.time}
                      </small>

                      <button
                        className="btn btn-success btn-sm rounded-pill px-3"
                        onClick={() =>
                          setSelectedBlog(blog.id)
                        }
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Section */}
            <div
              className="text-center rounded-4 p-4 p-md-5 mt-5"
              style={{ backgroundColor: "#1e293b" }}
            >
              <h3 className="fw-bold">
                Make Your Money Work Smarter!
              </h3>

              <p style={{ color: "#94a3b8" }}>
                Track your expenses, understand your spending
                and build better financial habits with Fin X.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ReadBlog;
