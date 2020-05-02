import React,{useState} from "react";
import axios from "axios";

export default function World() {
    const [data, setData] = useState([]);
  const [fetched,setFetched] = useState(false);

  const apiURL1 = 'https://disease.sh/v2/countries';
  

    return <h2>About</h2>;
  }