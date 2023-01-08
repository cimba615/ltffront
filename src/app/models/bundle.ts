import { Product } from './product';

export class Bundle {
    ID: number;
    Name: string;
    Price: number;
    Image: string;
    DisplayOrder: number;
    Products: Product[];
}
