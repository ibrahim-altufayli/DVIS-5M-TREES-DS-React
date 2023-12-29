// Legend.js
import React from 'react';

const Legend = ({ colorDictionary, width, height }) => (
  <svg width={200} height={200} style={{position:"absolut", right: '1cm' }}>
    <g transform={`translate(20,20)`}>
      {Object.entries(colorDictionary).map(([name, color], index) => (
        <g key={name} transform={`translate(0,${index * 20})`}>
          <circle cx={10} cy={10} r={6} fill={color} />
          <text x={12} y={5} style={{ fontSize: '12px', fill: '#333' }}>
            {name}
          </text>
        </g>
      ))}
    </g>
  </svg>
);

export default Legend;
