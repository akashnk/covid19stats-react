import React, {useState, useEffect} from 'react';


const Today= (props) => {
    const [data, setData] = useState(props.data);
    const [confirmed, setConfirmed] = useState(0);
    const [active, setActive] = useState(0);
    const [recoveries, setRecoveries] = useState(0);
    const [deaths, setDeaths] = useState(0);
    const [deltas, setDeltas] = useState(0);


    useEffect(() => {
        setData(props.data);
      }, [props.data]);
      useEffect(() => {
        const parseData = () => {
          let confirmed = 0;
          let active = 0;
          let recoveries = 0;
          let deaths = 0;
          let deltas = {};
          data.forEach((state, index) => {
            if (index !== 0) {
              confirmed += parseInt(state.confirmed);
              active += parseInt(state.active);
              recoveries += parseInt(state.recovered);
              deaths += parseInt(state.deaths);
            } else {
              deltas = {
                confirmed: parseInt(state.deltaconfirmed),
                deaths: parseInt(state.deltadeaths),
                recovered: parseInt(state.deltarecovered),
              };
            }
          });
          setConfirmed(confirmed);
          setActive(active);
          setRecoveries(recoveries);
          setDeaths(deaths);
          setDeltas(deltas);
        };
        parseData();
      }, [data]);

    return(
      <>
      <div>
      <table className="tablex">
  <tr>
    <th className="thx" style={{textColor: "#FF5F31"}}><h5>Total Cases</h5>
    <h4>
    {confirmed} [
      {deltas
        ? deltas.confirmed > 0
          ? '+' + deltas.confirmed
          : '+0'
        : ''}
      ]
    </h4>
</th>
    <th className="thx" style={{textColor: "#5CB8E7"}}><h5 >Active</h5>
    <h4>
     {active} [
      {deltas
        ? deltas.active > 0
          ? '+' + deltas.active
          : '+0'
        : ''}
      ]
    </h4></th>
    <th className="thx" style={{btextColor: "#78CC5A"}}><h5 >Recovered</h5>
    <h4>
     {recoveries} [
      {deltas
        ? deltas.recovered > 0
          ? '+' + deltas.recovered
          : '+0'
        : ''}
      ]
    </h4></th>
    <th className="thx" style={{textColor: "#A4B265"}}><h5 >Deaths</h5>
    <h4>
      {deaths} [

      {deltas
        ? deltas.deaths > 0
          ? '+' + deltas.deaths
          : '+0'
        : ''}
      ]

    </h4></th>
    </tr>
    </table>
    <table className="tablex">
      <tr>
    <th className="thx" style={{textColor: "#A4B265"}}><h5 >Fatality rate</h5>
    <h4>
      {((deaths/confirmed*100).toFixed(2))} 
      

    </h4></th>
    <th className="thx" style={{textColor: "#A4B265"}}><h5 >Recovery rate</h5>
    <h4>
      {((recoveries/confirmed*100).toFixed(2))} 
      

    </h4></th>
    <th className="thx" style={{textColor: "#A4B265"}}><h5 >Deaths/Recovered rate</h5>
    <h4>
      {((deaths/recoveries*100).toFixed(2))} 
      

    </h4></th>
    <th className="thx" style={{textColor: "#A4B265"}}><h5 >Tests/million</h5>
    <h4>
      {((props.tested/1210000000*1000000).toFixed(0))} 
      

    </h4></th>
  </tr>
  </table>



    </div>
</>
    )
}


export default Today;
