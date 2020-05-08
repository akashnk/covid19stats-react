import React, {  useState, useEffect, useRef,useContext } from "react";

import { select, nest,line,curveCardinal,extent,axisLeft,max,axisBottom,scaleLinear,
  scaleTime,scaleSymlog,scaleOrdinal,schemeCategory10, selectAll, zoom,
  zoomTransform,mouse,bisect} from 'd3';



import {TableContext} from '../TableContext';

import {useResizeObserver} from '../Common/hooks';
import {STATE_CODES} from '../Common/constants'

import {format} from 'date-fns';



const Dchart = (props) => {
 
  const [radiostate,setRadiostate] = useState([]);
  const [mode, setMode] = useState(props.mode);
  const [logMode, setLogMode] = useState([]);
  const [chartType, setChartType] = useState(props.casetype);
  // const [moving, setMoving] = useState(false);
 
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

            const yValue = (d) => (d[radiostate]);
            const yAxisLabel= (radiostate==='totalconfirmed')?'Cases'
                                            :radiostate==='totalactive'?'Active'
                                            :radiostate==='totalrecovered'?'Recovered'
                                            :radiostate==='totaldeceased'?'Deaths'
                                            :'Daily cases';


// const delaunay = Delaunay.from( allData, d => d.date, d => d[radiostate] )

const drawChart = () => {

  select('g').remove();



         const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();


              if (!dimensions) return;
              const margin = {top: 40, right: 60, bottom: 65, left: 65};
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

         
            

            const xscale =  scaleTime()
              .domain(extent(allData,xValue))
              .range([0,w])
              .nice();

              if (currentZoomState) {
                const newYScale = currentZoomState.rescaleY(yscale);
                const newXScale = currentZoomState.rescaleX(xscale);
                yscale.domain(newYScale.domain());
                xscale.domain(newXScale.domain());
              }
// console.log(timeseries)


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
 
metric
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

metric
// .style("fill", "#FFF")
// .style("stroke", function(d) { return color(d.key); })
.selectAll("circlesd")
.data(function(d){ return d.values })
  .enter()
  .append("circle")
  .attr("r", 3)
  .style("fill", "#FFF")
.style("stroke", function(d) { return color(d.key); })
  .style("stroke-width", 2)
  .attr("cx",d => xscale(d.date))
  .attr("cy",d => yscale(d[radiostate]))

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
        
    .attr("x", d => xscale(d.values[i-1].date) + 33)
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
      .attr("width", 130)
          .attr("height", 20)
          .style("fill","white")
          .style("stroke-width", "1px")
          .style("stroke", d => color(d.key))
           .style("opacity", "0.89")
          .attr("x", d => xscale(d.values[i-1].date) -50)
      .attr("y", d => yscale(d.values[i-1][radiostate] )-1)

      selectAll('.points text')
      .attr('x',20)
      .attr('y',66)
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

      if (props.panMode === true){
    svgk.call(zoomBehavior)
    }
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

export default Dchart;
