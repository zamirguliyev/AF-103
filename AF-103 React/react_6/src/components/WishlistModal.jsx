import { useState } from 'react';
import { Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Box } from '@mui/material';


const WishlistModal = ({ user, data }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderWishlist = () => {
    if (!user || !user.wishlistItems) return null;

    const wishlistData = data.filter((card) => user.wishlistItems.includes(card.id));

    return (
        <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, 
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
<TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Album Name</TableCell>
              <TableCell>Artist Name</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Genre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wishlistData.map((card) => (
              <TableRow key={card.id}>
                <TableCell>{card.name}</TableCell>
                <TableCell>{card.artistName}</TableCell>
                <TableCell>{card.year}</TableCell>
                <TableCell>{card.genre}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      </Box>
      
    );
  };

  return (
    <>
      <Button color="inherit" onClick={handleOpen}>
        Wishlist {user && user.wishlistItems.length}
      </Button>
      <Modal open={open} onClose={handleClose}>
        {renderWishlist()}
      </Modal>
    </>
  );
};

export default WishlistModal;
