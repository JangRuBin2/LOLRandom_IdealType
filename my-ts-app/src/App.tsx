import './App.css';
import GetMarrige from './getMarrige';
import YourPartner from './yourPartner';
function App() {
  return (
    <div>
      <h2>당신의 미래 배우자는?</h2>
      {/* 결혼 상대 찾기 */}
      <GetMarrige />
      {/* 결혼 선택 */}
      <YourPartner />
    </div>
  );
}

export default App;
