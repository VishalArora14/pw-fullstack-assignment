import React, { useEffect, useState } from "react";
// import data from "../scraped_data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSquareCheck, faClock } from "@fortawesome/free-solid-svg-icons";
import "./TableContainer.css";
import { useSelector } from "react-redux";

function TableContainer() {

  const { data } = useSelector((state) => state.getAllData);
  const [searchQuery, setSearchQuery] = useState("");
  const [rows, setRows] = useState(data? data.data: []);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [filters, setFilters] = useState([]);

  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  let totalPages = Math.ceil(rows===undefined? 0: (rows.length / itemsPerPage));
  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  
  useEffect(() => {
    setRows(data? data.data: []);
    setSearchQuery("");
    setSortField(null);
    setSortDirection(null);
    setFilters([]);
  
    const itemsPerPage = 15;
    setCurrentPage(1);
    totalPages = Math.ceil(rows===undefined? 0: (rows.length / itemsPerPage));
    startIndex = (currentPage - 1) * itemsPerPage;
    endIndex = startIndex + itemsPerPage;
  }, [data]);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    filterData(value);
  };

  const filterData = (query) => {
    const filteredRows = rows.filter((row) => {
      return Object.values(row).some((value) =>
        String(value).toLowerCase().includes(query.toLowerCase())
      );
    });
    setRows(filteredRows);
  };

  const handleSort = (field) => {
    let direction = "asc";
    if (sortField === field && sortDirection === "asc") {
      direction = "desc";
    }
    setSortField(field);
    setSortDirection(direction);
    sortData(field, direction);
  };

  const sortData = (field, direction) => {
    const sortedRows = [...rows].sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];
      return direction === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
    setRows(sortedRows);
  };

  const clearSortingAndFiltering = () => {
    setSortField(null);
    setSortDirection(null);
    setFilters([]);
    setRows(data? data.data: []);
    setSearchQuery("");
  };

  return (
    <div className="container">
      <input
        className="searchBox"
        type="text"
        placeholder="Search Anything..."
        value={searchQuery}
        onChange={handleSearch}
      />

      <button
        className="clearSortingAndFiltering"
        onClick={clearSortingAndFiltering}
      >
        Reset Sort and Filter
      </button>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>
              Filename <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("date")}>
              Date <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("time1")}>
              Start-time <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("time2")}>
              End-time <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("location")}>
              Center <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("room")}>
              Room <FontAwesomeIcon icon={faSort} />
            </th>
            <th colSpan={2}>
              Status
              <div className="status-subheadings">
                <span>Uploaded</span>
                <span>|</span>
                <span>Published</span>
              </div>
            </th>
            <th>Public URL</th>
          </tr>
        </thead>

        <tbody>
          {rows && rows.length && rows.slice(startIndex, endIndex).map((row, index) => (
            <tr key={index} style={{backgroundColor: `${index%2? "rgb(249, 250, 234)": ""}`}}>
              <td className="row-tile">{row.title}</td>
              <td>{row.date}</td>
              <td>{row.time1}</td>
              <td>{row.time2}</td>
              <td>{row.location}</td>
              <td>{row.room}</td>
              <td><FontAwesomeIcon icon={row.status1 === "true"? faSquareCheck: faClock} style={{color: row.status1 === "true"? "#209211": "#ac0404", fontSize: "20px"}} /></td>
              <td><FontAwesomeIcon icon={row.status2 === "true"? faSquareCheck: faClock} style={{color: row.status2 === "true"? "#209211": "#ac0404", fontSize: "20px"}} /></td>
              <td>
                {" "}
                <a
                  href={row.publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open File
                </a>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default TableContainer;
