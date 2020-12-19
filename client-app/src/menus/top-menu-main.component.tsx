import React, { useState, useEffect } from 'react';
import {
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from '@ui-kitten/components';
import { MenuIcon, HeartIcon } from '../components/icons';
import { User } from '../types/Entities';
import { AppConfigs } from '../AppConfigs';
import { APIProvider } from '../services/APIProvider';
import { AuthService } from '../services/AuthService';

export default ({
  navigation,
  title = AppConfigs.Name,
}): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const [currentUser, setCurrentUser] = useState<User>(AuthService.currentUser);

  useEffect(() => {
    AuthService.subscribe(() => {
      setCurrentUser(AuthService.currentUser);
    });
  }, []);

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
      accessoryRight={() => {
        return currentUser ? (
          <TopNavigationAction
            icon={HeartIcon}
            onPress={async () =>
              navigation.navigate('Products', {
                data: await APIProvider.getFavoriteProducts(),
                title: 'Search result',
              })
            }
          />
        ) : (
          <TopNavigationAction />
        );
      }}
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
