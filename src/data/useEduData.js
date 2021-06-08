import { useState, useEffect } from 'react'
const d3 = require('d3')

export const useEduData = () => {
  const [data, setData] = useState(null);
  const url =
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

  useEffect(() => {
    d3.json(url).then((json) => {
      setData(json);
    });
  }, []);

  return data;
};