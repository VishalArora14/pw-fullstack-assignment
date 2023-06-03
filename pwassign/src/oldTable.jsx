import React, { useState } from "react";
import data from "../scraped_data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import "./Table.css";

function Table() {
  const [searchQuery, setSearchQuery] = useState("");
  const [rows, setRows] = useState(data);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [filters, setFilters] = useState([]);

  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(rows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    filterData(value);
  };

  const filterData = (query) => {
    const filteredRows = data.filter((row) => {
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
    setRows(data);
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
          {rows.slice(startIndex, endIndex).map((row, index) => (
            <tr key={index}>
              <td className="row-tile">{row.title}</td>
              <td>{row.date}</td>
              <td>{row.time1}</td>
              <td>{row.time2}</td>
              <td>{row.location}</td>
              <td>{row.room}</td>
              <td>{row.status1}</td>
              <td>{row.status2}</td>
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

export default Table;
