import React, { useMemo, useState, useEffect, useRef,useCallback } from "react";

// import * as d3 from 'd3';
import { select, selectAll,line,curveCardinal,curveBasis,extent,axisLeft,axisBottom } from 'd3';

import {

  scaleLinear,
  scaleTime,
  scaleOrdinal,
  schemeCategory10,
} from 'd3-scale';

import moment from 'moment';

import {sliceTimeseriesFromEnd} from './common-functions';
import {useResizeObserver} from './hooks';
import {useWindowSize} from './common-functions';
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
  const svgRef2 = useRef();
  const svgRef3 = useRef();

  const wrapperRef = useRef();
   // const dimensions = useResizeObserver(wrapperRef);
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
   const [width, height] = useWindowSize(wrapperRef);
  // console.log(width);
 const [dat,setDat] = useState([25,36,58,34,23,54,76]);
 const scale = 2;
 const ch =400;
  useEffect(() => {

  timeseries.forEach((d,i)=> {


       d.totalconfirmed=+d.totalconfirmed;
       d.dailyconfirmed=+d.dailyconfirmed
        d.date= new Date(d.date);
        });
        console.log(timeseries);
            const margin = {top: 40, right: 105, bottom: 35, left: 125};
            const w = width - margin.left - margin.right;
            const h = height - margin.top - margin.bottom;

            const xValue = (d) => d.date;
            const xAxisLabel ='Time';

            const yValue = (d) => d.totalconfirmed;
            const yAxisLabel= 'Total Cases';

            const svg = select(svgRef.current)
            .attr("width", w/0.8)
            .attr("height", h/1.8)

          const g =  svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// console.log(datapoint.length);
        // const xscale = scaleLinear()
        //   .domain([0,14000])
        //   .range([0,w]);


        const xscale =scaleTime()
          .domain(extent(timeseries,xValue))
          .range([0,w])
          .nice();
          // console.log(extent(timeseries,xValue))
// console.log(chartRight);
        const yscale = scaleLinear()
          .domain(extent(timeseries,yValue))
          .range([h/2,0])
          .nice();

          const xAxis = axisBottom(xscale)
              .ticks(6)
              .tickSize(-w)
              .tickPadding(15);

const yAxis = axisLeft(yscale)
  .tickSize(-h)
  .tickPadding(10);

const yAxisG = g.append('g').call(yAxis);
yAxisG.selectAll('.domain').remove();

yAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('y', -60)
    .attr('x', -h/2)
    .attr('fill', 'black')
    .attr('transform', `rotate(-90)`)
    .attr('text-anchor', 'middle')
    .text(yAxisLabel);

const xAxisG = g.append('g').call(xAxis)
  .attr("transform", "translate(0,"+h/2+")");

xAxisG.select('.domain').remove();

xAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('y', 10)
    .attr('x', w / 2)
    .attr('fill', 'black')
    .text(xAxisLabel);


// const myline = line()
//   .x((datapoint,index)=>index*50)
//   .y(datapoint => 150-datapoint)
//   .curve(curveCardinal)
  const myline = line()
    .x(d => xscale(xValue(d)))
    .y(d => yscale(yValue(d)))
    .curve(curveBasis);
console.log(myline(timeseries));
  svg.append("path")
    .attr("stroke","steelblue")
    .attr("fill","none")
    .attr('d',myline(timeseries));
    // svg.selectAll("rect")
    //     .data(dat)
    //     .join("rect")
    //     .attr("width", 40)
    //     .attr("height", (datapoint) => datapoint * scale)
    //     .attr("fill", "orange")
    //     .attr("x", (datapoint, iteration) => iteration * 45)
    //     .attr("y", (datapoint) => ch - datapoint * scale)
    //     ;
        // svg.selectAll("path")
        //     .data([timeseries])
        //     .join("path")
        //     .attr("d",datapoint => myline(datapoint))
        //     .attr("fill","none")
        //     .attr("stroke","red")
        //     ;
        //
        // svg.append("g")
    		// 	.attr("class","axis x")
    		// 	.attr("transform","translate(0,"+(h/2)+")")
    		// 	.call(x_axis);
        //
    		// svg.append("g")
    		// 	.attr("class","axis y")
        //   .attr("transform","translate("+w+",0)")
    		// 	.call(y_axis);
        // var width = 400,
        // height = 100;

        // const myline = line()
        // .x((value,index) => index * 50)
        // .y(value => value)


    // Append SVG
    // svg
    // .selectall("path")
    // .data[(dat)]
    // .join("path")
    // .attr("d",value=>myline(value))
    // .attr("fill","none")
    // .attr("stroke","blue");

    // Create scale
    // var scale = d3.scaleLinear()
    //               .domain([d3.min(data), d3.max(data)])
    //               .range([0, width - 100]);
    //
    // // Add scales to axis
    // var x_axis = d3.axisBottom()
    //                .scale(scale);
    //
    // //Append group and insert axis
    // svg.append("g")
    //    .call(x_axis);
 //    const myline = line().x((d, index)=> index*30).y(d => d);
 //    svg.selectAll.data([dat]).join("path").attr("d",d=myline(d));
 // Set the dimensions of the canvas / graph
//  var margin = {top: 30, right: 20, bottom: 30, left: 50},
//      width = 600 - margin.left - margin.right,
//      height = 270 - margin.top - margin.bottom;
//
//  Parse the date / time
//  var parseDate = d3.time.format("%d-%b-%y").parse;
//
//  Set the ranges
//  var x = d3.scaleTime().range([0, width]);
//  var y = d3.scaleTime().range([height, 0]);
//
//  Define the axes
//  var xAxis = d3.axisBottom().scaleLinear(x)
//      .orient("bottom").ticks(5);
//
//  var yAxis = d3.axisLeft().scaleLinear(y)
//      .orient("left").ticks(5);
//
//  Define the line
//  var valueline = d3.line()
//      .x(function(d) { return x(d.totalconfirmed); })
//      .y(function(d) { return y(d.dailyconfirmed); });
//
//  Adds the svg canvas
//    svg
//      .append("svg")
//          .attr("width", width + margin.left + margin.right)
//          .attr("height", height + margin.top + margin.bottom)
//      .append("g")
//          .attr("transform",
//                "translate(" + margin.left + "," + margin.top + ")");

},[timeseries])
  // console.log(new Date(timeseries[0]));
   //  const graphData = useCallback(
   //  (ts) => {
   // //
   // //
   // //     // Margins

   // //
   //     const T = ts.length;
   //     const yBuffer = 1.1;
   // //
   //      setDatapoint(ts[T - 1]);
   //      setIndex(T - 1);
   // //
   //     const svg1 = d3.select(svgRef1.current);
   // //     const svg2 = d3.select(svgRef2.current);
   // //     const svg3 = d3.select(svgRef3.current);
   // //
        // const dateMin = new Date(timeseries[0]['date']);
   //
   //
   //     dateMin.setDate(dateMin.getDate() - 1);
   //     const dateMax = new Date(ts[T - 1]['date']);
   //     dateMax.setDate(dateMax.getDate() + 1);
   //
   //     const xScale = d3
   //       .scaleTime()
   //       .clamp(true)
   //       .domain([dateMin, dateMax])
   //       .range([margin.left, chartRight]);
   //
   //     // Number of x-axis ticks
   //     const numTicksX = width < 480 ? 4 : 7;
   //
   //     const xAxis = (g) =>
   //       g
   //         .attr('class', 'x-axis')
   //         .call(d3.axisBottom(xScale).ticks(numTicksX))
   //         .style('transform', `translateY(${chartBottom}px)`);
   //
   //     const yAxis = (g, yScale) =>
   //       g
   //         .attr('class', 'y-axis')
   //         .call(d3.axisRight(yScale).ticks(4, '0~s').tickPadding(5))
   //         .style('transform', `translateX(${chartRight}px)`);
   //
   //     // Arrays of objects
   //      const svgArray = [svg1, svg2, svg3];
   //     const plotTotal = chartType === 1;
   //     const dataTypesTotal = [
   //       'totalconfirmed',
   //       'totalrecovered',
   //       'totaldeceased',
   //     ];
   //     const dataTypesDaily = [
   //       'dailyconfirmed',
   //       'dailyrecovered',
   //       'dailydeceased',
   //     ];
   //
   //     const colors = ['#ff073a', '#28a745', '#6c757d'];
   //
   //     let yScales;
   //     if (plotTotal) {
   //       let uniformScaleMin = Infinity;
   //       dataTypesTotal.forEach((type) => {
   //         uniformScaleMin = Math.min(
   //           uniformScaleMin,
   //           d3.min(ts, (d) => d[type])
   //         );
   //       });
   //       const yScaleUniformLinear = d3
   //         .scaleLinear()
   //         .clamp(true)
   //         .domain([
   //           uniformScaleMin,
   //           Math.max(1, yBuffer * d3.max(ts, (d) => d.totalconfirmed)),
   //         ])
   //         .nice()
   //         .range([chartBottom, margin.top]);
   //
   //       const yScaleUniformLog = d3
   //         .scaleLog()
   //         .clamp(true)
   //         .domain([
   //           Math.max(1, uniformScaleMin),
   //           Math.max(1, yBuffer * d3.max(ts, (d) => d.totalconfirmed)),
   //         ])
   //         .nice()
   //         .range([chartBottom, margin.top]);
   //
   //       yScales = dataTypesTotal.map((type) => {
   //         const yScaleLinear = d3
   //           .scaleLinear()
   //           .clamp(true)
   //           .domain([
   //             d3.min(ts, (d) => d[type]),
   //             Math.max(1, yBuffer * d3.max(ts, (d) => d[type])),
   //           ])
   //           .nice()
   //           .range([chartBottom, margin.top]);
   //         const yScaleLog = d3
   //           .scaleLog()
   //           .clamp(true)
   //           .domain([
   //             Math.max(
   //               1,
   //               d3.min(ts, (d) => d[type])
   //             ),
   //             Math.max(1, yBuffer * d3.max(ts, (d) => d[type])),
   //           ])
   //           .nice()
   //           .range([chartBottom, margin.top]);
   //         if (logMode) return mode ? yScaleUniformLog : yScaleLog;
   //         else return mode ? yScaleUniformLinear : yScaleLinear;
   //       });
   //     } else {
   //       const yScaleDailyUniform = d3
   //         .scaleLinear()
   //         .clamp(true)
   //         .domain([
   //           0,
   //           Math.max(1, yBuffer * d3.max(ts, (d) => d.dailyconfirmed)),
   //         ])
   //         .nice()
   //         .range([chartBottom, margin.top]);
   //
   //       yScales = dataTypesDaily.map((type) => {
   //         const yScaleLinear = d3
   //           .scaleLinear()
   //           .clamp(true)
   //           .domain([0, Math.max(1, yBuffer * d3.max(ts, (d) => d[type]))])
   //           .nice()
   //           .range([chartBottom, margin.top]);
   //         return mode ? yScaleDailyUniform : yScaleLinear;
   //       });
   //     }
   //
   //     /* Focus dots */
   //     const focus = svgArray.map((svg, i) => {
   //       return svg
   //         .selectAll('.focus')
   //         .data([ts[T - 1]], (d) => d.date)
   //         .join('circle')
   //         .attr('class', 'focus')
   //         .attr('fill', colors[i])
   //         .attr('stroke', colors[i])
   //         .attr('r', 4);
   //     });
   //
   //     function mousemove() {
   //       const xm = d3.mouse(this)[0];
   //       const date = xScale.invert(xm);
   //       const bisectDate = d3.bisector((d) => d.date).left;
   //       let i = bisectDate(ts, date, 1);
   //       if (0 <= i && i < T) {
   //         if (date - ts[i - 1].date < ts[i].date - date) --i;
   //         setDatapoint(ts[i]);
   //         setIndex(i);
   //         setMoving(true);
   //         const d = ts[i];
   //         // focus.forEach((f, j) => {
   //         //   const yScale = ySc* as d3ales[j];
   //         //   const type = plotTotal ? dataTypesTotal[j] : dataTypesDaily[j];
   //         //   f.attr('cx', xScale(d.date)).attr('cy', yScale(d[type]));
   //         // });
   //       }
   //     }
   //
   //     // function mouseout() {
   //     //   setDatapoint(ts[T - 1]);
   //     //   setIndex(T - 1);
   //     //   setMoving(false);
   //     //   focus.forEach((f, j) => {
   //     //     const yScale = yScales[j];
   //     //     const type = plotTotal ? dataTypesTotal[j] : dataTypesDaily[j];
   //     //     f.attr('cx', xScale(ts[T - 1].date)).attr(
   //     //       'cy',
   //     //       yScale(ts[T - 1][type])
   //     //     );
   //     //   });
   //     // }
   //
   //     /* Begin drawing charts */
   //     svgArray.forEach((svg, i) => {
   //       // Transition interval
   //       const t = svg.transition().duration(500);
   //       const typeTotal = dataTypesTotal[i];
   //       const typeDaily = dataTypesDaily[i];
   //       const type = plotTotal ? typeTotal : typeDaily;
   //     //
   //     //   const color = colors[i];
   //     //   const yScale = yScales[i];
   //     //   // WARNING: Bad code ahead.
   //     //   /* X axis */
   //     //   if (svg.select('.x-axis').empty()) {
   //     //     svg.append('g').attr('class', 'x-axis').call(xAxis);
   //     //   } else {
   //     //     svg.select('.x-axis').transition(t).call(xAxis);
   //     //   }
   //     //   /* Y axis */
   //     //   if (svg.select('.y-axis').empty()) {
   //     //     svg.append('g').call(yAxis, yScale);
   //     //   } else {
   //     //     svg.select('.y-axis').transition(t).call(yAxis, yScale);
   //       }
   //       // ^This block of code should be written in a more d3 way following the
   //       //  General Update Pattern. Can't find of a way to do that within React.
   //
   //       /* Path dots */
   //       svg
   //         .selectAll('.dot')
   //         .data(ts, (d) => d.date)
   //         .join((enter) => enter.append('circle').attr('cy', chartBottom))
   //         .attr('class', 'dot')
   //         .attr('fill', color)
   //         .attr('stroke', color)
   //         .attr('r', 2)
   //         .transition(t)
   //         .attr('cx', (d) => xScale(d.date))
   //         .attr('cy', (d) => yScale(d[type]));
   //
   //       focus[i]
   //         .transition(t)
   //         .attr('cx', (d) => xScale(d.date))
   //         .attr('cy', (d) => yScale(d[type]));
   //
   //       if (plotTotal) {
   //         /* TOTAL TRENDS */
   //         svg.selectAll('.stem').remove();
   //         const path = svg
   //           .selectAll('.trend')
   //           .data([[...ts].reverse()])
   //           .join('path')
   //           .attr('class', 'trend')
   //           .attr('fill', 'none')
   //           .attr('stroke', color + '99')
   //           .attr('stroke-width', 4);
   //         // HACK
   //         // Path interpolation is non-trivial. Ideally, a custom path tween
   //         // function should be defined which takes care that old path dots
   //         // transition synchronously along with the path transition. This hack
   //         // simulates that behaviour.
   //         if (path.attr('d')) {
   //           const n = path.node().getTotalLength();
   //           const p = path.node().getPointAtLength(n);
   //           // Append points at end of path for better interpolation
   //           path.attr(
   //             'd',
   //             () => path.attr('d') + `L${p.x},${p.y}`.repeat(3 * T)
   //           );
   //         }
   //         path
   //           .transition(t)
   //           .attr('opacity', plotTotal ? 1 : 0)
   //           .attr(
   //             'd',
   //             d3
   //               .line()
   //               .x((d) => xScale(d.date))
   //               .y((d) => yScale(d[typeTotal]))
   //               .curve(d3.curveMonotoneX)
   //           );
   //         // Using d3-interpolate-path
   //         // .attrTween('d', function (d) {
   //         //   var previous = path.attr('d');
   //         //   var current = line(d);
   //         //   return interpolatePath(previous, current);
   //         // });
   //       } else {
   //         /* DAILY TRENDS */
   //         svg.selectAll('.trend').remove();
   //         svg
   //           .selectAll('.stem')
   //           .data(ts, (d) => d.date)
   //           .join((enter) =>
   //             enter
   //               .append('line')
   //               .attr('x1', (d) => xScale(d.date))
   //               .attr('x2', (d) => xScale(d.date))
   //               .attr('y2', chartBottom)
   //           )
   //           .attr('class', 'stem')
   //           .style('stroke', color + '99')
   //           .style('stroke-width', 4)
   //           .attr('y1', chartBottom)
   //           .transition(t)
   //           .attr('x1', (d) => xScale(d.date))
   //           .attr('x2', (d) => xScale(d.date))
   //           .attr('y2', (d) => yScale(d[typeDaily]));
   //       }
   //
   //       svg
   //         .on('mousemove', mousemove)
   //         .on('touchmove', mousemove)
   //         .on('mouseout', mouseout)
   //         .on('touchend', mouseout);
   //     },[width,height, chartType, logMode, mode]);
   //
   // //
   // // useEffect(() => {
   // //   if (timeseries.length > 1) {
   // //     graphData(timeseries);
   // //   }
   // // }, [timeseries, graphData]);
   // //
   // // const focusDate = moment(datapoint.date);
   // let dateStr = focusDate.format('DD MMMM');
   // dateStr += focusDate.isSame(moment().subtract(1, 'days'), 'day')
   //    ? ' Yesterday'
   //  : '';
   // //
   //  const chartKey1 = chartType === 1 ? 'totalconfirmed' : 'dailyconfirmed';
   // // const chartKey2 = chartType === 1 ? 'totalrecovered' : 'dailyrecovered';
   // // const chartKey3 = chartType === 1 ? 'totaldeceased' : 'dailydeceased';
   // //
   // // // Function for calculate increased/decreased count for each type of data
   // // const currentStatusCount = (chartType) => {
   // //   if (timeseries.length <= 0 || index <= 0 || index >= timeseries.length)
   // //     return '';
   // //   const currentDiff =
   // //     timeseries[index][chartType] - timeseries[index - 1][chartType];
   // //   const formatedDiff = formatNumber(currentDiff);
   // //   return currentDiff >= 0 ? `+${formatedDiff}` : formatedDiff;


  return (

     <React.Fragment>
     <svg ref={svgRef}></svg>
     <button onClick={()=>setTimeseries(timeseries.map((datapoint,i) => datapoint.dailyconfirmed-5))}>
     Update Data
     </button>
     </React.Fragment>
        );
}
     //   className="TimeSeries-Parent fadeInUp"
     //   style={{animationDelay: '2.7s'}}
     // >
     //   // <div className="timeseries">
     //   //   <div className="svg-parent" ref={wrapperRef}>
     //   //     <div className="stats">
     //   //       <h5 className={`${!moving ? 'title' : ''}`}>Confirmed</h5>
     //   //       <h5 className={`${moving ? 'title' : ''}`}>{`${dateStr}`}</h5>
     //   //       <div className="stats-bottom">
     //   //         <h2>{formatNumber(datapoint[chartKey1])}</h2>
     //   //         <h6>{currentStatusCount(chartKey1)}</h6>
     //   //       </div>
     //   //     </div>
     //   //     <svg ref={svgRef1} preserveAspectRatio="xMidYMid meet" />
     //   //   </div>
     //   //   </div>


