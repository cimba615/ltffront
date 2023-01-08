export class TimeSlot {
    ID: number;
    CityID: number;
    SlotStart: number;
    SlotEnd: number;
    DeliveryType: string;
}

export class City {
    ID: number;
    Name: string;
    DeliveryCharge: number;
    MorningDelivery: number;
    FixedTimeDelivery: number;
    MidnightDelivery: number;
    TimeSlots: TimeSlot[]
}

