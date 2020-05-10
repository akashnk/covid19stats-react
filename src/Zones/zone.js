import React,{useState} from 'react';

import ReactTooltip from "react-tooltip";


import "./styles.css";

// import {Stage} from './Stage';
// import ZoomContainer from './ZoomContainer';
// import { geoMercator, geoPath } from "d3-geo";
//  import {  min, max,scaleLinear} from "d3";

// const world = require("./indiafinal.json")
// const data = require("./zones.json")
// console.log(data)
// var result = arrOfObj.map(function(el) {
//     var o = Object.assign({}, el);
//     o.isActive = true;
//     return o;
//   })
// console.log(world.features)
// function Zones() {
//     const mercator = geoMercator().scale(800).translate([-800,600])
//     const project = geoPath().projection(mercator).pointRadius(1);
//     const minProp = min(world.features, feature => feature.properties.statecode);
//     const maxProp = max(world.features, feature => feature.properties.statecode);
//     const colorScale = scaleLinear()
//       .domain([minProp, maxProp])
//       .range(["blue", "red"]);
//     return (
//         <>
//         <h2>India Zones</h2>
//       <Stage width="100%" height="800">
//         <ZoomContainer>
//           {world.features.map((feature, index) => {
//             const d = project(feature)
//             return (
//               <path
//                 key={index}
//                 d={d}
//                 fill={colorScale}
//                 stroke="#666666"
//                 strokeWidth={0.25}
//               />
//             )
//           })}
//         </ZoomContainer>
//       </Stage>
//       </>
//     )
//   }
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
    Graticule,
  } from "react-simple-maps"
  import { scaleLinear,scaleOrdinal } from "d3"
import { STATES_C } from '../Common/constants';
  
  const wrapperStyles = {
    width: "100%",
    maxWidth: 980,
    margin: "0 auto",
  }
  

 
  
  function Zone(props) {
    const [content, setTooltipContent] = useState("");
    
 const INDIA_TOPO_JSON = require('./indiatop.json');

 const districtWiseData =props.districtWiseData;

 
 

  const minValue = 5 // based on the data array above
  const maxValue = 16 // based on the data array above
  
  const minColor = "#CFD8DC"
  const maxColor = "#37474F"
  
  const customScale = scaleLinear()
    .domain([minValue,maxValue])
    .range([minColor,maxColor])

    const colorScale = scaleOrdinal()
    .domain(['#D21C1C','#E98305','#2B7336'])
    .range(['#2B7336','#D21C1C','#E98305']);

    
  
    const datax = require("./zones.json");

    var dist= Object.keys(districtWiseData).reduce(function (r, k) {
        return r.concat( districtWiseData[k])
    }, []);
    var dataa = []
    
    function objk(hs) { 
            for (var x=0;x<33;x++){
                 var distl = [];
                 var statel =[];
                 distl = dist[x].districtData;
                 statel = dist[x].statecode;
                 var ks=[]
                for (var y=0; y < Object.keys(distl).length;y++){
                    var g = [];
                     g = Object.values(distl)[y];
                    g.district = Object.keys(distl)[y]
                    g.state=STATES_C[statel]
                    dataa.push(g)
                    
                }
                 
            } 
            
            // .reduce(function (r, k) {
            //     return r.concat( k);
            // }, []);
            return dataa}

            var c =objk(dist);

  const data = datax.zones
   
    

 
 
      return (
        <>
        <h3>Red, Orange and Green zones of India</h3>
        <div>
        <div style={wrapperStyles}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
            //   rotate: [-20.0, -52.0, 0],
            
            
              scale: 1000
            }}
            // width={980}
            // height={651}
            style={{
              width: "100%",
              height: "100%",
            }}
            >
            <ZoomableGroup data-tip="" center={[80, 23]} >
              <Graticule stroke="#EAEAEC" />
                  <Geographies geography={INDIA_TOPO_JSON} >
        {({ geographies,projection }) =>
          geographies.map((geo,i) =>
          {
          const country = data.find(d => d.district === geo.properties.district)
          const countrycon = c.find(d => d.district === geo.properties.district)
          
          
          return (
              
            <Geography
              key={geo.Rsmkey}
              geography={geo}
            
              onMouseEnter={() => {
                const {district,st_nm}  = geo.properties;
                
           
                const zone = country.zone;
             
                const conf = countrycon ? countrycon.confirmed : 0
                const actv = countrycon ? countrycon.active : 0
                // setTooltipContent(`${district} (${st_nm}) :` <br> `${zone} ${conf} ${actv} `);
                setTooltipContent(<span style={{fontFamily: "verdana"}}>{district} ({st_nm})<br/>Confirmed: {conf} <br/> Active: {actv} <br/> Zone: {zone} </span>)
              }}
              onMouseLeave={() => {
                setTooltipContent("");
              }}
              style={{
                default: {
                //    fill: country.zone === "Green"? "green": "#ECEFF1",
                fill:  country ? colorScale(country.zone) : "#ECEFF1",
                   stroke: "#607D8B",
                   strokeWidth: 0.75,
                   outline: "none",
                },
                hover: {
                   fill: "#CFD8DC",
                   stroke: "#607D8B",
                   strokeWidth: 1,
                   outline: "none",
                },
                pressed: {
                   fill: "#FF5722",
                   stroke: "#607D8B",
                   strokeWidth: 1,
                   outline: "none",
                }
              }}
            />
          )})
        }
      </Geographies>
            </ZoomableGroup>
          </ComposableMap> 
         
        </div>
        <div> <ReactTooltip multiline={true}>{content}</ReactTooltip></div>
        </div>
        {/* <div>
            <Tabledistrict districts={c}/>
        </div> */}
        </>
      )
    }
  
  

export default Zone;