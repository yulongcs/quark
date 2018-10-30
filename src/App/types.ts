export interface IMenu {
  id: string;
  name: string;
  path: string;
  icon?: string;
  children?: IMenu[];
}
