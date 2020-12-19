import React, { useState, useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import {
  Button,
  Card,
  Layout,
  List,
  Text,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import { useFocusEffect } from '@react-navigation/native';
import { HeartIcon, HeartFilledIcon } from '../../components/icons';
import { Product } from '../../types/Entities';
import TopNavigationMain from '../../menus/top-menu-main.component';
import { APIProvider } from '../../services/APIProvider';
import { AuthService } from '../../services/AuthService';
import { EditIcon, DeleteIcon } from '../../components/icons';
import { User } from '../../types/Entities';

export default ({ navigation, route }): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const [dataState, setDataState] = useState(route.params?.data as Product[]);
  const [currentUser, setCurrentUser] = useState<User>(AuthService.currentUser);

  useEffect(() => {
    AuthService.subscribe(() => {
      setCurrentUser(AuthService.currentUser);
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      (async function () {
        if (!route.params?.data) {
          setDataState(await APIProvider.getProducts());
        } else {
          setDataState(route.params?.data);
        }
      })();
    }, [route.params])
  );

  const getColumnsCount = () => {
    return Dimensions.get('window').width > 768 ? 4 : 2;
  };

  const renderItemFooter = (item: Product): React.ReactElement => (
    <View style={styles.itemFooter}>
      <Text category='s1'>{`${item.brand.price}₴`}</Text>
      <Button
        style={styles.iconButton}
        status='danger'
        appearance='outline'
        accessoryLeft={(props) => {
          return item.isFavorite ? (
            <HeartFilledIcon style={props.style} />
          ) : (
            <HeartIcon style={props.style} />
          );
        }}
        onPress={async () => {
          item.isFavorite = !item.isFavorite;
          await APIProvider.toggleFavoriteProduct(item);
        }}
      />
    </View>
  );

  const renderItemHeader = (
    backgroundColor: string,
    item: Product
  ): React.ReactElement => (
    <View style={{ ...styles.itemHeader, backgroundColor }}>
      {currentUser?.isAdmin && (
        <View style={styles.productControls}>
          <Button
            appearance='ghost'
            style={styles.productControl}
            status='control'
            accessoryLeft={EditIcon}
            onPress={() => navigation.navigate('EditProduct', { data: item })}
          />
          <Button
            appearance='ghost'
            style={styles.productControl}
            status='control'
            accessoryLeft={DeleteIcon}
          />
        </View>
      )}
    </View>
  );

  const renderProductItem = ({
    item,
  }: {
    item: Product;
  }): React.ReactElement => (
    <Card
      style={styles.productItem}
      header={() => renderItemHeader(item.color, item)}
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
      <TopNavigationMain
        navigation={navigation}
        title={
          route.params.title ? `${route.params.title} Products` : undefined
        }
      />
      <Layout style={styles.container}>
        {currentUser?.isAdmin && (
          <Layout style={styles.flexEnd}>
            <Button
              style={styles.addButton}
              size='small'
              status='info'
              onPress={() => navigation.navigate('AddProduct')}
            >
              Add new
            </Button>
          </Layout>
        )}
        <List
          contentContainerStyle={styles.productList}
          data={dataState}
          numColumns={getColumnsCount()}
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
  productControls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  productControl: {
    width: 30,
    height: 30,
  },
  addButton: {
    marginTop: 16,
    width: 120,
  },
  flexEnd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 16,
    backgroundColor: 'transparent',
  },
});
