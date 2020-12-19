import React from 'react';
import {
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from '@ui-kitten/components';
import { ArrowIosBackIcon } from '../components/icons';
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
          icon={ArrowIosBackIcon}
          onPress={navigation.goBack}
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
