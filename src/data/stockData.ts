import type { Stock, Trade, Holding, Position } from '../types/stock.types';

export const stocks: Stock[] = [
  { id: '1', symbol: 'AAPL', name: 'Apple Inc.', price: 189.30, change: 2.15, changePct: 1.15, volume: 54200000, marketCap: 2950000000000, sector: 'Technology' },
  { id: '2', symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.80, change: -0.95, changePct: -0.67, volume: 22300000, marketCap: 1770000000000, sector: 'Technology' },
  { id: '3', symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.90, change: 4.20, changePct: 1.12, volume: 19600000, marketCap: 2810000000000, sector: 'Technology' },
  { id: '4', symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50, change: -7.30, changePct: -2.85, volume: 98700000, marketCap: 791000000000, sector: 'Automotive' },
  { id: '5', symbol: 'JPM', name: 'JPMorgan Chase', price: 196.40, change: 1.05, changePct: 0.54, volume: 8900000, marketCap: 568000000000, sector: 'Finance' },
  { id: '6', symbol: 'NVDA', name: 'NVIDIA Corp.', price: 726.13, change: 15.40, changePct: 2.17, volume: 42100000, marketCap: 1790000000000, sector: 'Technology' },
  { id: '7', symbol: 'AMZN', name: 'Amazon.com Inc.', price: 174.42, change: -1.20, changePct: -0.68, volume: 31500000, marketCap: 1810000000000, sector: 'Consumer Discretionary' },
  { id: '8', symbol: 'UNH', name: 'UnitedHealth Group', price: 525.60, change: 3.10, changePct: 0.59, volume: 3200000, marketCap: 485000000000, sector: 'Healthcare' },
  { id: '9', symbol: 'XOM', name: 'Exxon Mobil Corp.', price: 103.15, change: -0.45, changePct: -0.43, volume: 16800000, marketCap: 410000000000, sector: 'Energy' },
  { id: '10', symbol: 'DIS', name: 'Walt Disney Co.', price: 110.25, change: 2.85, changePct: 2.65, volume: 12400000, marketCap: 201000000000, sector: 'Entertainment' },
  { id: '11', symbol: 'NFLX', name: 'Netflix Inc.', price: 605.88, change: 12.40, changePct: 2.09, volume: 4100000, marketCap: 262000000000, sector: 'Entertainment' },
  { id: '12', symbol: 'V', name: 'Visa Inc.', price: 282.15, change: 0.90, changePct: 0.32, volume: 6200000, marketCap: 580000000000, sector: 'Finance' },
  { id: '13', symbol: 'META', name: 'Meta Platforms Inc.', price: 484.02, change: -2.15, changePct: -0.44, volume: 18500000, marketCap: 1240000000000, sector: 'Technology' },
  { id: '14', symbol: 'BRK.B', name: 'Berkshire Hathaway', price: 408.20, change: 1.80, changePct: 0.44, volume: 3500000, marketCap: 885000000000, sector: 'Finance' },
  { id: '15', symbol: 'LLY', name: 'Eli Lilly & Co.', price: 752.10, change: 8.50, changePct: 1.15, volume: 2900000, marketCap: 715000000000, sector: 'Healthcare' },
  { id: '16', symbol: 'HD', name: 'Home Depot Inc.', price: 362.45, change: -1.10, changePct: -0.30, volume: 3800000, marketCap: 358000000000, sector: 'Consumer Discretionary' },
  { id: '17', symbol: 'PG', name: 'Procter & Gamble', price: 160.12, change: 0.45, changePct: 0.28, volume: 5900000, marketCap: 378000000000, sector: 'Consumer Goods' },
  { id: '18', symbol: 'COST', name: 'Costco Wholesale', price: 725.30, change: 4.15, changePct: 0.58, volume: 2100000, marketCap: 322000000000, sector: 'Consumer Discretionary' },
  { id: '19', symbol: 'CVX', name: 'Chevron Corp.', price: 154.20, change: -0.85, changePct: -0.55, volume: 7200000, marketCap: 288000000000, sector: 'Energy' },
  { id: '20', symbol: 'KO', name: 'Coca-Cola Co.', price: 60.15, change: 0.25, changePct: 0.42, volume: 11200000, marketCap: 260000000000, sector: 'Consumer Goods' },
  { id: '21', symbol: 'PEP', name: 'PepsiCo Inc.', price: 168.45, change: -0.60, changePct: -0.36, volume: 4800000, marketCap: 231000000000, sector: 'Consumer Goods' },
  { id: '22', symbol: 'ADBE', name: 'Adobe Inc.', price: 540.22, change: -15.30, changePct: -2.75, volume: 3500000, marketCap: 242000000000, sector: 'Technology' },
  { id: '23', symbol: 'WMT', name: 'Walmart Inc.', price: 175.55, change: 1.25, changePct: 0.72, volume: 6800000, marketCap: 472000000000, sector: 'Consumer Discretionary' },
  { id: '24', symbol: 'CRM', name: 'Salesforce Inc.', price: 298.10, change: 5.40, changePct: 1.84, volume: 5100000, marketCap: 289000000000, sector: 'Technology' },
  { id: '25', symbol: 'BAC', name: 'Bank of America', price: 34.12, change: 0.15, changePct: 0.44, volume: 38500000, marketCap: 268000000000, sector: 'Finance' },
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
  { id: 't11', stockId: '8', symbol: 'META', type: 'BUY', quantity: 15, price: 485.20, date: '2024-07-12' },
  { id: 't12', stockId: '4', symbol: 'TSLA', type: 'BUY', quantity: 10, price: 210.00, date: '2024-08-05' },
  { id: 't13', stockId: '9', symbol: 'NFLX', type: 'BUY', quantity: 4, price: 620.00, date: '2024-09-22' },
  { id: 't14', stockId: '6', symbol: 'NVDA', type: 'BUY', quantity: 25, price: 118.40, date: '2024-10-15' }, // Post-split price logic
  { id: 't15', stockId: '3', symbol: 'MSFT', type: 'SELL', quantity: 3, price: 425.00, date: '2024-11-02' },
  { id: 't16', stockId: '11', symbol: 'AMD', type: 'BUY', quantity: 30, price: 155.75, date: '2024-12-10' },
  { id: 't17', stockId: '1', symbol: 'AAPL', type: 'SELL', quantity: 15, price: 230.50, date: '2025-01-08' },
  { id: 't18', stockId: '12', symbol: 'V', type: 'BUY', quantity: 8, price: 275.00, date: '2025-01-25' },
  { id: 't19', stockId: '7', symbol: 'AMZN', type: 'SELL', quantity: 10, price: 189.30, date: '2025-02-14' },
  { id: 't20', stockId: '13', symbol: 'PLTR', type: 'BUY', quantity: 100, price: 24.15, date: '2025-02-20' },
  { id: 't21', stockId: '1', symbol: 'AAPL', type: 'BUY', 
    quantity: 10, price: 175.00, date: '2024-01-15' },
  { id: 't22', stockId: '3', symbol: 'MSFT', type: 'BUY', 
    quantity: 5,  price: 360.00, date: '2024-02-20' },
  { id: 't23', stockId: '4', symbol: 'TSLA', type: 'SELL', 
    quantity: 8,  price: 265.00, date: '2024-03-10' },
  { id: 't24', stockId: '6', symbol: 'NVDA', type: 'BUY', 
    quantity: 15, price: 680.50, date: '2024-03-25' },
  { id: 't25', stockId: '1', symbol: 'AAPL', type: 'BUY', 
    quantity: 5,  price: 182.25, date: '2024-04-05' }, 
  { id: 't26', stockId: '7', symbol: 'AMZN', type: 'BUY', 
    quantity: 20, price: 170.10, date: '2024-04-18' },
  { id: 't27', stockId: '6', symbol: 'NVDA', type: 'SELL', 
    quantity: 5,  price: 715.00, date: '2024-05-12' }, 
  { id: 't28', stockId: '10', symbol: 'DIS', type: 'BUY', 
    quantity: 50, price: 105.40, date: '2024-05-30' },
  { id: 't29', stockId: '5', symbol: 'JPM', type: 'BUY', 
    quantity: 12, price: 192.00, date: '2024-06-14' },
  { id: 't30', stockId: '2', symbol: 'GOOGL', type: 'SELL', 
    quantity: 10, price: 145.50, date: '2024-06-28' },
  { id: 't31', stockId: '8', symbol: 'META', type: 'BUY', quantity: 15, price: 485.20, date: '2024-07-12' },
  { id: 't32', stockId: '4', symbol: 'TSLA', type: 'BUY', quantity: 10, price: 210.00, date: '2024-08-05' },
  { id: 't33', stockId: '9', symbol: 'NFLX', type: 'BUY', quantity: 4, price: 620.00, date: '2024-09-22' },
  { id: 't34', stockId: '6', symbol: 'NVDA', type: 'BUY', quantity: 25, price: 118.40, date: '2024-10-15' }, // Post-split price logic
  { id: 't35', stockId: '3', symbol: 'MSFT', type: 'SELL', quantity: 3, price: 425.00, date: '2024-11-02' },
  { id: 't36', stockId: '11', symbol: 'AMD', type: 'BUY', quantity: 30, price: 155.75, date: '2024-12-10' },
  { id: 't37', stockId: '1', symbol: 'AAPL', type: 'SELL', quantity: 15, price: 230.50, date: '2025-01-08' },
  { id: 't38', stockId: '12', symbol: 'V', type: 'BUY', quantity: 8, price: 275.00, date: '2025-01-25' },
  { id: 't39', stockId: '7', symbol: 'AMZN', type: 'SELL', quantity: 10, price: 189.30, date: '2025-02-14' },
  { id: 't40', stockId: '13', symbol: 'PLTR', type: 'BUY', quantity: 100, price: 24.15, date: '2025-02-20' }, 
  { id: 't41', stockId: '1', symbol: 'AAPL', type: 'BUY', 
    quantity: 10, price: 175.00, date: '2024-01-15' },
  { id: 't42', stockId: '3', symbol: 'MSFT', type: 'BUY', 
    quantity: 5,  price: 360.00, date: '2024-02-20' },
  { id: 't43', stockId: '4', symbol: 'TSLA', type: 'SELL', 
    quantity: 8,  price: 265.00, date: '2024-03-10' },
  { id: 't44', stockId: '6', symbol: 'NVDA', type: 'BUY', 
    quantity: 15, price: 680.50, date: '2024-03-25' },
  { id: 't45', stockId: '1', symbol: 'AAPL', type: 'BUY', 
    quantity: 5,  price: 182.25, date: '2024-04-05' }, 
  { id: 't46', stockId: '7', symbol: 'AMZN', type: 'BUY', 
    quantity: 20, price: 170.10, date: '2024-04-18' },
  { id: 't47', stockId: '6', symbol: 'NVDA', type: 'SELL', 
    quantity: 5,  price: 715.00, date: '2024-05-12' }, 
  { id: 't48', stockId: '10', symbol: 'DIS', type: 'BUY', 
    quantity: 50, price: 105.40, date: '2024-05-30' },
  { id: 't49', stockId: '5', symbol: 'JPM', type: 'BUY', 
    quantity: 12, price: 192.00, date: '2024-06-14' },
  { id: 't50', stockId: '2', symbol: 'GOOGL', type: 'SELL', 
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
  { id: 'p1', symbol: 'AAPL', qty: 12, avgPrice: 178.00, ltp: 189.30, pnl: 135.60, pnlPct: 6.35 },
  { id: 'p2', symbol: 'GOOGL', qty: 10, avgPrice: 150.00, ltp: 141.80, pnl: -82.00, pnlPct: -5.47 },
  { id: 'p3', symbol: 'MSFT', qty: 6, avgPrice: 350.00, ltp: 378.90, pnl: 173.40, pnlPct: 8.26 },
  { id: 'p4', symbol: 'TSLA', qty: 7, avgPrice: 260.00, ltp: 248.50, pnl: -80.50, pnlPct: -4.42 },
  { id: 'p5', symbol: 'JPM', qty: 25, avgPrice: 190.00, ltp: 196.40, pnl: 160.00, pnlPct: 3.37 },
  { id: 'p6', symbol: 'NVDA', qty: 5, avgPrice: 690.00, ltp: 726.13, pnl: 180.65, pnlPct: 5.24 },
  { id: 'p7', symbol: 'AMZN', qty: 18, avgPrice: 168.00, ltp: 174.42, pnl: 115.56, pnlPct: 3.82 },
  { id: 'p8', symbol: 'UNH', qty: 3, avgPrice: 500.00, ltp: 525.60, pnl: 76.80, pnlPct: 5.12 },
  { id: 'p9', symbol: 'XOM', qty: 30, avgPrice: 108.00, ltp: 103.15, pnl: -145.50, pnlPct: -4.49 },
  { id: 'p10', symbol: 'DIS', qty: 20, avgPrice: 102.00, ltp: 110.25, pnl: 165.00, pnlPct: 8.09 },

  { id: 'p11', symbol: 'NFLX', qty: 4, avgPrice: 580.00, ltp: 605.88, pnl: 103.52, pnlPct: 4.46 },
  { id: 'p12', symbol: 'V', qty: 10, avgPrice: 270.00, ltp: 282.15, pnl: 121.50, pnlPct: 4.50 },
  { id: 'p13', symbol: 'META', qty: 8, avgPrice: 500.00, ltp: 484.02, pnl: -127.84, pnlPct: -3.20 },
  { id: 'p14', symbol: 'BRK.B', qty: 6, avgPrice: 395.00, ltp: 408.20, pnl: 79.20, pnlPct: 3.34 },
  { id: 'p15', symbol: 'LLY', qty: 3, avgPrice: 730.00, ltp: 752.10, pnl: 66.30, pnlPct: 3.03 },
  { id: 'p16', symbol: 'HD', qty: 9, avgPrice: 370.00, ltp: 362.45, pnl: -67.95, pnlPct: -2.04 },
  { id: 'p17', symbol: 'PG', qty: 15, avgPrice: 155.00, ltp: 160.12, pnl: 76.80, pnlPct: 3.30 },
  { id: 'p18', symbol: 'COST', qty: 4, avgPrice: 700.00, ltp: 725.30, pnl: 101.20, pnlPct: 3.61 },
  { id: 'p19', symbol: 'CVX', qty: 12, avgPrice: 160.00, ltp: 154.20, pnl: -69.60, pnlPct: -3.62 },
  { id: 'p20', symbol: 'KO', qty: 40, avgPrice: 58.00, ltp: 60.15, pnl: 86.00, pnlPct: 3.71 },

  { id: 'p21', symbol: 'PEP', qty: 10, avgPrice: 172.00, ltp: 168.45, pnl: -35.50, pnlPct: -2.06 },
  { id: 'p22', symbol: 'ADBE', qty: 5, avgPrice: 560.00, ltp: 540.22, pnl: -98.90, pnlPct: -3.53 },
  { id: 'p23', symbol: 'WMT', qty: 14, avgPrice: 170.00, ltp: 175.55, pnl: 77.70, pnlPct: 3.26 },
  { id: 'p24', symbol: 'CRM', qty: 7, avgPrice: 285.00, ltp: 298.10, pnl: 91.70, pnlPct: 4.60 },
  { id: 'p25', symbol: 'BAC', qty: 50, avgPrice: 33.00, ltp: 34.12, pnl: 56.00, pnlPct: 3.39 },

  { id: 'p26', symbol: 'AAPL', qty: 8, avgPrice: 185.00, ltp: 189.30, pnl: 34.40, pnlPct: 2.32 },
  { id: 'p27', symbol: 'MSFT', qty: 3, avgPrice: 390.00, ltp: 378.90, pnl: -33.30, pnlPct: -2.85 },
  { id: 'p28', symbol: 'NVDA', qty: 2, avgPrice: 750.00, ltp: 726.13, pnl: -47.74, pnlPct: -3.18 },
  { id: 'p29', symbol: 'AMZN', qty: 10, avgPrice: 180.00, ltp: 174.42, pnl: -55.80, pnlPct: -3.10 },
  { id: 'p30', symbol: 'JPM', qty: 12, avgPrice: 200.00, ltp: 196.40, pnl: -43.20, pnlPct: -1.80 },
];