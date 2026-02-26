// import React from 'react';
// import type { Position } from '../../types/stock.types';
// import DataTable from '../../components/DataTable';
// import useInfiniteScroll from '../../hooks/useInfiniteScroll';
// import usePositionStore from '../../stores/usePositionStore';
// import { useShallow } from 'zustand/shallow';

// interface PositionFeatureProps {
//   positions: Position[];
//   onSelect?: (position: Position) => void;
// }

// const PositionFeature: React.FC<PositionFeatureProps> = ({
//   positions,
//   onSelect,
// }) => {

  
//   const { visibleItems, bottomRef, hasMore } =
//     useInfiniteScroll(positions, 5);

//   const {toggleCompare, compareList, removePosition} = usePositionStore(
//     useShallow((s) => ({
//       toggleCompare: s.toggleCompare,
//       compareList: s.compareList,
//       removePosition: s.removePosition
//     }))
//   )
//   // const toggleCompare = usePositionStore((s) => s.toggleCompare);
//   // const compareList   = usePositionStore((s) => s.compareList);
//   // const removePosition = usePositionStore((s) => s.removePosition)

//   const isInCompare = (position: Position) =>
//     compareList.some((item) => item.id === position.id);

//   return (
//     <div style={{ marginBottom: 40 }}>

//       <h2 style={{ color: '#E6EDF3', marginTop: 32 }}>
//         Current Positions
//         <span
//           style={{
//             fontSize: 14,
//             fontWeight: 'normal',
//             color: '#6B7280',
//             marginLeft: 12,
//           }}
//         >
//           {visibleItems.length} of {positions.length} shown
//         </span>
//       </h2>

//       <DataTable<Position>
//         data={visibleItems}
//         rowKey="id"
//         filterKey="symbol"
//         pageSize={10}

//         columns={[
          
//           { key: 'symbol', header: 'Symbol', sortable: true,
//             render: (value, row: Position) => (
//             <div style={
//                 isInCompare(row)
//                 ? { backgroundColor: '#DBEAFE', padding: '4px' }
//                 : {}
//             }
//             >
//             {value}
//             </div>
//           ) },

//           { key: 'qty', header: 'Quantity', sortable: true },

//           {
//             key: 'avgPrice',
//             header: 'Average Price',
//             sortable: true,
//             render: (value) => '$' + Number(value).toFixed(2),
//           },

//           {
//             key: 'ltp',
//             header: 'LTP',
//             sortable: true,
//             render: (value) => '$' + Number(value).toFixed(2),
//           },

//           {
//             key: 'pnl',
//             header: 'P&L',
//             sortable: true,
//             render: (v) => {
//               const n = Number(v);
//               return (
//                 <span style={{ color: n >= 0 ? 'green' : 'red' }}>
//                   {n >= 0 ? '+' : ''}
//                   {n.toFixed(2)}
//                 </span>
//               );
//             },
//           },

//           {
//             key: 'pnlPct',
//             header: 'P&L %',
//             sortable: true,
//             render: (v) => {
//               const n = Number(v);
//               return (
//                 <span style={{ color: n >= 0 ? 'green' : 'red' }}>
//                   {n >= 0 ? '+' : ''}
//                   {n.toFixed(2)}%
//                 </span>
//               );
//             },
//           },

//           {
//             key: '__actions',
//             header: '',
//             render: (_, row) => {
//               const inCompare = isInCompare(row);

//               return (
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     toggleCompare(row);
//                   }}
//                   style={{
//                     background: inCompare ? '#1E40AF' : '#E5E7EB',
//                     color: inCompare ? '#fff' : '#374151',
//                     border: 'none',
//                     borderRadius: 4,
//                     padding: '2px 8px',
//                     fontSize: 11,
//                     cursor: 'pointer',
//                     fontWeight: inCompare ? 'bold' : 'normal',
//                   }}
//                 >
//                   {inCompare ? '✓ Compare' : '+ Compare'}
//                 </button>
//               );
//             },
//           },

//           {
//             key: '__remove',
//             header: '',
//             render: (_, row) => {
//               return (
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     removePosition(String(row.id));
//                   }}
//                   style={{
//                     background: '##ef8e8e',
//                     color: 'red',
//                     border: '1px solid red',
//                     borderRadius: 4,
//                     padding: '2px 8px',
//                     fontSize: 11,
//                     cursor: 'pointer',
//                   }}
//                 >
//                   Remove
//                 </button>
//               );
//             },
//           },
//         ]}

