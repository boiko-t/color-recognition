export interface NavigationItem {
  index: number;
  path: string;
  defaultParameters?: any;
}

export const navigationList: NavigationItem[] = [
  {
    index: 0,
    path: 'Home',
  },
  {
    index: 1,
    path: 'Products',
    defaultParameters: {data: []}
  },
  {
    index: 2,
    path: 'Brands',
  },
];
