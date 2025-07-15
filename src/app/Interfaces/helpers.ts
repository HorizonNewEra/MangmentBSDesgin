export interface Errors {
    statusCode: number;
    message: string;
    errors: string[];
}
export interface TableViewParams {
    pageSize: number;
    pageIndex: number;
    Search: string;
    Sort: string;
}