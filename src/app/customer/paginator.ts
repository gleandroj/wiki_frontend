export interface Paginator<T>{
    current_page?: number;
    data?: Array<T>;
    from?: number;
    last_page?: number;
    next_page_url?: string;
    path?: string;
    per_page?: number;
    prev_page_url?: number;
    to?: number;
    total?: number;
}