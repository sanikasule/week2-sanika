import React from "react";

interface CurrencyItem {
  pair: string;
  rate: number;
  changePercent: number;
}

const sampleCurrencies: CurrencyItem[] = [
  { pair: "USD/INR", rate: 83.12, changePercent: 0.21 },
  { pair: "EUR/INR", rate: 89.45, changePercent: -0.12 },
  { pair: "GBP/INR", rate: 104.22, changePercent: 0.35 },
  { pair: "JPY/INR", rate: 0.56, changePercent: -0.08 },
];

const CurrencyTicker: React.FC = () => {
  return (
    <div style={wrapper}>
      <style>
        {/* starts from original position and moves left by 50% of it's width */}
        {/* why 50%:- bcoz of data duplication thus entire row divided into 2 halves, one half hides while other is on full display */}
        {`
          @keyframes tickerScroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); } 
          }
        `}
      </style>

      <div style={ticker}>
        {[...sampleCurrencies, ...sampleCurrencies].map((item, index) => {
          const isPositive = item.changePercent >= 0;

          return (
            <div key={index} style={itemStyle}>
              <span style={pairStyle}>{item.pair}:</span>

              <span style={rateStyle}>
                {item.rate.toFixed(2)}
              </span>

              <span
                style={{
                  ...changeStyle,
                  color: isPositive ? "#19e764" : "red",
                }}
              >
                {isPositive ? "▲" : "▼"}{" "}
                {Math.abs(item.changePercent).toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const wrapper: React.CSSProperties = {
  width: "100%",
  overflow: "hidden",
  color: "white",
};

const ticker: React.CSSProperties = {
  display: "flex",
  gap: "40px",
  padding: "5px 0",
  whiteSpace: "nowrap",
  animation: "tickerScroll 20s linear infinite",
  marginBottom: '20px'
};

const itemStyle: React.CSSProperties = {
  display: "flex",
  gap: "8px",
  alignItems: "center",
  fontSize: "17px",
};

const pairStyle: React.CSSProperties = {
  fontFamily: 'Times New Roman, serif',
  fontWeight: 'bold',
};

const rateStyle: React.CSSProperties = {
  color: "#E6EDF3",
};

const changeStyle: React.CSSProperties = {
  fontWeight: 'bold',
};

export default CurrencyTicker;