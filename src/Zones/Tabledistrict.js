import React, { useState,useEffect } from 'react';
import {
  SortingState,
  IntegratedSorting,
  SearchState,
  IntegratedFiltering,
  PagingState,
  IntegratedPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  PagingPanel,
  Toolbar,
  SearchPanel,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import { STATES_C } from '../Common/constants';

import Paper from '@material-ui/core/Paper';

const Tabledistrict=(props) => {

    const [districts, setDistricts] =useState([]);

    const districtWiseData =props.districtWiseData;



var dist= Object.keys(districtWiseData).reduce(function (r, k) {
    return r.concat( districtWiseData[k])
}, []);
var dataa = []

function objk(hs) { 
        for (var x=0;x<33;x++){
             var distl = [];
             var statel =[];
             distl = dist[x].districtData;
             statel = dist[x].statecode;
             var ks=[]
            for (var y=0; y < Object.keys(distl).length;y++){
                var g = [];
                 g = Object.values(distl)[y];
                g.district = Object.keys(distl)[y]
                g.state=STATES_C[statel]
                dataa.push(g)
                
            }
             
        } 
        
        // .reduce(function (r, k) {
        //     return r.concat( k);
        // }, []);
        return dataa}

        var c =objk(dist);

    

const rows = c.sort((a, b) => (b.confirmed - a.confirmed));

  const [columns] = useState([
   
    {
        name: "district",
       title: "District",
        
        
      },
      {
        name: "state",
      title: "State",
    },
    {
        name: "confirmed",
      title: "Total Cases",
    },
    {
      name: "deceased",
    title: "Deaths",
  },
 
{
  name: "active",
title: "Active",
},
{
name:"recovered",
title:"Recovered",
},
      
  ]);
   const [tableColumnExtensions] = useState([
    { columnName: 'district', width: 200 }
   ])

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >
          <SearchState defaultValue="" />
        <IntegratedFiltering />
          <PagingState
          defaultCurrentPage={0}
          pageSize={10}
        />
        <IntegratedPaging />
        
        <SortingState
          defaultSorting={[{ columnName: 'confirmed', direction: 'desc' }]}
        />
        <IntegratedSorting />
        <Table columnExtensions={tableColumnExtensions}/>
        <TableHeaderRow showSortingControls />
        <PagingPanel />
        <Toolbar />
        <SearchPanel />
        
      </Grid>
    </Paper>
  );
};



export default Tabledistrict;