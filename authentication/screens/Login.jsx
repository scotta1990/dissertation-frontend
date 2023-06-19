import { login } from "../../utils/auth";
import { Alert } from "react-native";
import AuthContent from "../components/AuthContent";
import { useDispatch } from "react-redux";
import { authenticate } from "../../store/redux/auth";
import { useState } from "react";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import ErrorOverlay from "../../components/UI/ErrorOverlay";

const Login = () => {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  async function loginHandler(email, password) {
    try {
      setIsFetching(true);
      const response = await login(email, password);
      console.log(response.data.token);
      dispatch(authenticate(response.data));
    } catch (error) {
      console.log(error);
      if (error.response) {
        throw new Error(`${error.response.data}`);
      }
      setError("Could not connect for login... try again later.");
    }
    setIsFetching(false);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} returnTo={"Login"} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return <AuthContent isLogin={true} onAuthenticate={loginHandler} />;
};

export default Login;
