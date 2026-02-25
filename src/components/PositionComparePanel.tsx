// FILE: src/components/PositionComparePanel.tsx

import React from 'react';
import usePositionStore from '../stores/usePositionStore';
import type { Position } from '../types/stock.types';

/* ──────────────────────────────────────────────────────────────
   Row Configuration Type
   --------------------------------------------------------------
   better:
     'higher' → higher value is better (highlight max)
     'lower'  → lower value is better (highlight min)
────────────────────────────────────────────────────────────── */

type CompareRow = {
  label: string;
  key: keyof Position;
  format?: (v: unknown) => React.ReactNode;
  better?: 'higher' | 'lower';
};

const COMPARE_ROWS: CompareRow[] = [
  { key: 'symbol', label: 'Symbol' },

  { key: 'qty', label: 'Quantity', better: 'higher' },

  {
    key: 'avgPrice',
    label: 'Average Price',
    better: 'lower',
    format: (v) => `$${Number(v).toFixed(2)}`,
  },

  {
    key: 'ltp',
    label: 'LTP',
    better: 'higher',
    format: (v) => `$${Number(v).toFixed(2)}`,
  },

  {
    key: 'pnl',
    label: 'P&L',
    better: 'higher',
    format: (v) => {
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
    label: 'P&L %',
    better: 'higher',
    format: (v) => {
      const n = Number(v);
      return (
        <span style={{ color: n >= 0 ? 'green' : 'red' }}>
          {n >= 0 ? '+' : ''}
          {n.toFixed(2)}%
        </span>
      );
    },
  },
];

/* ──────────────────────────────────────────────────────────────
   Component
────────────────────────────────────────────────────────────── */

const PositionComparePanel: React.FC = () => {
  const compareList = usePositionStore((s) => s.compareList);
  const clearCompare = usePositionStore((s) => s.clearCompare);
  const toggleCompare = usePositionStore((s) => s.toggleCompare);

  if (compareList.length < 2) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff',
        borderTop: '2px solid #1E40AF',
        padding: '16px 24px',
        zIndex: 1000,
        boxShadow: '0 -4px 12px rgba(0,0,0,0.12)',
        maxHeight: '40vh',
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <h3 style={{ margin: 0, color: '#1E3A8A', fontSize: 16 }}>
          Comparing {compareList.length} Position
          {compareList.length > 1 ? 's' : ''}
        </h3>

        <button
          onClick={clearCompare}
          style={{
            background: '#FEE2E2',
            color: '#991B1B',
            border: 'none',
            borderRadius: 4,
            padding: '6px 14px',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 'bold',
          }}
        >
          Clear All
        </button>
      </div>

      {/* Table */}
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 13,
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#1E3A8A', color: '#fff' }}>
            <th
              style={{
                padding: '8px 12px',
                textAlign: 'left',
                width: 130,
                fontWeight: 'bold',
              }}
            >
              Metric
            </th>

            {compareList.map((position) => (
              <th
                key={position.id}
                style={{
                  padding: '8px 12px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  minWidth: 110,
                }}
              >
                <span>{position.symbol}</span>

                <button
                  onClick={() => toggleCompare(position)}
                  style={{
                    marginLeft: 8,
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    color: '#fff',
                    borderRadius: 3,
                    padding: '1px 5px',
                    cursor: 'pointer',
                    fontSize: 10,
                    lineHeight: '14px',
                  }}
                >
                  ✕
                </button>

                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 'normal',
                    opacity: 0.8,
                    marginTop: 2,
                  }}
                >
                  {position.symbol}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {COMPARE_ROWS.map((row, rowIndex) => (
            <tr
              key={row.key}
              style={{
                backgroundColor:
                  rowIndex % 2 === 0 ? '#fff' : '#F8FAFC',
              }}
            >
              <td
                style={{
                  padding: '7px 12px',
                  fontWeight: 'bold',
                  color: '#374151',
                  borderRight: '1px solid #E5E7EB',
                }}
              >
                {row.label}
              </td>

              {compareList.map((position) => {
                const rawValue = position[row.key];

                const displayValue = row.format
                  ? row.format(rawValue)
                  : String(rawValue);

                const isNumeric = typeof rawValue === 'number';

                const allNums = isNumeric
                  ? compareList.map(
                      (p) => p[row.key] as number
                    )
                  : [];

                const bestVal =
                  isNumeric && row.better
                    ? row.better === 'lower'
                      ? Math.min(...allNums)
                      : Math.max(...allNums)
                    : null;

                const isBest =
                  isNumeric && rawValue === bestVal;

                return (
                  <td
                    key={position.id}
                    style={{
                      padding: '7px 12px',
                      textAlign: 'center',
                      color: isBest
                        ? '#166534'
                        : '#111827',
                      fontWeight: isBest
                        ? 'bold'
                        : 'normal',
                      backgroundColor: isBest
                        ? '#D1FAE5'
                        : 'transparent',
                      borderRight:
                        '1px solid #F3F4F6',
                      transition:
                        'background-color 0.2s ease',
                    }}
                  >
                    {isBest && (
                      <span style={{ marginRight: 4 }}>
                        {row.better === 'lower'
                          ? '▼'
                          : '▲'}
                      </span>
                    )}
                    {displayValue}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PositionComparePanel;