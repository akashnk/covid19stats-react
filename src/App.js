import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

import Table from "./Table";
import Today from "./Today";
import "./App.css";



function App() {
  const columns = useMemo(
    () => [
     
            {
                Header: "State",
                accessor: "state"
              },
              {
                Header: "Confirmed",
                accessor: "confirmed"
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
          }

        ],
  
    []
  );

  const [data, setData] = useState([]);
  const [fetched,setFetched] = useState(false);

  const apiURL1 = 'https://corona.lmao.ninja/v2/countries';
  const apiURL2 = 'https://api.covid19india.org/data.json';
//   useEffect(() => {
//     (async () => {
//       const result = await axios("https://api.tvmaze.com/search/shows?q=snow");
//       setData(result.data);
//     })();
//   }, []);
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
    ])
    .then(axios.spread((resone,restwo) =>
    {
       //console.log(resone.data);
       setData(restwo.data.statewise);
       setFetched(true);
      // console.log(restwo.data.statewise[0]);
    }))
    ;
    
  } catch (err) {
    console.log(err);
  }
  
    // var data = response.data;
      // console.log(data);
     
     
     
  
    //  setBooks(response.data) ;
  }
  return (
    <div className="App">
      <Today data={data} />
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;