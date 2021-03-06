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
import TopNavigationMain from '../../menus/top-menu-inner.component';
import { APIProvider } from '../../services/APIProvider';
import { Brand, PriceCategory } from '../../types/Entities';

export default ({ navigation, route }): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const [brand, setBrand] = useState<Brand>(route.params?.brand);
  const [selectedPriceIndex, setSelectedPriceIndex] = useState<IndexPath>();
  const [priceCategories, setPriceCategories] = useState<PriceCategory[]>([]);

  useEffect(() => {
    setBrand(route.params?.brand);
  }, [route.params?.brand]);

  useEffect(() => {
    (async () => {
      const prices = await APIProvider.getPriceCategories();
      setPriceCategories(prices);
      const priceIndex =
        prices.findIndex((item) => item.price === brand.price) || 0;
      setBrand({ priceCategory: prices[priceIndex], ...brand });
      setSelectedPriceIndex(new IndexPath(priceIndex));
    })();
  }, []);

  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigationMain navigation={navigation} title={`Edit ${brand.name}`} />
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
            onPress={() => APIProvider.updateBrand(brand).then(navigation.goBack)}
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
