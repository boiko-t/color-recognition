import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar,
  Drawer,
  DrawerItem,
  IndexPath,
  Layout,
  Text,
} from '@ui-kitten/components';
import { ArchiveIcon, ColorPaletteIcon, HomeIcon } from '../components/icons';
import {navigationList} from '../types/Navigation';

export default ({ navigation }): ReactElement => {
  const onItemSelect = (index: IndexPath): void => {
    navigation.toggleDrawer();
    navigation.navigate(navigationList[index.row].path, navigationList[index.row].defaultParameters);
  };

  const renderHeader = (): ReactElement => (
    <Layout style={styles.header} level='2'>
      <View style={styles.profileContainer}>
        <Avatar
          size='giant'
          source={require('../assets/images/image-app-icon.png')}
        />
        <Text style={styles.profileName} category='h6'>
          Kitten Tricks
        </Text>
      </View>
    </Layout>
  );

  const renderFooter = (): ReactElement => (
    <Text style={styles.footer} category='c1'>Build by Taisa Boiko</Text>
  );

  return (
    <Drawer header={renderHeader} footer={renderFooter} onSelect={onItemSelect}>
      <DrawerItem title='Home' accessoryLeft={HomeIcon} />
      <DrawerItem title='Products' accessoryLeft={ColorPaletteIcon} />
      <DrawerItem title='Brands' accessoryLeft={ArchiveIcon} />
    </Drawer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    marginHorizontal: 16,
  },
});
