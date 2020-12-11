import { Platform } from 'react-native';
import { ImagePickerResult } from 'expo-image-picker';
import { AppConfigs } from '../AppConfigs';
import { Brand, Product } from '../types/Entities';
import { transformImageToFormData } from './utils';

export const getColorsFromImage = async (
  image: ImagePickerResult
): Promise<Array<string>> => {
  let contentType: string =
    Platform.OS === 'web' ? 'text' : 'multipart/form-data';

  try {
    let response: Response = await fetch(
      `${AppConfigs.APIAddressLocal}/get-color`,
      {
        method: 'POST',
        body: transformImageToFormData(image),
        headers: { 'Content-Type': contentType },
      }
    );
    let json = await response.json();
    return json.colors;
  } catch (e) {
    console.warn(e);
    return [];
  }
};

export const getBrands = async (): Promise<Brand[]> => {
  try {
    let response: Response = await fetch(
      `${AppConfigs.APIAddressLocal}/brands`,
      { method: 'GET' }
    );
    let json = await response.json();
    return json.brands.map((item) => ({ ...item } as Brand));
  } catch (e) {
    console.warn(e);
    return [];
  }
};

export const getProducts = async (brandId?: number): Promise<Product[]> => {
  const brandIdParameter:string = brandId? `?brandId=${brandId}` : '';
  try {
    let response: Response = await fetch(
      `${AppConfigs.APIAddressLocal}/products${brandIdParameter}`,
      { method: 'GET' }
    );
    let json = await response.json();
    return json.products.map(item => ({
      id: item.id,
      name: item.name,
      color: item.color,
      brand: { id: item.brandId, name: item.brand, price: item.price } as Brand,
    } as Product));
  } catch (e) {
    console.warn(e);
    return [];
  }
};
