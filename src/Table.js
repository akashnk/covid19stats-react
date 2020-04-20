import React, { useState,useEffect,forwardRef,useRef } from "react";
import { useTable, useFilters, useSortBy,useRowSelect,useResizeColumns,
  useFlexLayout,useExpanded } from "react-table";
// import Dchart from "./Dchart";

const IndeterminateCheckbox = forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef()
    const resolvedRef = ref || defaultRef

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)


const headerProps = (props, { column }) => getStyles(props, column.align)

const cellProps = (props, { cell }) => getStyles(props, cell.column.align)

const getStyles = (props, align = 'left') => [
  props,
  {
    style: {
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'flex-start',
      size: 20,
      display: 'flex',
    },
  },
]

const Table = (props) => {
  const [filterInput, setFilterInput] = useState("");
  const [stateCode, setStatecode] = useState([]);
  const [data,setData] =useState([]);
  const [columns,setColumns]=useState([]);
  const [districtWiseData,setDistrictWiseData]=useState([]);
  // const [renderRowSubComponent,setRenderRowsub]=useState([]);
  // Use the state and functions returned from useTable to build your UI
  useEffect(() => {
    setStatecode(props.stateCode);
    setData(props.data);
    setColumns(props.columns);
    setDistrictWiseData(props.districtWiseData)
    // setRenderRowsub(props.renderRowSubComponent);
  }, [props.stateCode,props.data,props.columns,props.districtWiseData]);

  console.log(stateCode);
console.log(districtWiseData);


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    setFilter,
    selectedFlatRows,
    state: {selectedRowIds}
  } = useTable(
    {
      columns,
      data
    },

    useFilters,
    useSortBy,
    useExpanded,
    useResizeColumns,
    useFlexLayout,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          // Header: ({ getToggleAllRowsSelectedProps }) => (
          //   <div>
          //     <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          //   </div>
          // ),
          width: 28,
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),

        },
        ...columns,
      ])
    }
  );

  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("state", value);
    setFilterInput(value);
  };
  console.log(Object.keys(selectedRowIds));

  const sel = selectedFlatRows.map(d => d.original);

  const stateode = sel.map(d => d.statecode);
  console.log(stateode);


  // Render the UI for your table
  return (
    <>
      <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search State"}
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

            prepareRow(row)


            return (
<>
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
              {/*
                     If the row is in an expanded state, render a row with a
                     column that fills the entire length of the table.
                   */}
                 {row.isExpanded ? (
                   <tr>
                     <td colSpan={visibleColumns.length}>
                       {/*
                           Inside it, call our renderRowSubComponent function. In reality,
                           you could pass whatever you want as props to
                           a component like this, including the entire
                           table instance. But for this example, we'll just
                           pass the row
                         */}
                       {props.renderRowSubComponent({ row })}
                     </td>
                   </tr>
                 ) : null}
</>
            )

          })}
        </tbody>
      </table>

    </>
      // <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
      // <pre>
      //   <code>
      //     {JSON.stringify(
      //       {
      //         selectedRowIds: selectedRowIds,
      //         'selectedFlatRows[].original': selectedFlatRows.map(
      //           d => d.original
      //         ),
      //       },
      //       null,
      //       2
      //     )}
      //   </code>
      // </pre>


  );

}
export default Table;
