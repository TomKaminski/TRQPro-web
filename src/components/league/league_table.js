import React from "react"
import { useTable, useSortBy } from "react-table"
import { Line } from "react-chartjs-2"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import redCard from "../../images/red-card.svg"
import rekt from "../../images/dead.svg"

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
                <th
                  scope="col"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {column.canSort ? (
                    <span>
                      {" "}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FontAwesomeIcon icon="sort-up" size={"1x"} />
                        ) : (
                          <FontAwesomeIcon icon="sort-down" size={"1x"} />
                        )
                      ) : (
                        <FontAwesomeIcon
                          icon="sort"
                          size={"1x"}
                          color="lightgrey"
                        />
                      )}
                    </span>
                  ) : (
                    ""
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
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

  return displayRoeBase(roe)
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

  return displayRoeBase(roe)
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

  return displayRoeBase(roe)
}

function displayRoeBase(roe) {
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

function LeagueTable({ leagueData }) {
  const customSort = React.useCallback((rowA, rowB, columnId) => {
    let a = rowA.values[columnId]
    let b = rowB.values[columnId]

    switch (true) {
      case rowB.original.tooLowBalance && rowA.original.tooLowBalance:
        return b - a
      case rowB.original.isRetarded && rowA.original.isRetarded:
        return b - a < 0 ? -1 : 1
      case rowB.original.isRekt && rowA.original.isRekt:
        return b - a < 0 ? -1 : 1
      case rowA.original.isRetarded:
        return 1
      case rowB.original.isRetarded:
        return -1
      case rowA.original.tooLowBalance:
        return 1
      case rowB.original.tooLowBalance:
        return -1
      case rowA.original.isRekt:
        return 1
      case rowB.original.isRekt:
        return -1
      default:
        return b - a
    }
  }, [])
  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        Cell: ({ row }) => parseInt(row.id) + 1,
      },
      {
        Header: "Nick",
        accessor: "username",
      },
      {
        Header: "Kapitał startowy",
        Cell: ({ row }) => {
          if (row.original.exchange === "bybit") {
            return <span>{row.original.startingBalance.toFixed(2)} USDT</span>
          } else {
            return (
              <span>
                {convertSatoshiToBTC(row.original.startingBalance)} BTC
              </span>
            )
          }
        },
        accessor: "startingBalance",
      },
      {
        Header: "Kapitał obecny",
        Cell: ({ row }) => {
          if (row.original.exchange === "bybit") {
            return (
              <span>
                {row.original.isRekt ||
                row.original.isRetarded ||
                row.original.tooLowBalance
                  ? 0
                  : row.original.startingBalance.toFixed(2)}{" "}
                USDT
              </span>
            )
          } else {
            return (
              <span>
                {row.original.isRekt ||
                row.original.isRetarded ||
                row.original.tooLowBalance
                  ? 0
                  : convertSatoshiToBTC(row.original.balance)}{" "}
                BTC
              </span>
            )
          }
        },
        accessor: "balance",
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
        accessor: "roeCurrent",
        sortType: customSort,
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
        accessor: "roe1d",
        sortType: customSort,
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
        accessor: "roe3d",
        sortType: customSort,
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
        accessor: "roe7d",
        sortType: customSort,
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
        accessor: "roe14d",
        sortType: customSort,
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
                  height={95}
                  options={options}
                  legend={legend}
                />
              </div>
            )}
          </>
        ),
      },
    ],
    [customSort]
  )
  const data = React.useMemo(() => leagueData, [])

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
