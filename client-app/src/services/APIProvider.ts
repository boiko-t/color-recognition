import { Platform } from 'react-native';
import { ImagePickerResult } from 'expo-image-picker';
import { AppConfigs } from '../AppConfigs';
import { Brand, Product } from '../types/Entities';
import { transformImageToFormData } from './utils';
import { parseResponseToProducts } from './parser';

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
    return json;
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
    return json.map((item) => ({ ...item } as Brand));
  } catch (e) {
    console.warn(e);
    return [];
  }
};

export const getProductsByColor = async (color: string): Promise<Product[]> => {
  const colorParameter:string = `?compareToColor=${color}`;
  try {
    let response: Response = await fetch(
      `${AppConfigs.APIAddressLocal}/products${colorParameter}`,
      { method: 'GET' }
    );
    let json = await response.json();
    return parseResponseToProducts(json);
  } catch (e) {
    console.warn(e);
    return [];
  }
}

export const getProducts = async (brandId?: number): Promise<Product[]> => {
  const brandIdParameter:string = brandId? `?brandId=${brandId}` : '';
  try {
    let response: Response = await fetch(
      `${AppConfigs.APIAddressLocal}/products${brandIdParameter}`,
      { method: 'GET' }
    );
    let json = await response.json();
    return parseResponseToProducts(json);
  } catch (e) {
    console.warn(e);
    return [];
  }
};
