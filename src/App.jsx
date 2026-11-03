  import Navbar from './navbar.jsx';
  import './App.css';
  import Front from './front.jsx';
  import AddExpense from './AddExpense.jsx';
  import { Routes,Route } from 'react-router-dom';
  import Dashboard from './Dashboard.jsx';
  import TempDetail from './TempDetail.jsx';
import ReadBlog from './Read-Blog.jsx';


  
  function App() {
    return (
      <div className="App">
        <Navbar/>



        <Routes>

          <Route path="/" element={<Front/>} />
          <Route path="/add-expense" element={<AddExpense/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/read-blog" element={<ReadBlog/>} />
      <Route path="/tempdetail" element={<TempDetail/>} />    
        </Routes>
      </div>



      
    ) ;
  }

  export default App