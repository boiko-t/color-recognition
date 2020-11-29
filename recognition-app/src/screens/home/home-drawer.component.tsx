import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar,
  Drawer,
  DrawerItem,
  Layout,
  Text,
} from '@ui-kitten/components';
import { BookIcon, HomeIcon } from '../../components/icons';

const DATA: Array<{}> = [
  { title: 'Home', icon: HomeIcon },
  { title: 'Documentation', icon: BookIcon },
];

export const HomeDrawer = ({ navigation }): ReactElement => {
  const onItemSelect = (index: number): void => {
    switch (index) {
      case 0: {
        navigation.toggleDrawer();
        navigation.navigate('Libraries');
        return;
      }
      case 1: {
        navigation.toggleDrawer();
        return;
      }
    }
  };

  const renderHeader = (): ReactElement => (
    <Layout style={styles.header} level='2'>
      <View style={styles.profileContainer}>
        <Avatar
          size='giant'
          source={require('../../assets/images/image-app-icon.png')}
        />
        <Text style={styles.profileName} category='h6'>
          Kitten Tricks
        </Text>
      </View>
    </Layout>
  );

  const renderFooter = (): ReactElement => (
    <Text style={styles.footer} category='c2'>Build by Taisa Boiko</Text>
  );

  return (
    <Drawer header={renderHeader} footer={renderFooter} onSelect={onItemSelect}>
      <DrawerItem title='Home' accessoryLeft={HomeIcon} />
      <DrawerItem title='Other' accessoryLeft={BookIcon} />
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
