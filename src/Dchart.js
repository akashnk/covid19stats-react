import React, { useMemo, useState, useEffect, useRef,useCallback } from "react";

// import * as d3 from 'd3';
import { select, selectAll,line,curveCardinal,curveBasis,extent,axisLeft,max,axisBottom,scaleLinear,
scaleTime ,scaleLog} from 'd3';



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
  const [radiostate,setRadiostate] = useState([]);
  const [mode, setMode] = useState(props.mode);
  const [logMode, setLogMode] = useState([]);
  const [chartType, setChartType] = useState(props.casetype);
  const [moving, setMoving] = useState(false);
  const [timeSeriesData, setTimeSeriesData] = useState([]);
console.log(radiostate);
//  console.log(activeStateCode);

  const svgRef = useRef();
  // const svgRef2 = useRef();
  // const svgRef3 = useRef();

  const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
  // useEffect(() => {
  //   setTimeSeriesData(timeseries.slice(timeseries.length - 20));
  // }, [timeseries]);


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




    useEffect(() => {
      setRadiostate(props.casetype);
    }, [props.casetype]);

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

//console.log(timeseries)
  useEffect(() => {

  timeseries.forEach((d,i)=> {


       d[radiostate]=+d[radiostate];
      
        d.date= new Date(d.date);
        });



            const xValue = (d) => d.date;
            const xAxisLabel ='Time';

            const yValue = (d) => d[radiostate];
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


      const yscale = logMode === "true" ?
          scaleLog().domain([1,max(timeseries,yValue)]).range([h,1]).nice() :
          scaleLinear().domain(extent(timeseries,yValue)).range([h,0]).nice();

console.log(yscale);


const xAxis = axisBottom()
    .scale(xscale)
    .tickPadding(15)
    .ticks(15)
    .tickSize(-h);

  const yTicks = 15;
  const yAxis = axisLeft()
    .scale(yscale)
    .ticks(7)
    .tickPadding(15)
    .tickSize(-w);


  const myline = line()
    .x(d => xscale(xValue(d)))
    .y(d => yscale(yValue(d))).curve(curveCardinal);

g.append("path")
    .attr("stroke","maroon")
    .attr("fill","none")
    .attr("d",myline(timeseries));

  g.append('g').call(yAxis);
    g.append('g')
    .attr("transform", "translate(0, " + h  +")").call(xAxis);

    g.selectAll('circle').data(timeseries)
      .enter().append('circle')
        .attr('cy', d => yscale(yValue(d)))
        .attr('cx', d => xscale(xValue(d)))
        .attr('r', 2);

  }
  drawChart();
  window.addEventListener('resize', drawChart );



},[timeseries,dimensions,radiostate,logMode])




  return (


     <div className="svg-parent" ref={wrapperRef} >
     <svg ref={svgRef} />
      </div>


        );
}

export default Dchart;
