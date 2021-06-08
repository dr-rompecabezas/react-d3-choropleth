export const Tooltip = ({ hoveredValue, mousePosition, eduData }) => {
  const fipsMatch = (countyId) => {
    let result = eduData.filter(function (obj) {
      return obj.fips === countyId;
    });
    return result;
  };

  if (!hoveredValue) {
    return <div id="tooltip-container" style={{ visibility: "hidden" }}></div>;
  } else {
    const xPosition = mousePosition.x;
    const yPosition = mousePosition.y;
    return (
      <div
        id="tooltip-container"
        style={{ left: `${xPosition + 25}px`, top: `${yPosition - 25}px` }}
      >
        <div>
          <div
            id="tooltip"
            data-education={fipsMatch(hoveredValue)[0].bachelorsOrHigher}
          >
            {fipsMatch(hoveredValue)[0].area_name},{" "}
            {fipsMatch(hoveredValue)[0].state}
            <div>
              <span style={{ fontSize: "1.2rem" }}>
                {fipsMatch(hoveredValue)[0].bachelorsOrHigher}%
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};