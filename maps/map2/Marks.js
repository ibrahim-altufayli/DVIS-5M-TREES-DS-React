// Marks.js
import React from 'react';
import { geoAlbersUsa, geoPath } from 'd3';

const projection = geoAlbersUsa();
const path = geoPath(projection);

const Legend = ({ colorDictionary, width, height }) => (
  <svg width={200} height={height} style={{ marginLeft: '3cm' }}>
    <g transform={`translate(20,20)`}>
      {Object.entries(colorDictionary).map(([name, color], index) => (
        <g key={name} transform={`translate(0,${index * 20})`}>
          <circle cx={0} cy={0} r={8} fill={color} />
          <text x={12} y={5} style={{ fontSize: '12px', fill: '#333' }}>
            {name}
          </text>
        </g>
      ))}
    </g>
  </svg>
);

const colorDictionary = {
  'other': '#1f77b4',
  'fraxinus pennsylvanica': '#ff7f0e',
  'acer rubrum': '#2ca02c',
  'gleditsia triacanthos': '#d62728',
  'acer saccharum': '#9467bd',
  'acer platanoides': '#8c564b',
  'platanus acerifolia': '#e377c2',
  'quercus palustris': '#7f7f7f',
  'quercus virginiana': '#bcbd22',
  'pyrus calleryana': '#17becf',
  'tilia cordata': '#a55eea',
};

export const Marks = ({ USAtlas: { states, interiors }, data, width, height }) => (
  <svg width={width} height={height}>
    <g className="marks">
      {states.features.map(feature => (
        <path key={feature.id} className="states" d={path(feature)} />
      ))}
      <path className="interiors" d={path(interiors)} />
      {data.map(d => {
        const [x, y] = projection([d.long, d.lat]);
        const fillColor = colorDictionary[d.name] || 'gray'; // Default to gray if name not found
        return (
          <circle
            key={`${d.name}-${x}-${y}`}
            cx={x+ (Math.random() - 0.1) * 10}
            cy={y+ (Math.random() - 0.1) * 10}
            r={2}
            fill={fillColor}
            stroke="#fff" 
            strokeWidth="0.5"
          />
        );
      })}
    </g>
   <Legend colorDictionary={colorDictionary} width={200} height={height} /> 
  </svg>
);
