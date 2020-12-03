export interface Searchable<T> {
    apiUrl: string;
    setSearchItem(searchItem: T): void;
}