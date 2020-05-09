import React, {  useState, useEffect, useRef,useContext } from "react";

import { select, nest,line,curveCardinal,extent,axisLeft,max,axisBottom,scaleLinear,
  scaleTime,scaleSymlog,scaleOrdinal,schemeCategory10, selectAll, zoom,
  zoomTransform,mouse,bisect,timeMonth,timeWeek,timeYear} from 'd3';



import {TableContext} from '../TableContext';

import {useResizeObserver} from '../Common/hooks';
import {STATE_CODES} from '../Common/constants'

import {format} from 'date-fns';



const Dchart = (props) => {
 
  const [radiostate,setRadiostate] = useState([]);
 
  const [logMode, setLogMode] = useState([]);
  const [chartType, setChartType] = useState(props.casetype);
  // const [moving, setMoving] = useState(false);
  const [panMode, setpanMode] = useState([]);
 
  const [totdata,setTotdata]=useState([]);
  const [lastDaysCount,setLastDaysCount]=useState(14);
  const [currentZoomState, setCurrentZoomState] = useState();

  const [daysC,setDaysC] = useState([])
 
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


const as = context.statecodes!==[]? context.statecodes: ["TT"];

 const gh = [];
//  const daysC= props.DaysC;
useEffect(() => {
  setDaysC(props.daysC);
}, [props.daysC]);


const daysCount = (daysC==="Fortnight") ? 14 : (daysC === "Month") ? 28 : Infinity;
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
    gh[i] = retf.slice(-daysCount);

 }
//  const ry =[];
//  var retf=[];
//  ry['AP']=totdata['AP']
//  retf =ry.map(o=>o.State='AP')
 const allData = Object.keys(gh).reduce(function (r, k) {
         return r.concat( gh[k]);
     }, []);

   
//      useEffect(()=>
//    setLastDaysCount(props.timeMode)
//  ,[props.timeMode])


    useEffect(() => {
      setRadiostate(props.casetype);
    }, [props.casetype]);

   
//

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
    setpanMode(props.panMode);
  }, [props.panMode]);

 
  
 