//
//          <div className="svg-parent is-green">
//            <div className="stats is-green">
//              <h5 className={`${!moving ? 'title' : ''}`}>Recovered</h5>
//              <h5 className={`${moving ? 'title' : ''}`}>{`${dateStr}`}</h5>
//              <div className="stats-bottom">
//                <h2>{formatNumber(datapoint[chartKey2])}</h2>
//                <h6>{currentStatusCount(chartKey2)}</h6>
//              </div>
//            </div>
//            <svg ref={svgRef2} preserveAspectRatio="xMidYMid meet" />
//          </div>
//
//          <div className="svg-parent is-gray">
//            <div className="stats is-gray">
//              <h5 className={`${!moving ? 'title' : ''}`}>Deceased</h5>
//              <h5 className={`${moving ? 'title' : ''}`}>{`${dateStr}`}</h5>
//              <div className="stats-bottom">
//                <h2>{formatNumber(datapoint[chartKey3])}</h2>
//                <h6>{currentStatusCount(chartKey3)}</h6>
//              </div>
//            </div>
//            <svg ref={svgRef3} preserveAspectRatio="xMidYMid meet" />
//          </div>
//        </div>
//
//        <div className="pills">
//          <button
//            type="button"
//            onClick={() => setLastDaysCount(Infinity)}
//            className={lastDaysCount === Infinity ? 'selected' : ''}
//          >
//            Beginning
//          </button>
//          <button
//            type="button"
//            onClick={() => setLastDaysCount(30)}
//            className={lastDaysCount === 30 ? 'selected' : ''}
//            aria-label="1 month"
//          >
//            1 Month
//          </button>
//          <button
//            type="button"
//            onClick={() => setLastDaysCount(14)}
//            className={lastDaysCount === 14 ? 'selected' : ''}
//            aria-label="14 days"
//          >
//            2 Weeks
//          </button>
//        </div>
//      </div>


  // return(
  //   <>
  //   <svgRef1/>
  //   </>
  // );


export default Dchart;
