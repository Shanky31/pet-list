import React, { useState } from 'react';
import { TextField, Button, MenuItem, Grid } from '@mui/material';
import { fetchBreeds } from '../services/api';

const SearchForm = ({ onSearch }) => {
  const [animal, setAnimal] = useState('');
  const [location, setLocation] = useState('');
  const [breed, setBreed] = useState('');
  const [breeds, setBreeds] = useState([]);

  const animals = ['dog', 'cat', 'bird', 'rabbit', 'reptile'];

  const handleAnimalChange = async (e) => {
    const newAnimal = e.target.value;
    setAnimal(newAnimal);

    if (newAnimal) {
      const response = await fetchBreeds(newAnimal);
      console.log(response,"breed");
      setBreeds(response.breeds || []);
    } else {
      setBreeds([]);
    }
  };

  const handleSearch = () => {
    onSearch({ animal, location, breed });
  };

  const handleReset = () => {
    setAnimal('');
    setLocation('');
    setBreed('');
    setBreeds([]);
    onSearch({}); // Trigger a search with empty parameters to reset the results
  };

  return (
    <Grid container spacing={2} alignItems="center" style={{ marginBottom: '20px' }}>
      <Grid item xs={8} sm={3}>
        <TextField
          select
          label="Animal"
          value={animal}
          onChange={handleAnimalChange}
          fullWidth
        >
          {animals.map((animal) => (
            <MenuItem key={animal} value={animal}>
              {animal}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={8} sm={3}>
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={8} sm={3}>
        <TextField
          select
          label="Breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          fullWidth
          disabled={!breeds.length}
        >
          {breeds.map((breed) => (
            <MenuItem key={breed} value={breed}>
              {breed}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={1} sm={1}>
        <Button variant="contained" color="primary" onClick={handleSearch} fullWidth>
          Search
        </Button>
      </Grid>
      <Grid item xs={1} sm={1}>
        <Button variant="contained" color="secondary" onClick={handleReset} fullWidth>
          Reset
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchForm;
