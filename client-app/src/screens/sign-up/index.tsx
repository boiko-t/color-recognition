import React, {useState} from 'react';
import { View } from 'react-native';
import { Button, Input, Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import { ImageOverlay } from '../../components/image-overlay.component';
import { KeyboardAvoidingView } from '../../components/KeyboardAvoidingView';
import { EmailIcon, LockIcon, PersonIcon } from '../../components/icons';
import { AuthService } from '../../services/AuthService';

export default ({ navigation }): React.ReactElement => {
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = async () => {
    try {
      await AuthService.signUp(userName, email, password);
      navigation.navigate('Home');
    } catch(e) {
      setErrorMessage(e.message);
    }
  };

  const onSignInButtonPress = (): void => {
    navigation && navigation.navigate('SignIn');
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <KeyboardAvoidingView>
      <ImageOverlay
        style={styles.container}
        source={require('../../assets/images/auth.jpg')}>
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
            Create new account
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
            autoCapitalize='none'
            placeholder='User Name'
            accessoryRight={PersonIcon}
            value={userName}
            onChangeText={setUserName}
          />
          <Input
            style={styles.formInput}
            status='control'
            autoCapitalize='none'
            placeholder='Email'
            accessoryRight={EmailIcon}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.formInput}
            status='control'
            autoCapitalize='none'
            secureTextEntry={!passwordVisible}
            placeholder='Password'
            accessoryRight={LockIcon}
            value={password}
            onChangeText={setPassword}
            onIconPress={onPasswordIconPress}
          />
        </View>
        <Button
          style={styles.signUpButton}
          size='giant'
          status='info'
          onPress={onSignUpButtonPress}>
          SIGN UP
        </Button>
        <Button
          style={styles.signInButton}
          appearance='ghost'
          status='control'
          onPress={onSignInButtonPress}>
          Already have an account? Sign In
        </Button>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
  },
  signInLabel: {
    marginTop: 16,
  },
  profileAvatar: {
    width: 116,
    height: 116,
    borderRadius: 58,
    alignSelf: 'center',
    backgroundColor: 'background-basic-color-1',
    tintColor: 'text-hint-color',
  },
  editAvatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  formInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 24,
  },
  termsCheckBoxText: {
    color: 'text-control-color',
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});

