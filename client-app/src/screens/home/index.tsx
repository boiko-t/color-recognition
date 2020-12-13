import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, Layout, StyleService, useTheme } from '@ui-kitten/components';
import { imagePickerPermissionRequest } from '../../components/image-picker.helper';
import { getColorsFromImage, getProductsByColor } from './../../services/APIProvider';
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
              onPress={async () => {navigation.navigate('Products', { 
                data: await getProductsByColor(color),
                title: 'Search result',
              })}}
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
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  colorBlock: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,  
    elevation: 5,
  },
});
