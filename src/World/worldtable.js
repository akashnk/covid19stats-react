import React, { useState,useContext,useEffect } from 'react';
// import { SelectionState } from '@devexpress/dx-react-grid';
import { SearchState,
  SelectionState, 
  SortingState,
  IntegratedFiltering,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
DataTypeProvider } from '@devexpress/dx-react-grid';
import Paper from '@material-ui/core/Paper';
import {
  Grid,
  PagingPanel,
  Table,
  Toolbar,
  SearchPanel,
  TableHeaderRow,
  TableSelection,
  TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui';


import {TableContext} from "../TableContext";





const Worldtable = (props) => {

    const [rows,setrows] =useState(props.rows);
    const [selection, setSelection] = useState([]);
    const context = useContext(TableContext);
 
    const [searchValue, setSearchState] = useState([]);
  


    // rows.forEach((d,i)=> {
    //   d.confirmed= +d.confirmed
    //   d.active= +d.active
    //   d.recovered= +d.recovered
    //   d.deaths=+d.deaths
    //   d.totaltested= +d.totaltested
    //   d.deltadeaths=+d.deltadeaths
     
    //   });

    //   const comparedeath = (a, b) => {
    //     const priorityA = a.deaths;
    //     const priorityB = b.deaths;
    //     if (priorityA === priorityB) {
    //       return 0;
    //     }
    //     return (priorityA < priorityB) ? -1 : 1;
    //   };
    //   const [integratedSortingColumnExtensions] = useState([
    //     { columnName: 'deaths', compare: comparedeath  },
    //   ]);
    const Formatter = ({ value,row }) => (
      row.todayCases > 0 ? (<div>{value.toLocaleString()} <br/><span style={{ color: 'red' }}>
           [+ {row.todayCases.toLocaleString()}]</span> </div>
       ) : <div>{value.toLocaleString()}</div>
    );
    
    const TypeProvider = props => (
      <DataTypeProvider
        formatterComponent={Formatter}
        {...props}
      />
    );

    const Formatterxxx = ({ value,row }) => (
      row.todayDeaths > 0 ? (<div>{value.toLocaleString()} <br/><span style={{ color: 'red' }}>
           [+ {row.todayDeaths.toLocaleString()}]
      </span></div>) : (<div>{value.toLocaleString()}</div>)
    );
    
    const TypeProviderxxx = props => (
      <DataTypeProvider
        formatterComponent={Formatterxxx}
        {...props}
      />
    );

    const Formatterxx = ({ value }) => (
      value.toLocaleString()
    );
    
    const TypeProviderxx = props => (
      <DataTypeProvider
        formatterComponent={Formatterxx}
        {...props}
      />
    );

  const [columns] = useState([
    
    {
        name: "country",
        title: "Country",
        
        
      },
      {
        name: "cases",
        title: "Total cases",
      //   getCellValue: (row,rowInfo) =>  {
      //   return(  <div>
      //  <span>  {row.cases}</span>
      //  <br/>
      //  <span style={{color: row.todayCases > 0 ? "red": rowInfo.index%2!==0 ? "white":"#F2F2F2" }}> [+ {row.todayCases}]</span>
      //   </div>)}
  
      },


                { 
                  name: "deaths",
                  title: "Deaths",
                //   getCellValue: (row,rowInfo) =>  {
                //   return(  <div>
                //  <span>  {row.deaths}</span>
                //  <br/>
                //  <span style={{color: row.todayDeaths > 0 ? "red": rowInfo.index%2!==0 ? "white":"#F2F2F2" }}> [+ {row.todayDeaths}]</span>
                //   </div>)}

                },


  {
    name: "active",
    title: "Active"
    // width: 80
  },

{
  name: "recovered",
  title: "Recoverd"
},

{
name: "tests",
title: "Total Tested"
// width: 80
},

// {
// name: "positive",
// title: "Positive rate",
// getCellValue: (row) => {
//   return(parseFloat( ((row.cases/row.tests)*100).toFixed(2)))
// }
// // width: 80
// },
{
name: "testsPerOneMillion",
title: "Tests/million"
// width: 80
}

  ]);
  const gdata = rows.sort((a, b) => (b.cases - a.cases));
 
  // const [tableColumnExtensions] = useState([
  //   { columnName: 'state', width: 180 },
  //   { columnName: 'confirmed', width: 100 },
  //   { columnName: 'deaths', width: 100 },
  //   { columnName: 'active', width: 100 },
  //   { columnName: 'recovered', width: 100 },
  //   { columnName: 'totaltested',width: 100 },
  //   { columnName: 'positive',width: 100 },
  //   { columnName: 'Tests/million',width: 100 },

  // ]);

//    const [tableColumnExtensions] = useState([
//      { columnName: TableSelection.COLUMN_TYPE, wordWrapEnabled: true },
//       {columnName: 'state', wordWrapEnabled: true},
//      { columnName: 'confirmed', wordWrapEnabled: true },
//     { columnName: 'deaths'},
//     { columnName: 'active'},
//     { columnName: 'recovered', wordWrapEnabled: true },
//     { columnName: 'totaltested',wordWrapEnabled: true },
//     { columnName: 'positive',wordWrapEnabled: true},
//     { columnName: 'tests',wordWrapEnabled: true},

//    ]);

//    const [columnWidths, setColumnWidths] = useState([
//      { columnName: TableRowDetail.COLUMN_TYPE,width:20},
//     { columnName: TableSelection.COLUMN_TYPE, width:20},
//     {columnName: 'state', width: 90},
//     { columnName: 'confirmed', width: 80 },
//    { columnName: 'deaths', width: 84},
//    { columnName: 'active', width: 100 },
//    { columnName: 'recovered', width: 100 },
//    { columnName: 'totaltested',width: 100 },
//    { columnName: 'positive',width: 100 },
//    { columnName: 'tests',width: 100 },

//   ]);
   const [leftColumns] = useState([TableSelection.COLUMN_TYPE,'country']);
//   const RowDetail = ({ row }) => (
//     <div>
// <Tablecollapsed districts={districts[row.state].districtData}/>
//     </div>
//   ); const [Columns] = useState(['confirmed']);
  const [Columns] = useState(['cases']);
  const [Columnsxxx] = useState(['deaths']);
  const [Columnsxx] = useState(['active','recovered','tests','testsPerOneMillion']);
  const [sorting, setSorting] = useState([{ columnName: 'cases', direction: 'desc' }]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(9);
  const [pageSizes] = useState([9, 18, 27]);
//   const [sortingStateColumnExtensions] = useState([
//     { columnName: 'recovered', sortingEnabled: true },
//   ]);
 
useEffect(()=>{
    if (selection.length > 0) {
        

        const statec = rows.map(d => d.country);
        const selstate = selection.map(d=>statec[d]);
        context.setCountryselect(selection);
  
    context.setCountrycodes(selstate);}
    else {
      context.setCountrycodes(["World"]);
    }
},[selection,rows])

useEffect(()=>
{
setSelection(context.countryselect)
},[context.countryselect])

  return (
    <Paper>
      <Grid
        rows={gdata}
        columns={columns}
      >
             <TypeProvider
          for={Columns}
        />
         
          <TypeProviderxxx
          for={Columnsxxx}
        />
              <TypeProviderxx
          for={Columnsxx}
        />
       <SearchState value={searchValue}
          onValueChange={setSearchState} />
          <IntegratedFiltering/>
        
        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}
        />
         <SortingState
           sorting={sorting}
           onSortingChange={setSorting}
          
        />
        <IntegratedSorting />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
        <IntegratedPaging />
          <Toolbar />
        <SearchPanel />
        
        <Table  />
       
        {/* <TableColumnResizing
          columnWidths={columnWidths}
          onColumnWidthsChange={setColumnWidths}
        /> */}
        <TableHeaderRow showSortingControls />
        <PagingPanel
          pageSizes={pageSizes}
        />
        
        <TableSelection />
 
        {/* <TableRowDetail
          contentComponent={RowDetail}
        />  */}
               <TableFixedColumns
          leftColumns={leftColumns}/>
      </Grid>
    </Paper>
  );
};
export default Worldtable;
