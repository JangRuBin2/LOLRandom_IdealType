import { useState } from "react";
import WorldCup from './worldCup';
const RoundSelector = () : JSX.Element => {
  const [pageState, setPageState] = useState(true);
  const [selectedValue, setSelectedValue] = useState('4');
  const selectTournamentRound = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    const selected = (event.target as HTMLSelectElement).value;
    setSelectedValue(selected);
  };
  
  function worldCupStart() : void {
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
  </div>) : (<WorldCup round={selectedValue}/>)}
  </>
  )
}
export default RoundSelector;