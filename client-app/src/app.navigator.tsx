import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainDrawer from './menus/drawer-main.component';
import HomeScreen from './screens/home';
import ProductsScreen from './screens/product/list';
import AddProductScreen from './screens/product/add';
import EditProductScreen from './screens/product/edit';
import BrandsScreen from './screens/brands/list';
import AddBrandScreen from './screens/brands/add';
import EditBrandScreen from './screens/brands/edit';
import SignInScreen from './screens/sign-in';
import SignUpScreen from './screens/sign-up';

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

export const AppNavigator = (): React.ReactElement => {
  return (
    <NavigationContainer theme={navigatorTheme}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <Drawer.Navigator
          screenOptions={{ gestureEnabled: true }}
          drawerContent={(props) => <MainDrawer {...props} />}
        >
          <Drawer.Screen name='Home' component={HomeScreen} />
          <Drawer.Screen name='Products' component={ProductsScreen} />
          <Drawer.Screen name='AddProduct' component={AddProductScreen} />
          <Drawer.Screen name='EditProduct' component={EditProductScreen} />
          <Drawer.Screen name='Brands' component={BrandsScreen} />
          <Drawer.Screen name='SignIn' component={SignInScreen} />
          <Drawer.Screen name='SignUp' component={SignUpScreen} />
          <Drawer.Screen name='AddBrand' component={AddBrandScreen} />
          <Drawer.Screen name='EditBrand' component={EditBrandScreen} />
        </Drawer.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};
