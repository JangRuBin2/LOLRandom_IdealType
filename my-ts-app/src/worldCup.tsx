import { useState } from "react";
import Test from './test';
const WorldCup = () : JSX.Element => {
  const [pageState, setPageState] = useState(true);
  const [selectedValue, setSelectedValue] = useState('4');
  const selectTournamentRound = (event : any) => {
    const selected = event.target.value;
    // 선택한 값에 대한 추가적인 동작 수행 가능
    console.log("선택한 값:", selected);
    setSelectedValue(selected);
  };
  function worldCupStart() {
    console.log(selectedValue, '다음 페이지로 들고갈 데이터');
    setPageState(!pageState);
  }
  return (
    <>
    {pageState ? (<div>
    <label htmlFor='tournament'>토너먼트 선택: </label>
      <select name="tournament" id="tournament" onChange={selectTournamentRound} value={selectedValue}>
        <option value='4'>4강</option>
        <option value='8'>8강</option>
        <option value='16'>16강</option>
        <option value='32'>32강</option>
        <option value='64'>64강</option>
      </select>
      <button onClick={worldCupStart}>선택</button>
  </div>) : (<Test props={selectedValue}/>)}
  </>
  )
}
export default WorldCup;