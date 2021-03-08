import React, { useEffect, useState } from "react"
import Header from "./Header";
import 'fontsource-roboto'
import { makeStyles, ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { orange, green } from "@material-ui/core/colors"
import Card from "./Card"
import Grid from '@material-ui/core/Grid';
import { ListGroup, ListGroupItem } from "reactstrap"
import EditPost from "./EditPost"
import {Route, Redirect} from "react-router-dom"

//Testing axios
import Axios from "axios"
//ends here




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


function Home() {


  //testing
  const [postData, setPostData] = useState([])


  const fetchDetails = async () => {
    //changed here
     const {data} = await Axios.get('https://jsonplaceholder.typicode.com/posts')
      console.log("logged got data: ", data);
      setPostData(data) 
      console.log("logged setted data: ", postData);
  }

  useEffect(() => {
      fetchDetails()
  },[])
  //ends here

  useEffect( () => {
    console.log("Data checking", postData)
    showPost()
 },
 [postData] //This is dependency and it will run only when data is changed
 ) 

 //todo
 const searchedResult = (searchedData) => {
   setPostData(searchedData)
 }


 //change here
 const deletePost = (post_id) =>{
  Axios.delete(`https://jsonplaceholder.typicode.com/posts/${post_id}`)
  .then(res => {
    const newData = postData.filter(post => post.id !== post_id);
    setPostData(newData);
  })
}

const editPost = (post_id) => {
  console.log("edit post is working and id is: ", post_id);
  return <Redirect to="/editPost" />
}
 
const showPost = () =>{
  return postData.map((data)=>(<Card detail={data} deletePost={deletePost} editPost={editPost}/>))
}

  return(
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header searchedResult={searchedResult} showSearchBar={true}/>
        <Grid     
          container 
          spacing={3}
          direction="row"
          justify="center"
        >
          {
            showPost()
          } 
        
        </Grid>
      </div>
    </ThemeProvider>
  )
}

export default Home;
