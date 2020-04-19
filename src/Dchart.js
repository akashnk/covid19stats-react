import React, { useMemo, useState, useEffect, useRef,useCallback } from "react";

// import * as d3 from 'd3';
import { select, selectAll,line,curveCardinal,curveBasis,extent,axisLeft,axisBottom,scaleLinear,
scaleTime } from 'd3';



import moment from 'moment';

import {sliceTimeseriesFromEnd} from './common-functions';
import {useResizeObserver} from './hooks';
// import {useWindowSize} from './common-functions';
import {formatNumber} from './common-functions';

// import * from 'd3';

const Dchart = (props) => {
  const [lastDaysCount, setLastDaysCount] = useState(
    window.innerWidth > 512 ? Infinity : 30
  );
  // const [activeStateCode,setActiveStateCode] = useState(props.activeStateCode);
  const [timeseries, setTimeseries] = useState([]);

  const [datapoint, setDatapoint] = useState({});
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState(props.mode);
  const [logMode, setLogMode] = useState(props.logMode);
  const [chartType, setChartType] = useState(props.type);
  const [moving, setMoving] = useState(false);
  const [timeSeriesData, setTimeSeriesData] = useState([]);

//  console.log(activeStateCode);

  const svgRef = useRef();
  // const svgRef2 = useRef();
  // const svgRef3 = useRef();

  const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
  // useEffect(() => {
  //   setTimeSeriesData(timeseries.slice(timeseries.length - 20));
  // }, [timeseries]);
  // console.log(timeSeriesData);

  useEffect(() => {
      if (props.timeseries.length > 1) {
        const slicedTimeseries = sliceTimeseriesFromEnd(
          props.timeseries,
          lastDaysCount
        );
        setIndex(slicedTimeseries.length - 1);
        setTimeseries(slicedTimeseries);
      }
    }, [props.timeseries, lastDaysCount]);

  console.log(timeseries);




//
//
  useEffect(() => {
    setMode(props.mode);
  }, [props.mode]);
//
  useEffect(() => {
    setLogMode(props.logMode);
  }, [props.logMode]);
//
  useEffect(() => {
    setChartType(props.type);
  }, [props.type]);


  useEffect(() => {

  timeseries.forEach((d,i)=> {


       d.totalconfirmed=+d.totalconfirmed;
       d.dailyconfirmed=+d.dailyconfirmed
        d.date= new Date(d.date);
        });



            const xValue = (d) => d.date;
            const xAxisLabel ='Time';

            const yValue = (d) => d.totalconfirmed;
            const yAxisLabel= 'Total Cases';

const drawChart = () => {
  select('g').remove();

         const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();

              if (!dimensions) return;
              const margin = {top: 40, right: 105, bottom: 105, left: 125};
                         const w = width - margin.left - margin.right;
                         const h = height - margin.top - margin.bottom;



const svg = select(svgRef.current).attr("width",width).attr("height",height);


          const g =  svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            const xscale =scaleTime()
              .domain(extent(timeseries,xValue))
              .range([0,w])
              .nice();
              // console.log(extent(timeseries,xValue))
    // console.log(chartRight);
            const yscale = scaleLinear()
              .domain(extent(timeseries,yValue))
              .range([h,0])
              .nice();

//               const xAxis = axisBottom(xscale)
//                   .ticks(6)
//                   .tickSize(-w)
//                   .tickPadding(15);
//
//     const yAxis = axisLeft(yscale)
//       .tickSize(-h)
//       .tickPadding(10);
//
//     const yAxisG = g.append('g').call(yAxis);
//     yAxisG.selectAll('.domain').remove();
//
//     yAxisG.append('text')
//         .attr('class', 'axis-label')
//         .attr('y', -60)
//         .attr('x', -h/2)
//         .attr('fill', 'black')
//         .attr('transform', `rotate(-90)`)
//         .attr('text-anchor', 'middle')
//         .text(yAxisLabel);
//
//     const xAxisG = g.append('g').call(xAxis)
//       .attr("transform", "translate(0,"+h+")");
//
//     xAxisG.select('.domain').remove();
//
//     xAxisG.append('text')
//         .attr('class', 'axis-label')
//         .attr('y', 10)
//         .attr('x', w/2 )
//         .attr('fill', 'black')
//         .text(xAxisLabel);
// console.log(dimensions);
const xAxis = axisBottom()
    .scale(xscale)
    .tickPadding(15)
    .ticks(15)
    .tickSize(-h);

  const yTicks = 15;
  const yAxis = axisLeft()
    .scale(yscale)
    .ticks(10)
    .tickPadding(15)
    .tickSize(-w);


  const myline = line()
    .x(d => xscale(xValue(d)))
    .y(d => yscale(yValue(d)))

g.append("path")
    .attr("stroke","steelblue")
    .attr("fill","none")
    .attr("d",myline(timeseries))
  g.append('g').call(yAxis);
    g.append('g')
    .attr("transform", "translate(0, " + h  +")").call(xAxis);

  }
  drawChart();
  window.addEventListener('resize', drawChart );



},[timeseries,dimensions])




  return (


     <div className="svg-parent" ref={wrapperRef} >
     <svg ref={svgRef} />
      </div>


        );
}

export default Dchart;
