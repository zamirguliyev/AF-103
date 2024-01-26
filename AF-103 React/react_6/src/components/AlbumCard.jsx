import React, { useState } from 'react';
import { Card, CardContent, Typography, CardActions, Button, TextField, Box, Rating } from '@mui/material';
import CommentSection from './CommentSection.jsx';

const AlbumCard = ({ album, user, handleAddComment }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleCommentOpen = () => {
    setCommentOpen(true);
  };

  const handleCommentClose = () => {
    setCommentOpen(false);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== '' && rating !== 0 && user) {
      const newComment = {
        user: user.username,
        comment: comment,
        rating: rating
      };
      handleAddComment(album.id, newComment);
      setComment('');
      setRating(0);
    }
  };

  return (
    <Card>
      <CardActions>
        {user && !user.isAdmin && (
          <Button size="small" onClick={handleCommentOpen}>
            Add Comment
          </Button>
        )}
        <CommentSection comments={album.comments} />

        {commentOpen && (
          <Box>
            <TextField
              label="Add a comment"
              variant="outlined"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Rating
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            <Button onClick={handleCommentSubmit}>Submit</Button>
            <Button onClick={handleCommentClose}>Cancel</Button>
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default AlbumCard;
