import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { imagePickerPermissionRequest } from '../../components/image-picker.helper';
import { Button, Layout, StyleService, useTheme } from '@ui-kitten/components';
import { PlusCircleIcon } from '../../components/icons';
import TopNavigationMain from '../../menus/top-menu-main.component';

export default ({ navigation }): React.ReactElement => {
  const theme = useTheme();
  const [imageUrl, setImageUrl] = useState<null | string>(null);

  useEffect(() => {
    imagePickerPermissionRequest();
  }, []);

  const launchImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    console.log('result: ' + JSON.stringify(result));
    if (!result.cancelled) {
      setImageUrl(result.uri);
    }
  };

  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigationMain navigation={navigation} />
      <Layout style={styles.iconContainer}>
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
});
