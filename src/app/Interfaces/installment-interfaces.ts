export interface InstallmentDetails {
    id: number,
    paymentId: number,
    clientId: string,
    buildingId: number,
    flatId: number,
    ////payment 
    amount: number,
    dueDateString: string,
    isPaid: boolean,
    paidDateString: string,
    //////
    clientName: string,
    clientPhone: string,
    clientAddress: string,
    ////////
    buildingName: string,
    buildingLocation: string,
    flatNumber: number,
    floor: number,
    flatSize: number,
    sellingPrice: number
}
