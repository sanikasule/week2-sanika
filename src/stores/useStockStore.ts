import { create } from "zustand";
import type { Stock } from "../types/stock.types";
import { stocks } from "../data/stockData";

interface StockStore {
    allStocks: Stock[];
    searchQuery: string;
    sectorFilter: string;
    filteredStocks: Stock[];
    compareList: Stock[];
    selectedStock: Stock | null;

    setSearchQuery:   (query: string)        => void; 
    setSectorFilter:  (sector: string)       => void;
    setSelectedStock: (stock: Stock | null) => void;
    toggleCompare: (stock: Stock) => void;
    clearCompare: () => void;
    isInCompare: (id: string) => boolean;
}

function computeFiltered(
  stocks: Stock[],
  query:  string,
  sector: string,
): Stock[] {
  return stocks.filter(function (stock) {

    const q = query.toLowerCase();

    const matchesSearch =
      stock.symbol.toLowerCase().includes(q) ||
      stock.name.toLowerCase().includes(q);

    const matchesSector = sector === '' || stock.sector === sector;

    return matchesSearch && matchesSector;
  });
}

const useStockStore = create<StockStore>() ((set, get) => ({
    //initial state
    allStocks: stocks,
    searchQuery: '',
    sectorFilter:  '',
    selectedStock: null,
    filteredStocks: stocks,
    compareList: [],

    setSelectedStock: (stock) => set({selectedStock: stock}),

    setSearchQuery: function (query) {
      set({ searchQuery: query });
      // get() reads the store's current values at this exact moment.
      const { allStocks, sectorFilter } = get();
      set({ filteredStocks: computeFiltered(allStocks, query, sectorFilter) });
    },

    setSectorFilter: function (sector) {
      set({ sectorFilter: sector });
      // Read the current searchQuery so the text filter is preserved
      // while we switch sectors
      const { allStocks, searchQuery } = get();
      set({ filteredStocks: computeFiltered(allStocks, searchQuery, sector) });
    },

    toggleCompare: (stock) => set((state) => {
        const isExisting = state.compareList.some(s => s.id === stock.id)
        if (isExisting) {
            return {
                compareList: state.compareList.filter(s => s.id !== stock.id)
            }
        } 
        if (state.compareList.length >= 2) return state;
        return {
            compareList: [...state.compareList, stock]
        };
    }),

    clearCompare: () => set({compareList: []}),

    isInCompare: (id) => get().compareList.some(s => s.id ===id),
}));

export default useStockStore;