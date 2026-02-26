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
  addPosition: (position: Position) => void;
  removePosition: (id: string) => void;
  updatePosition: (id: string, changes: Partial<Position>) => void;
}

const usePositionStore = create<PositionStore>()((set, get) => ({
  // Initial state
  allPositions: positions,
  selectedPosition: null,
  compareList: [],

  setSelectedPosition: (position) => set({ selectedPosition: position }),

  toggleCompare: (position) => set((state) => {
    const isExisting = state.compareList.some(s => s.id === position.id);
    if (isExisting) {
      return {
        compareList: state.compareList.filter(s => s.id !== position.id)
      };
    }
    // Limit comparison to 2 items
    if (state.compareList.length >= 2) return state;
    return {
      compareList: [...state.compareList, position]
    };
  }),

  clearCompare: () => set({ compareList: [] }),

  isInCompare: (id) => get().compareList.some(s => s.id === id),

    addPosition: function (position) {
        set(function (prev) {
            const existing = prev.allPositions.find(function (p) {
                return p.symbol === position.symbol;
            });

            if (existing) {
                // Merge: weighted average price calculation
                return {
                    allPositions: prev.allPositions.map(function (p) {
                        if (p.symbol !== position.symbol) return p;
                        const totalQty = p.qty + position.qty;
                        const avgPrice = (
                            (p.avgPrice * p.qty)
                            + (position.avgPrice * position.qty)

                        ) / totalQty;
                        return { ...p, quantity: totalQty, avgPrice };
                    }),
                };
            }
            // New symbol — just append
            return { allPositions: [...prev.allPositions, position] };
        });
    },

  removePosition: (id) => set((state) => ({
    allPositions: state.allPositions.filter(s => s.id !== id),
  })),

  updatePosition: (id, changes) => set((state) => ({
    allPositions: state.allPositions.map((p) =>
      p.id === id ? { ...p, ...changes } : p
    ),
  })),
}));

export default usePositionStore;