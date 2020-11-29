import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Text } from '@ui-kitten/components';
import HomeScreen from './screens/home';

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

export const AppNavigator = (): React.ReactElement => (
  <NavigationContainer theme={navigatorTheme}>
    <HomeScreen/>
  </NavigationContainer>
);
