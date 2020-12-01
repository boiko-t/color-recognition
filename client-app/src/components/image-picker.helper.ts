import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const imagePickerPermissionRequest = async () => {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    console.log(status);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }
};
