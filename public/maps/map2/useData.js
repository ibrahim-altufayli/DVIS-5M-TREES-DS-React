import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl = "https://raw.githubusercontent.com/hussein320/5MTREES_D3_DATA_Visualization/main/dotdens_map/data/map2data.csv";

const row = d => {
  d.lat = +d.lat;
  d.long = +d.long;
  d.name = d.name;
  d.dateCollected = new Date(d.dateCollected);
  return d;
};

export const useData = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    csv(csvUrl).then(setData)
  }, []);
    
  return data;
};