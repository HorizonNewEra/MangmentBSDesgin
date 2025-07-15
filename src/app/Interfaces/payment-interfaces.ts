export interface HomeTableView {
    perviousInstallments: HomeInstallmentView[];
    currentInstallments: HomeInstallmentView[];
    nextInstallments: HomeInstallmentView[];
    totalFees: number;
    totalResived: number;
    totalRest: number;
}
export interface HomeInstallmentView {
    id: number;
    installmentDate: Date;
    installmentDateString: string;
    name: string;
    phone: string;
    address: string;
    installmentAmount: number;
}


//payment-details

export interface Payment {
    id: number,
    clientId: string,
    buildingId: number,
    flatId: number,
    clientName: string,
    clientPhone: string,
    clientAddress: string,
    buildingName: string,
    buildingLocation: string,
    flatNumber: number,
    fullPrice: number,
    startPrice: number,
    paymentMethod: string,
    paymentDescription: string,
    fullInstallment: number,
    restInstallment: number,
    installmentPrice: number,
    collectingDay: number,
    installments: Installment[],
}

export interface Installment {
    id: number,
    amount: number,
    dueDateString: string,
    isPaid: boolean,
    paidDateString: string
}



//payment-table-view//
export interface PaymentTable {
    pageSize: number,
    pageIndex: number,
    itemsCount: number,
    pagesCount: number,
    data: PaymentTableView[]
}

export interface PaymentTableView {

    id: number,
    clientName: string,
    buildingName: string,
    flatNumber: string,
    fullPrice: number,
    restMonth: number,
    monthlyPrice: number,
    collectingDay: number

}

//agenda
export interface AgendaView {
    month: number;
    year: number;
    monthName: string;
    dayView: AgendaDayView[];
}

export interface AgendaDayView {
    dateString: string;
    count: number;
    dayDetails: AgendaDayDetailsView[];
}
export interface AgendaDayDetailsView {
    installmentId: number;
    clientPhone: string;
    clientName: string;
    amount: number;
    dueDateString: string;
    paiedDateString?: null | string;
    isPaied: boolean;
}
