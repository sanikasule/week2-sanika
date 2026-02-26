import { create } from "zustand";
import type { Stock } from "../types/stock.types";

interface PortfolioState {
    holdings: Stock[];
    totalValue: number;
    gainLoss: number;
    isLoading: boolean;
    error: string | null;
}

// extends copies all PortfolioState fields, then adds the action
interface PortfolioStore extends PortfolioState {
    loadPortfolio: (availableStocks: Stock[]) => void;
}

export const usePortfolioStore = create<PortfolioStore>(function(set) {
    return {
        //this is like useState initialization
        holdings: [],
        totalValue: 0,
        gainLoss: 0,
        isLoading: true,
        error: null,

        loadPortfolio: function (availableStocks) {
            set({ isLoading: true, error: null });
            // Same 800ms delay as the original useEffect — simulates async fetch:- calculations, then delay, then updation
            //useEffect need eliminated bcoz of state management done by zustand
            setTimeout(function () {
                try {
                    const topThree = availableStocks.slice(0, 3);
                    const totalValue = topThree.reduce(function (sum, s) {
                        return sum + s.price * 10;
                    }, 0); //0 here if no topThree exists
                    const totalCost = topThree.reduce(function (sum, s) {
                        return sum + (s.price - s.change) * 10;
                    }, 0);

                    set({
                        //setState as done in useState after calculations
                        holdings: topThree,
                        totalValue: totalValue,
                        gainLoss: totalValue - totalCost,
                        isLoading: false,
                        error: null,
                    });
                } catch (err) {
                    set({ isLoading: false, error: "Failed to load portfolio." });
                }
            }, 800);
        },
    };
});