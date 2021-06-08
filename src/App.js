import { useTopoData } from './data/useTopoData'
import { useEduData } from './data/useEduData'
import { Legend } from './viz/Legend'
import { Marks } from './viz/Marks'
import { Tooltip } from './viz/Tooltip'
import { useState, useCallback } from 'react'
const d3 = require('d3')

const titleLabel = "United States Educational Attainment";
const subtitleLabel =
  "Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)";

const width = 960;
const height = 600;

const App = () => {
  const topoData = useTopoData();
  const eduData = useEduData();
  const [hoveredValue, setHoveredValue] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (event) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    },
    [setMousePosition]
  );

  if (!topoData || !eduData) {
    return <pre>Loading...</pre>;
  }

  const eduValue = (d) => d.bachelorsOrHigher;

  const colorScale = d3
    .scaleQuantize()
    .domain(d3.extent(eduData, eduValue))
    .range(d3.schemeOranges[9]);

  return (
    <div id="container">
      <div id="title">{titleLabel}</div>
      <div id="description">{subtitleLabel}</div>
      <div id="map-container">
        <svg width={width} height={height}>
          <Legend colorScale={colorScale} />
          <Marks
            topoData={topoData}
            eduData={eduData}
            colorScale={colorScale}
            setHoveredValue={setHoveredValue}
            handleMouseMove={handleMouseMove}
          />
        </svg>
      </div>
      <Tooltip
        hoveredValue={hoveredValue}
        mousePosition={mousePosition}
        eduData={eduData}
      />
    </div>
  );
};

export default App;

