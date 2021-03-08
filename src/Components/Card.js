import React, { useEffect, useState } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popover from '@material-ui/core/Popover';
import { Details, ThumbDown } from '@material-ui/icons';
import {Link} from 'react-router-dom'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import Axios from "axios"
import EditPost from './EditPost';





const useStyles = makeStyles({
  root: {
    minWidth: 250,
    maxWidth: 800,
    margin: 25,
    textAlign: 'left'
  },
  title: {
    fontSize: 30,
  },
  body: {
      textAlign: 'left'
  },
  button: {
    color: 'rgba(0, 0, 0, 0.87)',
    textDecoration: 'none',
    padding: "6px 16px",
    fontFamily:` "Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: 500,
    lineHeight: 1.75,
    borderRadius: "4px",
    letterSpacing: "0.02857em",
    textTransform: "uppercase",
    padding: "6px 16px",
    fontSize: "0.875rem",
    minWidth: "64px",
    boxSizing: "border-box"
  },
  
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const detail = props.detail

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [likeButtonColor, setLikeButtonColor] = useState("#424242")
  const [dislikeButtonColor, setDislikeButtonColor] = useState("#424242")

  const likeChanger = () =>{
    likeButtonColor=="#424242"?setLikeButtonColor("secondary"):setLikeButtonColor("#424242")
    setDislikeButtonColor("#424242")
  }
  const dislikeChanger = () => {
    dislikeButtonColor=="#424242"?setDislikeButtonColor("primary"):setDislikeButtonColor("#424242")
    setLikeButtonColor("#424242")
  }

  return (
        <Grid item md={8} sm={12} xs={12}>
        <Card className={classes.root}>
            <CardHeader
                action={
                <div>
                    <IconButton aria-label="settings" onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                        }}
                        >
                        <span >
                            <Link className={classes.button} to={`/editPost/${detail.id}`}>Edit</Link>
                       </span>

                        <Button onClick = {() => {
                          props.deletePost(detail.id)
                        }}>
                            Delete
                        </Button>
                    </Popover>
                </div>
                }
                title={detail.title}
            />
            <CardContent>
                <Typography variant="body2" className={classes.body} component="p">
                    {detail.body}
                </Typography>
            </CardContent>
            <CardActions>
        <Button onClick={likeChanger} size="small" color={likeButtonColor}>
          <ThumbUpIcon />
        </Button>
        <Button onClick={dislikeChanger} size="small"  color={dislikeButtonColor}>
          <ThumbDownIcon />
        </Button>
      </CardActions>
        </Card>
    </Grid>
  );
}