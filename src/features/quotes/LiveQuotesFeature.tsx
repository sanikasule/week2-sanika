import React from 'react'; 
import type { Stock } from '../../types/stock.types'; 
import StockCard from '../../components/StockCard'; 
import SearchBar from '../../components/SearchBar'; 
import useVirtualList from '../../hooks/useVirtualList'; 
 
const ROW_HEIGHT = 44; // NEW 
const VISIBLE_ROWS = 12; // NEW 
const CONTAINER_HEIGHT = ROW_HEIGHT * VISIBLE_ROWS; // NEW 

interface LiveQuotesFeatureProps { 
    stocks: Stock[]; 
    selectedStock: Stock | null; 
    onSelectStock: (stock: Stock) => void; 
    onSearch: (query: string) => void; 
    onFilterChange: (sector: string) => void; 
} 

const LiveQuotesFeature: React.FC<LiveQuotesFeatureProps> = ({ stocks, selectedStock, onSelectStock, onSearch, onFilterChange, }) => { // NEW: call the hook 
    const result = useVirtualList(stocks, { rowHeight: ROW_HEIGHT, visibleRows: VISIBLE_ROWS, overscan: 3 }); const visibleItems = result.visibleItems; 
    const containerRef = result.containerRef; 
    const spacerAbove = result.spaceAbove; 
    const spacerBelow = result.spaceBelow; const startIndex = result.startIndex

    return (
        <> 
        {/* SearchBar — unchanged */} 
            <SearchBar onSearch={onSearch} onFilterChange={onFilterChange} placeholder="Search by symbol or name..."/> 
            {/* StockCard grid — unchanged */} 
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 24 }}> 
                {stocks.map(function (stock) { 
                return (<StockCard key={stock.id} stock=   {stock} isSelected={selectedStock?.id === stock.id} onSelect={onSelectStock} />); 
                })} 
            </div> 

            <h2 style={{ color: '#E6EDF3' }}> 
                Live Quotes 
                <span style={{ fontSize: 14, fontWeight: 'normal', color: '#6B7280', marginLeft: 12 }}> 
                    {visibleItems.length} of {stocks.length} rows in DOM 
                </span> 
            </h2> 
            
            {/* NEW: fixed-height scrollable container */} 
            <div ref={containerRef} style={{ height: CONTAINER_HEIGHT, overflowY: 'auto', border: '1px solid #E5E7EB', borderRadius: 6 }}> 
                <table style={{ width: '100%', borderCollapse: 'collapse' }}> 
                    <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}> 
                        <tr style={{ background: '#1E3A8A', color: '#fff' }}> 
                            <th style={{ padding: '10px 8px', textAlign: 'left' }}>Symbol</th> 
                            <th style={{ padding: '10px 8px', textAlign: 'left' }}>Company</th> 
                            <th style={{ padding: '10px 8px', textAlign: 'left' }}>Price</th> 
                            <th style={{ padding: '10px 8px', textAlign:  'left' }}>Change %</th> 
                            <th style={{ padding: '10px 8px', textAlign: 'left' }}>Volume</th> 
                            <th style={{ padding: '10px 8px', textAlign: 'left' }}>Sector</th> 
                        </tr> 
                    </thead> 
                    <tbody> 
                        {/* NEW: spacer above */} 
                        {spacerAbove > 0 && (<tr><td colSpan={6} style={{ height: spacerAbove, padding: 0 }} /></tr>)} 
                        {/* NEW: only the visible rows */} 
                        {visibleItems.map(function (stock, indexInSlice) {
                            const actualRowNumber = startIndex + indexInSlice; const background = actualRowNumber % 2 === 0 ? '#ffffff' : '#F8FAFC'; const isPositive = stock.changePct >= 0; const changeColour = isPositive ? '#166534' : '#991B1B'; const changePrefix = isPositive ? '+' : '';

                        return (
                        <tr key={stock.id} onClick={function () { 
                            onSelectStock(stock); }} style={{ height: ROW_HEIGHT, background, cursor: 'pointer', borderBottom: '1px solid #E5E7EB' }}> 
                            <td style={{ padding: '0 8px', fontSize: 14, fontWeight: 'bold' }}>{stock.symbol}</td> 
                            <td style={{ padding: '0 8px', fontSize: 14 }}>{stock.name}</td> 
                            <td style={{ padding: '0 8px', fontSize: 14 }}>${stock.price.toFixed(2)}</td> 
                            <td style={{ padding: '0 8px', fontSize: 14, color: changeColour, fontWeight: 'bold' }}> {changePrefix}{stock.changePct.toFixed(2)}% </td> 
                            <td style={{ padding: '0 8px', fontSize: 14 }}>{stock.volume.toLocaleString()}</td> 
                            <td style={{ padding: '0 8px', fontSize: 14 }}>{stock.sector}</td> 
                        </tr>);
                    })} 
                    {/* NEW: spacer below */} 
                    {spacerBelow > 0 && (<tr><td colSpan={6} style={{ height: spacerBelow, padding: 0 }} /></tr>)} 
                    </tbody> 
                </table> 
            </div> 
            <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 6 }}> {stocks.length} total — {visibleItems.length} rows in the browser right now </p> 
        </>
    ); 
}; 

