import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Header from './Header';
import Grid from '@material-ui/core/Grid';

import { makeStyles, ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { orange, green } from "@material-ui/core/colors"
import { Button } from '@material-ui/core';

import Axios from 'axios'

const theme = createMuiTheme({
    palette: {
      primary: {
        main: orange[400]
      },
      secondary: {
        main: green[400]
      }
    }
  })

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    grid: {margin:50},
    titleForm: {
        width:500,
        marginBottom:"1rem"
    },
    contentFrom: {
        height: "500px"
    },
    button: {
        marginTop: "1rem",
        padding: 5,
        width: 100,
        backgroundColor:"green"
    }
  }));

  export default function CreatePost() {
    const classes = useStyles();
    
    const [ values, setValues] =  useState({
      userId: "1",
      title: "",
      body: "",
      formData:""
    })


    const {title, body, formData} = values


    const preload = () => {
     
          setValues({...values, formData: new FormData()})
        
   }


   useEffect(()=>{
    preload()
   }, [])


    const handleChange = name => event => {
      const value = event.target.value
      formData.set(name, value)
      setValues({...values, [name]: value})
      console.log("new values: ",values);
   }


   function validate(){
    let input = values;
    let errors = {};
    let isValid = true;

    if (!input["title"]) {
      isValid = false;
      errors["title"] = "Please enter your title.";
    }

    if (!input["body"]) {
      isValid = false;
      errors["body"] = "Please enter your body.";
    }


    return isValid;
}

function handleSubmit(event) {
  event.preventDefault();

  if(validate()){

      const posts = values;

      Axios.post(`https://jsonplaceholder.typicode.com/posts/`, posts)
      .then(res => {
        console.log('res');
        console.log(res);
        console.log(res.data);

        let input = {};
        input["title"] = "";
        input["body"] = "";
        setValues({title:"", body:""});

        alert('Post created successfully.');

      })
 
  }
}


    return (
            <ThemeProvider theme={theme}>
                <Header />
                <Grid
                    container 
                    spacing={3}
                    direction="row"
                    justify="center"
                    className={classes.grid}
                >
                <form >
                    <Grid container 
                    spacing={3}
                    direction="column"
                    justify="center"
                    >
                     <TextField required id="standard-required" 
                                variant = "outlined"  
                                className={classes.titleForm} 
                                label="Title" 
                                placeholder="title"
                                name="title" 
                                value={title}
                                onChange={handleChange("title")}
                                />
                     
                     <TextField
                      id="outlined-multiline-static"
                      label="Content"
                      multiline
                      rows={4}
                      placeholder="Start writing..."
                      variant="outlined"
                      className={classes.contentForm}
                      name="body"
                      value={body}
                      onChange={handleChange("body")}
                    />
                    <Button type="submit" onClick={handleSubmit} value="Submit" className={classes.button}>Submit</Button>                   
                     </Grid>
                </form>
                </Grid>
            </ThemeProvider>
        )

  }