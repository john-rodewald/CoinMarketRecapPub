import React from 'react';
import banner from './gfx/banner.png';
import './HeaderBanner.css';

function HeaderBanner() {
  return (
    <div className="banner">
      <a href="/"><img src={banner} /></a> 
    </div>
  );
}

export default HeaderBanner;

