const Child = (props, childToParent) => {
  console.log("-----------", props);

  const setValue = () => {
    childToParent(10);
  };
  return (
    <>
      <h1>{props.parentVal * 10}</h1>
      <input type="button" value="set" onClick={setValue} />
    </>
  );
};

export default Child;
