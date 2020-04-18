import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Table from "./Table";
import Today from "./Today";
import Dchart from "./Dchart";
import "./App.css";
// import Utils from "./Utils";
import {
  formatDate,
  formatDateAbsolute,
  preprocessTimeseries,
  parseStateTimeseries,
} from './common-functions';



function App() {
  const [data, setData] = useState([]);
  const [fetched,setFetched] = useState(false);
  const [districtWiseData, setDistrictWiseData] = useState({});
  const [statesDailyResponse,setStatesDailyResponse] = useState([]);
  const [stateTestData, setStateTestData] = useState({});
  const [timeseries,setTimeseries] = useState([]);
   const [graphOption, setGraphOption] = useState(1);
   const [timeseriesMode, setTimeseriesMode] = useState(true);
const [timeseriesLogMode, setTimeseriesLogMode] = useState(false);
 const [activeStateCode, setActiveStateCode] = useState('TT');
 const [cases,setCase] =useState('confirmed');
  // const [testsData, setTestsData] = useState({});
  const [conf,setConf] =useState({});

  //const apiURL1 = 'https://corona.lmao.ninja/v2/countries';
  const apiURL1 = 'https://api.covid19india.org/state_district_wise.json';
  const apiURL2 = 'https://api.covid19india.org/data.json';
   const apiURL3 = 'https://api.covid19india.org/states_daily.json';
   const apiURL4 = 'https://api.covid19india.org/state_test_data.json';
//   const apiURL4

useEffect(() => {
    if (fetched === false) {
      fetchData();
    }
  }, [fetched]);

   const fetchData = async () => {
    try {
      const [resone,
        {data},

       {data: statesDailyResponse},
       {data: stateTestData}
     ] =
     await Promise.all([
      axios.get(apiURL1),
      axios.get(apiURL2),
     axios.get(apiURL3),
     axios.get(apiURL4)
   ]);

       //console.log(resone.data);
       setDistrictWiseData(resone.data);
       setData(data.statewise);
       // setStatesDailyResponse(resthree.data);
       const ts = parseStateTimeseries(statesDailyResponse);
       ts['TT'] = preprocessTimeseries(data.cases_time_series); // TT -> India
       setTimeseries(ts);
       const testData = stateTestData.states_tested_data.reverse();
     const totalTest = data.tested[data.tested.length - 1];
     testData.push({
       updatedon: totalTest.updatetimestamp.split(' ')[0],
       totaltested: totalTest.totalindividualstested,
       source: totalTest.source,
       state: 'Total', // India
     });
        setStateTestData(testData);
       // setTestsData(resthree.data.states_tested_data);
       setFetched(true);
       // console.log(totalTest)
       // console.log(testData)
      // console.log(restwo.data.statewise[0]);
    } catch (err) {
       console.log(err);
     }
   };


   // function getMapKeyValueByIndex(testData, idx) {
   //    var key = Object.keys(obj)[idx];
   //    return { key: , value: obj[key] };
   // }

const fdata = data.filter(d => d.confirmed > 0)
const handleChange = e => {
   console.log(e.target.value);
   setCase(e.target.value);
 };
 const handleChangelog = e => {
    console.log(e.target.value);
    setTimeseriesLogMode(e.target.value);
  };
// const gdata = fdata.concat(testsData.totaltested)
// const [merged,setMerge] =useState([]);
//
// function mergeObjects(data,testsData){
//   let start = 0;
//   let merge = [];
//
//   while(start < data.length){
//     if(data[start].state === testsData[start].state){
//          //pushing the merged objects into array
//         merge = merge.push({...data[start],...testsData[start]})
//     }
//     //incrementing start value
//     start = start+1
//   }
//   return setMerge(merge);
//
// }
//
//  console.log(merged);


  const columns = useMemo(
    () => [

            {
                Header: "State",
                accessor: "state",
                width: 110
              },
              {
                Header: "Total cases",
                accessor: "confirmed",
                width: 80
              },
              {
                Header: "New Cases",
                accessor: "deltaconfirmed",
                width: 80

              },

                        {
                          Header: "Deaths",
                          accessor: "deaths",
                          width: 80,
                          getProps: (state,rowInfo, column) => {
                              if (rowInfo && rowInfo.row) {
                                  return {
                                      style:{backgroundColor: rowInfo.row.deaths > 20 ? 'red' : null},

                                      };
                                  }
                                  return {};
                          }
                        },

                      {
                          Header: "New Deaths",
                          accessor: "deltadeaths",
                          width: 80
                        },

          {
            Header: "Active",
            accessor: "active",
            width: 80
          },

      {
          Header: "Recovered",
          accessor: "recovered",
          width: 80
      },


          // {
          //   Header: "Tested",
          //   accessor: "totaltested"
          // },


        ],

    []
  );
  // const [tym,setTym] = useState([]);
  //
  // setTym(timeseries[activeStateCode]);
  // console.log(tym);
// console.log(Object.keys(timeseries).length)
// console.log(testsData);
  return (
    <React.Fragment>
    <div className="App">

      <Today data={data} />
      <div>

         <input type="radio" name="case" value="confirmed" defaultChecked onChange={handleChange}/>
         <label>Confirmed</label>
         <input type="radio" name="case" value="deaths" onChange={handleChange}/>  <label>Deaths</label>
         <input type="radio" name="case" value="active" onChange={handleChange}/>  <label>Active</label>
         <input type="radio" name="case" value="recovered" onChange={handleChange}/>  <label>Recovered</label>
         </div>
         <div class="square-radio">

          <input type="radio" name="timeseriesLogMode" value="false" align="right" onChange={handleChangelog}/>  <label>Linear</label>
           <input type="radio" name="timeseriesLogMode" value="true" align="right" onChange={handleChangelog}/>  <label>Logarithmic</label>


       </div>
      <div>
        {fetched && <Dchart timeseries={timeseries[activeStateCode]}

      // console.log(timeseries)
              // activeStateCode={activeStateCode}
                casetype={cases}
                type={graphOption}
                mode={timeseriesMode}
                logMode={timeseriesLogMode} />}
                </div>
      <Table columns={columns} data={fdata} />
      <div>

               <h1>Spread Trends</h1>

               <div className="tabs">
                 <div
                   className={`tab ${graphOption === 1 ? 'focused' : ''}`}
                   onClick={() => {
                     setGraphOption(1);
                   }}
                 >
                   <h4>Cumulative</h4>
                 </div>
                 <div
                   className={`tab ${graphOption === 2 ? 'focused' : ''}`}
                   onClick={() => {
                     setGraphOption(2);
                   }}
                 >
                   <h4>Daily</h4>
                 </div>
               </div>

               <div className="scale-modes">
                 <label className="main">Scale Modes</label>
                 <div className="timeseries-mode">
                   <label htmlFor="timeseries-mode">Uniform</label>
                   <input
                     type="checkbox"
                     checked={timeseriesMode}
                     className="switch"
                     aria-label="Checked by default to scale uniformly."
                     onChange={(event) => {
                       setTimeseriesMode(!timeseriesMode);
                     }}
                   />
                 </div>
                 <div
                   className={`timeseries-logmode ${
                     graphOption !== 1 ? 'disabled' : ''
                   }`}
                 >
                   <label htmlFor="timeseries-logmode">Logarithmic</label>
                   <input
                     type="checkbox"
                     checked={graphOption === 1 && timeseriesLogMode}
                     className="switch"
                     disabled={graphOption !== 1}
                     onChange={(event) => {
                       setTimeseriesLogMode(!timeseriesLogMode);
                     }}
                   />
                 </div>


</div>
    </div>
    </div>
    </React.Fragment>
  )
}

export default App;
