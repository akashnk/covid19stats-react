import React, {useState, useEffect} from 'react';


const Update= (props) => {
    const [dataw, setDataw] = useState(props.dataw);
    // const [confirmed, setConfirmed] = useState(0);
    // const [active, setActive] = useState(0);
    // const [recoveries, setRecoveries] = useState(0);
    // const [deaths, setDeaths] = useState(0);
    // const [deltas, setDeltas] = useState(0);


    useEffect(() => {
        setDataw(props.dataw);
      }, [props.dataw]);
    //   useEffect(() => {
    //     const parseData = () => {
    //       let confirmed = 0;
    //       let active = 0;
    //       let recoveries = 0;
    //       let deaths = 0;
    //       let deltas = {};
    //       data.forEach((state, index) => {
    //         if (index !== 0) {
    //           confirmed += parseInt(state.confirmed);
    //           active += parseInt(state.active);
    //           recoveries += parseInt(state.recovered);
    //           deaths += parseInt(state.deaths);
    //         } else {
    //           deltas = {
    //             confirmed: parseInt(state.deltaconfirmed),
    //             deaths: parseInt(state.deltadeaths),
    //             recovered: parseInt(state.deltarecovered),
    //           };
    //         }
    //       });
    //       setConfirmed(confirmed);
    //       setActive(active);
    //       setRecoveries(recoveries);
    //       setDeaths(deaths);
    //       setDeltas(deltas);
    //     };
    //     parseData();
    //   }, [data]);

    return(
      <>
      <div>
      <table className="tablex">
  <tr>
    <th className="thx" style={{backgroundColor: "#FF5F31"}}><h5>World Cases</h5>
    <h4>
    {dataw.cases.toLocaleString()} [
      {dataw
        ? dataw.todayCases > 0
          ? '+' + dataw.todayCases.toLocaleString()
          : '+0'
        : ''}
      ]
    </h4>
</th>
    <th className="thx" style={{backgroundColor: "#5CB8E7"}}><h5 >Active</h5>
    <h4>
     {dataw.active.toLocaleString()} 
    </h4></th>
    <th className="thx" style={{backgroundColor: "#78CC5A"}}><h5 >Recovered</h5>
    <h4>
     {dataw.recovered.toLocaleString()}
    </h4></th>
    <th className="thx" style={{backgroundColor: "#A4B265"}}><h5 >Deaths</h5>
    <h4>
      {dataw.deaths.toLocaleString()} [

      {dataw
        ? dataw.todayDeaths > 0
          ? '+' + dataw.todayDeaths.toLocaleString()
          : '+0'
        : ''}
      ]

    </h4></th>
  </tr>
  </table>



    </div>
</>
    )
}


export default Update;
