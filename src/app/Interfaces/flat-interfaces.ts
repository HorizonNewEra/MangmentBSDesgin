import { SellFlatComponent } from './../payment/sell-flat/sell-flat.component';
export interface AddFlat {
    buildingId: number;
    flatNumber: number;
    standerdPrice: number;
    floor: number;
    size: number;
}
export interface EditFlat {
    id: number;
    buildingId?: number;
    flatNumber?: number;
    standerdPrice?: number;
    floor?: number;
    size?: number;
}
// Removed duplicate FlatDetails interface to avoid type conflict
export interface installment {
    id:number;
    amount: number;
    dueDate: Date;
    dueDateString: string;
    isPaid: boolean;
    paidDate: Date | null;
    paidDateString: string | null;
}




export interface FlatDetails {
  buildingId: number;
  clientId: number;
  paymentId: number;
  buildingName: string;
  clientName: string;
  clientPhone: number;
  flatNumber: number;
  standerdPrice: number;   
  floor: number;
  size: number;
  sellingPrice: number;
  paymentMethod: string;
  description: string;
  startPrice: number;
  fullPrice: number;
  fullMonths: number;
  restMonths: number;
  monthlyPrice: number;
  collectingDay: number;
  isSold: boolean;
  flatContractImages: string[];
  installments: Installment[];
}

export interface Installment {
  id: number;
  amount: number;
  dueDate: Date;       
  dueDateString: string;  
  isPaid: boolean;
  paidDate?: Date | null;
  paidDateString?: string | null;
}



export interface SellFlat{

  paymentMethod: string,
  description: string,
  clientId: string,
  flatId: number,
  startPrice: number,
  fullPrice: number,
  fullMonths: number,
  monthlyPrice: number,
  collectingDate: string,
  everyManyMonth: number
}