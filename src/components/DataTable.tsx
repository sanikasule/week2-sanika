import React, { useState } from "react";

//col definition is generic
interface Column<T> {
    key: keyof T; //must be real key of T
    header: string;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
    width?: number;
    sortable?: boolean;
}

//generic props - T extends object keeps thing safe
interface DataTableProps<T extends object> {
    data: T[];
    columns: Column<T>[];
    rowKey: keyof T; //which field is unique key
    onRowClick?: (row: T) => void;
    emptyMessage?: string;
}

type SortDir = 'asc' | 'desc' | null; //since used here only the values accepted

interface SortState<T> {
    key: keyof T | null;
    dir: SortDir;
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

    const [sorting, setSorting] = useState<SortState<T>>({key: null, dir: null});

    const handleSort = (key: keyof T) => {
        setSorting(prev => ({
            key,
            dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc',
        }))
    }

    const sorted = [...data].sort((a, b) => {
        if (!sorting.key || !sorting.dir) return 0;
        const av = a[sorting.key], bv = b[sorting.key];
        if (av<bv) return sorting.dir === 'asc' ? -1 : 1;
        if (av>bv) return sorting.dir === 'asc' ? 1 : -1;

        return 0;
    })

    return (
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
                <tr style={{background: '#1e3a8a', color: '#fff'}}>
                    {columns.map(col => (
                        <th key={String(col.key)} style={{padding: 8, textAlign: 'left', cursor: col.sortable ? 'pointer' : 'default', background: '#1E3A8A', color: '#fff', userSelect: 'none'}} 
                        onClick={() => col.sortable && handleSort(col.key)}>
                            {col.header} 
                            {col.sortable && sorting.key === col.key ? (sorting.dir === 'asc' ? ' ▲' : ' ▼') : col.sortable ? ' ⇅' : ''}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {sorted.map((row, ri) => (
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