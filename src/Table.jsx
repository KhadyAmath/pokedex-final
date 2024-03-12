import React, { useState } from 'react';
import jsonData from './server/pokedex.json';
import { Link, useNavigate } from 'react-router-dom';

function PokemonTable() {
  const navigate = useNavigate();
  const handlePokemonClick = (pokemonId) => {
    navigate(`/detail/${pokemonId}`);
  };

  const [typeFilter, setTypeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handleTypeFilterChange = (event) => {
    setTypeFilter(event.target.value);
    setCurrentPage(0);
  };

  const filteredData = jsonData.filter(
    (info) =>
      info.name.english.toLowerCase().includes(typeFilter.toLowerCase()) ||
      info.type.join(', ').toLowerCase().includes(typeFilter.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) => a.id - b.id);

  const paginatedData = sortedData.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div>
        <label htmlFor="typeFilter">Filter by Type: </label>
        <input
          type="text"
          id="typeFilter"
          value={typeFilter}
          onChange={handleTypeFilterChange}
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>HP</th>
            <th>Attack</th>
            <th>Defense</th>
            <th>Speed</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((info) => (
            <tr key={info.id} onClick={() => handlePokemonClick(info.id)}>
              <td>{info.id}</td>
              <td>
                <Link to={`/detail/${info.id}`}>
                  {info.name.english}
                </Link>
              </td>
              <td>{info.type.join(', ')}</td>
              <td>{info.base.HP}</td>
              <td>{info.base.Attack}</td>
              <td>{info.base.Defense}</td>
              <td>{info.base.Speed}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Previous
        </button>{' '}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(0);
          }}
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PokemonTable;
