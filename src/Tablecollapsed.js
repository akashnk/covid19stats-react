import React, { useState,useEffect } from "react";
import { useTable, useSortBy,useResizeColumns,
  useFlexLayout } from "react-table";
  // import {TableContext} from './App';
import Tablex from './Tablex'


  const Tablecollapsed = (props) => {
const [rowStatex,setRowStates] = useState([]);

const [districts, setDistricts] =useState([]);

const [object,setobject] = useState([]);
// const [districtWiseData, setDistrictWiseData] = useState([]);

// const district = useContext(TableContext)
// useEffect(()=>
// setDistrictWiseData()
// ,[]);
useEffect(()=>
setDistricts(props.districts)
,[props.districts])

// const sho = (obj,prop) => {
//   return prop.split('.').reduce((r,e)=>{
//     return r[e];
//   },obj);
// }

const array1 =[];
const array2=[];
// const array3=[];

for (const x in districts)
{
  array1.push(x);
array2.push(districts[x].confirmed);

}
console.log(districts[1])

const arr =([]);
for (var i = 0; i < array1.length; i++) {
    arr.push({
        District: array1[i],
        Confirmed: array2[i],
        
    });
}


const arrx = arr.sort((a, b) => (b.Confirmed - a.Confirmed))
const columns = React.useMemo(
    () => [

      {
        Header: "District",
        accessor: "District",
        width: "100"
      },
    {
      Header: "Total Cases",
      accessor: "Confirmed",
      width: "100"
    // },
    // {
    //   Header: "",
    //   accessor: "deceased",
    //   width: "100"
    // },
    // {
    //   Header: "",
    //   accessor: "Recovered",
    //   width: "100"
    }],
      [])

  //
  // console.log(arr.length)
return (
  <div>

 {object && <Tablex columns={columns} arr={arrx} />}
</div>
)
}






export default Tablecollapsed;
