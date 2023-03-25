import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function BlogPost(props) {
  return (
    <Grid item xs={12} sm={6} md={4}>
    <Card style={{ maxWidth: "100%" }}>
      <CardActionArea>
        <CardMedia
          style={{ height: 240 }}
          image={props.source}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ display: "flex", margin: "0 10px", justifyContent: "space-between" }}>
        <Box style={{ display: "flex" }}>
          <AccountCircleIcon/>
          <Box ml={2}>
            <Typography variant="subtitle2" component="p">
              {props.name}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" component="p">
              Mar 25, 2023
            </Typography>
          </Box>
        </Box>
        <Box>
          <BookmarkBorderIcon />
        </Box>
      </CardActions>
    </Card>
  </Grid>
  )
}

export default BlogPost