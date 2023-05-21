import React, { useState } from 'react';
import "./App.css"
import { getUser, getUserRepositories } from './services/github-api';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import RepositoryDetails from './RepositoryDetails';

const UserSearch = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username) return;

    try {
      const userData = await getUser(username);
      setUser(userData);

      const userRepos = await getUserRepositories(username);
      setRepositories(userRepos);
    } catch (error) {
      console.error('Error:', error);
      setUser(null);
      setRepositories([]);
    }
  };

  return (
    <Box sx={{ maxWidth: 700, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        GitHub User Finder
      </Typography>

      <Box component="form" onSubmit={handleSearch} sx={{ mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={9}>
            <TextField
              label="Enter a GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button type="submit" variant="contained" color="primary">
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>

      {user && (
        <div className='firstDiv'>
        <Paper elevation={3} sx={{ mt: 4, p: 2 }} >
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Avatar
                src={user.avatar_url}
                alt="User Avatar"
                sx={{ width: 200, height: 200 }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {user.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {user.bio}
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ mb: 1 }}>
                Followers: {user.followers}
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ mb: 1 }}>
                Following: {user.following}
              </Typography>
              <Typography variant="body2">
                Public Repositories: {user.public_repos}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        </div>
      )}

      {repositories.length > 0 && (
        <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
          <Typography variant="h5" sx={{ mb: 4, textAlign: "center" }}>
            Repository Details
          </Typography>
          {repositories.map((repo) => (
            <RepositoryDetails key={repo.id} repository={repo} />
          ))}
        </Paper>
      )}
    </Box>
  );
};

export default UserSearch;
