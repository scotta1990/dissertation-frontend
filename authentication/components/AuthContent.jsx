import { Alert, KeyboardAvoidingView, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AuthForm from "./AuthForm";
import { GlobalStyles } from "../../constants/styles";
import FormButton from "./FormButton";

const AuthContent = ({ isLogin, onAuthenticate }) => {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
  });
  const navigation = useNavigation();

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  }

  async function submitHandler(email, password) {
    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;

    if (!emailIsValid || !passwordIsValid) {
      Alert.alert("Invalid Input", "Please check the credentials you entered");
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
      });
      return;
    }

    await onAuthenticate(email, password);
  }

  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      <Text style={styles.title}>{isLogin ? "Login" : "Sign Up"}</Text>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <FormButton
        flat={true}
        style={styles.button}
        onPress={switchAuthModeHandler}
      >
        Press here to {isLogin ? "sign up" : "login"}
      </FormButton>
    </KeyboardAvoidingView>
  );
};

export default AuthContent;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: "30%",
    marginHorizontal: 35,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 6,
    color: GlobalStyles.colors.primary,
  },
});
