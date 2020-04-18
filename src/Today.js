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
    <div className = "box">
        <div className = "red">
            <h5>Confirmed</h5>
            <h4>
            {confirmed} [
              {deltas
                ? deltas.confirmed > 0
                  ? '+' + deltas.confirmed
                  : '+0'
                : ''}
              ]
            </h4>

       </div>
       <div className = "orange" >
           <h5 >Active</h5>
           <h4>
            {active} [
             {deltas
               ? deltas.active > 0
                 ? '+' + deltas.active
                 : '+0'
               : ''}
             ]
           </h4>

        </div>
        <div className = "green" >
           <h5 >Recovered</h5>
           <h4>
            {recoveries} [
             {deltas
               ? deltas.recovered > 0
                 ? '+' + deltas.recovered
                 : '+0'
               : ''}
             ]
           </h4>

        </div>
        <div className = "gray" >
           <h5 >Deaths</h5>
           <h4>
             {deaths} [ 

             {deltas
               ? deltas.deaths > 0
                 ? '+' + deltas.deaths
                 : '+0'
               : ''}
             ]

           </h4>
        </div>

    </div>
    )
}


export default Today;
