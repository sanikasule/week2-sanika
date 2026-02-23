import React, { useState, useEffect } from "react";
import type { Stock } from "../types/stock.types";

interface PortfolioState {
    holdings: Stock[];
    totalValue: number;
    gainLoss: number;
    isLoading: boolean;
    error: string | null;
}

interface PortfolioSummaryProps {
    availableStocks: Stock[];
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({availableStocks}) => {
    //generic state - TS knos exact shape
    const [portfolio, setPortfolio] = useState<PortfolioState>({
        holdings: [],
        totalValue: 0,
        gainLoss: 0,
        isLoading: true,
        error: null,
    });

    //primitives - TS infers type from initial value
    const [selectedSector, setSelectedSector] = useState<string>('All');
    // const [sortBy, setSortBy] = useState<'price' | 'change' | 'volume'>('price');

    useEffect(() => {
        //simulate async fetch data
        setTimeout(() => {
            //calculations done on frontend and always set timer
            const topThree = availableStocks.slice(0, 3);
            const totalValue = topThree.reduce((sum, s) => sum + s.price*10, 0);
            const totalCost = topThree.reduce((sum, s) => sum + (s.price - s.change)*10, 0);

            setPortfolio({
                holdings: topThree,
                totalValue,
                gainLoss: totalValue - totalCost,
                isLoading: false,
                error: null,
            })
        }, 800)
    }, [availableStocks]);

    const filtered = selectedSector === 'All' ? portfolio.holdings : 
    portfolio.holdings.filter(s => s.sector === selectedSector);

    if(portfolio.isLoading) return <p>Loading portfolio...</p>;
    if(portfolio.error) return <p>Error: {portfolio.error}</p>;

    return (
        <div style={{border: '1px solid #d1d5db', borderRadius: 8, padding: 16}}>
            <h2>Portfolio Summary</h2>
            <p>Total Value: ${portfolio.totalValue.toLocaleString()}</p>
            <p style={{color: portfolio.gainLoss >= 0 ? 'green' : 'red'}}>
                Gain/Loss: {portfolio.gainLoss.toFixed(2)}
            </p>
            <select value={selectedSector} onChange={e => setSelectedSector(e.target.value)}>
                <option>All</option>
                <option>Technology</option>
                <option>Automotive</option>
                <option>Finance</option>
            </select>
            <ul>
                {filtered.map(s => 
                    <li key={s.id}>{s.symbol}: ${s.price.toFixed(2)}</li>
                )}
            </ul>
        </div>
    )
}

export default PortfolioSummary;