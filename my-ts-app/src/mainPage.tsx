import { Link } from "react-router-dom";
// css
const content_btn_style : React.CSSProperties= {
  display : "flex", flexDirection : "row", justifyContent : "space-between", alignItems : "center", backgroundColor : '#D9D9D9', width : '300px', height : '130px'
}
const MainPage = () : JSX.Element => {
  return (<div style={content_btn_style}>
    <div>
    <Link to='/randomPick'>랜덤뽑기</Link>
    </div>
    <div>
    <Link to='/worldCup'>이상형 월드컵</Link>
    </div>
    <div>
    <Link to='/exList'>전여친 목록</Link>
    </div>
  </div>)
};
export default MainPage;