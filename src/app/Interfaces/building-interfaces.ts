export interface buildingtabledata {
    pageSize: number;
    pageIndex: number;
    itemsCount: number;
    pagesCount: number;
    data: buildings[];
}

export interface buildings {
    id: number;
    name : string;
    flatCount: number;
    location:string;
    landContractImages: string[];
}

export interface buildingdetail {
    id: number;
    name: string;
    location: string;
    size:string;
    landPrice: string;
    buildingContractImages: string[];
    flatCount: number;
    constractionFees: string;
    description: string;
    flats: flat[];
}
export interface flat {
    id: number;
    clientName: string;
    size: string;
    flatNumber: number;
    standerdPrice: string;
    floor: number;
    sellingPrice: string;
    flatContractImages: string[];
}
export interface Addbuilding {
    name: string;
    location: string;
    size: number;
    landPrice: number;
    constractionFees: number;
    description: string;
}

export interface Editbuilding {
    id: number;
    name?: string;
    location?: string;
}
