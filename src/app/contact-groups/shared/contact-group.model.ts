export interface ContactGroup {
  id: number;
  name: string;
  items_count: number;
  caption: string;
  share_with: boolean;
  share_to: boolean;
  owner_account_id: number;
}

export function isContactGroup(x: any): x is ContactGroup {
  return (<ContactGroup>x).items_count !== undefined;
}
