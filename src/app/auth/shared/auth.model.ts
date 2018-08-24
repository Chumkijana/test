export interface Auth {
  accessToken: string;
  tokenType: string;
  client: string;
  expiry: number;
  uid: string;
}
