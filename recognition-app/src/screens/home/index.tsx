import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  Layout,
  Text,
  Divider,
  TopNavigation,
  TopNavigationAction,Icon
} from '@ui-kitten/components';
import { MenuIcon } from '../../components/icons';
import { HomeDrawer } from './home-drawer.component';

const Drawer = createDrawerNavigator();

const HomeScreen = ({ navigation }): React.ReactElement => {
  //   const renderDrawerAction = (): React.ReactElement => (
  //     <TopNavigationAction
  //       icon={MenuIcon}
  //       onPress={props.navigation.toggleDrawer}
  //     />
  //   );

  return (
    // <SafeAreaLayout style={styles.safeArea} insets='top'>
    //   <TopNavigation title='My App' leftControl={renderDrawerAction()} />
    <Layout>
      <TopNavigation
        title='My App'
        accessoryLeft={() => (
          <TopNavigationAction
            icon={MenuIcon}
            onPress={navigation.toggleDrawer}
          />
        )}
      />
      <Text>Hello from HOME</Text>
      <Divider />
      <Text>Hello from HOME 2</Text>
    </Layout>
    // </SafeAreaLayout>
  );
};

const OtherScreen = (): React.ReactElement => (
  <Layout>
    <Text>Hello from Other Screen</Text>
  </Layout>
);

export default (): React.ReactElement => (
  <Drawer.Navigator
    screenOptions={{ gestureEnabled: true }}
    drawerContent={(props) => <HomeDrawer {...props} />}
  >
    <Drawer.Screen name='Home' component={HomeScreen} />
    <Drawer.Screen name='Other' component={OtherScreen} />
  </Drawer.Navigator>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
