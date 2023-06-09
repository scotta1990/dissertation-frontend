import { createUser } from "../../utils/auth";
import AuthContent from "../components/AuthContent";

const Signup = () => {
  return (
    <AuthContent isLogin={false} onAuthenticate={(user) => createUser(user)} />
  );
};

export default Signup;
