import { useState } from "react";
import { TextInput } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const FormInput = ({ label, textInputConfig, isInvalid }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={[styles.labelText, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.inputText, isFocused && styles.inputTextOnFocus]}
        {...textInputConfig}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 5,
    paddingVertical: 6,
  },
  labelText: {
    color: GlobalStyles.colors.primary2,
    fontWeight: "bold",
    marginBottom: 2,
  },
  labelInvalid: {
    color: GlobalStyles.colors.error,
  },
  inputText: {
    borderBottomColor: GlobalStyles.colors.secondary,
    borderBottomWidth: 0.2,
    minHeight: 22,
    fontSize: 16,
  },
  inputTextOnFocus: {
    borderBottomWidth: 1.2,
    fontSize: 18,
  },
});
