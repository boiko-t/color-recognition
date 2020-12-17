import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './src/app.navigator';
import { initFirebaseApp } from './src/services/FirebaseApp';

import { default as theme } from './theme.json';

export default () => {
  initFirebaseApp();
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <SafeAreaProvider>
          <StatusBar />
          <AppNavigator />
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
  );
};
