import React, {  useState, useEffect, useRef,useContext } from "react";


import { select, nest,line,curveCardinal,extent,axisLeft,max,axisBottom,scaleLinear,
  scaleTime ,scaleSymlog,scaleOrdinal,schemeCategory10, selectAll, zoom,
  zoomTransform,bisect,mouse,timeWeek} from 'd3';

// import moment from 'moment';
import {TableContext} from '../TableContext';
// import {sliceTimeseriesFromEnd} from './common-functions';
import {useResizeObserver} from '../Common/hooks';

// import {useWindowSize} from './common-functions';
// import {formatNumber,formatDate,sliceTimeseriesFromEnd} from '../Common/common-functions';
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
   
    const [timeSeriesData, setTimeSeriesData] = useState([]);
    const [totdata,setTotdata]=useState([]);
    const [lastDaysCount,setLastDaysCount]=useState(14);
   
    // const [countryd,setCountryd] = useState([]);
    // const [worldd,setWorldd] = useState([]);
    // const [fetched,setFetched] =useState(false);
    // const [index, setIndex] = useState(0);
    const [daysC,setDaysC] = useState([]);

  //  console.log(activeStateCode);
  const context = useContext(TableContext);
  // var lineOpacity = "0.25";
  // var lineOpacityHover = "0.85";
  // var otherLinesOpacityHover = "0.1";
  var lineStroke = "1.5px";
  // var lineStrokeHover = "2.5px";
  
  // var circleOpacity = "0.85";
  // var circleOpacityOnLineHover = "0.25";
  // var circleRadius = 3;
  // var circleRadiusHover = 6;
  // var duration = 250;
  
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
  
//   const api1 = 'https://pomber.github.io/covid19/timeseries.json'
//   const api2 = 'https://raw.githubusercontent.com/datasets/covid-19/master/data/worldwide-aggregated.csv'
// //   const api2 = 'https://disease.sh/v2/historical?lastdays=15'
//   const api3 = 'https://disease.sh/v2/historical?lastdays=60'

//   const apiw1 = 'https://disease.sh/v2/historical/all?lastdays=30'
//   const apiw2 = 'https://disease.sh/v2/historical/all?lastdays=15'
//   const apiw3 = 'https://disease.sh/v2/historical/all?lastdays=60'
  // const tc = (totdata,i)=> {for i in }

  const daysCount = (daysC==="Fortnight") ? 14 : (daysC === "Month") ? 28 : Infinity;
  
//   const fetchData = async () => {
//     try {
//       const [
//         countryd

//      ] =
//      await Promise.all([
//       axios.get(api1)
      
//     //   axios.get(apiURL2),
   
//    ]);
//       // world data
//       setCountryd(countryd.data);
   
     
       

    
       
//        setFetched(true);



//     } catch (err) {
//        console.log(err);
//      }
//    };
  
//     useEffect(() => {
//        if (fetched === false) {
//          fetchData();
         
//        }
//      }, [fetched]);

   


//      useEffect(()=>{
     
//         var countryArr = Object.keys(countryd).map(i => i);
//         var worldChart = [];
//         countryArr.forEach((country) => {
//             let countryData = countryd[country];
//             countryData.forEach((dailyData, index) => {
//                 if (worldChart[index] === undefined) {
//                     var worldStats = { date: dailyData.date, confirmed: dailyData.confirmed, recovered: dailyData.recovered, deaths: dailyData.deaths };
//                     worldChart.push(worldStats);
//                 } else {
//                     worldChart[index].confirmed += dailyData.confirmed;
//                     worldChart[index].recovered += dailyData.recovered;
//                     worldChart[index].deaths += dailyData.deaths;
//                 }
//             });
//           });
        
   
//           countryd["World"] = worldChart;
//     },[countryd])


// // delete Object.assign(o, {["USA"]: o["US"]})["US"]


// function ObjKeyRename2(src, map) {
//     var dst = {};
//     // src --> dst
//     for(var key in src){
//         if(key in map)
//             // rename key
//             dst[map[key]] = src[key];
//         else
//             // same key
//             dst[key] = src[key];
//     }
//     // clear src
//     for(var key in src){
//         delete src[key];
//     }
//     // dst --> src
//     for(var key in dst){
//         src[key] = dst[key];
//     }
// }

