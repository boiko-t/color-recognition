import { Platform } from 'react-native';
import { AppConfigs } from '../AppConfigs';
import { ImagePickerResult } from 'expo-image-picker';

export const getColorsFromImage = async (
  image: ImagePickerResult
): Promise<Array<string>> => {
  let uri: string = image.uri;
  let formData: FormData = new FormData();
  let contentType: string = 'multipart/form-data';

  if (Platform.OS !== 'web') {
    let filename = uri.split('/').pop() as string;
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    formData.append('file', { uri, name: filename, type });
  } else {
    formData.append('file', uri);
    contentType = 'text';
  }

  let response: Response = await fetch(`${AppConfigs.APIAddress}/get-color`, {
    method: 'POST',
    body: formData,
    headers: { 'content-type': contentType },
    mode: 'no-cors',
  });

  return await response.json();
};
