export interface Contact {
  id: string;
  alias_id: string;
  name: string;
  logo: string;
  emails: ContactCommunication[];
  telephones: ContactCommunication[];
  websites: ContactCommunication[];
  descs: ContactCommunication[];
}

export interface ContactCommunication {
  label: string;
  value: string;
}
