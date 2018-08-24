export enum AddOptionName {
  Contact,
  Group,
  Photo,
  QRCode
}

export interface AddOption {
  name: AddOptionName;
  icon: string;
  text: string;
}

export const addOptions: AddOption[] = [
  {
    name: AddOptionName.Contact,
    icon: 'contacts',
    text: 'Contact'
  },
  {
    name: AddOptionName.Group,
    icon: 'folder',
    text: 'Group'
  },
  {
    name: AddOptionName.Photo,
    icon: 'photo',
    text: 'Photo'
  },
  {
    name: AddOptionName.QRCode,
    icon: 'camera',
    text: 'QR Code'
  }
];
