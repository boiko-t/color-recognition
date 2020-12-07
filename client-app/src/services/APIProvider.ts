import { Platform } from 'react-native';
import { AppConfigs } from '../AppConfigs';
import { ImagePickerResult } from 'expo-image-picker';

export const getColorsFromImage = async (image): Promise<Array<string>> => {
  let result;
  let contentType: string = 'multipart/form-data';

  if (Platform.OS !== 'web') {
    result = new FormData();
    let filename = image.uri.split('/').pop() as string;
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    result.append('file', { uri: image.uri, name: filename, type });
    console.log(filename);
    console.log(filename);
  } else {
    contentType = 'text';
    // let [_, fileType, uri] = image.uri.match(/data:image\/(.*);base64(.*)/);
    result = image.uri.match(/data:image\/(.*);base64(.*)/)[2];
    // result = new FormData();
    // result.append('file', {
    //   uri: image.uri,
    //   name: `image.${fileType}`,
    //   type: `image/${fileType}`,
    // });
  }

  try {
    let response: Response = await fetch(
      `${AppConfigs.APIAddressLocal}/get-color`,
      {
        method: 'POST',
        body: result,
        headers: { 'Content-Type': contentType },
        // mode: 'no-cors',
      },
    );
    let json = await response.json();
    return json.colors;
  } catch (e) {
    console.warn(e);
    return [];
  }
};
