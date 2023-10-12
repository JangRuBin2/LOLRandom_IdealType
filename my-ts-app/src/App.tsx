import axios from 'axios';
import './App.css';
function App() {
  function findSpouse() {
    axios.get('https://ddragon.leagueoflegends.com/cdn/12.6.1/data/ko_KR/champion.json')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
  };
  return (
    <div>
    <h2>당신의 미래 배우자는?</h2>
    <button onClick={findSpouse}>지금 확인</button>
    </div>
  );
}

export default App;
