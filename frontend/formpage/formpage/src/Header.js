import { useState } from "react";
import Child from "./Child";

const Header = () => {
  const [count, setCount] = useState(0);

  const incrementCounter = () => {
    setCount(count + 1);
  };

  const getChildValue = (value) => {
    setCount(count * 100);
  };

  return (
    <>
      <h1>{count}</h1>
      <input type="button" value="increment" onClick={incrementCounter} />
      <hr />
      <Child parentVal={count} childToParent={getChildValue} />
    </>
  );
};

export default Header;
