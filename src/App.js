import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";


import Table from "./Table";
import Today from "./Today";
import "./App.css";
import Utils from "./Utils";



function App() {
  const [data, setData] = useState([]);
  const [fetched,setFetched] = useState(false);
  const [districtWiseData, setDistrictWiseData] = useState({});
  const [testsData, setTestsData] = useState({});

  //const apiURL1 = 'https://corona.lmao.ninja/v2/countries';
  const apiURL1 = 'https://api.covid19india.org/state_district_wise.json';
  const apiURL2 = 'https://api.covid19india.org/data.json';
  const apiURL3 = 'https://api.covid19india.org/state_test_data.json';
useEffect(() => {
    if (fetched === false) {
      fetchData();
    }
  }, [fetched]);

   const fetchData = async () => {
    try {
     axios.all([
      axios.get(apiURL1,{ responseType: 'json' }),
      axios.get(apiURL2,{ responseType: 'json' }),
      axios.get(apiURL3,{ responseType: 'json' })
    ])
    .then(axios.spread((resone,restwo,resthree) =>
    {
       //console.log(resone.data);
       setDistrictWiseData(resone.data);
       setData(restwo.data.statewise);
       setTestsData(resthree.data.states_tested_data);
       setFetched(true);
      // console.log(restwo.data.statewise[0]);
    }))
    ;

  } catch (err) {
    console.log(err);
    }
  }


// const fdata = mergeddata.filter(d => d.confirmed > 0)
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
                accessor: "state"
              },
              {
                Header: "Total cases",
                accessor: "confirmed"
              },
              {
                Header: "New Cases",
                accessor: "deltaconfirmed"
              },

          {
            Header: "Active",
            accessor: "active"
          },

      {
          Header: "Recovered",
          accessor: "recovered"
      },


          {
            Header: "Deaths",
            accessor: "deaths"
        //     Cell: row => {
        // row.styles['color'] = '#fff';
        // row.styles['backgroundColor'] = row.value > 0 ? 'red': null;
        // return row.value;

          },
          {
            Header: "New Deaths",
            accessor: "deltadeaths"
          },
          // {
          //   Header: "Tested",
          //   accessor: "totaltested"
          // },


        ],

    []
  );

// console.log(testsData);
  return (
    <div className="App">
      <Today data={data} />
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
