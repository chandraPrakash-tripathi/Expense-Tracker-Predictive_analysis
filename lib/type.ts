export interface Transaction {
  id: number;
  transactionName: string;
  amount: number;
  description: string;
  type: string;
  category: string;
  date: string;
}

export type Category = {
  id: number;
  name: string;
};

export interface UserState {
  isAuthenticated: boolean;
  user: {
    id: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
  } | null;
  loading: boolean;
  error: string | null;
}
