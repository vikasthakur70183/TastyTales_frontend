// Container.jsx
import React from 'react';
import './container.css'

function Container({ children }) {
  return (
    <div className='Container'>
      {children}
    </div>
  );
}

export default Container;
