import { authenticate } from "../../store/redux/auth";
import { createUser } from "../../utils/auth";
import AuthContent from "../components/AuthContent";
import { useDispatch } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();

  async function signUpHandler(email, password) {
    try {
      const response = await createUser(email, password);
      console.log(response.data.token);
      dispatch(authenticate(response.data));
    } catch (error) {
      console.log(error);
      throw new Error(`${error.response.data}`);
    }
  }

  return <AuthContent isLogin={false} onAuthenticate={signUpHandler} />;
};

export default Signup;
