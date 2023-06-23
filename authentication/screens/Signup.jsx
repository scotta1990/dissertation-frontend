import { useToast } from "react-native-toast-notifications";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { authenticate } from "../../store/redux/auth";
import { createUser } from "../../utils/auth";
import AuthContent from "../components/AuthContent";
import { useDispatch } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const toast = useToast();

  async function signUpHandler(email, password) {
    try {
      setIsFetching(true);
      const response = await createUser(email, password);
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
        setError("Could not connect for sign up... try again later.");
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

  return <AuthContent isLogin={false} onAuthenticate={signUpHandler} />;
};

export default Signup;
