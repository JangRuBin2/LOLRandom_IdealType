import React from "react";

type TestProps = {
  props: string;
};
const Test : React.FC<TestProps> = ({props}) : JSX.Element => {
  return (<>테스트
  <p>{props}</p>
  </>)
}
export default Test;