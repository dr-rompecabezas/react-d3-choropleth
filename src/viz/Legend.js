const d3 = require('d3')

export const Legend = ({ colorScale }) => {
  const legendScale = d3
    .scaleLinear()
    .domain([2.6, 75.1])
    .rangeRound([580, 850]);

  const invert = (x) => {
    let result = colorScale.invertExtent(x);
    return result[0];
  };

  return (
    <g id="legend">
      {colorScale.range().map((value) => (
        <>
          <rect
            className="key"
            x={legendScale(invert(value))}
            y={20}
            fill={value}
            width={30}
            height={12}
          />
          <text className="key-text" x={legendScale(invert(value)) + 2} y={45}>
            {Math.floor(invert(value))}%
          </text>
        </>
      ))}
    </g>
  );
};