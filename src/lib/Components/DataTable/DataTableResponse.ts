export type DataTableColumn = {
    keyMap: string;
    label: string;
}

export type DataTableResponse<T> = {
    columns: DataTableColumn[];
    entries: T[];
}