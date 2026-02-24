import type { Stock, Trade, Holding, Position } from '../types/stock.types';
 
export const stocks: Stock[] = [
  { id: '1', symbol: 'AAPL', name: 'Apple Inc.', 
    price: 189.30, change: 2.15, changePct: 1.15, 
    volume: 54_200_000, marketCap: 2_950_000_000_000, sector: 'Technology' },
  { id: '2', symbol: 'GOOGL', name: 'Alphabet Inc.', 
    price: 141.80, change: -0.95, changePct: -0.67, 
    volume: 22_300_000, marketCap: 1_770_000_000_000, sector: 'Technology' },
  { id: '3', symbol: 'MSFT', name: 'Microsoft Corp.', 
    price: 378.90, change: 4.20, changePct: 1.12, 
    volume: 19_600_000, marketCap: 2_810_000_000_000, sector: 'Technology' },
  { id: '4', symbol: 'TSLA', name: 'Tesla Inc.', 
    price: 248.50, change: -7.30, changePct: -2.85, 
    volume: 98_700_000, marketCap: 791_000_000_000, sector: 'Automotive' },
  { id: '5', symbol: 'JPM',  name: 'JPMorgan Chase', 
    price: 196.40, change: 1.05, changePct: 0.54, 
    volume: 8_900_000, marketCap: 568_000_000_000, sector: 'Finance' },
  { id: '6', symbol: 'NVDA', name: 'NVIDIA Corp.', 
    price: 726.13, change: 15.40, changePct: 2.17, 
    volume: 42_100_000, marketCap: 1_790_000_000_000, sector: 'Technology' },
  { id: '7', symbol: 'AMZN', name: 'Amazon.com Inc.', 
    price: 174.42, change: -1.20, changePct: -0.68, 
    volume: 31_500_000, marketCap: 1_810_000_000_000, sector: 'Consumer Discretionary' },
  { id: '8', symbol: 'UNH',  name: 'UnitedHealth Group', 
    price: 525.60, change: 3.10, changePct: 0.59, 
    volume: 3_200_000, marketCap: 485_000_000_000, sector: 'Healthcare' },
  { id: '9', symbol: 'XOM',  name: 'Exxon Mobil Corp.', 
    price: 103.15, change: -0.45, changePct: -0.43, 
    volume: 16_800_000, marketCap: 410_000_000_000, sector: 'Energy' },
  { id: '10', symbol: 'DIS', name: 'Walt Disney Co.', 
    price: 110.25, change: 2.85, changePct: 2.65, 
    volume: 12_400_000, marketCap: 201_000_000_000, sector: 'Entertainment' },
];
 
export const trades: Trade[] = [
  { id: 't1', stockId: '1', symbol: 'AAPL', type: 'BUY', 
    quantity: 10, price: 175.00, date: '2024-01-15' },
  { id: 't2', stockId: '3', symbol: 'MSFT', type: 'BUY', 
    quantity: 5,  price: 360.00, date: '2024-02-20' },
  { id: 't3', stockId: '4', symbol: 'TSLA', type: 'SELL', 
    quantity: 8,  price: 265.00, date: '2024-03-10' },
  { id: 't4', stockId: '6', symbol: 'NVDA', type: 'BUY', 
    quantity: 15, price: 680.50, date: '2024-03-25' },
  { id: 't5', stockId: '1', symbol: 'AAPL', type: 'BUY', 
    quantity: 5,  price: 182.25, date: '2024-04-05' }, 
  { id: 't6', stockId: '7', symbol: 'AMZN', type: 'BUY', 
    quantity: 20, price: 170.10, date: '2024-04-18' },
  { id: 't7', stockId: '6', symbol: 'NVDA', type: 'SELL', 
    quantity: 5,  price: 715.00, date: '2024-05-12' }, 
  { id: 't8', stockId: '10', symbol: 'DIS', type: 'BUY', 
    quantity: 50, price: 105.40, date: '2024-05-30' },
  { id: 't9', stockId: '5', symbol: 'JPM', type: 'BUY', 
    quantity: 12, price: 192.00, date: '2024-06-14' },
  { id: 't10', stockId: '2', symbol: 'GOOGL', type: 'SELL', 
    quantity: 10, price: 145.50, date: '2024-06-28' },
];

