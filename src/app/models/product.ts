import { Occasion } from './occasion';

export class Product {
    ID: number;
    TypeID: number;
    CategoryID: number;
    Name: string;
    Description: string;
    Price: number;
    Image: string;
    IsBestSeller: boolean;
    Occasions: Occasion[];
    SpecialItems: Product[];
    Tags: string[];
    Variants: Variant[];
}

export class Variant {
    ID: number;
    Name: string;
    SizeVariantID: number;
    Price: number;
    MatchesProductPrice = false;
}
