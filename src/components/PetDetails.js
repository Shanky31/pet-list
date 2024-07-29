import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/pets?id=${id}`)
      .then(response => setPet(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!pet) return <div>Loading...</div>;

  return <div>{pet.name}</div>;
};

export default PetDetails;
