import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SideBar from './SideBar';
import { Box, Button, Card, CardActions, CardContent, CircularProgress, Fab, IconButton, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { deleteAccount, getAccountsOfUser } from '../store/accountSlice';
import { getUser } from '../store/userSlice';
import DeleteIcon from '@mui/icons-material/Delete';

function Dashboard() {
  const [showCard, setShowCard] = useState(false);
  const [singleAccount, setSingleAccount] = useState({});
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  

  const token = useSelector((state) => state.auth.token);
  const accountData = useSelector((state) => state.account.account);
  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      console.log('token', token);
      dispatch(getAccountsOfUser(token));
      dispatch(getUser(token));
      console.log('userData', userData);
      setLoading(false);

    }
  }, [token, navigate]);

  const handleShowCard = (event) => {
   
    const accountId = parseInt(event.target.value);  // Ensure value is an integer
    const singleAccount = accountData.find((eachAccount) => eachAccount.accountId === accountId);
    console.log('singleAccount', singleAccount);
    setSingleAccount(singleAccount);
    setShowCard(true);
  };

  const handleCloseCard = () => {
    setShowCard(false);
  };

  const handleCopy = () => {
    console.log('Copied');

  }

  const handleDelete = (event) => {
    setDeleteLoading(true);
    const accountId=event.target.value;
    console.log("account id is ,",accountId);
    const userData={
      token,
      accountId
  }
    dispatch(deleteAccount(userData))
   
    .then((response)=>{
      console.log("response in dashboard",response);
      navigate("/dashboard")
      alert("deleted sucusessfully")})
      .catch(error=>console.log(error))
      .finally(setDeleteLoading(false))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
      <Box sx={{ display: 'flex' }}>
      <CircularProgress />
       </Box>
      </div>
    );
  }

else
  return (

    <>
  <div className="flex p-3  space-x-4  bg-slate-100">
        <div>
          <SideBar fullName={userData.fullName} />
          </div>
          <h1 className='mt-2 font-bold from-neutral-600 font-serif'>Welcome To Your Dashborad {userData.fullName}</h1>
        </div>
      <div className={`flex flex-wrap min-h-full bg-slate-50 ${showCard ? "blur-sm " : ""} `}>
      
        {accountData.map((account) => (
          <div key={account.accountId}  >
            <Box padding='10px' className="w-auto h-auto">
              <Card variant="elevation" className='p-7'>
               
                <TextField variant='standard' 
                value={account.accountNumber}
               label="Account Number"
               InputProps={{
                inputProps: { readOnly: true },
                disabled:true
               }}        
               >
        
                </TextField>
               
                <hr />
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                  Account Type : {account.accountType}
                </Typography>

                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                  Balance : {account.balance}
                </Typography>


                <Button size="medium" variant='outlined' value={account.accountId} onClick={handleShowCard}>Get More Details</Button>

              </Card>
            </Box>
          </div>
        ))}
      </div>
      {showCard && (
        <Box

          sx={{
            position: 'absolute',
            top: '70%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "auto",
            height: "auto",
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: 3,
            zIndex: 999,
          }}
        >
          <IconButton size="small" onClick={handleCloseCard} style={{ marginLeft: 'auto' }}>
            <CloseIcon />
          </IconButton>
          <Card variant="elevation">
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Account Details
              </Typography>
              <TextField
                label="Account Number"
                value={singleAccount.accountNumber}
                InputProps={{ readOnly: true }}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Account Type"
                value={singleAccount.accountType}
                InputProps={{ readOnly: true }}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Account Balance"
                value={singleAccount.balance}
                InputProps={{ readOnly: true }}
                variant="outlined"
                fullWidth
                margin="normal"
              />
               <TextField
                label="Account Opened On"
                value={singleAccount.openDate}
                InputProps={{ readOnly: true }}
                variant="outlined"
                fullWidth
                margin="normal"
              />

              <TextField
                label="User Full Name"
                value={userData.fullName}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="User Type"
                value={userData.userType}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="User Role"
                value={userData.role}
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={handleCopy}>
                Copy
              </Button> 
              {deleteLoading ? 
              <Fab sx={{mr:'10px'}} variant='extended' size='medium' className='bg-slate-950' >
              <CircularProgress size={24} />
              </Fab> : <Fab sx={{mr:'10px'}} variant='extended' size='medium' value={singleAccount.accountId} onClick={handleDelete}>
            <DeleteIcon/>
           Delete Account
        </Fab>}
             

            </CardActions>
          </Card>
        </Box>

      )}










    </>

  );
}

export default Dashboard