import React, { useState, useEffect } from "react";
import type { Stock, Trade } from '../types/stock.types';

type EditableStocks = Partial<Stock>;
type StockSummary = Pick<Stock, 'id' | 'symbol' | 'name' | 'price' | 'sector'>; // Added 'id' here
type NewTradeInput = Omit<Trade, 'id' | 'date'>;

interface TradeFormProps {
    stocks: StockSummary[];
    onSubmitTrade: (trade: NewTradeInput) => void;
    initialValues?: EditableStocks;
}

const TradeForm: React.FC<TradeFormProps> = ({
    stocks,
    onSubmitTrade,
    initialValues = {},
}) => {
    // Initial state helper
    const getInitialState = (): NewTradeInput => ({
        stockId: initialValues.id ?? '',
        symbol: initialValues.symbol ?? '',
        type: 'BUY',
        quantity: 1,
        price: initialValues.price ?? 0,
    });

    const [form, setForm] = useState<NewTradeInput>(getInitialState());

    // FIX 1: Sync form when initialValues (selectedStock) changes from the outside
    useEffect(() => {
        if (initialValues.id) {
            setForm(prev => ({
                ...prev,
                stockId: initialValues.id ?? '',
                symbol: initialValues.symbol ?? '',
                price: initialValues.price ?? 0,
            }));
        }
    }, [initialValues]);

    const handleStockExchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = stocks.find(s => s.symbol === e.target.value);
        if (selected) {
            setForm(prev => ({
                ...prev,
                stockId: selected.id, // FIX 2: Must update stockId for the trade record
                symbol: selected.symbol,
                price: selected.price,
            }));
        } else {
            setForm(prev => ({ ...prev, symbol: '', stockId: '', price: 0 }));
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { // Use FormEvent
        e.preventDefault();
        
        if (!form.stockId || !form.symbol) return;

        onSubmitTrade(form);

        // FIX 3: Reset form after successful submission
        setForm({
            stockId: '',
            symbol: '',
            type: 'BUY',
            quantity: 1,
            price: 0,
        });
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, color: '#E6EDF3', border: '1px solid #d1d5db', borderRadius: 8, padding: 16 }}>
            <h3 style={{ margin: '0 0 8px 0' }}>Place a Trade</h3>

            <label style={{ fontSize: '12px', color: '#9CA3AF' }}>Select Asset</label>
            <select 
                value={form.symbol} 
                onChange={handleStockExchange} 
                style={{ padding: 8, border: '2px solid #ababb9', borderRadius: 4, background: '#fff', fontSize: '15px', fontFamily: 'Times New Roman, serif' }}
            >
                <option value="">--Select Stock--</option>
                {stocks.map(s => (
                    <option key={s.id} value={s.symbol}> 
                        {s.symbol} - {s.name}
                    </option>
                ))}
            </select>

            <div style={{ display: 'flex', gap: 8 }}>
                {(['BUY', 'SELL'] as const).map(t => (
                    <button 
                        key={t} 
                        type="button" 
                        onClick={() => setForm(prev => ({ ...prev, type: t }))} 
                        style={{ 
                            flex: 1,
                            background: form.type === t ? '#8236fd' : '#e5e7eb', 
                            color: form.type === t ? '#fff' : '#374151', 
                            padding: '10px', 
                            border: 'none', 
                            borderRadius: 6, 
                            fontWeight: 'bold',
                            fontFamily: 'Times New Roman, serif', fontSize: '15px',
                            cursor: 'pointer',
                            transition: '0.2s'
                        }}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <label style={{ fontSize: '12px', color: '#9CA3AF' }}>Quantity</label>
            <input 
                type="number" 
                min={1} 
                value={form.quantity}
                onChange={(e) => setForm(prev => ({ ...prev, quantity: Math.max(1, Number(e.target.value)) }))} 
                style={{ padding: 8, border: '2px solid #ababb9', borderRadius: 4, background: '#fff' }}
            />

            <div style={{ background: '#fff', padding: '12px', borderRadius: 6, border: '1px solid #374151' }}>
                <p style={{ margin: 0, fontSize: '15px',  fontFamily: 'Times New Roman, serif', color:'black' }}>
                    Price: <strong>${form.price.toFixed(2)}</strong>
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '15px',  fontFamily: 'Times New Roman, serif', color: 'black' }}>
                    Total: <strong>${(form.price * form.quantity).toFixed(2)}</strong>
                </p>
            </div>

            <button 
                type="submit" 
                disabled={!form.symbol} 
                style={{ 
                    borderRadius: 6, 
                    background: !form.symbol ? '#bb96f7' : '#8236fd', 
                    color: '#fff', 
                    padding: '12px', 
                    border: 'none', 
                    fontFamily: 'Times New Roman, serif', fontSize: '15px',
                    fontWeight: 'bold',
                    cursor: form.symbol ? 'pointer' : 'not-allowed' 
                }}
            >
                Submit Trade
            </button>
        </form>
    );
}

export default TradeForm;