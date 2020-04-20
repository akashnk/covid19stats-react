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
// const array=[];
// for (const x in districts)
// {
// array1.push(x);
//
// }

for (const x in districts)
{
  array1.push(x);
array2.push(districts[x].confirmed);
}

// for(let i=0;i<array1.length;i++){
//   {array[array1[i]]=array2[i];}
// }
// console.log(array);
//
// var objx = {
//        name : "",
//        age : "",
//
//    }

// objx.name = array1[0];
// objx.age = array2[0];
// objx.name = array1[1];
// objx.age = array2[1];
const arr =([]);
for (var i = 0; i < array1.length; i++) {
    arr.push({
        District: array1[i],
        Confirmed: array2[i]

    });
}

// useEffect(()=>
// setobject(arr)
// ,[])
 // console.log(arr);
// const obj={}
// obj.key = array1
// obj.values= array2

// useEffect(()=>
//
//   setobject(obj)
// ,[obj])

// console.log(obj);

const columns = React.useMemo(
    () => [

      {
        Header: "District",
        accessor: "District"
      },
    {
      Header: "Confirmed Cases",
      accessor: "Confirmed"
    }],
      [])

  //
  // console.log(arr.length)
return (
  <div>

 {object && <Tablex columns={columns} arr={arr} />}
</div>
)
}






export default Tablecollapsed;
