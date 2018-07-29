export interface IMenu {
  id: string;
  name: string;
  path: string;
  icon?: string;
  children?: IMenu[];
}

export interface ISiderMenuProps {
  menus: IMenu[];
  menuCollapsed: boolean;
  selectedKey: string;
  openKeys: string[];
  handleMenuItemClick: (url: string) => () => void;
  handleMenuOpenChange: () => (keys: string[]) => void;
}
