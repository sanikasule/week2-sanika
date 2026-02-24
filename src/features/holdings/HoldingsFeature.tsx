import React, {useMemo} from 'react'; 
import type { Holding } from '../../types/stock.types'; 
import DataTable from '../../components/DataTable';
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface HoldingsFeatureProps { 
    holdings: Holding[]; 
} 

function pnlCell(value: unknown, suffix: string = ''): React.ReactNode {        
    var numberValue = Number(value); 
    var isPositive = numberValue >= 0; 
    var textColour = isPositive ? '#166534' : '#991B1B'; 
    var prefix = isPositive ? '+' : ''; 
    var currencySign = suffix === '%' ? '' : '$'; 
    return ( 
        <span style={{ color: textColour, fontWeight: 'bold' }}> {prefix} {currencySign}{numberValue.toFixed(2)}{suffix} 
        </span> 
    ); 
} 

const COLORS = [
  '#2563EB', '#16A34A', '#F59E0B', '#DC2626', '#9333EA',
  '#06B6D4', '#EC4899', '#6366F1', '#10B981', '#F97316'
];

const HoldingsFeature: React.FC<HoldingsFeatureProps> = ({ holdings }) => {   
    const pieData = useMemo(() => {
        const total = holdings.reduce((sum, item) => 
            sum + Number(item.currentValue), 0
        );

        if (total === 0) return [];

        return holdings.map((item, index) => ({
            name : item.symbol,
            value : Number(item.currentValue),
            // percentage : ((Number(item.currentValue)/total) * 100).toFixed(2)
            fill: COLORS[index % COLORS.length]
        }))
    }, [holdings])
    
    return ( 
        <> 
            <h2 style={{ color: '#E6EDF3' }}>Holdings</h2> 
            {/* piechart */}
            <div style={{ width: '100%', height: 350, border: '1px solid #E6EDF3', padding: 5, marginBottom: 20, background: '#f8fafc'}}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={130}
                        label={({ name, percent }) => 
                            `${name} ${( (percent ?? 0) * 100).toFixed(0)}%`
                        }
                    >
                    </Pie>
                    <Tooltip offset={100}
                        formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Value']} 
                    />
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
            </div>

            <DataTable<Holding> 
                data={holdings} 
                rowKey="id" 
                filterKey="symbol" 
                pageSize={10} 
                columns={[ 
                    { key: 'symbol', header: 'Symbol', sortable: true }, 
                    { key: 'qty', header: 'Qty', sortable: true }, 
                    { key: 'investedValue', header: 'Invested Value', sortable: true, render: function(value) 
                        { return '$' + Number(value).toLocaleString(); } 
                    }, 
                    { key: 'currentValue', header: 'Current Value', sortable: true, render: function(value) 
                        { return '$' + Number(value).toLocaleString(); } 
                    }, 
                    { key: 'totalReturn', header: 'Total Return', sortable: true, render: function(value) 
                        { return pnlCell(value); } 
                    },
                ]} 
            /> 
        </> 
    ); 
}; 
export default HoldingsFeature;