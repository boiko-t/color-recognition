import { Platform } from 'react-native';
import { AppConfigs } from '../AppConfigs';
import { ImagePickerResult } from 'expo-image-picker';

export const getColorsFromImage = async (image): Promise<Array<string>> => {
  let result;
  let contentType: string = 'multipart/form-data';
  let uri = image.uri;

  if (Platform.OS !== 'web') {
    result = new FormData();
    let filename = uri.split('/').pop() as string;
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    result.append('file', { uri, name: filename, type });
    console.log(filename);
    console.log(filename);
  } else {
    result = new FormData();
    result.append('file', { uri, name: 'image.jpeg', type: 'image/jpeg' });
    // contentType = 'application/json';
  }

  try {
    let response: Response = await fetch(`${AppConfigs.APIAddressLocal}/get-color`, {
      method: 'POST',
      body: result,
      headers: { 'content-type': contentType },
      mode: 'no-cors',
    });
    let json = await response.json();
    return json.colors;
  } catch (e) {
    console.warn(e);
    return [];
  }
};
