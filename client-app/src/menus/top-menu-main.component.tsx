import React from 'react';
import { TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { MenuIcon } from '../components/icons';
import { AppConfigs } from '../AppConfigs';

export default ({
  navigation,
  title = AppConfigs.Name,
}): React.ReactElement => (
  <TopNavigation
    title={title}
    alignment='center'
    accessoryLeft={() => (
      <TopNavigationAction icon={MenuIcon} onPress={navigation.toggleDrawer} />
    )}
  />
);
