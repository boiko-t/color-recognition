import * as firebase from 'firebase';
import { Platform } from 'react-native';
import { FirebaseConfigAndroid, FirebaseConfigWeb } from '../AppConfigs';
import {AuthService} from './AuthService';

export const credentials =
  Platform.OS === 'web' ? FirebaseConfigWeb : FirebaseConfigAndroid;

export const initFirebaseApp = async () => {
  await firebase.initializeApp(credentials);
  AuthService.init();
};

export const getFirebaseApp = () => {
  return firebase.app('APP');
};
