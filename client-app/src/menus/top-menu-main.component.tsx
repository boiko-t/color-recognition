import React from 'react';
import { StyleSheet } from 'react-native';
import {
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from '@ui-kitten/components';
import { MenuIcon } from '../components/icons';
import { AppConfigs } from '../AppConfigs';

export default ({
  navigation,
  title = AppConfigs.Name,
}): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  return (
    <TopNavigation
      title={title}
      alignment='center'
      style={styles.main}
      accessoryLeft={() => (
        <TopNavigationAction
          icon={MenuIcon}
          onPress={navigation.toggleDrawer}
        />
      )}
    />
  );
};

const themedStyles = StyleService.create({
  main: {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: 'color-primary-300',
  },
});
