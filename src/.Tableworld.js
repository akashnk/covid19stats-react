import React, {useState,useEffect,useMemo} from 'react';
//import styled from 'styled-components';
//import axios from 'axios';
import {
  useTable,
  // usePagination,
   useSortBy,
   useFilters,
  // useGroupBy,
  // useExpanded,
  // useRowSelect,
} from 'react-table';
import { render } from '@testing-library/react';
// import { render } from '@testing-library/react';
const Tableworld=(props) => {
  //console.log(props.summary)
  const [states, setStates] = useState(props.states);
  const [filterInput, setFilterInput] = useState("");

  useEffect(() => {
    setStates(props.states);
  }, [props.states]);

  
console.log(columns);
console.log(states);

const {
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
  setFilter
} = useTable(
  {
    columns,
    states
  },
  useFilters,
  useSortBy
);

const handleFilterChange = e => {
  const value = e.target.value || undefined;
  setFilter("states.state", value);
  setFilterInput(value);
};

  return(
    <>
          <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search name"}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
// return(
//   <>
//   </>
// );

}
export default Tableworld;

