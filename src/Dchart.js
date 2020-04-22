import React, { useMemo, useState, useEffect, useRef,useCallback,useContext } from "react";

// import * as d3 from 'd3';
import { select, nest,selectAll,line,curveCardinal,curveBasis,extent,axisLeft,max,axisBottom,scaleLinear,
scaleTime ,curveMonotoneX,scaleLog,scaleSymlog,ascending,scaleOrdinal,schemeCategory10,bisector,mouse,pos,voronoi,merge,map} from 'd3';
import {Delaunay} from 'd3-delaunay';


import moment from 'moment';
import {TableContext} from './TableContext';
import {sliceTimeseriesFromEnd} from './common-functions';
import {useResizeObserver} from './hooks';
// import {useWindowSize} from './common-functions';
import {formatNumber} from './common-functions';

// import * from 'd3';

// const Tooltip = ({ activeRow, className }) => (
//   <text className={className} x={-10} y={-10} text-anchor="end">
//     {activeRow.countryName}: {formatComma(activeRow.deathTotal)}{' '}
//     {activeRow.deathTotal > 1 ? 'deaths' : 'death'} as of{' '}
//     {formatDate(activeRow.date)}
//   </text>
// );

const Dchart = (props) => {
  const [lastDaysCount, setLastDaysCount] = useState(
    window.innerWidth > 512 ? Infinity : 30
  );
  // const [activeStateCode,setActiveStateCode] = useState(props.activeStateCode);
  const [timeseries, setTimeseries] = useState([]);
// const [allData,setallData]=useState([]);
  const [datapoint, setDatapoint] = useState({});
  const [index, setIndex] = useState(0);
  const [radiostate,setRadiostate] = useState([]);
  const [mode, setMode] = useState(props.mode);
  const [logMode, setLogMode] = useState([]);
  const [chartType, setChartType] = useState(props.casetype);
  const [moving, setMoving] = useState(false);
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [totdata,setTotdata]=useState([]);
  // const [as,setAs]=useState(["TT"]);
console.log(radiostate);
//  console.log(activeStateCode);
const context = useContext(TableContext);
console.log("Chart:",context.statecodes)
  const svgRef = useRef();
  // const svgRef2 = useRef();
  // const svgRef3 = useRef();

  const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
  // useEffect(() => {
  //   setTimeSeriesData(timeseries.slice(timeseries.length - 20));
  // }, [timeseries]);
  useEffect(() => {
    const todat = props.totdata;
    setTotdata(todat);

  }, [props.totdata])
  
const as = context.statecodes!==[]? context.statecodes: ["TT"];
console.log("Update",as);
 const gh = [];
// const tc = (totdata,i)=> {for i in }
  for (var i = 0; i < as.length; i++)
{
    var tv = [];
    var resul=[];
    var retf=[];
    tv[as[i]]=totdata[as[i]];
    resul = Object.keys(tv).reduce(function (r, k) {
            return r.concat( tv[k]);
        }, []);
    retf =resul.map(o=>({...o, state: as[i]}))
    gh[i] = retf;

 }
//  const ry =[];
//  var retf=[];
//  ry['AP']=totdata['AP']
//  retf =ry.map(o=>o.State='AP')
 const allData = Object.keys(gh).reduce(function (r, k) {
         return r.concat( gh[k]);
     }, []);
// retf =resul.map(o=>({...o, State: 'AP'}))
 // console.log(gh)

// useEffect(() => {
//     if (allDatas.length > 1) {
//       const slicedTimeseries = sliceTimeseriesFromEnd(
//         allDatas,
//         lastDaysCount
//       );
//       setIndex(slicedTimeseries.length - 1);
//       setallData(allDatas);
//
//     }
//   }, [allDatas, lastDaysCount]);

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

  allData.forEach((d,i)=> {
 // console.log(tv['TN'].totalconfirmed);

       d[radiostate]=+d[radiostate];

        d.date= new Date(d.date);
        });

         console.log(allData);


            const xValue = (d) => d.date;
            const xAxisLabel ='Time';

            const yValue = (d) => d[radiostate];
            const yAxisLabel= (radiostate==='totalconfirmed')?'Total Cases'
                                            :radiostate==='totalactive'?'Active Cases'
                                            :radiostate==='totalrecovered'?'Total Recovered'
                                            :radiostate==='totaldeceased'?'Total Deaths'
                                            :'Daily cases';

// const delaunay = Delaunay.from( allData, d => d.date, d => d[radiostate] )

const drawChart = () => {
  select('g').remove();

         const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
         

              if (!dimensions) return;
              const margin = {top: 40, right: 30, bottom: 105, left: 55};
                         const w = width - margin.left - margin.right;
                         const h = height - margin.top - margin.bottom;



const svg = select(svgRef.current).attr("width",width).attr("height",height);


          const g =  svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            const xscale =  scaleTime()
              .domain(extent(allData,xValue))
              .range([0,w])
              .nice();

// console.log(timeseries)
          const yscale = logMode === "true" ?
          scaleSymlog().domain([1,max(allData,yValue)]).range([h,1]).nice() :
          scaleLinear().domain(extent(allData,yValue)).range([h,0]).nice();


          const myline = line()
            .x(d => xscale(xValue(d)))
            .y(d => yscale(1+yValue(d))).curve(curveBasis)

        var dataNest = nest()
        .key(function(d){
          return d.state;
        })
        .entries(allData)
// console.log(dataNest)
var color = scaleOrdinal(schemeCategory10);

       
var legendSpace = width/dataNest.length;
// console.log(dataNest)
dataNest.forEach(function(d, i)  {
  g.append("path").attr("d",myline(d.values))
  .attr("stroke",d.color=()=>color(d.key))
  .attr("stroke-width",2)
  .attr("fill","none")

  g.append("text")                                    // *******
      .attr("x", (legendSpace/3)+i*legendSpace) // spacing // ****
      .attr("y", (margin.top/2)- 25)         // *******
      .attr("class", "legend")    // style the legend   // *******
      .style("fill", function() { // dynamic colours    // *******
          return d.color = color(d.key); })             // *******
      .text(d.key);

      g.append("rect")                                    // *******
          .attr("x", (legendSpace/3)+i*legendSpace-22) // spacing // ****
          .attr("y", (margin.top/2)- 37)
          .attr('width', 20)
          .attr('height', 15)       // *******
          .attr("class", "legend")    // style the legend   // *******
          .style("fill", function() { // dynamic colours    // *******
              return d.color = color(d.key); })

});




// g.selectAll("circle")
// 		.data(allData)
// 		.enter()
// 		.append("circle")
// 			.attr("class","tipcircle")
// 			.attr("cx", function(d,i){return xscale(d.date)})
// 			.attr("cy",function(d,i){return yscale(d.values)})
// 			.attr("r",12)
			// .style('opacity', 1e-6)//1e-6



            // g.selectAll('circle').data(allData)
            //   .enter().append('circle')
            //     .attr('cy', d => yscale(yValue(d)))
            //     .attr('cx', d => xscale(xValue(d)))
            //     .attr('r', 3)
            //     .attr('fill','maroon');




// console.log(yscale);

const xTicks = 6;
const xAxis = axisBottom()
    .scale(xscale)
    .tickPadding(15)
    .ticks(xTicks)
    // .tickValues((xscale.domain().filter(function(d, i) {return !(i % 2)})))
    .tickSize(-h);
// console.log((xscale.domain().filter(function(d, i) {return (i % 2)})));

  const yTicks = 6;
  const yAxis = axisLeft()
    .scale(yscale)
    .ticks(yTicks,"~s")
    .tickPadding(15)
    .tickSize(-w);

        g.append('g')
        .attr("transform", "translate(0, " + h  +")").call(xAxis);
        g.append("text")
      .attr("transform",
            "translate(" + (w/2) + " ," +
                           (h + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text(xAxisLabel);

      g.append('g').call(yAxis);

      g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(yAxisLabel);

//          // Add the Legend

// sites = 	map(allData, function(d){return d.site;})
// .keys() // unique sites
// .forEach(function(d,i) {sites[d] = dataNest[i].values});
	   

// var voronoipo = voronoi()
//     .x(function(d) { return xscale(d.date); })
//     .y(function(d) { return yscale(d.value); })
//     .extent([[-margin.left, -margin.top], [w + margin.right, h + margin.bottom]]);

//     var voronoiGroup = g.append("g")
//     .attr("class", "voronoi");

    // voronoiGroup.selectAll("path")
    // .data(voronoipo.polygons(merge(allData.map(function(d) { return d.values; }))))
    // .enter().append("path")
    //   .attr("d", function(d) { return d ? "M" + d.join("L") + "Z" : null; })
    //   .on("mouseover", mouseover)
    //   .on("mouseout", mouseout);

    // const points = line()
    //   .x(d => xscale(xValue(d)))
    //   .y(d => yscale(1+yValue(d)))
    //  const delaunay = Delaunay.from(myline);
    // console.log(myline)
    // const voronoi = delaunay.voronoi([
    //   0,
    //   0,
    //   innerWidth + margin.right,
    //   innerHeight
    // ]);

}



  drawChart();


  window.addEventListener('resize', drawChart );



},[allData,dimensions,radiostate,logMode])



  return (


     <div className="svg-parent" ref={wrapperRef} >
     <svg ref={svgRef} />
      </div>


        );
}

export default Dchart;
