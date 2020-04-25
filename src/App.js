import React, { useMemo, useState,forwardRef, useEffect,useReducer,useContext } from "react";
import axios from "axios";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


import Table from "./Table";
import {getColumnWidth} from "./common-functions.js"
import Today from "./Today";
import Dchart from "./Dchart";
import "./App.css";
import {TableContext} from './TableContext';
import {STATES,pop} from './constants';


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
    const [timeMode, setTimeMode] = useState([]);

const [logMode, setLogMode] = useState(false);
 const [activeStateCode, setActiveStateCode] = useState('TT');
 const [cases,setCase] =useState('totalconfirmed');
  const [testData, setTestData] = useState([]);
  const [totalTests,setTotaltests] =useState([]);

  //const apiURL1 = 'https://corona.lmao.ninja/v2/countries';
  const apiURL1 = 'https://api.covid19india.org/state_district_wise.json';
  const apiURL2 = 'https://api.covid19india.org/data.json';
   const apiURL3 = 'https://api.covid19india.org/states_daily.json';
   const apiURL4 = 'https://api.covid19india.org/state_test_data.json';
//   const apiURL4
 const context = useContext(TableContext);
// console.log(context.statecodes);

useEffect(() => {
   document.title = "Covid 19 Interactive Dashboard"
}, []);

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
    axios.get(apiURL4),
   ]);

       //console.log(resone.data);
       setDistrictWiseData(resone.data);
       setData(data.statewise);

       // setStatesDailyResponse(resthree.data);
       const ts = parseStateTimeseries(statesDailyResponse);
       ts['TT'] = preprocessTimeseries(data.cases_time_series); // TT -> India
       setTimeseries(ts);
       setTestData(stateTestData.states_tested_data.reverse());
       setTotaltests(data.tested[data.tested.length-1])
      //  testData.push({
      //   updatedon: totalTests.updatetimestamp,
      //   totaltested: totalTests.totalindividualstested,
      //   source: totalTests.source,
      //   state: 'Total',
      // });
    //  testData.push({
      //  updatedon: totalTest.updatetimestamp.split(' ')[0],
      //  totaltested: totalTest.totalindividualstested,
      //  source: totalTest.source,
      //  state: 'Total', // India
    //  });
        // setStateTestData(testData);
       
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
   // function getMapKeyValueByIndex(testData, idx) {
   //    var key = Object.keys(obj)[idx];
   //    return { key: , value: obj[key] };
   // }

const fdata = data.filter(d => d.confirmed > 0);
const kdata = fdata.filter(d => d.state !== "Total");
const gdata = kdata.sort((a, b) => (b.confirmed - a.confirmed));
// const testkData = testData.reverse();
// const totalTest = data.tested[data.tested.length - 1];
// var arrayv=[];
//  for (var i=0;i < STATES.length; i++)
//  {
//    var st = [];
//    var j = [];
// st = Object.values(STATES)[i];
// j = testData.find(d => d.state === st);

const filtTest=testData.filter((v,i,a)=> a.findIndex(t=>(t.state===v.state && t.totaltested>0))===i)
// console.log(gdata.map((, i) => Object.assign({}, item, filtTest[i]));
// const ddata= [...gdata,...filtTest,]
// let set = new Set();
// let unionArray = ddata.filter(item => {
//   if (!set.has(item.state)) {
//     set.add(item.state);
//     return true;
//   }
//   return false;
// }, set);

// function mergeArrayObjects(arr1,arr2){
//   return arr1.map((item,i)=>{
//      if(item.state === arr2[i].state){
//          //merging two objects
//        return Object.assign({},item,arr2[i])
//      }
//   })
// }
// useEffect(()=>{
// setTimeMode(mergeArrayObjects(gdata,filtTest));
// }
// ,[gdata,filtTest])
console.log(pop);

let merged = [];

 for(let i=0; i<gdata.length; i++) {
// gdata.forEach(function(i) {
  merged.push({
   ...gdata[i], 
   ...(filtTest.find((itmInner) => itmInner.state === gdata[i].state))}
  );
}

console.log(merged);
// console.log(testData)
// arrayv.push(j)


//  }
// console.log(arrayv)
// var st = []
// st=Object.values(STATES)[2];
// console.log(st)

