import { Platform } from 'react-native';
import { ImagePickerResult } from 'expo-image-picker';

export function transformImageToFormData(image: ImagePickerResult): FormData | string {
  let result;
  if (Platform.OS !== 'web') {
    result = new FormData();
    let filename = image.uri.split('/').pop() as string;
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    result.append('file', { uri: image.uri, name: filename, type });
  } else {
    result = image.uri.match(/data:image\/(.*);base64(.*)/)[2];
  }

  return result;
}