//         onRowClick={(row) => onSelect?.(row)}
//       />

//       {/* Sentinel */}
//       <div ref={bottomRef} style={{ height: 1 }} />

//       {hasMore && (
//         <p
//           style={{
//             textAlign: 'center',
//             color: '#6B7280',
//             padding: '8px 0',
//           }}
//         >
//           Scroll down to see more positions...
//         </p>
//       )}

//       {hasMore === false && positions.length > 0 && (
//         <p
//           style={{
//             textAlign: 'center',
//             color: '#9CA3AF',
//             padding: '8px 0',
//           }}
//         >
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
import { useShallow } from 'zustand/react/shallow';

interface PositionFeatureProps {
  onSelect?: (position: Position) => void;
}

const PositionFeature: React.FC<PositionFeatureProps> = ({
  onSelect,
}) => {
  // 1. Get data and actions from the store
  // We use allPositions from store as the source of truth
  const { allPositions, toggleCompare, compareList, addPosition, removePosition } = usePositionStore(
    useShallow((s) => ({
      allPositions: s.allPositions,
      toggleCompare: s.toggleCompare,
      compareList: s.compareList,
      addPosition: s.addPosition,
      removePosition: s.removePosition,
    }))
  );

  // 2. Pass the store's list to the infinite scroll hook
  const { visibleItems, bottomRef, hasMore } = useInfiniteScroll(allPositions, 5);

  const isInCompare = (position: Position) =>
    compareList.some((item) => item.id === position.id);

  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ color: '#E6EDF3', marginTop: 32 }}>
        Current Positions
        <span style={{ fontSize: 14, fontWeight: 'normal', color: '#6B7280', marginLeft: 12 }}>
          {visibleItems.length} of {allPositions.length} shown
        </span>
      </h2>

      <DataTable<Position>
        data={visibleItems}
        rowKey="id"
        filterKey="symbol"
        pageSize={10}
        columns={[
          { 
            key: 'symbol', 
            header: 'Symbol', 
            sortable: true,
            render: (value, row: Position) => (
              <div style={isInCompare(row) ? { backgroundColor: '#1e3a8a', padding: '4px', borderRadius: '4px' } : {}}>
                {value}
              </div>
            ) 
          },
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
                <span style={{ color: n >= 0 ? '#10b981' : '#ef4444' }}>
                  {n >= 0 ? '+' : ''}{n.toFixed(2)}
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
                <span style={{ color: n >= 0 ? '#10b981' : '#ef4444' }}>
                  {n >= 0 ? '+' : ''}{n.toFixed(2)}%
                </span>
              );
            },
          },
          {
            key: '__actions',
            header: 'Compare',
            render: (_, row) => {
              const inCompare = isInCompare(row);
              return (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCompare(row);
                  }}
                  style={{
                    background:   inCompare ? '#1E40AF' : '#E5E7EB',
                    color: inCompare ? '#fff'    : '#374151',
                    border: 'none',
                    borderRadius: 4,
                    padding: '4px 12px',
                    fontSize: 11,
                    cursor: 'pointer',
                  }}
                >
                  {inCompare ? '✓ Selected' : '+ Compare'}
                </button>
              );
            },
          },
          {
            key: '__add',
            header: 'Add',
            render: (_, row) => (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addPosition(row); 
                }}
                style={{
                  background: 'transparent',
                  color: 'green',
                  border: '1px solid green',
                  borderRadius: 4,
                  padding: '4px 12px',
                  fontSize: 11,
                  cursor: 'pointer',
                }}
              >
                Add
              </button>
            ),
          },
          {
            key: '__remove',
            header: 'Actions',
            render: (_, row) => (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removePosition(row.id); // Passing the ID string
                }}
                style={{
                  background: 'transparent',
                  color: '#ef4444',
                  border: '1px solid #ef4444',
                  borderRadius: 4,
                  padding: '4px 12px',
                  fontSize: 11,
                  cursor: 'pointer',
                }}
              >
                Remove
              </button>
            ),
          },
        ]}
        onRowClick={(row) => onSelect?.(row)}
      />

      <div ref={bottomRef} style={{ height: 20 }} />

      {hasMore ? (
        <p style={{ textAlign: 'center', color: '#6B7280' }}>Loading more...</p>
      ) : (
        <p style={{ textAlign: 'center', color: '#9CA3AF' }}>All positions loaded</p>
      )}
    </div>
  );
};

export default PositionFeature;