import React, {useEffect, useState} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { fade, makeStyles } from '@material-ui/core/styles';
import { ButtonGroup, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import CreatePost from "./CreatePost"
import {Link} from 'react-router-dom'
import Axios from 'axios'
import Card from "./Card"

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      color:"green",
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    linkedButton:{
        color: 'inherit',
        textDecoration: 'none'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));




function Header(props) {
    const classes = useStyles()
    const [query, setQuery] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [rightQuery, setRightQuery] = useState([true])
  
    
const search = async val => {
  //change here
  await Axios.get(
    `https://jsonplaceholder.typicode.com/posts?q=${val}`
  ).then((res) => {
    console.log("Search data: ", res.data);
    setSearchResult(res.data)
  }).catch((err)=>{
    if(err){
      setRightQuery(false)
    }
  })
  
}

useEffect(() => {
  if(rightQuery && props.showSearchBar){
    console.log("got search result");
    props.searchedResult(searchResult)
    
  }
  
},[searchResult])

const handleChange = name => event => {
      const value = event.target.value
      setQuery(value)
      console.log("new query: ",query);
      search(query)
   }

function searchData(event){
  event.preventDefault();
  return console.log("working");
}

// const SearchBar = () => {
//   return(
//   </div>)
// }

    return(
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6">
                <Link className={classes.linkedButton} to="/">Blog-Post</Link>
            </Typography>
            {
              props.showSearchBar?
              <div className={classes.search}>
              <Button type="submit" value="Submit" startIcon={<SearchIcon/>} onClick={searchData} className={classes.searchIcon} />
                <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    name="searchBar"
                    value={query}
                    onChange={handleChange("searchBar")}
                />
                </div>
              :""      
            }
            {
              props.showSearchBar?<Link className={classes.linkedButton} to="/createNewPost">Create Post</Link>:""
            }
        </Toolbar>
  </AppBar> )
}

export default Header