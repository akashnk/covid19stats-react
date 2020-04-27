import React, { useRef, useEffect } from "react";
import { select, scaleBand, scaleLinear, max } from "d3";
import {useResizeObserver} from './hooks';

/**
 * Component, that renders a Racing Bar Chart.
 */

function RacingBarChart({ timeseries }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);


  const gh=[]
  const as=Object.keys(timeseries)
  
  for (var i = 0; i < as.length; i++)
  {
      var tv = [];
      var resul=[];
      var retf=[];
      tv[as[i]]=timeseries[as[i]];
      resul = Object.keys(tv).reduce(function (r, k) {
              return r.concat( tv[k]);
          }, []);
      retf =resul.map(o=>({...o, state: as[i]}))
      gh[i] = retf;
  
   }
   const allData = Object.keys(gh).reduce(function (r, k) {
    return r.concat( gh[k]);
  }, []);

  // will be called initially and on every allData change
  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    // sorting the allData
    allData.sort((a, b) => b.totalconfirmed - a.totalconfirmed);

    const yScale = scaleBand()
      .paddingInner(0.1)
      .domain(allData.map((totalconfirmed, index) => index)) // [0,1,2,3,4,5]
      .range([0, dimensions.height]); // [0, 200]

    const xScale = scaleLinear()
      .domain([0, max(allData, entry => entry.totalconfirmed)]) // [0, 65 (example)]
      .range([0, dimensions.width]); // [0, 400 (example)]

    // draw the bars
    svg
      .selectAll(".bar")
      .data(allData, (entry, index) => entry.state)
      .join(enter =>
        enter.append("rect").attr("y", (entry, index) => yScale(index))
      )
      .attr("fill", entry => entry.color)
      .attr("class", "bar")
      .attr("x", 0)
      .attr("height", yScale.bandwidth())
      .transition()
      .attr("width", entry => xScale(entry.totalconfirmed))
      .attr("y", (entry, index) => yScale(index));

    // draw the labels
    svg
      .selectAll(".label")
      .data(allData, (entry, index) => entry.state)
      .join(enter =>
        enter
          .append("text")
          .attr(
            "y",
            (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5
          )
      )
      .text(entry => `🐎 ... ${entry.state} (${entry.totalconfirmed} meters)`)
      .attr("class", "label")
      .attr("x", 10)
      .transition()
      .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5);
  }, [allData, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default RacingBarChart;
