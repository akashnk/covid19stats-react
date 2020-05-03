import React, {  useState, useEffect, useRef,useContext,useCallback } from "react";

// // import * as d3 from 'd3';
// import { select, nest,selectAll,line,curveCardinal,curveBasis,extent,axisLeft,max,axisBottom,scaleLinear,
// scaleTime ,curveMonotoneX,scaleLog,scaleSymlog,ascending,scaleOrdinal,schemeCategory10,bisector,mouse,pos,voronoi,merge,map} from 'd3';
// import {Delaunay} from 'd3-delaunay';
import { select, nest,line,curveCardinal,curveBasis,extent,axisLeft,max,axisBottom,scaleLinear,
  scaleTime ,curveMonotoneX,scaleLog,scaleSymlog,ascending,scaleOrdinal,schemeCategory10, selectAll, zoom,
  zoomTransform} from 'd3';
import {event as currentEvent} from 'd3';
import axios from "axios";

// import moment from 'moment';
import {TableContext} from '../TableContext';
// import {sliceTimeseriesFromEnd} from './common-functions';
import {useResizeObserver} from '../Common/hooks';
import {STATE_CODES} from '../Common/constants'
// import {useWindowSize} from './common-functions';
import {formatNumber,formatDate,sliceTimeseriesFromEnd} from '../Common/common-functions';
import {format} from 'date-fns';


