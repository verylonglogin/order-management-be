
export interface Order {
    orderNumber: number;
    paymentDescription: string;
    streetAddress: string;
    town: string;
    country: string;
    amount: number;
    currency: string;
    paymentDueDate: string;
}