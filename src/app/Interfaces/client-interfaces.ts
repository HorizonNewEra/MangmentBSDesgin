export interface Clienttable {
  pageSize: number,
  pageIndex: number,
  itemsCount: number,
  pagesCount: number,
  data: Clienttableview[]
}
export interface Clienttableview {
  landContractImages: string[]
  id: string,
  name: string,
  phoneNumber: string,
  flatCount: number,
}
export interface ClientDetails {
  id: string,
  name: string,
  phoneNumber: string,
  adress: string,
  clientPayments: ClientPayment[]
  clientFlats: clientflats[]
}
export interface ClientPayment {
  paymentId:number,
  paymentMethod: string,
  description: string,
  startPrice: number,
  fullPrice: number,
  fullMonths: number,
  restMonths: number,
  monthlyPrice: number,
  collectingDay: number
}
export interface clientflats {
  flatId:number,
  buildingName: string,
  flatNumber: number,
  floor: number,
  size: number,
  sellingPrice: number,
  flatContractImages: string[]
}
export interface ClientEditAddData {
  id: string,
  name: string,
  phoneNumber: string,
  address: string
}
