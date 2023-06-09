import { useContext } from "react";
import { login } from "../../utils/auth";
import { AuthContext } from "../../store/auth-context";
import { Alert } from "react-native";
import AuthContent from "../components/AuthContent";

const Login = () => {
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials and try again later."
      );
    }
  }

  return <AuthContent isLogin={true} onAuthenticate={loginHandler} />;
};

export default Login;
