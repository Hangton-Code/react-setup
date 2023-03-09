import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import EmailIcon from "@mui/icons-material/Email";
import useAxios from "../../utils/useAxios";
import { toast } from "react-hot-toast";

function EVPage() {
  const [searchParams] = useSearchParams();
  const veToken = searchParams.get("veToken") as string;

  const { email } = jwt_decode(veToken) as {
    email: string;
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        paddingTop: 2,
        paddingX: 2,
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h4" fontWeight={700}>
        Email Verification
      </Typography>

      <Button
        variant="outlined"
        sx={{
          padding: 0.25,
          width: "fit-content",
          pointerEvents: "none",
        }}
        color="secondary"
      >
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            alignItems: "center",
            padding: 1,
            paddingX: 2,
            borderRadius: 2,
            width: "fit-content",
          }}
        >
          <EmailIcon fontSize="medium" />

          <Typography
            fontWeight={500}
            sx={{
              paddingLeft: 1.5,
            }}
            textTransform="lowercase"
            borderLeft="1px solid"
            borderColor="border"
          >
            {email}
          </Typography>
        </Box>
      </Button>

      <Box>
        <Typography>
          You are required to verify{" "}
          <Typography component="span" fontWeight={600} fontStyle="italic">
            your email address
          </Typography>{" "}
          in order to prove your ownership of that email.
        </Typography>

        <Typography fontWeight={500}>
          Please check out{" "}
          <Typography
            color="primary.main"
            component="span"
            textTransform="uppercase"
            fontWeight={600}
            fontStyle="italic"
          >
            your email inbox
          </Typography>{" "}
          and click on{" "}
          <Typography
            color="primary.main"
            component="span"
            textTransform="uppercase"
            fontWeight={600}
            fontStyle="italic"
          >
            the link provided
          </Typography>{" "}
          on the email we have sent to you so to verify your email
        </Typography>
      </Box>

      <ResendVEButton veToken={veToken} />
    </Container>
  );
}

type ResendVEButtonProp = {
  veToken: string;
};

function ResendVEButton({ veToken }: ResendVEButtonProp) {
  const axios = useAxios();

  const resend = () => {
    const res = axios({
      url: "/auth/verification_email",
      method: "POST",
      data: {
        veToken,
      },
    });
    toast.promise(res, {
      loading: "Pending",
      success: "Succeeded",
      error: "Failed",
    });
  };

  return (
    <Button
      color="secondary"
      sx={{
        alignSelf: "center",
        mt: 2,
      }}
      size="large"
      variant="contained"
      onClick={resend}
    >
      Resend Verification Email
    </Button>
  );
}

export default EVPage;