// useEffect(() => {
//     const o = countryd
// ObjKeyRename2(o, {"US":"USA"});
// ObjKeyRename2(o, {"United Kingdom":"UK"});
// ObjKeyRename2(o, {"United Arab Emirates":"UAE"});
//     setD(o);
// },[countryd]);



    for (var i = 0; i < as.length; i++)
  {
      var tv = [];
      var resul=[];
      var retf=[];
      tv[as[i]]=totdata[as[i]];
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
  
    useEffect(() => {
        setChartType(props.type);
      }, [props.type]);
  
   
// function is_touch_enabled() { 
//     return ( 'ontouchstart' in window ) ||  
//            ( navigator.maxTouchPoints > 0 ) ||  
//            ( navigator.msMaxTouchPoints > 0 ); 
// } 

// if(is_touch_enabled()){
//     console.log("hi")
// }
// else{
//     console.log("bye")
// }
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
                const margin = {top: 40, right: 70, bottom: 65, left: 55};
                           const w = width - margin.left - margin.right;
                           const h = height - margin.top - margin.bottom;
  
  
  
 
const svgk = select(svgRef.current).attr("width",width).attr("height",height)

var svg= svgk.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  
  
  
              
  
const yscale = logMode === true ?
scaleSymlog().domain([1,max(allData,yValue)]).range([h,1]).nice() :
scaleLinear().domain(extent(allData,yValue)).range([h,0]).nice();




const xscale =  scaleTime()
  .domain(extent(allData,xValue))
  .range([0,w])
  .nice();
  
  // console.log(timeseries)
  if (currentZoomState) {
    const newYScale = currentZoomState.rescaleY(yscale);
    const newXScale = currentZoomState.rescaleX(xscale);
    yscale.domain(newYScale.domain());
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
  
  
  
  const xTicks = width/90;
  const xAxis = axisBottom()
      .scale(xscale)
      // .tickPadding(15)
      // .ticks(xTicks)
      // // .tickValues((xscale.domain().filter(function(d, i) {return !(i % 2)})))
      // .tickSize(-h);
  // console.log((xscale.domain().filter(function(d, i) {return (i % 2)})));
  
    const yTicks = 4;
    const yAxis = axisLeft()
      .scale(yscale)
      // .ticks(yTicks,"~s")
      // .tickPadding(15)
      // .tickSize(-w);
  
        
      
            svg.append('g')
            .attr("transform", "translate(0, " + h  +")").call(xAxis
            .tickSize(-h).tickPadding(15).ticks(xTicks).tickFormat(d=>format(d, 'dd MMM')))
           
        .call(g => g.select(".domain")
            .remove())
            .call(g => g.selectAll(".tick:not(:first-of-type) line")
            .attr("stroke-opacity", 0.5)
            .attr("stroke-dasharray", "2,2"))


        svg
        .append("text")
        .attr("y", height - margin.bottom)
        .attr("x", width/3 )
        .style("fill", "black" )
        .text(xAxisLabel);
  
  
        svg.append('g').call(yAxis.tickSize(-w)
        .ticks(8,"s"))
        .call(g => g.select(".domain")
            .remove())
        .call(g => g.selectAll(".tick:not(:first-of-type) line")
            .attr("stroke-opacity", 0.5)
            .attr("stroke-dasharray", "2,2"))
        .call(g => g.selectAll(".tick text")
            .attr("x", -2)
            .attr("dy", -4))
  
        svg
        .append("text")
        .attr("transform", "rotate(-90)")
        
        .attr("y", 0-margin.left+13 )
        .attr("x",margin.bottom-height/1.8 )
        
        .style("fill", "black")
        .text(yAxisLabel);
  
  
        var clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("id", "clip-rect")
        .attr("x", "0")
        .attr("y", "0")
        .attr('width', w)
        .attr('height', h);
          //   .attr("x",)
          let mer = svg.append("g").attr("clip-path", "url(#clip)")
          let metric=mer.selectAll(".metric")
          .data(dataNest)
          .enter().append("g")
          .attr("class","metric")
    




dataNest.forEach(function(d, i)  {
  metric.append("path").attr('class', 'line').attr("d",myline(d.values))
  .attr("stroke",d.color=()=>color(d.key))
  .attr("stroke-width",lineStroke)
  .attr("fill","none")
  // .on("mouseover", function(d) {
  //   selectAll(".line").style("opacity", otherLinesOpacityHover);
   
  //   select(this)
  //     .style("opacity", lineOpacityHover)
  //     .style("stroke-width", lineStrokeHover)
  //     .style("cursor", "pointer");
  // })
  // .on("mouseout", function(d) {
  //   selectAll(".line").style("opacity", lineOpacity);
 
  //   select(this)
  //     .style("stroke-width", lineStroke)
  //     .style("cursor", "none");
  // })

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

    


    
});

metric
.selectAll("circlesd")
.data(allData)
  .enter()
  .append("circle")
  .attr("r", 2)
  .style("fill", "white")
//   .attr("id", function (d) {
//     return 'tag'+d.key.replace(/\s+/g, '');
// })
  .style("fill-opacity",0.8)
  .style("stroke", function(d) { return color(d.country); })

  .style("stroke-width", 1.9)
  .attr("cx",d => xscale(d.date))
  .attr("cy",d => yscale(d[radiostate]))


 svg
  .selectAll("cirtext")
  .data(dataNest)
    .enter()
    .append("text")
    .attr("x", d => xscale(d.values[d.values.length-1].date)+3)
    .attr("y", d => yscale(d.values[d.values.length-1][radiostate]))
    .attr("class","leg")
    .style("fill", function(d) { return color(d.key); })
    .text(d => d.key)


var points = svg.selectAll('.points')
  .data(dataNest)
  .enter()
  .append('g')
  .attr('class', 'points')
  .append('text');



  

  

//   const rects = svg.selectAll('.rects')
//   .data(dataNest)
//   .enter()
//  .append('g')
//   .attr('class', 'rects')
//   .append('rect');

  const pointss = svg.selectAll('.pointss')
  .data(dataNest)
  .enter()
  .append('g')
  .attr('class', 'pointss')

  pointss
  .append('rect')

  pointss
  .append('text');

  const pointsk = svg.selectAll('.pointsk')
  .data(dataNest)
  .enter()
  .append('g')
  .attr('class', 'pointsk')
  .append('text')



  //     mousePerLine.append("rect")
//     .attr("width", 50)
//     .attr("height", 50)
//     .style("stroke", function(d) {
//       return color(d.key);
//     })
//     .style("fill", function(d) {
//       return color(d.key);
//     })
//     .style("stroke-width", "1px")
//     .style("opacity", "0")



  const focus = svg.append('g')
  .attr('class', 'focus')
  .style('display', 'none');

focus.append('line')
  .attr('class', 'x-hover-line hover-line')
  .attr('y1' , 0)
  .attr('y2', h);

//   console.log(dataNest[0].values)
  if(dataNest){
 
  }
  svgk.append('rect')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .attr("class", "overlay")
  .attr("width", w)
  .attr("height", h)
  .attr('fill', 'none')
  .on("mouseover", mouseover)
  .on("mouseout", mouseout)
  .on("mousemove", mousemove);


  var timeScales = dataNest[0].values.map(function(key) { return xscale(key.date); });
  

  function mouseover() {
    focus.style("display", null);
   selectAll('.points text').style("display", null);
   selectAll('.pointss rect').style("display", null);
   selectAll('.pointss text').style("display", null);
   selectAll('.pointsk text').style("display", null);
  }
  function mouseout() {
    focus.style("display", "none");
    selectAll('.points text').style("display", "none");
    selectAll('.pointss rect').style("display", "none");
    selectAll('.pointss text').style("display", "none");
    selectAll('.pointsk text').style("display", "none");
  }
  function mousemove() {
    var i = bisect(timeScales, mouse(this)[0], 1);
    
    var di = allData[i-1];
    focus.attr("transform", "translate(" + xscale(di.date) + ",0)");

    selectAll('.pointss text')
        
    .attr("x", d => xscale(d.values[i-1].date) + 28)
      .attr("y", d => yscale(d.values[i-1][radiostate])+13)
    .text(d => d.values[i-1][radiostate] )
    .style("fill","black")
    .attr("font-weight",function(d,i) {return i*100+100;})

    selectAll('.pointsk text')
        
    .attr("x", d => xscale(d.values[i-1].date)- 48)
      .attr("y", d => yscale(d.values[i-1][radiostate])+13)
    .text(d => d.key )
    .style("fill","black")
    .attr("font-weight",function(d,i) {return i*100+100;})

    selectAll('.pointss rect')
      .attr("width", 137)
          .attr("height", 20)
          .style("fill","white")
          .style("stroke-width", "1px")
          .style("stroke", d => color(d.key))
           .style("opacity", "0.89")
          .attr("x", d => xscale(d.values[i-1].date) -48)
      .attr("y", d => yscale(d.values[i-1][radiostate] )-1)

      selectAll('.points text')
      .attr("x", d => xscale(d.values[i-1].date) -30)
      .attr('y',-2)
      .text(`${yAxisLabel}`+' '+'on'+' '+`${format(di.date, 'dd MMMM')}`)
      .style("fill","black")

      

     
    // selectAll('.points text')
    //   .attr('x', function(d) { return xscale(di.date) + 15; })
    //   .attr('y', function(d) { return yscale(d.values[i-1].radiostate); })
    //   .text(function(d) { return d.values[i-1].radiostate; })
    //   .style('fill', function(d) { return color(d.key); });
  }
  
   
  const zoomBehavior = zoom()
  .scaleExtent([1, 5])
  .extent([[0,0],[w,h]])
  .translateExtent([
    [0, 0],
    [w, h]
  ])
  .on("zoom", () => {
    const zoomState = zoomTransform(svgRef.current);
   
    setCurrentZoomState(zoomState);
  });

  
    //   lines.call(zoomBehavior);
  
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
  
  <> <a>Select Countries from table to compare. Click on graph for numbers. </a>
       <div className="svg-parent" ref={wrapperRef} >
       <svg ref={svgRef} />
       
        </div>
  </>
  
          );
  }
  
  export default Worldchart;
  