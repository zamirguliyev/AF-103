import { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { editData } from '../request.js';

export default function EditData({ card, openEditModal, handleCloseEditModal, setData }) {
  const [formData, setFormData] = useState({
    name: '',
    artistName: '',
    year: '',
    genre: '',
  });

  useEffect(() => {
    if (card) {
      setFormData({
        name: card.name,
        artistName: card.artistName,
        year: card.year,
        genre: card.genre,
      });
    }
  }, [card]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await editData(card.id, formData);
      handleCloseEditModal();
      setData((prevData) =>
        prevData.map((item) =>
          item.id === card.id ? { ...item, ...formData } : item
        )
      );
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <Modal
      open={openEditModal}
      onClose={handleCloseEditModal}
      BackdropProps={{
        sx: { backgroundColor: 'white' }
      }}
    >
      <Box>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Artist Name"
          name="artistName"
          value={formData.artistName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          fullWidth
        />
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outlined" onClick={handleCloseEditModal}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
}
