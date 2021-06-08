import { useCallback } from 'react'
const d3 = require('d3')

export const Marks = ({
  topoData: { counties, states },
  eduData,
  colorScale,
  setHoveredValue,
  handleMouseMove
}) => {
  const path = d3.geoPath();

  const fipsMatch = useCallback(
    (countyId) => {
      let result = eduData.filter(function (obj) {
        return obj.fips === countyId;
      });
      return result[0].bachelorsOrHigher;
    },
    [eduData]
  );

  return (
    <g className="marks">
      {counties.features.map((feature) => (
        <path
          className="county"
          key={feature.id}
          data-fips={feature.id}
          data-education={fipsMatch(feature.id)}
          fill={colorScale(fipsMatch(feature.id))}
          d={path(feature)}
          onMouseEnter={() => setHoveredValue(feature.id)}
          onMouseLeave={() => setHoveredValue(null)}
          onMouseMove={handleMouseMove}
        />
      ))}
      <path className="states" d={path(states)} />
    </g>
  );
};