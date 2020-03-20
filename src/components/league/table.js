import React from "react"
import { useTable, useSortBy } from "react-table"
import { Line } from "react-chartjs-2"

import redCard from "../../images/red-card.svg"
import rekt from "../../images/dead.svg"
import next from "../../images/next.svg"
import winner from "../../images/winner.svg"

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20)

  return (
    <>
      <table
        className={"table table-hover margin-bottom-40 table-responsive-md"}
        id="liga-table"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th
                  scope="col"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row)
            return (
              <tr
                className={"margin-top-base margin-bottom-base"}
                {...row.getRowProps()}
              >
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
    </>
  )
}

function convertSatoshiToBTC(satoshi) {
  return satoshi / 100000000.0
}

function getChartData(roes) {
  return {
    labels: roes.map((item, index) => index.toString()),
    datasets: [
      {
        label: null,
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(21, 101, 216, 0.1)",
        borderColor: "rgba(21, 101, 216, 0.8)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(21, 101, 216, 1)",
        pointBackgroundColor: "rgba(21, 101, 216, 1)",
        pointBorderWidth: 3,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(21, 101, 216, 1)",
        pointHoverBorderColor: "rgba(21, 101, 216, 1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: roes,
      },
    ],
  }
}

function getRoeColored(roe, isRekt, isRetarded, tooLowBalance) {
  if (isRetarded || isRekt || tooLowBalance) {
    return <div>-</div>
  }

  if (roe !== null) {
    if (roe > 0) {
      return <div className={"color-green"}>{roe.toFixed(2)}%</div>
    } else if (roe < 0) {
      return <div className={"color-red"}>{roe.toFixed(2)}%</div>
    } else {
      return <div>0%</div>
    }
  } else {
    return <div>-</div>
  }
}

function getRoeCurrent(roe, isRekt, isRetarded, tooLowBalance) {
  if (isRetarded) {
    return (
      <div>
        <img src={redCard} alt="redCard" />
      </div>
    )
  }

  if (isRekt) {
    return (
      <div>
        <img src={rekt} alt="rekt" />
      </div>
    )
  }

  if (tooLowBalance) {
    return (
      <div>
        <img src={redCard} alt="redCard" />
      </div>
    )
  }

  if (roe !== null) {
    if (roe > 0) {
      return <div className={"color-green"}>{roe.toFixed(2)}%</div>
    } else if (roe < 0) {
      return <div className={"color-red"}>{roe.toFixed(2)}%</div>
    } else {
      return <div>0%</div>
    }
  } else {
    return <div>-</div>
  }
}

function getRoe1d(roe, isRekt, isRetarded, tooLowBalance) {
  if (isRetarded) {
    return <div>DSQ</div>
  }

  if (isRekt) {
    return <div>LIQ</div>
  }

  if (tooLowBalance) {
    return <div>DNS</div>
  }

  if (roe !== null) {
    if (roe > 0) {
      return <div className={"color-green"}>{roe.toFixed(2)}%</div>
    } else if (roe < 0) {
      return <div className={"color-red"}>{roe.toFixed(2)}%</div>
    } else {
      return <div>0%</div>
    }
  } else {
    return <div>-</div>
  }
}

const sortHelper = ({
	isAfter,
	isBefore,
	desc
}) => {
	let order

	if (isAfter) {
		order = 1
	} else if (isBefore) {
		order = -1
	} else {
		order = 0
	}

	if (desc) {
		return -order
	} else {
		return order
	}
}

const sortString = (rowA, rowB, columnId, desc) => {
	const stringA = rowA.values[columnId].trim().toLowerCase()
	const stringB = rowB.values[columnId].trim().toLowerCase()

	const isAfter = stringA > stringB
	const isBefore = stringA < stringB

	return sortHelper({
		isAfter,
		isBefore,
		desc
	})
}

function LeagueTable({ leagueData }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        Cell: ({ row }) => parseInt(row.id) + 1,
      },
      {
        Header: "Nick",
        accessor: "username",
        sortType: 'basic'
      },
      {
        Header: "Kapitał startowy",
        Cell: ({ row }) => (
          <span>{convertSatoshiToBTC(row.original.startingBalance)} BTC</span>
        ),
      },
      {
        Header: "Kapitał obecny",
        Cell: ({ row }) => (
          <span>
            {row.original.isRekt ||
            row.original.isRetarded ||
            row.original.tooLowBalance
              ? 0
              : convertSatoshiToBTC(row.original.balance)}{" "}
            BTC
          </span>
        ),
      },
      {
        Header: "Obecne roe",
        Cell: ({ row }) =>
          getRoeCurrent(
            row.original.roeCurrent,
            row.original.isRekt,
            row.original.isRetarded,
            row.original.tooLowBalance
          ),
      },
      {
        Header: "1d",
        Cell: ({ row }) =>
          getRoe1d(
            row.original.roe1d,
            row.original.isRekt,
            row.original.isRetarded,
            row.original.tooLowBalance
          ),
      },
      {
        Header: "3d",
        Cell: ({ row }) =>
          getRoeColored(
            row.original.roe3d,
            row.original.isRekt,
            row.original.isRetarded,
            row.original.tooLowBalance
          ),
      },
      {
        Header: "7d",
        Cell: ({ row }) =>
          getRoeColored(
            row.original.roe7d,
            row.original.isRekt,
            row.original.isRetarded,
            row.original.tooLowBalance
          ),
      },
      {
        Header: "14d",
        Cell: ({ row }) =>
          getRoeColored(
            row.original.roe14d,
            row.original.isRekt,
            row.original.isRetarded,
            row.original.tooLowBalance
          ),
      },
      {
        Header: "graph",
        Cell: ({ row }) => (
            <>
            {row.original.isRetarded || row.original.tooLowBalance ? (
              <div></div>
            ) : (
              <div className={"roe-chart"}>
              <Line
                data={getChartData(row.original.roes)}
                width={120}
                height={40}
                options={options}
                legend={legend}
              />
              </div>
            )}
            </>
        ),
      },
    ],
    []
  )
  const data = React.useMemo(() => leagueData)

  return <Table columns={columns} data={data} />
}

const options = {
  layout: {
    padding: 10,
  },
  maintainAspectRatio: false,
  title: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
  tooltips: {
    footerFontSize: 14,
    footerAlign: "center",
    footerFontFamily: "'Montserrat', 'Arial', sans-serif",
    callbacks: {
      label: function() {
        return null
      },
      title: function() {
        return null
      },
      footer: function(tooltipItems, data) {
        var sum = 0

        tooltipItems.forEach(
          tooltipItem =>
            (sum +=
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index])
        )
        return sum + " %"
      },
    },
  },
}

const legend = {
  display: false,
}

export default LeagueTable
