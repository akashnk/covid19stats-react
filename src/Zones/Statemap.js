import React,{useState,useRef} from 'react';
import { scaleLinear } from "d3-scale";
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
    Graticule,
  } from "react-simple-maps";
  import ReactTooltip from "react-tooltip";
  import {STATES_C, pop} from "../Common/constants";
  // import {useResizeObserver} from '../Common/hooks';
const INDIA_TOPO_JSON = require('./india_statestopo');
const wrapperStyles = {
    width: "100%",
    maxWidth: 1080,
    margin: "0 auto",
  }



const Statemap = (props) => {
  // const wrapperRef = useRef();
  // const dimensions = useResizeObserver(wrapperRef);
    const [content, setTooltipContent] = useState("");

    
    const statedata=props.statedata;

    const minValue = 0 // based on the data array above
  const maxValue = 16000 // based on the data array above
  
  const minColor = "#FFD5D5"
  const maxColor = "#800000"
  
  const customScale = scaleLinear()
    .domain([minValue,maxValue])
    .range([minColor,maxColor])

    const minnValue = 100 // based on the data array above
    const maxnValue = 6000 // based on the data array above
    
    const minnColor = "#86FAF2"
    const maxnColor = "#001B87"
    
    const custScale = scaleLinear()
      .domain([minnValue,maxnValue])
      .range([minnColor,maxnColor])

      // const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
      // if (!dimensions) return;
     
if (props.maped !== 20) {
    statedata.forEach(element => {
        element.totaltested = +element.totaltested
        
    });
    for (var n=0; n < statedata.length; n++){
      const  key = Object.keys(STATES_C).find(key => STATES_C[key] === statedata[n].state)
                 
                   
                  var tp = (((statedata[n].totaltested)/pop[key])*1000000).toFixed(0)
                    
                    statedata[n].testspermillion = tp
    }
}


    return (
        <>
         <div >
        <div style={wrapperStyles}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
            //   rotate: [-20.0, -52.0, 0],
            
            
              scale: 1000
            }}
            // width={1020}
            // height={800}
            style={{
              width: "100%",
              height: "120%",
            }}
            >
            <ZoomableGroup data-tip="" center={[80, 23]} >
              <Graticule stroke="#EAEAEC" />
                  <Geographies geography={INDIA_TOPO_JSON} >
        {({ geographies,projection }) =>
          geographies.map((geo,i) =>
          {
          const country = statedata.find(d => d.state === geo.properties.ST_NM) 
          
          if (props.maped===20){
          
          
          return (
           
            <Geography
              key={geo.Rsmkey}
              geography={geo}
              onMouseEnter={() => {

                const st_nm  = geo.properties.ST_NM;
                
                
                
           
             
                const conf = country ? country.confirmed : 0
                const deaths = country ? country.deaths: 0
                const active = country ? country.active : 0
                const recov =country ? country.recovered : 0
                // setTooltipContent(`${district} (${st_nm}) :` <br> `${zone} ${conf} ${actv} `);
                setTooltipContent(<span style={{fontFamily:"verdana"}}>{st_nm}<br/>Confirmed: {conf} <br/> Deaths: {deaths}
                <br/> Active: {active} <br/> Recovered: {recov} </span>)
             
              }}
              onMouseLeave={() => {
                setTooltipContent("");
              }}
              style={{
                default: {
                //    fill: country.zone === "Green"? "green": "#ECEFF1",
                fill:  country && props.maped ===20 ? customScale(country.confirmed) : "#ECEFF1",
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
          )
          }
          
        else{
            return (<Geography
            key={geo.Rsmkey}
            geography={geo}
            
            onMouseEnter={() => {

              const st_nm  = geo.properties.ST_NM;
              
              
              const tes =country ? country.totaltested : 0
         
           
              const conf = country ? country.testspermillion : 0
              
              // setTooltipContent(`${district} (${st_nm}) :` <br> `${zone} ${conf} ${actv} `);
              setTooltipContent(<span style={{fontFamily:"verdana"}}> {st_nm}<br/>Total Tests: {tes} <br/>Tests per million: {conf}  </span>)
           
            }}
            onMouseLeave={() => {
              setTooltipContent("");
            }}
            style={{
              default: {
              //    fill: country.zone === "Green"? "green": "#ECEFF1",
              fill:  country  ? custScale(country.testspermillion) : "#ECEFF1",
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
        )
        }})
        }
      </Geographies>
            </ZoomableGroup>
          </ComposableMap> 
         
        
        <div> <ReactTooltip multiline={true}>{content}</ReactTooltip></div>
        </div>
        </div>   
        </>
    )
}

export default Statemap;