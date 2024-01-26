import React, { useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import EditData from "./EditData";
import AlbumCard from "./AlbumCard";

const AlbumGrid = ({
  filteredData,
  user,
  canEditAndDelete,
  handleDeleteAlbum,
  handleOpenEditModal,
  handleCloseEditModal,
  setData,
  openEditModal,
  selectedCard,
  handleWishlist,
  handleFilter,
}) => {
  useEffect(() => {
    if (openEditModal) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [openEditModal]);

  const renderAlbums = () => {
    return filteredData.map((card) => (
      <Grid item key={card.id} xs={12} sm={6} md={4}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardMedia
            component="div"
            sx={{ pt: "56.25%" }}
            image={card.albumCover}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {card.name}
            </Typography>
            <Typography>
              <span>
                Artist Name: {card.artistName} Year: {card.year}
              </span>
            </Typography>
            <Typography>{card.genre}</Typography>
          </CardContent>
          <CardActions>
            {user && canEditAndDelete(user) ? (
              <>
                <Button size="small" onClick={() => handleDeleteAlbum(card.id)}>
                  Delete
                </Button>
                <Button size="small" onClick={() => handleOpenEditModal(card)}>
                  Edit
                </Button>
                <EditData
                  setData={setData}
                  openEditModal={openEditModal}
                  handleCloseEditModal={handleCloseEditModal}
                  card={selectedCard}
                />
              </>
            ) : (
              user && (
                <>
                  <CustomIconButton
                    user={user}
                    card={card}
                    handleWishlist={handleWishlist}
                  />
                  {/* <AlbumCard
                    key={album.id}
                    album={album}
                    user={user}
                    isAdmin={user ? user.isAdmin : false}
                    comments={album.comments}
                    handleAddComment={handleAddComment}
                  /> */}
                </>
              )
            )}
          </CardActions>
        </Card>
      </Grid>
    ));
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginBottom={2}
        >
          <TextField
            label="Search by name"
            variant="outlined"
            onChange={(e) => handleFilter(e.target.value, null, null)}
          />
          <TextField
            label="Search by genre"
            variant="outlined"
            onChange={(e) => handleFilter(null, e.target.value, null)}
          />
          <Button
            variant="contained"
            onClick={() => handleFilter(null, null, true)}
          >
            Sort by Year
          </Button>
        </Box>
      </Grid>
      {renderAlbums()}
    </Grid>
  );
};

export default AlbumGrid;
