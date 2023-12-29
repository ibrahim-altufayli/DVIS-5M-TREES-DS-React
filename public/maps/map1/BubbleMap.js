import React from 'react';
import { scaleSqrt, max } from 'd3';
import { Marks } from './Marks';

export const BubbleMap = ({ data, USAtlas }) => {
  const sizeValue = d => d.AQI;
	const maxRadius = 5;
        
  const sizeScale = scaleSqrt()
		.domain([0, max(data, sizeValue)])
  	.range([0, maxRadius])
  
  return(
		<Marks
      USAtlas={USAtlas}
      data={data}
      sizeScale={sizeScale}
    	sizeValue={sizeValue}
  	/>
  );
};