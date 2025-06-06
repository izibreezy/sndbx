import { useState } from 'react';

const initialData = [
  { ticker: 'SBER', price: 264.1, change: 1.2, volume: 120, rsi: 72 },
  { ticker: 'YNDX', price: 2360, change: -3.4, volume: 300, rsi: 28 },
  { ticker: 'GAZP', price: 175, change: 0.0, volume: 90, rsi: 50 },
  { ticker: 'TCSG', price: 3550, change: 0.9, volume: 250, rsi: 75 },
];

function getSignal(rsi) {
  if (rsi < 30) return '🟥 Перепродан';
  if (rsi > 70) return '🟩 Перекуплен';
  return '—';
}

export default function App() {
  const [data] = useState(initialData);

  return (
    <div className="p-6 bg-black min-h-screen text-white font-mono">
      <h1 className="text-xl mb-4">🇷🇺 Рынок акций (RU)</h1>
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
          {data.map((stock) => (
            <tr key={stock.ticker} className="bg-zinc-800 hover:bg-zinc-700 transition rounded">
              <td className="py-2 px-3 font-bold">{stock.ticker}</td>
              <td className="px-3">{stock.price}</td>
              <td className={`px-3 ${stock.change > 0 ? 'text-green-400' : stock.change < 0 ? 'text-red-400' : ''}`}>{stock.change}%</td>
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
