import React, { useState, useEffect } from 'react';
import {
  Button,
  Divider,
  Layout,
  List,
  ListItem,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import { Brand } from '../../types/Entities';
import TopNavigationMain from '../../menus/top-menu-main.component';
import { APIProvider } from '../../services/APIProvider';

export default ({ navigation, title, data }): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const [dataState, setDataState] = useState(data);

  useEffect(() => {
    (async function () {
      if (!dataState) {
        setDataState(await APIProvider.getBrands());
      }
    })();
  }, []);

  const renderListItem = ({ item }: { item: Brand }): React.ReactElement => (
    <ListItem
      title={item.name}
      description={`Price ${item.price}₴`}
      onPress={async () => {navigation.navigate('Products', { 
        data: await APIProvider.getProducts(item.id),
        title: item.name,
      })}}
    />
  );

  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigationMain navigation={navigation} />
      <Layout style={styles.container}>
        <List
          contentContainerStyle={styles.list}
          data={dataState}
          renderItem={renderListItem}
          ItemSeparatorComponent={Divider}
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
  list: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
});
