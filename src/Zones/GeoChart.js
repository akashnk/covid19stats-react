import React, { useRef, useEffect, useState } from "react";
import { select, geoPath, geoMercator, min, max, scaleLinear } from "d3";
import {useResizeObserver} from '../Common/hooks';

/**
 * Component that renders a map of Germany.
 */

function GeoChart({ data,df, property }) {
  const svgRef1 = useRef();
  const wrapperRef1 = useRef(null);
  const dimensions = useResizeObserver(wrapperRef1);
  const [selectedCountry, setSelectedCountry] = useState(null);

 console.log(data)


  // will be called initially and on every data change
  useEffect(() => {
    

    const minProp = min(df.features, feature => feature.properties.statecode);
    const maxProp = max(df.features, feature => feature.properties.statecode);
    const colorScale = scaleLinear()
      .domain([minProp, maxProp])
      .range(["blue", "red"]);

    // use resized dimensions
    // but fall back to getBoundingClientRect, if no dimensions yet.
    //   const { width, height } = dimensions || wrapperRef1.current.getBoundingClientRect();
    //  console.log(height)
const width = 960;
const height = 640;
      if (!dimensions) return;
      const margin = {top: 40, right: 60, bottom: 65, left: 65};
                 const w = width - margin.left - margin.right;
                 const h = height - margin.top - margin.bottom;

                 const svgk = select(svgRef1.current).attr("width",width).attr("height",height)

                 var svg= svgk.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      // .attr("width",width).attr("height",height);

     
//     // projects geo-coordinates on a 2D plane
    const projection = geoMercator()
      .fitSize([w, h], selectedCountry || df)
      .precision(100);

//     // takes geojson data,
//     // transforms that into the d attribute of a path element
    const pathGenerator = geoPath().projection(projection);

// console.log(property)

//     // render each country
    svg
      .selectAll(".country")
      .data(df.features)
      .join("path")
      .on("click", feature => {
        setSelectedCountry(selectedCountry === feature ? null : feature);
      })
      .attr("class", "country")
      .transition()
      .attr("fill", feature => colorScale(feature.properties.statecode))
      .attr("d", feature => pathGenerator(feature));

//     // render text
    svg
      .selectAll(".label")
      .data([selectedCountry])
      .join("text")
      .attr("class", "label")
      .text(
        feature =>
          feature &&
          feature.properties.statename +
            ": " +
            feature.properties[property].toLocaleString()
      )
      .attr("x", 10)
      .attr("y", 25);
  }, [df, dimensions, property, selectedCountry]);

  return (
    <div ref={wrapperRef1} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef1} ></svg>
    </div>
  );
}

export default GeoChart;
