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

  
     ] =
     await Promise.all([
      axios.get(apiURL1),
      axios.get(apiURL2),
    //   axios.get(apiURL2),
   
   ]);

     
       setDatax(datad.data);
       setDataw(dataw.data);

       
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