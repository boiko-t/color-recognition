import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';
import { LockIcon, PersonIcon, ArrowIosBackIcon } from '../../components/icons';
import { ImageOverlay } from '../../components/image-overlay.component';
import { KeyboardAvoidingView } from '../../components/KeyboardAvoidingView';
import { AuthService } from '../../services/AuthService';

export default ({ navigation }): React.ReactElement => {

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSignInButtonPress = async () => {
    try {
      await AuthService.signIn(email, password);
      navigation && navigation.goBack();
    } catch(e) {
      setErrorMessage(e.message);
    }
  };

  const onSignUpButtonPress = (): void => {
    navigation && navigation.navigate('SignUp');
  };

  return (
    <KeyboardAvoidingView>
      <ImageOverlay
        style={styles.container}
        source={require('../../assets/images/auth.jpg')}>
        <TouchableOpacity style={styles.iconBack} onPress={() => navigation.goBack()}>
          <ArrowIosBackIcon fill="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text
            category='h1'
            status='control'>
            Hello
          </Text>
          <Text
            style={styles.signInLabel}
            category='s1'
            status='control'>
            Sign in to your account
          </Text>
          <Text
            style={styles.signInLabel}
            category='h6'
            status='danger'>
            {errorMessage}
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Input
            status='control'
            placeholder='Email'
            accessoryRight={PersonIcon}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.passwordInput}
            status='control'
            placeholder='Password'
            accessoryRight={LockIcon}
            value={password}
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
          />
        </View>
        <Button
          style={styles.signInButton}
          status='control'
          size='giant'
          onPress={onSignInButtonPress}>
          SIGN IN
        </Button>
        <Button
          style={styles.signUpButton}
          appearance='ghost'
          status='control'
          onPress={onSignUpButtonPress}>
          Don't have an account? Sign Up
        </Button>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconBack: {
    width: 32,
    height: 32,
    marginLeft: 16,
    marginTop: 16,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
  },
  formContainer: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});

