

export interface RestApiResponse<T>{
    message: string;
    status: string;
    context: string;
    service: string;
    date: string;
    data: T ;
}