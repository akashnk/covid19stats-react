import React,{useState,useEffect} from "react";
import axios from "axios";
import Worldtable from './worldtable';
export default function World() {
    const [datax, setDatax] = useState([]);
    const [dataw, setDataw] = useState([]);
  const [fetched,setFetched] = useState(false);

  const apiURL1 = 'https://disease.sh/v2/countries';
  const apiURL2 = 'https://disease.sh/v2/all';

  const fetchData = async () => {
    try {
      const [
        datad,
        dataw

    //    {data: statesDailyResponse},
    //   {data: stateTestData}
     ] =
     await Promise.all([
      axios.get(apiURL1),
      axios.get(apiURL2),
    //   axios.get(apiURL2),
   
   ]);

     
       setDatax(datad.data);
       setDataw(dataw.data);

       // setStatesDailyResponse(resthree.data);
    //    const ts = parseStateTimeseries(statesDailyResponse);
    //    ts['TT'] = preprocessTimeseries(data.cases_time_series); // TT -> India
    //    setTimeseries(ts);
    //    setTestData(stateTestData.states_tested_data.reverse());
    //    setTotaltests(data.tested[data.tested.length-1])
    //   //  testData.push({
    //   //   updatedon: totalTests.updatetimestamp,
    //   //   totaltested: totalTests.totalindividualstested,
    //   //   source: totalTests.source,
    //   //   state: 'Total',
    //   // });
    // //  testData.push({
    //   //  updatedon: totalTest.updatetimestamp.split(' ')[0],
    //   //  totaltested: totalTest.totalindividualstested,
    //   //  source: totalTest.source,
    //   //  state: 'Total', // India
    // //  });
    //     // setStateTestData(testData);
       
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
console.log(datax);
console.log(dataw)
    return (

        <>
       {fetched &&  <Worldtable rows={datax}/>}
        </>
    );
  }