const Worldchart = (props) => {
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
   
    const [countryd,setCountryd] = useState([]);
    const [worldd,setWorldd] = useState([]);
    const [fetched,setFetched] =useState(false);
    const [index, setIndex] = useState(0);
    const [daysC,setDaysC] = useState([])
     // const [allData,setallData]=useState([]);
    // const [as,setAs]=useState(["TT"]);
  // console.log(conts.tooltip)
  //  console.log(activeStateCode);
  const context = useContext(TableContext);
  var lineOpacity = "0.25";
  var lineOpacityHover = "0.85";
  var otherLinesOpacityHover = "0.1";
  var lineStroke = "1.5px";
  var lineStrokeHover = "2.5px";
  
  var circleOpacity = "0.85";
  var circleOpacityOnLineHover = "0.25";
  var circleRadius = 3;
  var circleRadiusHover = 6;
  var duration = 250;
  
    const svgRef = useRef();
    // const svgRef2 = useRef();
    // const svgRef3 = useRef();
  
    const wrapperRef = useRef();
      const dimensions = useResizeObserver(wrapperRef);
    // useEffect(() => {
    //   setTimeSeriesData(timeseries.slice(timeseries.length - 20));
    // }, [timeseries]);
   
    useEffect(() => {
      const totdat = props.totdata;
      const todat = totdat
      setTotdata(todat);
  
    }, [props.totdata])
  
    // const transformTimeSeries = useCallback(
    //   (totdata) => {
    //     if (timeseries.length > 1) {
    //       const slicedTimeseries = sliceTimeseriesFromEnd(
    //         timeseries,
    //         14
    //       );
    //       setIndex(slicedTimeseries.length - 1);
    //       setTimeseries(slicedTimeseries);
    //     }
    //   },
    //   [14]
    // );
    // console.log(timeseries)
  
  
  const as = context.countrycodes!==[]? context.countrycodes: ["World"];
  
   const gh = [];
  //  const daysC= props.DaysC;
  useEffect(() => {
    setDaysC(props.daysC);
  }, [props.daysC]);
  
  const api1 = 'https://pomber.github.io/covid19/timeseries.json'
//   const api2 = 'https://raw.githubusercontent.com/datasets/covid-19/master/data/worldwide-aggregated.csv'
// //   const api2 = 'https://disease.sh/v2/historical?lastdays=15'
//   const api3 = 'https://disease.sh/v2/historical?lastdays=60'

//   const apiw1 = 'https://disease.sh/v2/historical/all?lastdays=30'
//   const apiw2 = 'https://disease.sh/v2/historical/all?lastdays=15'
//   const apiw3 = 'https://disease.sh/v2/historical/all?lastdays=60'
  // const tc = (totdata,i)=> {for i in }

  const daysCount = (daysC==="Fortnight") ? 14 : (daysC === "Month") ? 28 : Infinity;
  
  const fetchData = async () => {
    try {
      const [
        countryd

     ] =
     await Promise.all([
      axios.get(api1)
      
    //   axios.get(apiURL2),
   
   ]);
      // world data
      setCountryd(countryd.data);
   
     
       

    
       
       setFetched(true);



    } catch (err) {
       console.log(err);
     }
   };
  
    useEffect(() => {
       if (fetched === false) {
         fetchData();
         
       }
     }, [fetched]);

   


     if (countryd){
     
        var countryArr = Object.keys(countryd).map(i => i);
        var worldChart = [];
        countryArr.forEach((country) => {
            let countryData = countryd[country];
            countryData.forEach((dailyData, index) => {
                if (worldChart[index] === undefined) {
                    var worldStats = { date: dailyData.date, confirmed: dailyData.confirmed, recovered: dailyData.recovered, deaths: dailyData.deaths };
                    worldChart.push(worldStats);
                } else {
                    worldChart[index].confirmed += dailyData.confirmed;
                    worldChart[index].recovered += dailyData.recovered;
                    worldChart[index].deaths += dailyData.deaths;
                }
            });
          });
        }
   
          countryd["World"] = worldChart;

const o = countryd
// delete Object.assign(o, {["USA"]: o["US"]})["US"]


function ObjKeyRename2(src, map) {
    var dst = {};
    // src --> dst
    for(var key in src){
        if(key in map)
            // rename key
            dst[map[key]] = src[key];
        else
            // same key
            dst[key] = src[key];
    }
    // clear src
    for(var key in src){
        delete src[key];
    }
    // dst --> src
    for(var key in dst){
        src[key] = dst[key];
    }
}

ObjKeyRename2(o, {"US":"USA"});
ObjKeyRename2(o, {"United Kingdom":"UK"});
ObjKeyRename2(o, {"United Arab Emirates":"UAE"});
console.log(o)

    for (var i = 0; i < as.length; i++)
  {
      var tv = [];
      var resul=[];
      var retf=[];
      tv[as[i]]=o[as[i]];
      resul = Object.keys(tv).reduce(function (r, k) {
              return r.concat( tv[k]);
          }, []);
      retf =resul.map(o=>({...o, country: as[i]}))
      gh[i] = retf.slice(-daysCount);
  
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
  
  
  
   
function is_touch_enabled() { 
    return ( 'ontouchstart' in window ) ||  
           ( navigator.maxTouchPoints > 0 ) ||  
           ( navigator.msMaxTouchPoints > 0 ); 
} 

if(is_touch_enabled()){
    console.log("hi")
}
else{
    console.log("bye")
}
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
  
              const yValue = (d) => (d[radiostate]);
              const yAxisLabel= (radiostate==='confirmed')?'Cases'
                                              :radiostate==='active'?'Active'
                                              :radiostate==='recovered'?'Recovered':'deaths';
         
  
  
  // const delaunay = Delaunay.from( allData, d => d.date, d => d[radiostate] )
  
  const drawChart = () => {
  
    select('g').remove();
  
  
  
           const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
  
  
                if (!dimensions) return;
                const margin = {top: 40, right: 30, bottom: 65, left: 105};
                           const w = width - margin.left - margin.right;
                           const h = height - margin.top - margin.bottom;
  
  
  
  const svgk = select(svgRef.current).attr("width",width).attr("height",height)
  
  const svg = svgk.append("g")
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
            return d.country;
          })
          .entries(allData)
  
    // console.log(dataNest)
  var color = scaleOrdinal(schemeCategory10);
  
  
  
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
  
          svg.append('g')
          .attr("transform", "translate(0, " + h  +")").call(xAxis)
          .append("text")
        .attr("transform",
              "translate(" + (w/2) + " ," +
                             (h + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .style("fill", "red")
        .text(xAxisLabel);
  
        svg.append('g').call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "3em")
        .style("text-anchor", "middle")
        .style("fill", "red")
        .text(yAxisLabel);
  
  
  var legendSpace = width/dataNest.length;
  
  let lines = svg.append("g")
  lines.append('g')
  .selectAll("dot")
  .data(dataNest)
  .enter()
  .append("g")
  // .style("fill", (d, i) => color(i))
  .style("fill", d=>color(d.key))
  .append("g")
  .on("mouseover", function(d) {
   select(this)
      .style("cursor", "pointer")
      // .append("rect")
      // .attr("x",d => xscale(xValue(d)) - 45)
      // .attr("y",d => yscale(yValue(d)) - 45)
      // .attr("width",10)
      // .attr("height",10)
      // .attr("fill","red")
      .append("text")
      .attr("class", "textb")
      .style("font-size", "1.2em")
      // .text("<br/>"+`${d[radiostate]}`)
      .text(`${d.key}`)
      
      .attr("x", 45)
      .attr("y", 65);
  })
  .on("mouseout", function(d) {
   select(this)
      .style("cursor", "none")
      .transition()
      .duration(duration)
      .selectAll(".textb")
      .remove();
  })
  .selectAll("circle")
  .data(d => d.values)
  .enter()
  // .append("g")
  
  // .on("mouseover", function(d) {
  //  select(this)
  //     .style("cursor", "pointer")
  //     .append("rect")
  //     .attr("class", "textback")
  //     .attr("x",d => xscale(xValue(d)) - 45)
  //     .attr("y",d => yscale(yValue(d)) - 10)
  //     .attr("width",10)
  //     .attr("height",10)
  //     .style("fill","red")
  //     .style("opacity", 0.4)
  //     // .append("text")
  //     // .attr("class", "text")
  //     // // .text("<br/>"+`${d[radiostate]}`)
  //     // .text(`${format(d.date, 'dd MMMM')}`+":"+`${d[radiostate]}`)
  //     // .attr("x", d => xscale(xValue(d)) - 45)
  //     // .attr("y", d => yscale(yValue(d)) - 10);
  // })
  // .on("mouseout", function(d) {
  //  select(this)
  //     .style("cursor", "none")
  //     .transition()
  //     .duration(duration)
  //     .selectAll(".textback")
  //     .remove();
  // })
  
  
  .append("g")
  .on("mouseover", function(d) {
   select(this)
      .style("cursor", "pointer")
      // .append("rect")
      // .attr("x",d => xscale(xValue(d)) - 45)
      // .attr("y",d => yscale(yValue(d)) - 45)
      // .attr("width",10)
      // .attr("height",10)
      // .attr("fill","red")
      .append("text")
      .attr("class", "text")
      .style("font-size", "1.2em")
      // .text("<br/>"+`${d[radiostate]}`)
      .text(`${d[radiostate]}`+ " " + `${yAxisLabel}`+" "+"on"+" "+`${format(d.date, 'dd MMMM')}`)
      
      .attr("x", 45)
      .attr("y", 85);
  })
  .on("mouseout", function(d) {
   select(this)
      .style("cursor", "none")
      .transition()
      .duration(duration)
      .selectAll(".text")
      .remove();
  })
  
  .append("circle")
          .attr("cx",function (d) { return xscale(xValue(d)); } )
          .attr("cy",function (d) { return yscale(1+yValue(d)); })
          .attr("r",circleRadius)
          .style("opacity", circleOpacity)
         .on("mouseover", function(d) {
            select(this)
              .transition()
              .duration(duration)
              .attr("r", circleRadiusHover);
          })
          .on("mouseout", function(d) {
            select(this)
              .transition()
              .duration(duration)
              .attr("r", circleRadius);
          });
  // .append("circle")
  //         .attr("cx",function (d) { return xscale(xValue(d)); } )
  //         .attr("cy",function (d) { return yscale(1+yValue(d)); })
  //         .attr("r",circleRadius)
  //         .attr("fill","red")
  //         .on("mouseover", function(d) {
  //           select(this)
  //             .transition()
  //             .duration(duration)
  //             .attr("r", circleRadiusHover);
  //         })
  //         .on("mouseout", function(d) {
  //           select(this)
  //             .transition()
  //             .duration(duration)
  //             .attr("r", circleRadius);
  //         });
  //         lines
  //         .on("mouseover", function(d) {
  //           d3.select(this)
  //             .style("cursor", "pointer")
  //             .append("text")
  //             .attr("class", "text")
  //             .text(`${d.price}`)
  //             .attr("x", d => xScale(d.date) + 5)
  //             .attr("y", d => yScale(d.price) - 10);
  //         })
  //         .on("mouseout", function(d) {
  //           d3.select(this)
  //             .style("cursor", "none")
  //             .transition()
  //             .duration(duration)
  //             .selectAll(".text")
  //             .remove();
  //         })       
  
  
        //  g.append('g') 
        //   .append("svg:title")
        //   .text(function(d) { return yValue(d); });
        //   .attr("x",)
  
  dataNest.forEach(function(d, i)  {
    lines.append("path").attr("d",myline(d.values))
    .attr("stroke",d.color=()=>color(d.key))
    .attr("stroke-width",lineStroke)
    .attr("fill","none")
    .on("mouseover", function(d) {
      selectAll(".line").style("opacity", otherLinesOpacityHover);
     
      select(this)
        .style("opacity", lineOpacityHover)
        .style("stroke-width", lineStrokeHover)
        .style("cursor", "pointer");
    })
    .on("mouseout", function(d) {
      selectAll(".line").style("opacity", lineOpacity);
   
      select(this)
        .style("stroke-width", lineStroke)
        .style("cursor", "none");
    })
  
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
   
    // g.append("text")
    //  .html(d.key)
    //  .attr('fill', d.color)   
    //  .attr('alignment-baseline', 'middle')
    //  .attr('x', w-20)
    //  .attr('dx', '.5em')
    //  .attr('y', yscale(d.values[d.values.length-1].totalconfirmed)); 
  lines
    .append("text")                                    // *******
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
  
  
  
  
  
  
   
        const zoomBehavior = zoom()
        .scaleExtent([0.5, 5])
        .translateExtent([
          [0, 0],
          [w, h]
        ])
        .on("zoom", () => {
          const zoomState = zoomTransform(svg.node());
          setCurrentZoomState(zoomState);
        });
  
      lines.call(zoomBehavior);
  
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
       
        </div>
  
  
          );
  }
  
  export default Worldchart;
  