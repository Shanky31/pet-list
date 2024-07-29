import React, { useEffect, useState } from 'react';
import { Grid, Container, Typography, CircularProgress, Pagination } from '@mui/material';
import PetCard from './PetCard';
import { fetchPets } from '../services/api';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const getPets = async () => {
      setLoading(true);
      try {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const data = await fetchPets(startIndex, endIndex);
        setPets(data.pets);
        setTotalResults(data.numberOfResults);
      } catch (error) {
        setError('Failed to fetch pets.');
      } finally {
        setLoading(false);
      }
    };

    getPets();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Pet Listing
      </Typography>
      <Grid container spacing={4}>
        {pets.map((pet) => (
          <Grid item key={pet.id} xs={12} sm={6} md={4}>
            <PetCard pet={pet} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(totalResults / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </Container>
  );
};

export default PetList;
