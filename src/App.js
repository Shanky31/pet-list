// src/App.js
import React, { useState, useEffect } from 'react';
import { Container, Grid, Pagination, Typography } from '@mui/material';
import { fetchPets, searchPets } from './services/api';
import PetCard from './components/PetCard';
import SearchForm from './components/SearchForm';

const App = () => {
  const [pets, setPets] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({});

  const itemsPerPage = 9;

  const handleSearch = async (params) => {
    setSearchParams(params);
    setCurrentPage(1);
    const result = await searchPets(params);
    setPets(result.pets);
    setTotalResults(result.numberOfResults);
  };

  const handlePageChange = async (event, value) => {
    setCurrentPage(value);
    const startIndex = (value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const result = await fetchPets(startIndex, endIndex);
    setPets(result.pets);
  };

  useEffect(() => {
    const fetchInitialPets = async () => {
      const result = await fetchPets(0, itemsPerPage);
      setPets(result.pets);
      setTotalResults(result.numberOfResults);
    };
    fetchInitialPets();
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom style={{fontWeight:'800',marginTop:'20px'}}>
        Pet Listing
      </Typography>
      <SearchForm onSearch={handleSearch} />
      <Grid container spacing={3}>
        {pets.map((pet) => (
          <Grid item xs={12} sm={6} md={4} key={pet.id}>
            <PetCard pet={pet} />
          </Grid>
        ))}
      </Grid>
      {totalResults > itemsPerPage && (
        <Pagination
          count={Math.ceil(totalResults / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
        />
      )}
    </Container>
  );
};

export default App;
