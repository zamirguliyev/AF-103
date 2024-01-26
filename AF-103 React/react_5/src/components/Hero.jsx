import * as React from "react";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import axios from "axios";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getAllData, deleteData } from "../request.js";
import SignIn from "./SingIn";
import Register from "./Register";
import EditData from "./EditData.jsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

let API_URL = "https://6559d2736981238d054cddea.mockapi.io";

export default function Hero() {
  const [open, setOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleOpenEditModal = (card) => {
    setSelectedCard(card);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedCard(null);
  };

  useEffect(() => {
    getAllData().then((res) => {
      setData(res);
    },[]);

    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleWishlist = async (cardId) => {
    if (!user || !user.isAdmin) {
      const cardIndex = data.findIndex((item) => item.id === cardId);
      const cardExistsInData = cardIndex !== -1;
      const isCardInUserWishlist = user.wishlistItems.includes(cardId);
  
      let updatedWishlist;
      if (isCardInUserWishlist) {
        updatedWishlist = user.wishlistItems.filter((item) => item !== cardId);
      } else {
        updatedWishlist = [...user.wishlistItems, cardId];
      }
      
      const updatedUser = {
        ...user,
        wishlistItems: updatedWishlist,
      };
  
      updateUserWishlist(user.id, updatedWishlist);
  
      if (cardExistsInData) {
        const updatedData = [...data];
        updatedData[cardIndex] = {
          ...updatedData[cardIndex],
          wishlistItems: isCardInUserWishlist ? null : cardId,
        };
        setData(updatedData);
  
        if (isCardInUserWishlist) {
          removeFromLocalStorage(cardId);
          removeFromServer(user.id, cardId);
          alert("Removed from wishlist");
        } else {
          alert("Added to wishlist");
        }
      }
  
      setUser(updatedUser);
    }
  };
  

  const removeFromLocalStorage = (cardId) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const updatedWishlist = storedUser.wishlistItems.filter(
        (item) => item !== cardId
      );
      storedUser.wishlistItems = updatedWishlist;
      localStorage.setItem("user", JSON.stringify(storedUser));
    } catch (error) {
      console.error("Error removing from local storage:", error);
    }
  };

  const removeFromServer = async (userId, cardId) => {
    try {
      const user = await axios.get(`${API_URL}/users/${userId}`);
      const updatedWishlist = user.data.wishlistItems.filter(
        (item) => item !== cardId
      );
      user.data.wishlistItems = updatedWishlist;
      await axios.put(`${API_URL}/users/${userId}`, user.data);
    } catch (error) {
      console.error("Error removing from server:", error);
    }
  };

  const updateUserWishlist = async (userId, wishlistItems) => {
    try {
      const user = await axios.get(`${API_URL}/users/${userId}`);
      user.data.wishlistItems = wishlistItems;
      await axios.put(`${API_URL}/users/${userId}`, user.data);
      localStorage.setItem("user", JSON.stringify(user.data));
    } catch (error) {
      console.error("Wishlist update error:", error);
    }
  };

  const canEditAndDelete = (user) => {
    return user && user.isAdmin;
  };

  const handleDeleteAlbum = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    
    if (confirmDelete) {
      try {
        await deleteData(id);
        setData((prevData) => prevData.filter((product) => product.id !== id));
      } catch (error) {
        console.error(error);
        alert("try again && refresh");
      }
    }
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Zamir App
            </Typography>
            {user ? (
              <>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
                <Button color="inherit">
                  Wishlist {user && user.wishlistItems.length}
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={handleOpen}>
                  Login
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <SignIn setUser={setUser} setOpen={setOpen} />
                  </Box>
                </Modal>
                <Button color="inherit" onClick={handleOpenRegister}>
                  Register
                </Button>
                <Modal
                  open={openRegister}
                  onClose={handleCloseRegister}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Register
                      setUser={setUser}
                      setOpenRegister={setOpenRegister}
                    />
                  </Box>
                </Modal>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Album layout
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {data.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: "56.25%",
                    }}
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
                        <Button size="small" onClick={handleDeleteAlbum}>
                          Delete
                        </Button>
                        <Button
                          size="small"
                          onClick={() => handleOpenEditModal(card)}
                        >
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
                        <IconButton onClick={() => handleWishlist(card.id)}>
                          <FavoriteIcon
                            color={
                              user.wishlistItems.includes(card.id)
                                ? "red"
                                : "black"
                            }
                          />
                        </IconButton>
                      )
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
    </>
  );
}
