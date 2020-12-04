import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { imagePickerPermissionRequest } from '../../components/image-picker.helper';
import { getColorsFromImage } from './../../services/APIProvider';
import {
  Button,
  Layout,
  Text,
  StyleService,
  useTheme,
} from '@ui-kitten/components';
import { PlusCircleIcon } from '../../components/icons';
import TopNavigationMain from '../../menus/top-menu-main.component';

export default ({ navigation }): React.ReactElement => {
  const theme = useTheme();
  const [imageUrl, setImageUrl] = useState<null | string>(null);
  const [selectedColors, setSelectedColors] = useState<Array<string>>([]);

  useEffect(() => {
    imagePickerPermissionRequest();
  }, []);

  const launchImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setImageUrl(result.uri);
      setSelectedColors([]);
      let colors = await getColorsFromImage(result);
      setSelectedColors(colors);
    }
  };

  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigationMain navigation={navigation} />
      <Layout style={styles.iconContainer}>
        <Layout>
          {imageUrl ? (
            <Image style={styles.image} source={{ uri: imageUrl }} />
          ) : (
            <PlusCircleIcon
              style={styles.icon}
              fill={theme['color-primary-400']}
            />
          )}
          <Button
            status='success'
            appearance='outline'
            style={styles.button}
            onPress={launchImagePicker}
          >
            {imageUrl ? 'Change image' : 'Select image'}
          </Button>
        </Layout>
        <Layout style={styles.buttonContainer}>
          {selectedColors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={{ ...styles.colorBlock, backgroundColor: color }}
            ></TouchableOpacity>
          ))}
        </Layout>
      </Layout>
    </Layout>
  );
};

const styles = StyleService.create({
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 160,
    height: 160,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  button: {
    marginTop: 8,
    marginBottom: 5,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
  colorBlock: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});
