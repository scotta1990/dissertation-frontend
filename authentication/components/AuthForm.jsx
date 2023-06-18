import { useState } from "react";
import { View, StyleSheet } from "react-native";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";

const AuthForm = ({ isLogin, onSubmit, credentialsInvalid }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { email: emailIsValid, password: passwordIsValid } = credentialsInvalid;

  function submitHandler() {
    onSubmit(email, password);
  }

  return (
    <View>
      <FormInput
        label={"Email"}
        textInputConfig={{
          keyboardType: "email-address",
          onChangeText: setEmail,
          value: email,
        }}
        isInvalid={emailIsValid}
      />
      <FormInput
        label={"Password"}
        textInputConfig={{
          secureTextEntry: true,
          onChangeText: setPassword,
          value: password,
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
