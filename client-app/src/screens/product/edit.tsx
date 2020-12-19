import React, { useState } from 'react';
import {
  Button,
  Layout,
  Text,
  IndexPath,
  Input,
  Select,
  SelectItem,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import { useFocusEffect } from '@react-navigation/native';
import TopNavigationMain from '../../menus/top-menu-inner.component';
import { APIProvider } from '../../services/APIProvider';
import { Brand, Product } from '../../types/Entities';

export default ({ navigation, route }): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const [product, setProduct] = useState<Product>({} as Product);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrandIndex, setSelectedBrandIndex] = useState<IndexPath>();

  useFocusEffect(
    React.useCallback(() => {
      (async function () {
        setBrands(await APIProvider.getBrands());
        setProduct(route.params?.data);
      })();
    }, [route.params?.data])
  );

  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigationMain navigation={navigation} title='Add new product' />
      <Layout style={styles.container}>
        <Layout style={styles.flexCenter}>
          <Layout
            style={{...styles.color, backgroundColor: product.color}}/>
        </Layout>
        <Input
          status='control'
          autoCapitalize='none'
          placeholder='Product Name'
          label={() => <Text category='p2'>Enter name</Text>}
          status='basic'
          style={styles.marginTop}
          value={product.name}
          onChangeText={(name) => setProduct({ ...product, name })}
        />
        <Select
          selectedIndex={selectedBrandIndex}
          label={() => <Text category='p2'>Select price category</Text>}
          value={product.brand?.name}
          style={styles.marginTop}
          onSelect={(index) => {
            setSelectedBrandIndex(new IndexPath(index.row));
            setProduct({
              ...product,
              brand: { ...brands[index.row] },
            });
          }}
        >
          {brands.map((item) => (
            <SelectItem key={item.id} title={item.name} />
          ))}
        </Select>
        <Layout style={styles.flexEnd}>
          <Button
            style={styles.submitButton}
            size='small'
            status='success'
            onPress={() => APIProvider.addProduct(product).then(navigation.goBack)}
          >
            Save
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
    paddingHorizontal: 16,
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  color: {
    height: 200,
    width: 250,
    marginTop: 10,
  },
  marginTop: {
    marginTop: 16,
  },
  submitButton: {
    marginTop: 20,
    width: 120,
  },
  flexEnd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
});
