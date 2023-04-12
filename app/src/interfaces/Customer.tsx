export interface IPerson {
  id: string;
  type: string;
  person_id: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  email: string;
  phone: string;
  address: string;
  district: string;
}

export interface ICompany {
  id: string;
  type: string;
  company_id: string;
  rut: string;
  companyName: string;
  legalRepresentative: string;
  line: string;
  email: string;
  phone: string;
  address: string;
  district: string;
}
