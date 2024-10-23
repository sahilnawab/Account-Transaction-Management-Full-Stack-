
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import axios from 'axios';
      const Register = () => {
        const { handleSubmit, control,watch,formState:{errors} } = useForm();
        const password= watch("password")
       
        const onSubmit = (data) => {
            axios.post('http://localhost:8080/api/v1/auth/createuser', data, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            .then(response => {
                console.log("User Registered", response.data);
            })
            .catch(error => {
                console.log("error caught at the time of login", error);
            });
            alert("User Registered Successfully")
        }
    return (
    
        <div className="flex justify-center items-center h-screen">
        <div className="bg-white w-1/2 rounded-lg shadow-lg  p-6 ">
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <h2>User Details</h2>
                <hr />
            <div className='flex w-full mt-4'>
                <div className="flex-1 mb-4">
                    <Controller
                        name="firstName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField fullWidth {...field} label="First Name" variant="outlined"  />}
                    />
                </div>
                <div className="flex-1 mb-4 ml-5">
                    <Controller
                        name="lastName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField fullWidth {...field} label="Last Name" variant="outlined"  />}
                    />
                </div>
                </div>
                <div className="mb-4">
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                       
                        render={({ field }) => 
                        <TextField {...field} 
                        label="Email"
                         type="email" 
                         variant="outlined"
                         error={!!errors.password}                         
                         fullWidth 

                        />}
                    />
                </div>
                <div className="mb-4">
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                         rules={{ required: 'Password is required'}} 
                        render={({ field }) => <TextField {...field} 
                        label="Password" 
                        type="password" 
                        variant="outlined" 
                        error={!!errors.password}
                        helperText={errors.password? errors.password.message:""}
                        fullWidth />}
                    />
                </div>
                <div className="mb-4">
                    <Controller
                        name="confirmPassword"
                        control={control}
                        defaultValue=""
                        rules={{required:"Confirm password is required",
                            validate:value=>value===password || 'Password does not match'
                        }}
                        render={({ field }) => <TextField {...field} 
                        label="Re-Enter Password " 
                        type="password" 
                        variant="outlined" 
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
                        fullWidth />}
                    />
                </div>
                <div className="mb-4">
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Role</InputLabel>
                        <Controller
                            name="role"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Select {...field} label="Role" fullWidth>
                                    <MenuItem value="USER">USER</MenuItem>
                                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                                    <MenuItem value="MANAGER">MANAGER</MenuItem>
                                    <MenuItem value="EMPLOYEE">EMPLOYEE</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                </div>
                <div className='mb-4'>
               
                <h2>Account Details</h2>
                <hr/>
                </div>
            
                <div className="mb-4">
                    <Controller
                        name="accountNumber"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField {...field} label="Account Number" type="text" variant="outlined" fullWidth />}
                    />
                </div>
                <div className="mb-4">
                    <Controller
                        name="balance"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField {...field} label="Balance" type="number" variant="outlined" fullWidth />}
                    />
                </div>
                <div className="mb-4">
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Account Type</InputLabel>
                        <Controller
                            name="accountType"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Select {...field} label="Account Type" fullWidth>
                                    <MenuItem value="SAVINGS">SAVINGS</MenuItem>
                                    <MenuItem value="CURRENT">CURRENT</MenuItem>
                                    <MenuItem value="FIXED_DEPOSIT">FIXED_DEPOSIT</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                </div>
                <div className="mb-4">
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Register
                    </Button>
                </div>
            </Box>
        </div>
    </div>
    

    );
};

export default Register;