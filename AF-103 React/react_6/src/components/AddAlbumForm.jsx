import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { postData } from '../request.js';

const AddAlbumForm = ({ open, handleClose, setData, data }) => {
  const [formData, setFormData] = useState({
    name: '',
    artistName: '',
    year: '',
    genre: '',
    albumCover: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const yearPattern = /^\d{4}$/;
      const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

      if (!yearPattern.test(formData.year)) {
        throw new Error('Year must be a 4-digit number.');
      }

      if (!urlPattern.test(formData.albumCover)) {
        throw new Error('Album cover must be a valid URL.');
      }

      const newAlbum = await postData(formData);
      setData([...data, newAlbum]);
      handleClose();
      window.location.reload()
    } catch (error) {
      console.error('Error adding album:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCloseModal = () => {
    setFormData({
      name: '',
      artistName: '',
      year: '',
      genre: '',
      albumCover: '',
    });
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="add-album-modal-title"
      aria-describedby="add-album-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Add Album
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            required
            label="Artist Name"
            name="artistName"
            value={formData.artistName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            required
            label="Year"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            required
            label="Genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            required
            label="Album Cover (URL)"
            name="albumCover"
            value={formData.albumCover}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2, mr: 2 }}>
            Add
          </Button>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleCloseModal}>
            Cancel
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddAlbumForm;
