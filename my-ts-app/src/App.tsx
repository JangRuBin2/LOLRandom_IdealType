import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import GetMarrige from './getMarrige';
function App() {
  return (
    <div className='main_container'>
      <h2>LoLIdeal에서 당신의 파트너를 찾아보세요!</h2>
        <div className='main_box'>
          <Router>
            <Routes>
              <Route path='/' Component={GetMarrige}>
              </Route>
              <Route path='/test' Component={GetMarrige}></Route>
            </Routes>
          </Router>
        </div>
    </div>
  );
}

export default App;
