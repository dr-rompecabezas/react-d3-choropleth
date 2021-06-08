import { useState, useEffect } from 'react'
const d3 = require('d3')
const topojson = require('topojson')

export const useTopoData = () => {
  const [data, setData] = useState(null);
  const url =
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

  useEffect(() => {
    d3.json(url).then((json) => {
      let { counties, states } = json.objects;
      setData({
        counties: topojson.feature(json, counties),
        states: topojson.mesh(json, states, (a, b) => a !== b)
      });
    });
  }, []);

  return data;
};