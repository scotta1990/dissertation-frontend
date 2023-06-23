import { login } from "../../utils/auth";
import AuthContent from "../components/AuthContent";
import { useDispatch } from "react-redux";
import { authenticate } from "../../store/redux/auth";
import { useState } from "react";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import { useToast } from "react-native-toast-notifications";

const Login = () => {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const toast = useToast();

  async function loginHandler(email, password) {
    try {
      setIsFetching(true);
      const response = await login(email, password);
      dispatch(authenticate(response.data));
    } catch (error) {
      if (error.response) {
        toast.show(error.response.data + ", please try again.", {
          type: "warning",
          placement: "center",
          animationType: "zoom-in",
          animationDuration: 300,
          duration: 7000,
        });
      } else {
        setError("Could not connect for login... try again later.");
      }
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