//console.log(timeseries)
  useEffect(() => {

    // const movingAvg = function (data, neighbors) {
    //   return data.map((val, idx, arr) => {
    //     let start = Math.max(0, idx - neighbors), end = idx + neighbors
    //     let subset = arr.slice(start, end + 1)
    //     let sum = subset.reduce((a,b) => a + b)
    //     return sum / subset.length
    //   })
    // }
     
// var nmk = allData['dailyconfirmed']
// var njk = movingAvg(nmk,3)
// console.log()

  allData.forEach((d,i)=> {
 // console.log(tv['TN'].totalconfirmed);

       d[radiostate]=+d[radiostate];

        d.date= new Date(d.date);
       
        });

         // console.log(allData);
        allData.sort((a, b) => (b.confirmed - a.confirmed));

            const xValue = (d) => {if (radiostate==='dailytotal') {
              return d.totalconfirmed
            } else{ return (d.date)}};
            const xAxisLabel = radiostate !=='dailytotal' ?'Time':'Total cases';

            const yValue = (d) => {if (radiostate==='dailytotal') {
              return d.dailyconfirmed
            } else{return (d[radiostate])}};
            const yAxisLabel= (radiostate==='totalconfirmed')?'Cases'
                                            :radiostate==='totalactive'?'Active'
                                            :radiostate==='totalrecovered'?'Recovered'
                                            :radiostate==='totaldeceased'?'Deaths'
                                            :radiostate==='dailytotal'?'Daily'
                                            :'Daily cases';


// const delaunay = Delaunay.from( allData, d => d.date, d => d[radiostate] )

const drawChart = () => {

  select('g').remove();



         const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();


              if (!dimensions) return;
              const margin = {top: 40, right: 70, bottom: 65, left: 55};
                         const w = width - margin.left - margin.right;
                         const h = height - margin.top - margin.bottom;



// const svgk = select(svgRef.current).attr("width",width).attr("height",height)

// const svg = svgk.append("g")
// .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const svgk = select(svgRef.current).attr("width",width).attr("height",height)

var svg= svgk.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");



            

            const yscale = logMode === true ?
            scaleSymlog().domain([1,max(allData,yValue)]).range([h,1]).nice() :
            scaleLinear().domain(extent(allData,yValue)).range([h,0]).nice();

         
            

            const xscale =  radiostate !== 'dailytotal' ? scaleTime().domain(extent(allData,xValue)).range([0,w]).nice() :
                                                      scaleLinear().domain(extent(allData,xValue)).range([0,w]).nice();

              if (currentZoomState) {
                const newYScale = currentZoomState.rescaleY(yscale);
                const newXScale = currentZoomState.rescaleX(xscale);
                yscale.domain(newYScale.domain());
                xscale.domain(newXScale.domain());
              }
// console.log(timeseries)

var m = 0;
          const myline = radiostate !=='dailytotal' ? line().x(function(d) {return xscale(xValue(d))}).y(d => yscale(1+yValue(d))).curve(curveCardinal) :
          line().x((d) => xscale(xValue(d))).y(d => yscale(1+yValue(d))).curve(curveCardinal)

          console.log(m)
        var dataNest = nest()
        .key(function(d){
          return d.state;
        })
        .entries(allData)

  // console.log(dataNest)
var color = scaleOrdinal(schemeCategory10);


function multiFormat(date) {
  return (
   timeMonth(date) < date ? (timeWeek(date) < date ? "%b %d" : 
  "%b %d")
  : timeYear(date) < date ? "%B"
  : "%Y")(date);
  }


const xAxis = axisBottom()
    .scale(xscale)


  const yTicks = 5;
  const yAxis = axisLeft()
    .scale(yscale)
    
    // .ticks(yTicks)
    
    // .ticks(yTicks," ")
    // // .tickPadding(15)
    // .tickSize(-w)
    // .tickFormat(formatTick))
    // .call(g => g.select(".domain")
    //     .remove())
    // .call(g => g.selectAll(".tick:not(:first-of-type) line")
    //     .attr("stroke-opacity", 0.5)
    //     .attr("stroke-dasharray", "2,2"))
    // .call(g => g.selectAll(".tick text")
    //     .attr("x", 4)
    //     .attr("dy", -4))
 
    
const xTicks = width/90;
if (radiostate!=='dailytotal'){
  svg.append('g')
  .attr("transform", "translate(0, " + h  +")").call(xAxis
  .tickSize(-h).tickPadding(15).ticks(xTicks).tickFormat(d=>format(d, 'dd MMM')))
 
.call(g => g.select(".domain")
  .remove())
  .call(g => g.selectAll(".tick:not(:first-of-type) line")
  .attr("stroke-opacity", 0.5)
  .attr("stroke-dasharray", "2,2"))
} else {
  svg.append('g')
  .attr("transform", "translate(0, " + h  +")").call(xAxis
  .tickSize(-h).tickPadding(15).ticks(xTicks))
 
.call(g => g.select(".domain")
  .remove())
  .call(g => g.selectAll(".tick:not(:first-of-type) line")
  .attr("stroke-opacity", 0.5)
  .attr("stroke-dasharray", "2,2"))
}

  svg.append('g').call(yAxis.tickSize(-w)
  )
  .call(g => g.select(".domain")
      .remove())
  .call(g => g.selectAll(".tick:not(:first-of-type) line")
      .attr("stroke-opacity", 0.5)
      .attr("stroke-dasharray", "2,2"))
  .call(g => g.selectAll(".tick text")
      .attr("x", -2)
      .attr("dy", -4))
        
      //   svg
      //   .append("text").attr("transform", "translate(" + ((width/2) + margin.left) + " ," + (height + margin.top + margin.bottom) + ")")
      // .style("text-anchor", "middle")
      // .attr("dx", "3em")
      // .style("fill", "red")
      // .text(xAxisLabel);

      svg
      .append("text")
      .attr("y", height - margin.bottom)
      .attr("x", width/3 )
      .style("fill", "black" )
      .text(xAxisLabel);


   

      
      

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




// dataNest.forEach(function(d, i)  {
//   metric.append("path").attr('class', 'line').attr("d",myline(d.values))
//   .attr("stroke",d.color=()=>color(d.key))
//   .attr("id", 'tag'+d.key.replace(/\s+/g, ''))
//   .attr("stroke-width",lineStroke)
//   .attr("fill","none")
  
 



    


    
// });


metric.selectAll("path.line")
  .data(dataNest)
    .enter().append('path')
    .attr("class", "line")
    .style("stroke", function(d) { // Add the colours dynamically
        return color(d.key);
    })
    .attr("id", function(d) {
        return 'tag'+d.key.replace(/\s+/g, ''); // assign ID
    })
    .attr("stroke-width", 2)
    .attr("fill","none")
    .attr("d", function (d) {
        return myline(d.values);
    })

  //  svg.selectAll("legend")
  //   .data(dataNest)
  //   .enter().append('text')
  //   .attr("x", (i%4)*w/3.5) // spacing // ****
  //     .attr("y", Math.floor(i/4)*20-3)
   
  //     .attr("class", "legend")    // style the legend   // *******
  //     .style("fill", function(d) { // Add the colours dynamically
  //       return color(d.key);
  //   })

  // metric.append("text")
  // .attr("class","ser")
  // .datum(function(d) {
  //     return {
  //         id: d.key,
  //         value: d.values[d.values.length - 1]}; })
  // .attr("transform", function(d) {
  //         return "translate(" + (xscale(d.value.date) + 10)  
  //         + "," + (yscale(d.value[radiostate]) + 5 ) + ")"; })
  // .attr("x", 5)
  // .text(function(d) { return d.id; });

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
  .style("stroke", function(d) { return color(d.state); })

  .style("stroke-width", 1.9)
  .attr("cx",d => xscale(d.date))
  .attr("cy",d => yscale(d[radiostate]))


 svg
  .selectAll("cirtext")
  .data(dataNest)
    .enter()
    .append("text")
    .attr("x", d => xscale(d.values[d.values.length-1].date))
    .attr("y", d => yscale(d.values[d.values.length-1][radiostate]))
    .attr("class","leg")
    .style("fill", function(d) { return color(d.key); })
    .text(d => STATE_CODES[d.key])

  

  // dataNest.forEach(function(d, i)  {
  //   svg
  
  //   .append("text")                                    // *******
  //       .attr("x", (i%4)*w/3.5) // spacing // ****
  //       .attr("y", Math.floor(i/4)*20-3)
     
  //       .attr("class", "legend")    // style the legend   // *******
  //       .style("fill", d.color=()=>color(d.key))   
        
  //       .text(STATE_CODES[d.key])
        
  
      
  
  
      
  // });
  

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
if (radiostate!== 'dailytotal'){
  svgk.append('rect')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .attr("class", "overlay")
  .attr("width", w)
  .attr("height", h)
  .attr('fill', 'none')
  .on("mouseover", mouseover)
  .on("mouseout", mouseout)
  .on("mousemove", mousemove)
} else {
  svgk.append('rect')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .attr("class", "overlay")
  .attr("width", w)
  .attr("height", h)
  .attr('fill', 'none')
}


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
        
    .attr("x", d => xscale(d.values[i-1].date) + 33)
      .attr("y", d => yscale(d.values[i-1][radiostate])+13)
    .text(d => d.values[i-1][radiostate] )
    .style("fill","black")
    // .attr("font-weight",function(d,i) {return i*100+100;})

    selectAll('.pointsk text')
        
    .attr("x", d => xscale(d.values[i-1].date)- 48)
      .attr("y", d => yscale(d.values[i-1][radiostate])+13)
    .text(d => STATE_CODES[d.key] )
    .style("fill","black")
    // .attr("font-weight",function(d,i) {return i*100+100;})

    selectAll('.pointss rect')
      .attr("width", 130)
          .attr("height", 20)
          .style("fill","white")
          .style("stroke-width", "1px")
          .style("stroke", d => color(d.key))
           .style("opacity", "0.89")
          .attr("x", d => xscale(d.values[i-1].date) -50)
      .attr("y", d => yscale(d.values[i-1][radiostate] )-1)

      selectAll('.points text')
      .attr("x", d => xscale(d.values[i-1].date) -30)
      .attr('y',-2)
      // .text(`${yAxisLabel}`+' '+'on'+' '+`${format(di.date, 'dd MMMM')}`)
      .text(`${format(di.date, 'dd MMMM')}`)
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

      if (panMode === true){
    svgk.call(zoomBehavior).on("wheel.zoom", null)
    } else {
      svgk.on('.zoomBehaviour', null);
      svgk.on("mousedown.zoom", null);
      svgk.on("mousemove.zoom", null);
      svgk.on("dblclick.zoom", null);
      svgk.on("touchstart.zoom", null);
      svgk.on("wheel.zoom", null);
      svgk.on("mousewheel.zoom", null);
      svgk.on("MozMousePixelScroll.zoom", null);}
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

     <div>
       <a>Select States from table to compare. Click on graph for details. </a>
     <div className="svg-parent" ref={wrapperRef} >
     <svg ref={svgRef} />
     
      </div>
</div>

        );
}

export default Dchart;
