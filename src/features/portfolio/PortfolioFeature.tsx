import React, {useState, useEffect} from 'react';  
import { usePortfolioStore } from '../../stores/usePortfolioStore';
import { useShallow } from 'zustand/shallow';
import { stocks } from '../../data/stockData';

const PortfolioFeature: React.FC = 
() => { 
    const {holdings, totalValue, gainLoss, isLoading, error, loadPortfolio} = usePortfolioStore(
        useShallow((s) => ({
            holdings: s.holdings,
            totalValue: s.totalValue,
            gainLoss: s.gainLoss,
            isLoading: s.isLoading,
            error: s.error,
            loadPortfolio: s.loadPortfolio,
        }))
    )
    const [selectedSector, setSelectedSector] = useState<string>('All');

    useEffect(() => {
        loadPortfolio(stocks);
    }, [loadPortfolio]);

    const filtered = selectedSector === 'All' ? holdings : 
    holdings.filter(s => s.sector === selectedSector);

    if(isLoading) return <p>Loading portfolio...</p>;
    if(error) return <p>Error: {error}</p>;

    return (
        <div style={{border: '1px solid #d1d5db', borderRadius: 8, padding: 16, marginTop: 30, color: '#E6EDF3'}}>
            <h2>Portfolio Summary</h2>
            <p>Total Value: ${totalValue.toLocaleString()}</p>
            <p style={{color: gainLoss >= 0 ? 'green' : 'red'}}>
                Gain/Loss: {gainLoss.toFixed(2)}
            </p>
            <select value={selectedSector} onChange={e => setSelectedSector(e.target.value)} style={{border: '2px solid #ababb9', borderRadius: 5, fontFamily: 'Times New Roman, serif', fontSize: '15px'}}>
                <option>All</option>
                <option>Technology</option>
                <option>Automotive</option>
                <option>Finance</option>
                <option value="Consumer Discretionary">Consumer Discretionary</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Energy">Energy</option>
                <option value="Entertainment">Entertainment</option>
            </select>
            <ul>
                {filtered.map(s => 
                    <li key={s.id} style={{padding: 5}}>{s.symbol}: ${s.price.toFixed(2)}</li>
                )}
            </ul>
        </div>
    )
}; export default PortfolioFeature; // REQUIRED for React.lazy()