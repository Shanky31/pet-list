import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Grid, Button } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const PetCard = ({ pet }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const handleSeeMore = () => {
    setShowFullDescription(!showFullDescription);
  };
   const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? pet.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === pet.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Card>
      <div style={{ position: 'relative' }}>
        <IconButton
          onClick={handlePreviousImage}
          style={{ position: 'absolute', top: '50%', left: 0, zIndex: 1 }}
        >
          <ArrowBack />
        </IconButton>
        <CardMedia
          component="img"
          height="300"
          image={pet.images[currentImageIndex]}
          alt={pet.name}
        />
        <IconButton
          onClick={handleNextImage}
          style={{ position: 'absolute', top: '50%', right: 0, zIndex: 1 }}
        >
          <ArrowForward />
        </IconButton>
      </div>
      <CardContent>
        <Typography variant="h5" component="div">
          {pet.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
        {capitalizeFirstLetter(pet.animal)} - {capitalizeFirstLetter(pet.breed)}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {pet.city}, {pet.state}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {showFullDescription ? pet.description : `${pet.description.slice(0, 100)}...`}
          {pet.description.length > 100 && (
            <Button size="small" color="primary" onClick={handleSeeMore}>
              {showFullDescription ? 'See less' : 'See more'}
            </Button>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PetCard;