export default LiveQuotesFeature;

// import React, { useState } from 'react';
// import type { Stock } from '../../types/stock.types';
// import StockCard from '../../components/StockCard';
// import SearchBar from '../../components/SearchBar';
// import useVirtualList from '../../hooks/useVirtualList';

// const ROW_HEIGHT = 44;
// const VISIBLE_ROWS = 12;
// const CONTAINER_HEIGHT = ROW_HEIGHT * VISIBLE_ROWS;

// interface LiveQuotesFeatureProps {
//   stocks: Stock[];
//   selectedStock: Stock | null;
//   onSelectStock: (stock: Stock) => void;
//   onSearch: (query: string) => void;
//   onFilterChange: (sector: string) => void;
// }

// const LiveQuotesFeature: React.FC<LiveQuotesFeatureProps> = ({
//   stocks,
//   selectedStock,
//   onSelectStock,
//   onSearch,
//   onFilterChange,
// }) => {
//   const { visibleItems, containerRef, spaceAbove, spaceBelow, startIndex } =
//     useVirtualList(stocks, {
//       rowHeight: ROW_HEIGHT,
//       visibleRows: VISIBLE_ROWS,
//       overscan: 3,
//     });

//   //comparison state
//   const [comparisonStocks, setComparisonStocks] = useState<Stock[]>([]);

//   const toggleComparison = (stock: Stock) => {
//     const exists = comparisonStocks.some((s) => s.id === stock.id);

//     if (exists) {
//       setComparisonStocks((prev) =>
//         prev.filter((s) => s.id !== stock.id)
//       );
//     } else {
//       if (comparisonStocks.length >= 3) return; 
//       setComparisonStocks((prev) => [...prev, stock]);
//     }
//   };

//   return (
//     <>
//       <SearchBar
//         onSearch={onSearch}
//         onFilterChange={onFilterChange}
//         placeholder="Search by symbol or name..."
//       />

//       {/* Stock Cards */}
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(3,1fr)',
//           gap: 16,
//           marginBottom: 24,
//         }}
//       >
//         {stocks.map((stock) => (
//           <StockCard
//             key={stock.id}
//             stock={stock}
//             isSelected={selectedStock?.id === stock.id}
//             onSelect={onSelectStock}
//           />
//         ))}
//       </div>

//       <h2 style={{ color: '#E6EDF3' }}>
//         Live Quotes
//         <span
//           style={{
//             fontSize: 14,
//             fontWeight: 'normal',
//             color: '#6B7280',
//             marginLeft: 12,
//           }}
//         >
//           {visibleItems.length} of {stocks.length} rows in DOM
//         </span>
//       </h2>

//       {/* Virtualised Table */}
//       <div
//         ref={containerRef}
//         style={{
//           height: CONTAINER_HEIGHT,
//           overflowY: 'auto',
//           border: '1px solid #E5E7EB',
//           borderRadius: 6,
//         }}
//       >
//         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//           <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
//             <tr style={{ background: '#8236fd', color: '#fff' }}>
//               <th style={{ padding: 8 }}>Symbol</th>
//               <th style={{ padding: 8 }}>Company</th>
//               <th style={{ padding: 8 }}>Price</th>
//               <th style={{ padding: 8 }}>Change %</th>
//               <th style={{ padding: 8 }}>Volume</th>
//               <th style={{ padding: 8 }}>Sector</th>
//               <th style={{ padding: 8 }}>Compare</th>
//             </tr>
//           </thead>

