import React from 'react';
import type { Trade } from '../../types/stock.types';
import DataTable from '../../components/DataTable';
import TradeForm from '../../components/TradeForm';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { useTradeStore } from '../../stores/useTradeStore'; // Import Trade Store
import useStockStore from '../../stores/useStockStore';   // Import Stock Store
import { useShallow } from 'zustand/shallow';

const TradeFeature: React.FC = () => {
  // 1. Pull Trade data and actions
  const { tradeHistory, addTrade } = useTradeStore(
    useShallow((state) => ({
      tradeHistory: state.tradeHistory,
      addTrade: state.addTrade,
    }))
  );

  // 2. Pull Stock data needed for the Form
  const { allStocks, selectedStock } = useStockStore(
    useShallow((state) => ({
      allStocks: state.allStocks,
      selectedStock: state.selectedStock,
    }))
  );

  // 3. Infinite scroll logic using store data
  const { visibleItems, bottomRef, hasMore } = useInfiniteScroll(tradeHistory, 10);

  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ color: '#E6EDF3', marginTop: 32 }}>
        Trade History
        <span style={{ fontSize: 14, fontWeight: 'normal', color: '#6B7280', marginLeft: 12 }}>
          {visibleItems.length} of {tradeHistory.length} shown
        </span>
      </h2>

      <DataTable<Trade>
        data={visibleItems}
        rowKey="id"
        filterKey="symbol"
        pageSize={0}
        columns={[
          { key: 'symbol', header: 'Symbol', sortable: true },
          {
            key: 'type',
            header: 'Type',
            render: (value) => {
              const colour = value === 'BUY' ? '#10B981' : '#EF4444';
              return <strong style={{ color: colour }}>{String(value)}</strong>;
            },
          },
          { key: 'quantity', header: 'Qty', sortable: true },
          {
            key: 'price',
            header: 'Price',
            sortable: true,
            render: (value) => '$' + Number(value).toFixed(2),
          },
          { key: 'date', header: 'Date', sortable: true },
        ]}
      />

      <div ref={bottomRef} style={{ height: 1 }} />

      {hasMore ? (
        <p style={{ textAlign: 'center', color: '#6B7280', padding: '8px 0' }}>
          Scroll down to see more trades...
        </p>
      ) : (
        tradeHistory.length > 0 && (
          <p style={{ textAlign: 'center', color: '#9CA3AF', padding: '8px 0' }}>
            All {tradeHistory.length} trades loaded
          </p>
        )
      )}

      <h2 style={{ color: '#E6EDF3', marginTop: 32 }}>Place a Trade</h2>
      <TradeForm
        stocks={allStocks}
        onSubmitTrade={addTrade} // Connect form directly to store action
        initialValues={selectedStock ?? {}}
      />
    </div>
  );
};

export default TradeFeature;