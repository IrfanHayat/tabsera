import SignIn from "./SignIn";

export const setLoginModalShow = (props) => {
  console.log("PROPS", props);
  return <SignIn showModal={props} />;
};