const handleChange = e => {
   // console.log(e.target.value);
   setCase(e.target.value);
 };
 const handleChangelog = e => {
    // console.log(e.target.value);
    setLogMode(e.target.value);
  };


// console.log(JSON.stringify(timeseries["TT"])
// console.log(districtWiseData);
  const columns = useMemo(
    () => [
      {
 // Make an expander cell
 Header: () => null, // No header
 id: 'expander',
 width: 35, // It needs an ID
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
                width: "110",
                sticky: 'left',
              },
              {
                Header: "Total cases",
                accessor: (row,rowInfo) =>  {
                return(  <div>
               <span>  {row.confirmed}</span>
               <br/>
               <span style={{color: row.deltaconfirmed > 0 ? "red": rowInfo.index%2!==0 ? "white":"#F2F2F2" }}> [+ {row.deltaconfirmed}]</span>
                </div>)},
              //   Cell:row => {
              // return (
              //   <div>
              //     <span className="class-for-name">{row.confirmed}10</span>
              //     <span className="class-for-description">+20</span>
              //   </div>
            //   )
            //
            sticky: 'left'
              },
        //       {
        //         Header: "New Cases",
        //         accessor: "deltaconfirmed",
        //         // width: 80,
        //        getProps: (state, rowInfo, column) => {
        //     return {
        //        style: {
        //             background: rowInfo && rowInfo.row.deltaconfirmed > 0 ? 'red' : null,
        //           },
        //
        //     };
        // },
        //
        //       },

                        {
                          Header: "Deaths",
                          accessor: (row,rowInfo) =>  {
                          return(  <div>
                         <span>  {row.deaths}</span>
                         <br/>
                         <span style={{color: row.deltadeaths > 0 ? "red": rowInfo.index%2!==0 ? "white":"#F2F2F2" }}> [+ {row.deltadeaths}]</span>
                          </div>)}

                        },

                      // {
                      //     Header: "New Deaths",
                      //     accessor: "deltadeaths"
                      //     // width: 80
                      //   },

          {
            Header: "Active",
            accessor: "active"
            // width: 80
          },

      {
          Header: "Recovered",
          accessor:  (row,rowInfo) =>  {
          return(  <div>
         <span>  {row.recovered}</span>
         <br/>
         <span style={{color: row.deltarecovered > 0 ? "green": rowInfo.index%2!==0 ? "white":"#F2F2F2" }}> [+ {row.deltarecovered}]</span>
          </div>)}
      },

      {
        Header: "Total Tested",
        accessor: "totaltested"
        // width: 80
      },

      {
        Header: "Positivity %",
        accessor: (row) => {
          return( ((row.positive/row.totaltested)*100).toFixed(2))
        }
        // width: 80
      },
      {
        Header: "Tests per million",
        accessor: (row) => {
          return((row.totaltested/pop[row.statecode]*1000000).toFixed(0))
        }
        // width: 80
      }
      



        ],

    []
  );


// console.log(districtWiseData)
  return (



    <div className="App" style={{margin: "1em"}}>

<div className="topnav">
  <h3 style={{color:"#ffff"}}>Covid 19 Interactive Dashboard</h3>

</div >
<div className="box">
      <Today data={data} />
      </div>
      <div>

         <input type="radio" name="case" value="totalconfirmed" defaultChecked onChange={handleChange}/>
         <label>Confirmed</label>
         <input type="radio" name="case" value="totaldeceased" onChange={handleChange}/>  <label>Deaths</label>

         <input type="radio" name="case" value="totalrecovered" onChange={handleChange}/>  <label>Recovered</label>

         <input type="radio" name="case" value="dailyconfirmed" onChange={handleChange}/>  <label>Daily cases</label>
         </div>
         <div className="square-radio">

          <input type="radio" name="logMode" value="false" align="right" defaultChecked onChange={handleChangelog}/>  <label>Linear</label>
           <input type="radio" name="logMode" value="true" align="right" onChange={handleChangelog}/>  <label>Logarithmic</label>


       </div>
      <div>
        {fetched && <Dchart timeseries={timeseries[activeStateCode]}
                totdata={timeseries}
                casetype={cases}

                type={graphOption}
                mode={timeseriesMode}
                logMode={logMode} />}
                </div>

        <div>

      {fetched && <Table columns={columns} data={merged}
            districtWiseData={districtWiseData}
            totaldata={timeseries}
      />}

    </div>
    </div>

  )
}

export default App;
