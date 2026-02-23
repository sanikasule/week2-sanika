import React from "react";

//col definition is generic
interface Column<T> {
    key: keyof T; //must be real key of T
    header: string;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
    width?: number;
}

//generic props - T extends object keeps thing safe
interface DataTableProps<T extends object> {
    data: T[];
    columns: Column<T>[];
    rowKey: keyof T; //which field is unique key
    onRowClick?: (row: T) => void;
    emptyMessage?: string;
}

//generic component - note the <T extends object> on the arrow function
function DataTable<T extends object> ({
    data,
    columns,
    rowKey,
    onRowClick,
    emptyMessage = 'No data found.', 
}: DataTableProps<T>) {
    if (data.length === 0) return <p>{emptyMessage}</p>

    return (
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
                <tr style={{background: '#1e3a8a', color: '#fff'}}>
                    {columns.map(col => (
                        <th key={String(col.key)} style={{padding: 8, textAlign: 'left'}}>
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, ri) => (
                    <tr key={String(row[rowKey])} onClick={() => onRowClick?.(row)}
                    style={{background: ri%2 === 0 ? '#fff': '#f8fafc', 
                    cursor: onRowClick ? 'pointer' : 'default'}}>
                        {columns.map(col => (
                            <td key={String(col.key)} style={{padding: 8}}>
                                {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default DataTable;