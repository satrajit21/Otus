import { Link as RouterLink } from "react-router-dom";
// sections
import { Stack, Typography} from "@mui/material";
// import AuthSocial from "../../sections/auth/AuthSocial";
// import Login from "../../sections/auth/LoginForm";
import VerifyForm from "../../Sections/auth/VerifyForm";

// ----------------------------------------------------------------------

export default function Verify() {
    return (
        <>
            <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
                <Typography variant="h4">Please Verify OTP</Typography>

                <Stack direction="row" spacing={0.5}>
                    <Typography variant="body2">
                        Sent to your email ()
                    </Typography>
                </Stack>
            </Stack>
            {/* Form */}
            <VerifyForm />
        </>
    );
}
