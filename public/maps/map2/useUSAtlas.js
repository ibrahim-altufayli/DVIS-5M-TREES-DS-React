import React, { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature, mesh } from 'topojson';

const jsonUrl = 'https://unpkg.com/us-atlas@3.0.0/states-10m.json';

export const useUSAtlas = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    json(jsonUrl).then(topology => {
      const { states } = topology.objects;
    	setData({
        states: feature(topology, states),
        interiors: mesh(topology, states, (a, b) => a != b)
      });
    });
  }, []);
    

  return data;
};
