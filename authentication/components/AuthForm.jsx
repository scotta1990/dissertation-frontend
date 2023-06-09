import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import { GlobalStyles } from "../../constants/styles";

const userObject = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const AuthForm = ({ isLogin, onSubmit, credentialsInvalid }) => {
  const [user, setUser] = useState(userObject);

  const {
    firstName: firstNameIsValid,
    email: emailIsValid,
    password: passwordIsValid,
  } = credentialsInvalid;

  const formName = isLogin ? "Login" : "Sign up";

  function submitHandler() {
    onSubmit(user);
  }

  return (
    <View>
      {!isLogin && (
        <FormInput
          label={"First Name"}
          textInputConfig={{
            onChangeText: (value) => setUser({ ...user, firstName: value }),
            value: user.firstName,
          }}
          isInvalid={firstNameIsValid}
        />
      )}
      {!isLogin && (
        <FormInput
          label={"Last Name"}
          textInputConfig={{
            keyboardType: "email-address",
            onChangeText: (value) => setUser({ ...user, lastName: value }),
            value: user.lastName,
          }}
        />
      )}

      <FormInput
        label={"Email"}
        textInputConfig={{
          keyboardType: "email-address",
          onChangeText: (value) => setUser({ ...user, email: value }),
          value: user.email,
        }}
        isInvalid={emailIsValid}
      />
      <FormInput
        label={"Password"}
        textInputConfig={{
          secureTextEntry: true,
          onChangeText: (value) => setUser({ ...user, password: value }),
          value: user.password,
        }}
        isInvalid={passwordIsValid}
      />
      <View style={styles.buttonContainer}>
        <FormButton onPress={submitHandler}>
          {isLogin ? "LOGIN" : "SIGN UP"}
        </FormButton>
      </View>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 8,
  },
});
