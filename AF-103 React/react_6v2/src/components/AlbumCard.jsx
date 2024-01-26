import React, { useState, useEffect } from 'react';
import { Card, CardActions, Button, TextField, Box, Rating, Typography } from '@mui/material';
import { getAllData, editData } from '../request.js';

const AlbumCard = ({ album, user, isAdmin }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const addComment = async () => {
    try {
      if (!user) {
        console.error('Please sign in to add a comment');
        return;
      }

      if (comment.trim() === '' || rating === 0) {
        console.error('Please fill in all fields');
        return;
      }

      const newComment = {
        user: user.username,
        comment: comment,
        rating: rating,
      };

      const updatedComments = [...comments, newComment];
      setComments(updatedComments);

      // Reset form fields after submitting comment
      setComment('');
      setRating(0);

      await updateCommentsInData(updatedComments);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const updateCommentsInData = async (updatedComments) => {
    try {
      await editData(album.id, { ...album, comments: updatedComments });
    } catch (error) {
      console.error('Error updating comments in data:', error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const albumData = await getAllData(album.id);
        if (albumData && albumData.comments) {
          setComments(albumData.comments);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [album.id]);

  return (
    <Card>
      <CardActions>
        {user && !isAdmin && (
          <Box display="flex" flexDirection="column">
            <TextField
              label="Add a comment"
              variant="outlined"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Rating
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
            />
            <Button onClick={addComment}>Submit</Button>
          </Box>
        )}
      </CardActions>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <Box key={index} mt={2} border={1} p={2}>
            <Typography variant="subtitle1">User: {comment.user}</Typography>
            <Typography variant="body1">Comment: {comment.comment}</Typography>
            <Typography variant="body2">Rating: {comment.rating}</Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body1">No comments yet</Typography>
      )}
    </Card>
  );
};

export default AlbumCard;
