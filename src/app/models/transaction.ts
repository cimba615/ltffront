import { CartItem, Cart } from '../components/pgHook/areeba-hook/areeba-hook.component';

export class Transaction {
    TxRef: string;
    Status: boolean;
    Cart: Cart;
    Transfer: Boolean;
}
