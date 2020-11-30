import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Layout, Text, Divider } from '@ui-kitten/components';
import MainDrawer from '../../menus/drawer-main.component';
import TopNavigationMain from '../../menus/top-menu-main.component';

const Drawer = createDrawerNavigator();

const HomeScreen = ({ navigation }): React.ReactElement => {
  return (
    <Layout>
      <TopNavigationMain navigation={navigation}/>
      <Text>Hello from HOME</Text>
      <Divider />
      <Text>Hello from HOME 2</Text>
    </Layout>
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
    drawerContent={(props) => <MainDrawer {...props} />}
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
