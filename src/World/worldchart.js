import React, {  useState, useEffect, useRef,useContext } from "react";


import { select, nest,line,curveCardinal,extent,axisLeft,max,axisBottom,scaleLinear,
  scaleTime ,scaleSymlog,scaleOrdinal,schemeCategory10, selectAll, zoom,
  zoomTransform,bisect,mouse,min,timeWeek, curveMonotoneY} from 'd3';

// import moment from 'moment';
import {TableContext} from '../TableContext';
// import {sliceTimeseriesFromEnd} from './common-functions';
import {useResizeObserver} from '../Common/hooks';

// import {useWindowSize} from './common-functions';
// import {formatNumber,formatDate,sliceTimeseriesFromEnd} from '../Common/common-functions';
import {format} from 'date-fns';


const Worldchart = (props) => {
 
    const [radiostate,setRadiostate] = useState([]);
    const [mode, setMode] = useState(props.mode);
    const [logMode, setLogMode] = useState([]);
    const [chartType, setChartType] = useState(props.casetype);
  
    const [totdata,setTotdata]=useState([]);
    const [lastDaysCount,setLastDaysCount]=useState(14);
  
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
    
    
  
  
  const as = context.countrycodes!==[]? context.countrycodes: ["World"];
  
   const gh = [];
  //  const daysC= props.DaysC;
  useEffect(() => {
    setDaysC(props.daysC);
  }, [props.daysC]);
  


  const daysCount = (daysC==="Fortnight") ? 14 : (daysC === "Month") ? 28 : Infinity;
  








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
     
      //  const [currentZoomState, setCurrentZoomState] = useState();
  
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
scaleSymlog().domain([1,max(allData,yValue)]).range([h,10]).nice() :
scaleLinear().domain(extent(allData,yValue)).range([h,0]).nice();




const xscale =  scaleTime()
  .domain(extent(allData,xValue))
  .range([0,w])
  .nice();
  
  // console.log(timeseries)
  // if (currentZoomState) {
  //   const newYScale = currentZoomState.rescaleY(yscale);
  //   const newXScale = currentZoomState.rescaleX(xscale);
  //   yscale.domain(newYScale.domain());
  //   xscale.domain(newXScale.domain());
  // }
  
  
            const myline = line()
              .x(d => xscale(xValue(d)))
              .y(d => yscale(1+yValue(d))).curve(curveCardinal.tension(0))
  
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
  
  
        if (logMode !== true){
          svg.append('g').call(yAxis.tickSize(-w).ticks(8,"s")
          )
          .call(g => g.select(".domain")
              .remove())
          .call(g => g.selectAll(".tick:not(:first-of-type) line")
              .attr("stroke-opacity", 0.5)
              .attr("stroke-dasharray", "2,2"))
          .call(g => g.selectAll(".tick text")
              .attr("x", -2)
              .attr("dy", -4))}
              else{
                svg.append('g').call(yAxis.tickSize(-w).ticks(3,"s")
                )
                .call(g => g.select(".domain")
                    .remove())
                .call(g => g.selectAll(".tick:not(:first-of-type) line")
                    .attr("stroke-opacity", 0.5)
                    .attr("stroke-dasharray", "2,2"))
                .call(g => g.selectAll(".tick text")
                    .attr("x", -2)
                    .attr("dy", -4))} 
              
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

//   metric
//   .selectAll("circlesd")
//   .data(dataNest)
//     .enter()
//   .append("circle")
//   .attr("r", 2)
//   .style("fill", "white")
// //   .attr("id", function (d) {
// //     return 'tag'+d.key.replace(/\s+/g, '');
// // })
//   .style("fill-opacity",0.8)
//   .style("stroke", function(d) { return color(d.key); })

//   .style("stroke-width", 1.9)
//   .attr("cx",d => xscale(d.values.date))
//   .attr("cy",d => yscale(d.values[radiostate]))
    


    
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
        
    .attr("x", d => xscale(d.values[i-1].date) + 16)
      .attr("y", d => yscale(d.values[i-1][radiostate])+13)
    .text(d => d.values[i-1][radiostate].toLocaleString() )
    .style("fill","black")
    

    selectAll('.pointsk text')
        
    .attr("x", d => xscale(d.values[i-1].date)- 60)
      .attr("y", d => yscale(d.values[i-1][radiostate])+13)
    .text(d => d.key )
    .style("fill","black")
    

    selectAll('.pointss rect')
      .attr("width", 138)
          .attr("height", 20)
          .style("fill","white")
          .style("stroke-width", "1px")
          .style("stroke", d => color(d.key))
           .style("opacity", "0.89")
          .attr("x", d => xscale(d.values[i-1].date) -60)
      .attr("y", d => yscale(d.values[i-1][radiostate] )-1)

      selectAll('.points text')
      .attr("x", d => xscale(d.values[i-1].date) -30)
      .attr('y',-2)
      .text(`${yAxisLabel}`+' '+'on'+' '+`${format(di.date, 'dd MMMM')}`)
      .style("fill","black")

      

     

  }
  
   
  // const zoomBehavior = zoom()
  // .scaleExtent([1, 5])
  // .extent([[0,0],[w,h]])
  // .translateExtent([
  //   [0, 0],
  //   [w, h]
  // ])
  // .on("zoom", () => {
  //   const zoomState = zoomTransform(svgRef.current);
   
  //   setCurrentZoomState(zoomState);
  // });

  

  
  
  
  }
  
    drawChart();
  
  
    window.addEventListener('resize', drawChart );
   
  
  
  },[allData,dimensions,radiostate,logMode])
  
  
    return (
  
  <> <a style={{fontFamily: "verdana"}}>Select Countries from table and click on graph to compare. </a>
       <div className="svg-parent" ref={wrapperRef} >
       <svg ref={svgRef} />
       
        </div>
  </>
  
          );
  }
  
  export default Worldchart;
  