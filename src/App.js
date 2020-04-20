import React, { useMemo, useState,forwardRef, useEffect } from "react";
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
  const [districtWiseData, setDistrictWiseData] = useState([]);
  const [statesDailyResponse,setStatesDailyResponse] = useState([]);
  const [stateTestData, setStateTestData] = useState({});
  const [timeseries,setTimeseries] = useState([]);
   const [graphOption, setGraphOption] = useState(1);
   const [timeseriesMode, setTimeseriesMode] = useState(true)
const [logMode, setLogMode] = useState(false);
 const [activeStateCode, setActiveStateCode] = useState('AP');
 const [cases,setCase] =useState('totalconfirmed');
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
    setLogMode(e.target.value);
  };
  // console.log(activeStateCode)

console.log(districtWiseData.districtData);
  const columns = useMemo(
    () => [
      {
 // Make an expander cell
 Header: () => null, // No header
 id: 'expander',
 width: 30, // It needs an ID
 Cell: ({ row }) => (
   // Use Cell to render an expander for each row.
   // We can use the getToggleRowExpandedProps prop-getter
   // to build the expander.
   <span {...row.getToggleRowExpandedProps()}>
     {row.isExpanded ? '㊀' : '⨁'}
   </span>
 ),
},
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
                width: 80,
                getProps: (state, rowInfo, column) => {
            return {
                style: {
                    background: rowInfo && rowInfo.column.deltaconfirmed > 0 ? 'red' : null,
                },
            };
        },

              },

                        {
                          Header: "Deaths",
                          accessor: "deaths",
                          width: 80,

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



        ],

    []
  );

  // const renderRowSubComponent = React.useCallback(
  //   ({ row }) => (
  //     <pre
  //       style={{
  //         fontSize: '10px',
  //       }}
  //     >
  //       <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
  //     </pre>
  //   ),
  //   []
  // )
  const renderRowSubComponent = React.useCallback(
  ({ row }) => (
    <div>
      Hello {row.values.state} is {row.values.confirmed}

    </div>
  ),
  []
)
// console.log(districtWiseData)
  return (

    <div className="App">

      <Today data={data} />
      <div>

         <input type="radio" name="case" value="totalconfirmed" defaultChecked onChange={handleChange}/>
         <label>Confirmed</label>
         <input type="radio" name="case" value="totaldeceased" onChange={handleChange}/>  <label>Deaths</label>
         <input type="radio" name="case" value="totalactive" onChange={handleChange}/>  <label>Active</label>
         <input type="radio" name="case" value="totalrecovered" onChange={handleChange}/>  <label>Recovered</label>

         <input type="radio" name="case" value="dailyconfirmed" onChange={handleChange}/>  <label>Daily cases</label>
         </div>
         <div class="square-radio">

          <input type="radio" name="logMode" value="false" align="right" defaultChecked onChange={handleChangelog}/>  <label>Linear</label>
           <input type="radio" name="logMode" value="true" align="right" onChange={handleChangelog}/>  <label>Logarithmic</label>


       </div>
      <div>
        {fetched && <Dchart timeseries={timeseries[activeStateCode]}

                casetype={cases}
                type={graphOption}
                mode={timeseriesMode}
                logMode={logMode} />}
                </div>
        <div>
      {fetched && <Table columns={columns} data={fdata}
      renderRowSubComponent={renderRowSubComponent}
      districtWiseData={districtWiseData}
      stateCode = {activeStateCode}/>}
    </div>
    </div>

  )
}

export default App;
