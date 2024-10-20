import type { MaterialSymbolProps } from 'react-material-symbols';

export type MenuBarItem = '메인' | '잔류' | '잔류 외출' | '세탁' | '금요귀가' | '기상송';

export interface MenuItemProps {
  icon: MaterialSymbolProps['icon'];
  label: MenuBarItem;
  href: string;
}
