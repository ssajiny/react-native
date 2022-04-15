import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";
import axios from "axios";
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  StyledButton,
  ButtonText,
  Colors,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from "./../components/styles";
import { View, ActivityIndicator } from "react-native";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

const { brand, darkLight, primary } = Colors;

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const handleLogin = (credentials, setSubmitting) => {
      handleMessage(null);
    const url = "http://192.168.56.1:8080/api/export/login";
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        // 사진 참고
        const { message, status, data } = result;

        if (status !== "SUCCESS") {
          handleMessage(message, status);
        } else {
          navigation.navigate("Main", { ...data[0] });
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error.JSON());
        setSubmitting(false);
        handleMessage("네트워크에 연결되어 있지 않습니다. 인터넷 연결을 확인하세요.");
      });
  };

  const handleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo
            resizeMode="cover"
            source={require("./../assets/login.png")}
          />
          <PageTitle>로그인</PageTitle>
          <SubTitle>포스코ICT</SubTitle>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, {setSubmitting}) => {
                if(values.email == '' || values.password == ''){
                    handleMessage('아이디, 비밀번호를 입력하세요.');
                    setSubmitting(false);
                }else{
                    handleLogin(values, setSubmitting);
                }
              console.log(values);
            //   navigation.navigate("Main");
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
            }) => (
              <StyledFormArea>
                <MyTextInput
                  label="ID"
                  icon="person"
                  placeholder="ssajiny@naver.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}>{message}</MsgBox>
                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Login</ButtonText>
                  </StyledButton>
                )}
                {isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ActivityIndicator size="large" color={primary}/>
                  </StyledButton>
                )}
                <Line />
                <StyledButton onPress={handleSubmit}>
                  <Fontisto name="google" color={primary} size={25} />
                  <ButtonText name="google" color={primary} size={25}>
                    Sign in with Google
                  </ButtonText>
                </StyledButton>
                <ExtraView>
                  <ExtraText>Don't have an account already?</ExtraText>
                  <TextLink>
                    <TextLinkContent>SignUp</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
