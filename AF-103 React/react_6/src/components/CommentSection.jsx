import React from 'react';
import { Typography, Box } from '@mui/material';

const CommentSection = ({ comments }) => {
  return (
    <Box>
      <Typography variant="h6">Comments</Typography>
      {comments && comments.length > 0 ? (
        comments.map((comment, index) => (
          <Box key={index}>
            <Typography>{comment.user}</Typography>
            <Typography>{comment.comment}</Typography>
            <Typography>Rating: {comment.rating}</Typography>
          </Box>
        ))
      ) : (
        <Typography>No comments yet</Typography>
      )}
    </Box>
  );
};

export default CommentSection;
