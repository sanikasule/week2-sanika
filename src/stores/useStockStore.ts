import { create } from "zustand";
import type { Stock } from "../types/stock.types";
import { stocks } from "../data/stockData";

interface StockStore {
    allStocks: Stock[];
    compareList: Stock[];
    selectedStock: Stock | null;

    setSelectedStock: (stock: Stock | null) => void;
    toggleCompare: (stock: Stock) => void;
    clearCompare: () => void;
    isInCompare: (id: string) => boolean;
}

const useStockStore = create<StockStore>() ((set, get) => ({
    //initial state
    allStocks: stocks,
    selectedStock: null,
    compareList: [],

    setSelectedStock: (stock) => set({selectedStock: stock}),

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