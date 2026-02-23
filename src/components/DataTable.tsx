import React, { useState, useEffect } from "react";

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
    filterKey?: keyof T;
    pageSize: number;
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
    filterKey,
    pageSize
}: DataTableProps<T>) {
    if (data.length === 0) return <p>{emptyMessage}</p>

    const [sorting, setSorting] = useState<SortState<T>>({key: null, dir: null});

    const [filterText, setFilterText] = useState('');

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

    const filtered = filterText && filterKey ? 
    sorted.filter(row => String(row[filterKey]).toLowerCase().includes(filterText.toLowerCase())) : sorted;

    const [page, setPage] = useState(1);
    const totalPages = pageSize ? Math.ceil(filtered.length / pageSize) : 1;

    const safePage = Math.min(page, Math.max(1, totalPages));

    const paginated = pageSize ? filtered.slice((safePage - 1) * pageSize, safePage * pageSize) : filtered;

    useEffect(() => {
        setPage(1);
    }, [filterText]);

    return (
        <>
            {filterKey && (
        <div style={{ marginBottom: 8 }}>
            <input type='text' placeholder={`Filter by ${String(filterKey)}...`} value={filterText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFilterText(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: 4,
            border: '1px solid #D1D5DB', width: 220 }}
            />
        </div>
        )}

        <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
                <tr style={{background: '#1e3a8a', color: '#fff'}}>
                    {columns.map(col => (
                        <th key={String(col.key)} style={{padding: 8, textAlign: 'left', cursor: col.sortable ? 'pointer' : 'default', background: '#8236fd', color: '#fff', userSelect: 'none'}} 
                        onClick={() => col.sortable && handleSort(col.key)}>
                            {col.header} 
                            {col.sortable && sorting.key === col.key ? (sorting.dir === 'asc' ? ' ▲' : ' ▼') : col.sortable ? ' ⇅' : ''}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {paginated.map((row, ri) => (
                    <tr key={String(row[rowKey])} onClick={() => onRowClick?.(row)}
                    style={{background: ri%2 === 0 ? '#fff': '#f8fafc', 
                    cursor: onRowClick ? 'pointer' : 'default'}}>
                        {columns.map(col => (
                            <td key={String(col.key)} style={{padding: 10}}>
                                {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>

        {pageSize && totalPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 15 }}>
                <button disabled={safePage <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}
                style={{ padding: '4px 12px', cursor: safePage <= 1 ? 'not-allowed' : 'pointer', background: '#8236fd', color: '#fff', border: '2px solid #ababb9', borderRadius: 10, fontFamily: 'Times New Roman, serif', fontSize: '15px' }}
            >
                    ← Previous
                </button>
 
                <span style={{ fontSize: '15px', color: '#fff' }}>
                    Page {safePage} of {totalPages} {' '}({filtered.length} rows)
                </span>
 
                <button disabled={safePage >= totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                style={{ padding: '4px 12px', cursor: safePage >= totalPages ? 'not-allowed' : 'pointer', background: '#8236fd', color: '#fff', border: '2px solid #ababb9', borderRadius: 10, fontFamily: 'Times New Roman, serif', fontSize: '15px' }}
                >
                    Next →
                </button>
            </div>
        )}
        </>
    )
}

export default DataTable;