export const holdings: Holding[] = [
  {
    id: 'h1', symbol: 'AAPL', qty: 10,
    investedValue: 1750.00, currentValue: 1893.00, totalReturn: 143.00
  },
  {
    id: 'h2', symbol: 'MSFT', qty: 5,
    investedValue: 1800.00, currentValue: 1894.50, totalReturn: 94.50
  },
  {
    id: 'h3', symbol: 'TSLA', qty: 8,
    investedValue: 2120.00, currentValue: 1988.00, totalReturn: -132.00
  },
  {
    id: 'h4', symbol: 'GOOGL', qty: 15,
    investedValue: 2175.00, currentValue: 2127.00, totalReturn: -48.00
  },
  {
    id: 'h5', symbol: 'JPM', qty: 20,
    investedValue: 3840.00, currentValue: 3928.00, totalReturn: 88.00
  },
  // --- New Holdings ---
  {
    id: 'h6', symbol: 'NVDA', qty: 10,
    investedValue: 6805.00, currentValue: 7261.30, totalReturn: 456.30
  },
  {
    id: 'h7', symbol: 'AMZN', qty: 20,
    investedValue: 3402.00, currentValue: 3488.40, totalReturn: 86.40
  },
  {
    id: 'h8', symbol: 'UNH', qty: 4,
    investedValue: 2040.00, currentValue: 2102.40, totalReturn: 62.40
  },
  {
    id: 'h9', symbol: 'XOM', qty: 25,
    investedValue: 2650.00, currentValue: 2578.75, totalReturn: -71.25
  },
  {
    id: 'h10', symbol: 'DIS', qty: 30,
    investedValue: 3162.00, currentValue: 3307.50, totalReturn: 145.50
  }
];

export const positions: Position[] = [
  {
    id: 'p1', symbol: 'AAPL', qty: 10,
    avgPrice: 175.00, ltp: 189.30,
    pnl: 143.00, pnlPct: 8.17, 
  },
  {
    id: 'p2', symbol: 'MSFT', qty: 5,
    avgPrice: 360.00, ltp: 378.90,
    pnl: 94.50, pnlPct: 5.25, 
  },
  {
    id: 'p3', symbol: 'TSLA', qty: 8,
    avgPrice: 265.00, ltp: 248.50,
    pnl: -132.00, pnlPct: -6.23, 
  },
  {
    id: 'p4', symbol: 'GOOGL', qty: 15,
    avgPrice: 145.00, ltp: 141.80,
    pnl: -48.00, pnlPct: -2.21, 
  },
  {
    id: 'p5', symbol: 'JPM', qty: 20,
    avgPrice: 192.00, ltp: 196.40,
    pnl: 88.00, pnlPct: 2.29, 
  },
  // --- New Active Positions ---
  {
    id: 'p6', symbol: 'NVDA', qty: 10,
    avgPrice: 680.50, ltp: 726.13,
    pnl: 456.30, pnlPct: 6.71, 
  },
  {
    id: 'p7', symbol: 'AMZN', qty: 20,
    avgPrice: 170.10, ltp: 174.42,
    pnl: 86.40, pnlPct: 2.54, 
  },
  {
    id: 'p8', symbol: 'UNH', qty: 4,
    avgPrice: 510.00, ltp: 525.60,
    pnl: 62.40, pnlPct: 3.06, 
  },
  {
    id: 'p9', symbol: 'XOM', qty: 25,
    avgPrice: 106.00, ltp: 103.15,
    pnl: -71.25, pnlPct: -2.69, 
  },
  {
    id: 'p10', symbol: 'DIS', qty: 30,
    avgPrice: 105.40, ltp: 110.25,
    pnl: 145.50, pnlPct: 4.60, 
  },
];