import React from 'react';
import Typography from '@mui/material/Typography';

const RepositoryDetails = ({ repository }) => {
  return (
    <div style={{textAlign: "center"}}>
      <Typography variant="h6">{repository.name}</Typography>
      <Typography variant="body1">{repository.description}</Typography>
      <Typography variant="body2">Stars: {repository.stargazers_count}</Typography>
      <Typography variant="body2">Forks: {repository.forks_count}</Typography>
      {/* Add more details as needed */}
    </div>
  );
};

export default RepositoryDetails;
