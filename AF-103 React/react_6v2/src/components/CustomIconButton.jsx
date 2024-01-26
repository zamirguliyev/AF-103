import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const CustomIconButton = ({ user, card, handleWishlist }) => {
  const isFavorited = user?.wishlistItems?.includes(card.id);

  return (
    <IconButton onClick={() => handleWishlist(card.id)}>
      <FavoriteIcon style={{ color: isFavorited ? 'red' : 'black' }} />
    </IconButton>
  );
};

export default CustomIconButton;
