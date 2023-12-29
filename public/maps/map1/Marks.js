import { geoAlbersUsa, geoPath } from 'd3';

const projection = geoAlbersUsa()
const path = geoPath(projection);

export const Marks = ({ 
  USAtlas: { states, interiors }, 
  data,
}) => (
  <g className="marks">
    {states.features.map(feature => (
      <path className="states" d={path(feature)} />
    ))}
    <path className="interiors" d={path(interiors)} />
    {data.map(d => {
      const [x, y] = projection([d.long, d.lat]);
      return <circle 
               cx={x}
               cy={y}
               r={2}
              >
        	 	 </circle>
    })}
  </g>
);
