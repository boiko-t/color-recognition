import React, { ReactElement, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar,
  Button,
  Drawer,
  DrawerItem,
  IndexPath,
  Layout,
  Text,
} from '@ui-kitten/components';
import {
  ArchiveIcon,
  ColorPaletteIcon,
  HomeIcon,
  PersonIcon,
} from '../components/icons';
import { navigationList } from '../types/Navigation';
import { AuthService } from '../services/AuthService';
import { AppConfigs } from '../AppConfigs';

export default ({ navigation }): ReactElement => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    AuthService.subscribe(() => {
      setCurrentUser(AuthService.currentUser);
    });
  }, []);

  const onItemSelect = (index: IndexPath): void => {
    navigation.toggleDrawer();
    navigation.navigate(
      navigationList[index.row].path,
      navigationList[index.row].defaultParameters
    );
  };

  const renderHeader = (): ReactElement => (
    <Layout style={styles.header} level='2'>
      <View style={styles.profileContainer}>
        <Avatar
          size='giant'
          source={require('../assets/images/image-app-icon.jpg')}
        />
        <View>
          <Text style={styles.profileName} category='h6'>
            {AppConfigs.Name}
          </Text>
          {currentUser && (
            <Text style={styles.profileName} category='c2'>
              Welcome, {currentUser.name}
            </Text>
          )}
        </View>
      </View>
    </Layout>
  );

  const renderFooter = (): ReactElement => (
    <>
      {currentUser ? (
        <Button
          style={styles.signInButton}
          status='info'
          accessoryLeft={PersonIcon}
          appearance='outline'
          onPress={() => AuthService.signOut()}
        >
          Sing Out
        </Button>
      ) : (
        <Button
          style={styles.signInButton}
          status='info'
          accessoryLeft={PersonIcon}
          appearance='outline'
          onPress={() => navigation.navigate('SignIn')}
        >
          Sing In
        </Button>
      )}
    </>
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
  signInButton: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
});
