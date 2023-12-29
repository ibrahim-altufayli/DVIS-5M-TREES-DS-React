import React from 'react';
import ReactDOM from 'react-dom';
import { useUSAtlas } from './useUSAtlas';
import { useData } from './useData';
import { BubbleMap } from './BubbleMap';
import Legend from './Legend';
const width = 960;
const height = 500;

const App = () => {
  const USAtlas = useUSAtlas();
  const data = useData();

  if (!USAtlas || !data) { 
    return <pre>Loading...</pre>;
  }
const funkyHeaderStyle = {
    textAlign: 'center',
    margin: '20px 0',
    fontFamily: '', // Use a funky font-family here
    color: 'black', // Adjust the color to your preference
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Add a text shadow for effect
    fontSize: '1.4rem',
};
  return (
    <div>
      <h1 style={funkyHeaderStyle}>
        Dot Density Map for top 10 trees + others Across All States
      </h1>
      <svg width={width} height={height}>
        <BubbleMap data={data} USAtlas={USAtlas} />
      </svg>
    </div>
  );
};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);