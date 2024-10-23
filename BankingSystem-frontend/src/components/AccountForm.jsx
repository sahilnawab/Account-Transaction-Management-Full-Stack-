import { useForm, Controller } from "react-hook-form";
import {
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Box,
    CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createAccount } from "../store/accountSlice";
import { useNavigate } from "react-router-dom";

const AccountForm = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const loading = useSelector((state) => state.account.loading);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        if (token) {
            const userData = {
                token: token,
                data,
            };

            dispatch(createAccount(userData)).then((response) => {
                if (response) {
                    console.log(response);

                    alert("Account Request Has been sent");
                    navigate("/dashboard");
                }
            });
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
                maxWidth: 400,
                margin: "auto",
                mt: 4,
            }}
        >
            <FormControl variant="outlined" fullWidth error={!!errors.accountNumber}>
                <Controller
                    name="accountNumber"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Account Number is required" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Account Number"
                            variant="outlined"
                            fullWidth
                            error={!!errors.accountNumber}
                            helperText={
                                errors.accountNumber ? errors.accountNumber.message : ""
                            }
                        />
                    )}
                />
            </FormControl>
            <FormControl variant="outlined" fullWidth error={!!errors.accountType}>
                <InputLabel>Account Type</InputLabel>
                <Controller
                    name="accountType"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Account Type is required" }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label="Account Type"
                            fullWidth
                            error={!!errors.accountType}
                        >
                            <MenuItem value="SAVINGS">SAVINGS</MenuItem>
                            <MenuItem value="CURRENT">CURRENT</MenuItem>
                            <MenuItem value="FIXED_DEPOSIT">FIXED_DEPOSIT</MenuItem>
                        </Select>
                    )}
                />
                {errors.accountType && <p>{errors.accountType.message}</p>}
            </FormControl>
            <FormControl variant="outlined" fullWidth error={!!errors.balance}>
                <Controller
                    name="balance"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Balance is required", min: 0 }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Balance"
                            type="number"
                            variant="outlined"
                            fullWidth
                            error={!!errors.balance}
                            helperText={errors.balance ? errors.balance.message : ""}
                        />
                    )}
                />
            </FormControl>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
        </Box>
    );
};

export default AccountForm;
