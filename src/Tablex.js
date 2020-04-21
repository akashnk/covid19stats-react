import React,{useState,useEffect} from "react";
import { useTable, useSortBy,useResizeColumns,
  useFlexLayout } from "react-table";

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

const Tablex = (props) => {
    // Use the state and functions returned from useTable to build your UI
    const [data,setData] =useState([]);
    const [columns,setColumns]=useState([]);
    useEffect(() => {

      setData(props.arr);
    setColumns(props.columns);

    }, [props.arr,props.columns]);

    // useEffect(() => {
    //
    //   setColumns(props.columns);
    //
    // }, [props.columns]);

// console.log(data);

      const {getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
    } = useTable({
      columns,
      data
    },

  useFlexLayout,
    useSortBy,
)
    // //
    // // // Render the UI for your table
     return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}
                className={
                  column.isSorted
                    ? column.isSortedDesc
                      ? "sort-desc"
                      : "sort-asc"
                    : ""
                }
              >{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

    )
    // <>
    // </>)
  }

export default Tablex;
