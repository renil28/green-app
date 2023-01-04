//Import the Libaries and Packages Required
import React, { useState } from "react"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

export default function ListView() {

    //Variables for Getting Users from API
    const [users, setUsers] = React.useState([]);
    //Query is used for Search Filters
    const [query, setQuery] = useState("")
  
    React.useEffect(() => {
      fetchUsers()
    }, [1]);
  
    //Now let's create a function fetchUsers
    async function fetchUsers() {
      const response = await fetch('https://reqres.in/api/users?page=2')
      const json = await response.json();
      //Set the Users along with json data
      setUsers([...users, ...json.data]);
    }
  
  
    return (
        //Create a List for storing data using Material UI Library
        //Include Box and TextField for Search Purposes
        <List sx={{ width: '100%', maxWidth: 1500, bgcolor: 'background.paper'}}>
            <Box
              component="form"
              sx={{'& > :not(style)': { m: 1, width: '45ch' },}}
              noValidate
              autoComplete="off"
            >
                <TextField 
                    id="Search" 
                    label="Search Using First Name" 
                    variant="outlined" 
                    color="secondary" focused 
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
                      }}
                    onChange={event => setQuery(event.target.value)} />
            </Box>   
        { users.filter(post => {
                  if (query === '') {
                    return post;
                  } 
        
                  else if (post.first_name.toLowerCase().includes(query.toLowerCase())) {
                    return post;
                  }
              }).map(user => 
                //We filter based on first_names and hence we use map function to get the values
                //From the Dataset API
                <ListItem key ={user.id}> 
                    <ListItemText secondary={
                      <React.Fragment>
                        <Divider  color="secondary"></Divider>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                          ID : {user.id}
                          <br></br>
                          First Name : {user.first_name} 
                          <br></br>
                          Last Name : {user.last_name} 
                          <br></br>
                          Email : {user.email}
                          </Typography>
                        <Divider  color="secondary"></Divider>
                      </React.Fragment>
                     }>
                    </ListItemText>
                </ListItem>)}
              </List>
    );
  }