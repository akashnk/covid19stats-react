import React,{useState} from 'react';
import ReactDOM from "react-dom";
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
  import { scaleLinear,scaleOrdinal } from "d3-scale"
  
  const wrapperStyles = {
    width: "100%",
    maxWidth: 980,
    margin: "0 auto",
  }
  

 const datax = require("./zones.json")
 const data =datax.zones
 const INDIA_TOPO_JSON = require('./indiatop.json');

 

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


  
  function Zones() {
    const [content, setTooltipContent] = useState("");

    
      return (
        <>
        <div style={wrapperStyles}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
            //   rotate: [-20.0, -52.0, 0],
            
            
              scale: 800
            }}
            width={980}
            height={651}
            // style={{
            //   width: "100%",
            //   height: "auto",
            // }}
            >
            <ZoomableGroup data-tip="" center={[100, 23]} >
              {/* <Geographies geography="./indiafinal.json" disableOptimization>
                {(geos, proj) => geos.map((geo, i) => {
  
                  const country = data.find(d => d.zones.district === geo.properties.distname)
                  
                  return (
                    <Geography
                    //   key={geo.properties.distname + i}
                    //   cacheId={geo.properties.distname + i}
                      geography={ geo }
                      projection={ proj }
                      style={{
                        default: {
                        //   fill: country ? customScale(country.val) : "#ECEFF1",
                        fill: "green",
                          stroke: "#FFF",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        hover: {
                          fill: "#263238",
                          stroke: "#FFF",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#263238",
                          stroke: "#FFF",
                          strokeWidth: 0.75,
                          outline: "none",
                        }
                      }}
                    />
                  )
                })}
              </Geographies> */}
              <Graticule stroke="#EAEAEC" />
                  <Geographies geography={INDIA_TOPO_JSON} >
        {({ geographies,projection }) =>
          geographies.map((geo,i) =>
          {
          const country = data.find(d => d.district === geo.properties.district)
          
          return (
              
            <Geography
              key={geo.Rsmkey}
              geography={geo}
              projection={projection}
              onMouseEnter={() => {
                const { district, st_nm } = geo.properties;
                const zone = country.zone;
                
                setTooltipContent(`${district} ${st_nm} ${zone}`);
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
        </>
      )
    }
  
  

export default Zones;