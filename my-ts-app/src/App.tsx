import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import ExList from './exList';
import GetMarrige from './getMarrige';
import MainPage from './mainPage';
import RoundSelector from './roundSelector';

function App() {
  function goMain() {
    window.location.href = '/';
  }

  return (
    <div className='main_container'>
      <div onClick={goMain}>LoL Ideal</div>
      <h2>LoLIdeal에서 당신의 파트너를 찾아보세요!</h2>
      <div className='main_box'>
        <Router>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/randomPick' element={<GetMarrige />} />
            <Route path='/exList' element={<ExList />} />
            <Route path='/round' element={<RoundSelector />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
