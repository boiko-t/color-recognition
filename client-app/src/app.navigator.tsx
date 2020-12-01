import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Text } from '@ui-kitten/components';
import MainDrawer from './menus/drawer-main.component';
import HomeScreen from './screens/home';

const Drawer = createDrawerNavigator();

/*
 * Navigation theming: https://reactnavigation.org/docs/en/next/themes.html
 */
const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const OtherScreen = (): React.ReactElement => (
  <Layout>
    <Text>Hello from Other Screen</Text>
  </Layout>
);

export const AppNavigator = (): React.ReactElement => {
  return (
    <NavigationContainer theme={navigatorTheme}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <Drawer.Navigator
          screenOptions={{ gestureEnabled: true }}
          drawerContent={(props) => <MainDrawer {...props} />}
        >
          <Drawer.Screen name='Home' component={HomeScreen} />
          <Drawer.Screen name='Other' component={OtherScreen} />
        </Drawer.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};
