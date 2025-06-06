
import { useEffect, useState } from 'react';

const tickers = ["SBER", "GAZP", "YDEX", "T"];

function getSignal(rsi) {
  if (rsi < 30) return '🟥 Перепродан';
  if (rsi > 70) return '🟩 Перекуплен';
  return '—';
}

export default function App() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const results = await Promise.all(
        tickers.map(async (ticker) => {
          const res = await fetch(
            `https://iss.moex.com/iss/engines/stock/markets/shares/securities/${ticker}.json`
          );
          const json = await res.json();
          const marketData = json.marketdata.data[0];
          const secData = json.securities.data[0];

          const price = marketData[12]; // LAST
          const change = marketData[24]; // CHANGE
          const volume = marketData[6];  // VALTODAY
          const rsi = Math.round(20 + Math.random() * 60); // Мокаем RSI

          return { ticker, price, change, volume, rsi };
        })
      );
      setStocks(results);
    }
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-black min-h-screen text-white font-mono">
      <h1 className="text-xl mb-4">🇷🇺 Рынок акций (MOEX API)</h1>
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead className="text-gray-400 text-sm">
          <tr>
            <th>Тикер</th>
            <th>Цена</th>
            <th>%</th>
            <th>Объём</th>
            <th>RSI</th>
            <th>Сигнал</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.ticker} className="bg-zinc-800 hover:bg-zinc-700 transition rounded">
              <td className="py-2 px-3 font-bold">{stock.ticker}</td>
              <td className="px-3">{stock.price}</td>
              <td className={`px-3 ${stock.change > 0 ? 'text-green-400' : stock.change < 0 ? 'text-red-400' : ''}`}>{stock.change?.toFixed(2)}%</td>
              <td className="px-3">{stock.volume}</td>
              <td className="px-3">{stock.rsi}</td>
              <td className="px-3">{getSignal(stock.rsi)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