//           <tbody>
//             {spaceAbove > 0 && (
//               <tr>
//                 <td colSpan={7} style={{ height: spaceAbove }} />
//               </tr>
//             )}

//             {visibleItems.map((stock, indexInSlice) => {
//               const actualRowNumber = startIndex + indexInSlice;
//               const background =
//                 actualRowNumber % 2 === 0 ? '#ffffff' : '#F8FAFC';

//               const isPositive = stock.changePct >= 0;
//               const changeColour = isPositive ? '#166534' : '#991B1B';
//               const changePrefix = isPositive ? '+' : '';

//               const isCompared = comparisonStocks.some(
//                 (s) => s.id === stock.id
//               );

//               return (
//                 <tr
//                   key={stock.id}
//                   style={{
//                     height: ROW_HEIGHT,
//                     background,
//                     borderBottom: '1px solid #E5E7EB',
//                   }}
//                 >
//                   <td style={{ padding: 8 }}>{stock.symbol}</td>
//                   <td style={{ padding: 8 }}>{stock.name}</td>
//                   <td style={{ padding: 8 }}>
//                     ${stock.price.toFixed(2)}
//                   </td>
//                   <td
//                     style={{
//                       padding: 8,
//                       color: changeColour,
//                       fontWeight: 'bold',
//                     }}
//                   >
//                     {changePrefix}
//                     {stock.changePct.toFixed(2)}%
//                   </td>
//                   <td style={{ padding: 8 }}>
//                     {stock.volume.toLocaleString()}
//                   </td>
//                   <td style={{ padding: 8 }}>{stock.sector}</td>
//                   <td style={{ padding: 8 }}>
//                     <button
//                       onClick={() => toggleComparison(stock)}
//                       style={{
//                         padding: '4px 8px',
//                         background: isCompared
//                           ? '#DC2626'
//                           : '#8236fd',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: 4,
//                         cursor: 'pointer',
//                       }}
//                     >
//                       {isCompared ? 'Remove' : 'Compare'}
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}

//             {spaceBelow > 0 && (
//               <tr>
//                 <td colSpan={7} style={{ height: spaceBelow }} />
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Comparison Table */}
//       {comparisonStocks.length >= 2 && (
//         <>
//           <h2 style={{ marginTop: 32, color: '#E6EDF3' }}>Stock Comparison</h2>

//           <table
//             style={{
//               width: '100%',
//               borderCollapse: 'collapse',
//               marginTop: 12,
//               border: '1px solid #E6EDF3',
//             }}
//           >
//             <thead>
//               <tr style={{ background: '#8236fd', color: 'white' }}>
//                 <th style={{ padding: 10 }}>Metric</th>
//                 {comparisonStocks.map((stock) => (
//                   <th key={stock.id} style={{ padding: 10 }}>
//                     {stock.symbol}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               <ComparisonRow
//                 label="Price"
//                 values={comparisonStocks.map((s) =>
//                   `$${s.price.toFixed(2)}`
//                 )}
//               />
//               <ComparisonRow
//                 label="Change %"
//                 values={comparisonStocks.map(
//                   (s) => `${s.changePct.toFixed(2)}%`
//                 )}
//               />
//               <ComparisonRow
//                 label="Volume"
//                 values={comparisonStocks.map((s) =>
//                   s.volume.toLocaleString()
//                 )}
//               />
//               <ComparisonRow
//                 label="Sector"
//                 values={comparisonStocks.map((s) => s.sector)}
//               />
//             </tbody>
//           </table>
//         </>
//       )}
//     </>
//   );
// };

// const ComparisonRow: React.FC<{
//   label: string;
//   values: string[];
// }> = ({ label, values }) => (
//   <tr>
//     <td style={{ padding: 10, fontWeight: 'bold', color:'#fff' }}>{label}</td>
//     {values.map((val, index) => (
//       <td key={index} style={{ padding: 10, color: '#fff' }}>
//         {val}
//       </td>
//     ))}
//   </tr>
// );

// export default LiveQuotesFeature;