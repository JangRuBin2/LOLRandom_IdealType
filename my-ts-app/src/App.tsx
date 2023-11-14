import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import ExList from './exList';
import GetMarrige from './getMarrige';
import MainPage from './mainPage';
import Test from './test';
import WorldCup from './worldCup';
function App() {
  function goMain() {
    window.location.href = '/';
  };
  return (
    <div className='main_container'>
      <div onClick={goMain}>LoL Ideal</div>
      <h2>LoLIdeal에서 당신의 파트너를 찾아보세요!</h2>
        <div className='main_box'>
          <Router>
            <Routes>
              <Route path='/' Component={MainPage}>
              </Route>
              <Route path='/randomPick' Component={GetMarrige}>
              </Route>
              <Route path='/worldCup' Component={WorldCup}></Route>
              <Route path='/exList' Component={ExList}></Route>
              <Route path="/test/:selectedValue" Component={Test}></Route>
            </Routes>
          </Router>
        </div>
    </div>
  );
}

export default App;
