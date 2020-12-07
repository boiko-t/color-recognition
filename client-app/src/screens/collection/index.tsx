import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { imagePickerPermissionRequest } from '../../components/image-picker.helper';
import { getColorsFromImage } from '../../services/APIProvider';
import {
  Button,
  Card,
  Layout,
  List,
  Text,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import { HeartIcon } from '../../components/icons';
import { Product } from '../../types/Entities';
import TopNavigationMain from '../../menus/top-menu-main.component';
import { data } from './data';

export default ({ navigation, title }): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const [imageUrl, setImageUrl] = useState<null | string>(null);
  const [selectedColors, setSelectedColors] = useState<Array<string>>([]);

  const renderItemFooter = (item: Product): React.ReactElement => (
    <View style={styles.itemFooter}>
      <Text category='s1'>
        {`${item.brand.price}₴`}
      </Text>
      <Button
        style={styles.iconButton}
        status='danger'
        appearance='outline'
        accessoryLeft={HeartIcon}
        // onPress={() => onItemCartPress(info.index)}
      />
    </View>
  );

  const renderItemHeader = (backgroundColor: string): React.ReactElement => (
    <View style={{...styles.itemHeader, backgroundColor}}/>
  );

  const renderProductItem = ({item}: {item: Product}): React.ReactElement => (
    <Card
      style={styles.productItem}
      header={() => renderItemHeader(item.color)}
      footer={() => renderItemFooter(item)}
      // onPress={() => {}}
    >
      <Text category='s1'>{item.name}</Text>
      <Text appearance='hint' category='c1'>
        {item.brand.name}
      </Text>
    </Card>
  );

  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigationMain navigation={navigation} />
      <Layout style={styles.container}>
        <List
          contentContainerStyle={styles.productList}
          data={data}
          numColumns={2}
          renderItem={renderProductItem}
        />
      </Layout>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  productList: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  productItem: {
    flex: 1,
    margin: 8,
    maxWidth: Dimensions.get('window').width / 2 - 24,
    backgroundColor: 'background-basic-color-1',
  },
  itemHeader: {
    height: 140,
  },
  itemFooter: {
    paddingLeft: 24,
    paddingRight: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
