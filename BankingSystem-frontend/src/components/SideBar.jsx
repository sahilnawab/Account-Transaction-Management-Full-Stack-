import { Avatar, Box, Divider, Drawer ,IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';


function SideBar({children,fullName}) {
  const [open, setOpen] = useState(false);

  const primaryDrawerList = [
    { name: 'Accounts', icon: <AccountBalanceIcon />,path:'/accounts' },
    { name: 'Transactions', icon: <SwapHorizIcon /> ,path:'/transactions'},
    { name: 'New Account', icon: <AccountBalanceWalletIcon /> ,path:'/new-account'},
    { name: 'New Transaction', icon: <AddCircleIcon /> ,path:'/new-transaction'}]

   

const secondaryDrawerList = [
  { name: 'Profile', icon: <PersonIcon />,path:"/profile"  },
  { name: 'Contact Us', icon: <ContactMailIcon />,path:"/contact us" },
  { name: 'Settings', icon: <SettingsIcon />,path:"/setting" },
  { name: 'Logout', icon: <ExitToAppIcon />,path:"/logout" }
];




  return (
    <div>
      <IconButton size='medium' edge='start' color='inherit' aria-label='logo' onClick={()=>setOpen(true)}>
        <MenuIcon></MenuIcon>
      </IconButton>
      <Drawer anchor='left' open={open} onClose={()=>{setOpen(false);}} >
        <Box p={2} width='250px' textAlign='center'>
         
         <div className='flex justify-start align-top m-3 p-3' >
         <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
         <h2 className='ml-3 p-2'>{fullName}</h2>
         </div>


          <List>
        {primaryDrawerList.map((text,index) => (
          <ListItem key={index} disablePadding >
          <Link  to={text.path} style={{textDecoration:'none',color:'black'}} >
            <ListItemButton>
              <ListItemIcon>
                {text.icon}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
      {secondaryDrawerList.map((text) => (
          <ListItem key={text.name} disablePadding>
              <Link to={text.path} style={{textDecoration:'none',color:'black'}}>
            <ListItemButton>
              <ListItemIcon>
                {text.icon}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

        </Box>
      </Drawer>
    </div>
  )
}

export default SideBar