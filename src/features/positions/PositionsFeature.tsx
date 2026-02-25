// import React from 'react';
// import type { Position } from '../../types/stock.types';
// import DataTable          from '../../components/DataTable';
// import useInfiniteScroll  from '../../hooks/useInfiniteScroll'; // NEW
 
// interface PositionFeatureProps {
//   positions:  Position[];
// //   stocks:        Stock[];
// //   selectedStock: Stock | null;
// }
 
// const PositionFeature: React.FC<PositionFeatureProps> = ({
//   positions,
// //   stocks,
// //   selectedStock,
// }) => {
 
//   // NEW: get the slice of items + ref + flag from the hook
//   const { visibleItems, bottomRef, hasMore } = useInfiniteScroll(positions, 5);
 
//   return (
//     <div style={{marginBottom: 40}}>
//       <h2 style={{ color: '#E6EDF3', marginTop: 32 }}>
//         Current Positions
//         <span style={{ fontSize: 14, fontWeight: 'normal', color: '#6B7280', marginLeft: 12 }}>
//           {visibleItems.length} of {positions.length} shown
//         </span>
//       </h2>
 
//       {/* data={visibleItems} is the only change inside DataTable */}
//       <DataTable<Position>
//         data={visibleItems}
//         rowKey="id"
//         filterKey="symbol"
//         pageSize={10}
//         columns={[
//           { key: 'symbol',   header: 'Symbol',  sortable: true },
//           { key: 'qty', header: 'Quantity',   sortable: true },
//           { key: 'avgPrice',    header: 'Average Price', sortable: true,
//             render: function(value) { return '$' + Number(value).toFixed(2); }
//           },
//           { key: 'ltp',    header: 'LTP', sortable: true,
//             render: function(value) { return '$' + Number(value).toFixed(2); }
//           },
//           { key: 'pnl', header: 'P&L', sortable: true,
//             render: v => {
//               const n = Number(v);
//               return <span style={{color: n>=0 ? 'green' : 'red'}}>
//                 {n>=0 ? '+' : ''}{n}
//               </span>
//             } },
//           { key: 'pnlPct', header: 'P&L %', sortable: true,
//             render: v => {
//               const n = Number(v);
//               return <span style={{color: n>=0 ? 'green' : 'red'}}>
//                 {n>=0 ? "+" : "-"}${Number(v).toFixed(2)}%
//               </span>
//             } 
//           },
//         ]}
//       />
 
//       {/* NEW: the sentinel div — observer watches this */}
//       <div ref={bottomRef} style={{ height: 1 }} />
 
//       {/* NEW: status messages */}
//       {hasMore && (
//         <p style={{ textAlign: 'center', color: '#6B7280', padding: '8px 0' }}>
//           Scroll down to see more positions...
//         </p>
//       )}
//       {hasMore === false && positions.length > 0 && (
//         <p style={{ textAlign: 'center', color: '#9CA3AF', padding: '8px 0' }}>
//           All {positions.length} positions loaded
//         </p>
//       )}
//     </div>
//   );
// };
 
// export default PositionFeature;

import React from 'react';
import type { Position } from '../../types/stock.types';
import DataTable from '../../components/DataTable';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import usePositionStore from '../../stores/usePositionStore';

interface PositionFeatureProps {
  positions: Position[];
  onSelect?: (position: Position) => void;
}

const PositionFeature: React.FC<PositionFeatureProps> = ({
  positions,
  onSelect,
}) => {

  
  const { visibleItems, bottomRef, hasMore } =
    useInfiniteScroll(positions, 5);

  
  const toggleCompare = usePositionStore((s) => s.toggleCompare);
  const compareList   = usePositionStore((s) => s.compareList);

  const isInCompare = (position: Position) =>
    compareList.some((item) => item.id === position.id);

  return (
    <div style={{ marginBottom: 40 }}>

      <h2 style={{ color: '#E6EDF3', marginTop: 32 }}>
        Current Positions
        <span
          style={{
            fontSize: 14,
            fontWeight: 'normal',
            color: '#6B7280',
            marginLeft: 12,
          }}
        >
          {visibleItems.length} of {positions.length} shown
        </span>
      </h2>

      <DataTable<Position>
        data={visibleItems}
        rowKey="id"
        filterKey="symbol"
        pageSize={10}

        columns={[
          
          { key: 'symbol', header: 'Symbol', sortable: true,
            render: (value, row: Position) => (
            <div style={
                isInCompare(row)
                ? { backgroundColor: '#DBEAFE', padding: '4px' }
                : {}
            }
            >
            {value}
            </div>
          ) },

          { key: 'qty', header: 'Quantity', sortable: true },

          {
            key: 'avgPrice',
            header: 'Average Price',
            sortable: true,
            render: (value) => '$' + Number(value).toFixed(2),
          },

          {
            key: 'ltp',
            header: 'LTP',
            sortable: true,
            render: (value) => '$' + Number(value).toFixed(2),
          },

          {
            key: 'pnl',
            header: 'P&L',
            sortable: true,
            render: (v) => {
              const n = Number(v);
              return (
                <span style={{ color: n >= 0 ? 'green' : 'red' }}>
                  {n >= 0 ? '+' : ''}
                  {n.toFixed(2)}
                </span>
              );
            },
          },

          {
            key: 'pnlPct',
            header: 'P&L %',
            sortable: true,
            render: (v) => {
              const n = Number(v);
              return (
                <span style={{ color: n >= 0 ? 'green' : 'red' }}>
                  {n >= 0 ? '+' : ''}
                  {n.toFixed(2)}%
                </span>
              );
            },
          },

          {
            key: '__actions',
            header: '',
            render: (_, row) => {
              const inCompare = isInCompare(row);

              return (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCompare(row);
                  }}
                  style={{
                    background: inCompare ? '#1E40AF' : '#E5E7EB',
                    color: inCompare ? '#fff' : '#374151',
                    border: 'none',
                    borderRadius: 4,
                    padding: '2px 8px',
                    fontSize: 11,
                    cursor: 'pointer',
                    fontWeight: inCompare ? 'bold' : 'normal',
                  }}
                >
                  {inCompare ? '✓ Compare' : '+ Compare'}
                </button>
              );
            },
          },
        ]}

        onRowClick={(row) => onSelect?.(row)}
      />

      {/* Sentinel */}
      <div ref={bottomRef} style={{ height: 1 }} />

      {hasMore && (
        <p
          style={{
            textAlign: 'center',
            color: '#6B7280',
            padding: '8px 0',
          }}
        >
          Scroll down to see more positions...
        </p>
      )}

      {hasMore === false && positions.length > 0 && (
        <p
          style={{
            textAlign: 'center',
            color: '#9CA3AF',
            padding: '8px 0',
          }}
        >
          All {positions.length} positions loaded
        </p>
      )}
    </div>
  );
};

export default PositionFeature;
