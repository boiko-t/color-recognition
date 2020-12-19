import React, { useState, useEffect } from 'react';
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
import { Brand, PriceCategory } from '../../types/Entities';

export default ({ navigation, route }): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const [brand, setBrand] = useState<Brand>({} as Brand);
  const [selectedPriceIndex, setSelectedPriceIndex] = useState<IndexPath>();
  const [priceCategories, setPriceCategories] = useState<PriceCategory[]>([]);

  useEffect(() => {
    (async () => {
      const prices = await APIProvider.getPriceCategories();
      setPriceCategories(prices);
    })();
  }, []);

  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigationMain navigation={navigation} title='Add new brand' />
      <Layout style={styles.container}>
        <Input
          status='control'
          autoCapitalize='none'
          placeholder='Brand Name'
          label={() => <Text category='p2'>Enter name</Text>}
          status='basic'
          style={styles.marginTop}
          value={brand.name}
          onChangeText={(name) => setBrand({ ...brand, name })}
        />
        <Select
          selectedIndex={selectedPriceIndex}
          label={() => <Text category='p2'>Select price category</Text>}
          value={brand.priceCategory?.name}
          style={styles.marginTop}
          onSelect={(index) => {
            setSelectedPriceIndex(new IndexPath(index.row));
            setBrand({
              ...brand,
              priceCategory: { ...priceCategories[index.row] },
            });
          }}
        >
          {priceCategories.map((item) => (
            <SelectItem key={item.id} title={`${item.name} - ${item.price}₴`} />
          ))}
        </Select>
        <Layout style={styles.flexEnd}>
          <Button
            style={styles.submitButton}
            size='small'
            status='success'
            onPress={() => APIProvider.addBrand(brand).then(navigation.goBack)}
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
