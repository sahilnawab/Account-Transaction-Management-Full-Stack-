import { Box, DialogContentText, Fab, Paper } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';import AlertDialog from './AlertDialoge';
function Logout() {
  const dispatch = useDispatch();
  const navigate =useNavigate();


 const [alertBox,showAlertBox]=useState(false);
  
  const handleYes=()=>{
    dispatch(logout());
    navigate("/login");
  }
  const handleNo=()=>{
   showAlertBox(true);
  }
  
  
    
  
  if(alertBox){
    return (
        <div className='absolute top-1/2 left-1/2 '>
        <AlertDialog/>
        </div>
    )
  }
  return (
      <Box
    sx={{
      display:'flex',
      justifyContent:'center',
      alignContent:'center',
    
    }}
  >
  



    <Paper elevation={3} sx={{ width:'800px',borderRadius:'20px' ,p:'20px'}} >
        <h2 className='text-center text-4xl font-bold' >
           Logout
        </h2>
        <DialogContentText className='text-center m-7'>
          Are you Sure?
        </DialogContentText>
        <div className='text-center m-5 p-5'>
        <Fab sx={{mr:'15px'}} variant='extended' size='large' onClick={handleYes}>
            <CheckIcon/>
           Yes
        </Fab>
        <Fab variant='extended' size='large' onClick={handleNo}>
            <CloseIcon/>
           No
        </Fab>
        </div>
    </Paper>
  </Box>
  
  )
}

export default Logout