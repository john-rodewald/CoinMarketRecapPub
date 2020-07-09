import React from 'react';
import './CurrencyEntry.css';

function CurrencyEntry({id, rank, name, symbol, circ, total, price, cap, change}: any) {
  return (
    <div className="currency">
      <div className="rank">{rank}</div>
      <div className="name">{name}</div>
      <div className="symbol">{symbol}</div>
      <div className="circ">{round(circ)} {symbol}</div>
      <div className="total">{round(total)} {symbol}</div>
      <div className="price">{round(price)} €</div>
      <div className="cap">{round(cap)} €</div>
      <div className={"change " + ((change < 0) ? 'neg' : 'pos')}>{round(change)}%</div>
      <img className="history" src={`https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/${id}.png`}/>
    </div>
  );
}

const round = (num: number) => {
  return Math.round(num * Math.pow(10, 4)) / Math.pow(10,4)
}

export default CurrencyEntry;
