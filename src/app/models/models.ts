export interface User {
    readonly id: number;
    title: string;
    firstName: string;
    lastName: string;
    dob: any;
    income: number;
    employmentStatus: string;
    houseNUmber: number;
    postcode: string;
}

export interface Card {
    readonly id: number;
    name: string;
    apr: number;
    balanceTransferOfferDuration: number;
    purchaseOfferDuration: number;
    credit: number;
    selected: boolean;
    show(user: User);
}

export class CardModel implements Card {
    id;
    name;
    apr;
    balanceTransferOfferDuration;
    purchaseOfferDuration;
    credit;
    selected = false;

    constructor(card: Card) {
        Object.assign(this, card);
    }

    show(user: User) {
        switch (this.name) {
            case 'Student Life Card':
                return user.employmentStatus === 'Student';
            case 'Liquid Card':
                return user.income > 16000;
            default:
                return true;
        }
    }

}
