import { Link } from "react-router-dom";
const MainPage = () : JSX.Element => {
  return (<div style={{
    display : "flex", flexDirection : "row", justifyContent : "space-between", alignItems : "center"
  }}>
    <Link to='/randomPick'>
    <div>랜덤 뽑기</div>
    </Link>
    <Link to='/worldCup'>
    <div>이상형 월드컵</div>
    </Link>
    <Link to='exList'>
    <div>전여친 목록</div>
    </Link>
  </div>)
};
export default MainPage;