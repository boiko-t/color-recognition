import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Text } from '@ui-kitten/components';
import MainDrawer from './menus/drawer-main.component';
import HomeScreen from './screens/home';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

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

const MainStack = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='Home' component={HomeScreen} />
    <Stack.Screen name='Other' component={OtherScreen} />
  </Stack.Navigator>
);

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
          <Drawer.Screen name='Home' component={MainStack} />
        </Drawer.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};
