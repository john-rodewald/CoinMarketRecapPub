import React from 'react';
import './CurrencyHeading.css';

function CurrencyHeading ({id, handler, text}: any) {
  return (
    <div className="heading" onClick={handler} id={id}>{text}</div>
  )
}
export default CurrencyHeading;
