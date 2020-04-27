import React, {  useState, useEffect, useRef,useContext } from "react";

// // import * as d3 from 'd3';
// import { select, nest,selectAll,line,curveCardinal,curveBasis,extent,axisLeft,max,axisBottom,scaleLinear,
// scaleTime ,curveMonotoneX,scaleLog,scaleSymlog,ascending,scaleOrdinal,schemeCategory10,bisector,mouse,pos,voronoi,merge,map} from 'd3';
// import {Delaunay} from 'd3-delaunay';
import { select, nest,line,curveCardinal,curveBasis,extent,axisLeft,max,axisBottom,scaleLinear,
  scaleTime ,curveMonotoneX,scaleLog,scaleSymlog,ascending,scaleOrdinal,schemeCategory10, selectAll, zoom,
  zoomTransform} from 'd3';
import {event as currentEvent} from 'd3';

// import moment from 'moment';
import {TableContext} from './TableContext';
// import {sliceTimeseriesFromEnd} from './common-functions';
import {useResizeObserver} from './hooks';
import {STATE_CODES} from './constants'
// import {useWindowSize} from './common-functions';
// import {formatNumber} from './common-functions';
console.log(STATE_CODES["AN"])
// import * from 'd3';


const Dchart = (props) => {
  // const [lastDaysCount, setLastDaysCount] = useState(
  //   window.innerWidth > 512 ? Infinity : 30
  // );
  // const [activeStateCode,setActiveStateCode] = useState(props.activeStateCode);
//   const [timeseries, setTimeseries] = useState([]);
// // const [allData,setallData]=useState([]);
//   const [datapoint, setDatapoint] = useState({});
//   const [index, setIndex] = useState(0);
  const [radiostate,setRadiostate] = useState([]);
  const [mode, setMode] = useState(props.mode);
  const [logMode, setLogMode] = useState([]);
  const [chartType, setChartType] = useState(props.casetype);
  const [moving, setMoving] = useState(false);
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [totdata,setTotdata]=useState([]);
  const [lastDaysCount,setLastDaysCount]=useState(14);
   // const [allData,setallData]=useState([]);
  // const [as,setAs]=useState(["TT"]);

//  console.log(activeStateCode);
const context = useContext(TableContext);

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
     const [currentZoomState, setCurrentZoomState] = useState();

     useEffect(()=>
   setLastDaysCount(props.timeMode)
 ,[props.timeMode])


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
// console.log(logMode);
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

         // console.log(allData);


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
              const margin = {top: 40, right: 30, bottom: 65, left: 55};
                         const w = width - margin.left - margin.right;
                         const h = height - margin.top - margin.bottom;



const svg = select(svgRef.current).attr("width",width).attr("height",height);


          const g =  svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            const yscale = logMode === true ?
            scaleSymlog().domain([1,max(allData,yValue)]).range([h,1]).nice() :
            scaleLinear().domain(extent(allData,yValue)).range([h,0]).nice();


            const xscale =  scaleTime()
              .domain(extent(allData,xValue))
              .range([0,w])
              .nice();

// console.log(timeseries)
if (currentZoomState) {
  const newXScale = currentZoomState.rescaleX(xscale);
  xscale.domain(newXScale.domain());
}


          const myline = line()
            .x(d => xscale(xValue(d)))
            .y(d => yscale(1+yValue(d))).curve(curveCardinal)

        var dataNest = nest()
        .key(function(d){
          return STATE_CODES[d.state];
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
  // .on("mouseenter",(d,i)=>
  // {
  //   g.selectAll(".tooltip")
  //   .data(dataNest)
  //   .join("text")
  //   .attr("class","tooltip")
  //   .text(d.value)
  //   .attr("x",d.key)
  //   .attr("y",d.values)
  // })


  g.append("text")                                    // *******
      // .attr("x", (legendSpace/3)+i*legendSpace) // spacing // ****
      // .attr("y", (margin.top/2)- 25)         // *******
      .attr("x", (i%4)*w/3.5) // spacing // ****
      .attr("y", Math.floor(i/4)*20-3)
      .attr("class", "legend")    // style the legend   // *******
      .style("fill", function() { // dynamic colours    // *******
          return d.color = color(d.key); })             // *******
      .text(d.key)


    
});

// dataNest.forEach(function(d,i){
//   console.log(d)
//     g.append("circle") // Uses the enter().append() method
//         .attr("class", "dot") // Assign a class for styling
//         .attr('fill', color.range()[i])
//         .attr("cx", function(d, i) { return xscale(d.key) })
//         .attr("cy", function(d) { console.log(d); return yscale(d.values) })//this is not working
//         .attr("r", 5);
  
//   });



// console.log(yscale);

const xTicks = 6;
const xAxis = axisBottom()
    .scale(xscale)
    .tickPadding(15)
    .ticks(xTicks)
    // .tickValues((xscale.domain().filter(function(d, i) {return !(i % 2)})))
    .tickSize(-h);
// console.log((xscale.domain().filter(function(d, i) {return (i % 2)})));

  const yTicks = 4;
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




   
    //   const zoomBehavior = zoom()
    //   .scaleExtent([0.5, 5])
    //   .translateExtent([
    //     [0, 0],
    //     [w, h]
    //   ])
    //   .on("zoom", () => {
    //     const zoomState = zoomTransform(svg.node());
    //     setCurrentZoomState(zoomState);
    //   });

    // svg.call(zoomBehavior);

// const linechart = g
//         .append('g')
//         .attr('class','linechart');
// var legendSpace = width/dataNest.length;
// // console.log(dataNest)
// dataNest.forEach(function(d, i)  {
//   linechart.append("path").attr("d",myline(d.values))
//   .attr("stroke",d.color=()=>color(d.key))
//   .attr("stroke-width",2)
//   .attr("fill","none")
//   .transition()
//   .duration(1000)

//   g.append("text")                                    // *******
//   // .attr("x", (legendSpace/3)+i*legendSpace) // spacing // ****
//   // .attr("y", (margin.top/2)- 25)         // *******
//   .attr("x", (i%4)*w/3.5) // spacing // ****
//   .attr("y", Math.floor(i/4)*20)
//   .attr("class", "legend")    // style the legend   // *******
//   .style("fill", function() { // dynamic colours    // *******
//       return d.color = color(d.key); })             // *******
//   .text(d.key)





// });



// function mouseover(){
 
//   tip
//   .style('left', currentEvent.clientX+'px')
//   .style('top',currentEvent.clientY+'px')
// }

// const tip = select('.tooltip');
// selectAll('linechart').on('mouseover',mouseover);



}

  drawChart();


  window.addEventListener('resize', drawChart );
 


},[allData,dimensions,radiostate,logMode])


  return (


     <div className="svg-parent" ref={wrapperRef} >
     <svg ref={svgRef} />
     <div className="tooltip"></div>
      </div>


        );
}

export default Dchart;
