import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  Button,
  Layout,
  Text,
  Input,
  Select,
  SelectItem,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import TopNavigationMain from '../../menus/top-menu-main.component';
import { APIProvider } from '../../services/APIProvider';
import { AuthService } from '../../services/AuthService';
import { EditIcon, DeleteIcon } from '../../components/icons';
import { Brand, PriceCategory } from '../../types/Entities';

export default ({ navigation, route }): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const [brand, setBrand] = useState(route.params?.brand);
  const [selectedPriceIndex, setSelectedPriceIndex] = useState<number>(0);
  const [priceCategories, setPriceCategories] = useState<PriceCategory[]>([]);

  useEffect(() => {
    setBrand(route.params?.brand);
  }, [route.params?.brand]);

  useEffect(() => {
    (async () => {
      debugger;
      const prices = await APIProvider.getPriceCategories;
      setPriceCategories(prices);
      const index =
        priceCategories?.findIndex((item) => item.price === brand.price) || 0;
      setSelectedPriceIndex(index);
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
          value={brand.name}
          onChangeText={(name) => setBrand({ ...brand, name })}
        />
        <Select
          // selectedIndex={selectedPriceIndex}
          onSelect={(index) => setSelectedPriceIndex(+index)}
        >
          {priceCategories.map((item) => (
            <SelectItem key={item.id} title={item.name} />
          ))}
        </Select>
      </Layout>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
});
