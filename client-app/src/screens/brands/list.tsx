import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  Button,
  Divider,
  Layout,
  List,
  Text,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import { Brand } from '../../types/Entities';
import TopNavigationMain from '../../menus/top-menu-main.component';
import { APIProvider } from '../../services/APIProvider';
import { AuthService } from '../../services/AuthService';
import { EditIcon, DeleteIcon } from '../../components/icons';
import { User } from '../../types/Entities';

export default ({ navigation, title, data }): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const [dataState, setDataState] = useState(data);
  const [currentUser, setCurrentUser] = useState<User>(AuthService.currentUser);

  useEffect(() => {
    (async function () {
      if (!dataState) {
        setDataState(await APIProvider.getBrands());
      }
      AuthService.subscribe(() => {
        setCurrentUser(AuthService.currentUser);
      });
    })();
  }, []);

  const renderListItem = ({ item }: { item: Brand }): React.ReactElement => (
    <TouchableOpacity
      onPress={async () => {
        navigation.navigate('Products', {
          data: await APIProvider.getProducts(item.id),
          title: item.name,
        });
      }}
      style={styles.listItem}
    >
      <View>
        <Text category='s1'>{item.name}</Text>
        <Text category='c2'>Price {item.price}₴</Text>
      </View>
      { currentUser?.isAdmin &&
        <View style={styles.flexRow}>
          <Button
            status='info'
            appearance='outline'
            accessoryLeft={EditIcon}
            onPress={() => navigation.navigate('EditBrand', {brand: item})}
            style={styles.actionButton}
          ></Button>
          <Button
            status='danger'
            appearance='outline'
            accessoryLeft={DeleteIcon}
            style={styles.actionButton}
          ></Button>
        </View>
      }
    </TouchableOpacity>
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
  flexRow: {
    flexDirection: 'row',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  actionButton: {
    width: 40,
    height: 40,
    marginLeft: 10,
  }
});
