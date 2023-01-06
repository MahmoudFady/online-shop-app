export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: number;
  address: {
    country: string;
    state: string;
    city: string;
  };
  password: string;
}
