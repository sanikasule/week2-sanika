import { create } from "zustand";
import type { Position } from "../types/stock.types";
import { positions } from "../data/stockData";

interface PositionStore {
    allPositions: Position[];
    compareList: Position[];
    selectedPosition: Position | null;

    setSelectedPosition: (position: Position | null) => void;
    toggleCompare: (position: Position) => void;
    clearCompare: () => void;
    isInCompare: (id: string) => boolean;
}

const usePositionStore = create<PositionStore>() ((set, get) => ({
    //initial state
    allPositions: positions,
    selectedPosition: null,
    compareList: [],

    setSelectedPosition: (position) => set({selectedPosition: position}),

    toggleCompare: (position) => set((state) => {
        const isExisting = state.compareList.some(s => s.id === position.id)
        if (isExisting) {
            return {
                compareList: state.compareList.filter(s => s.id !== position.id)
            }
        } 
        if (state.compareList.length >= 2) return state;
        return {
            compareList: [...state.compareList, position]
        };
    }),

    clearCompare: () => set({compareList: []}),

    isInCompare: (id) => get().compareList.some(s => s.id ===id),
}));

export default usePositionStore;