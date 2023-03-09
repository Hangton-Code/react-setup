const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN as string;
const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID as string;
const AUTH0_REDIRECT_URI = process.env.REACT_APP_AUTH0_REDIRECT_URI as string;

const getAuth0LogInUrl = () => {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: AUTH0_CLIENT_ID,
    redirect_uri: AUTH0_REDIRECT_URI,
    scope: "profile email openid",
    prompt: "login", // to require user to field in the form every time login (dismiss the SSO)
  }).toString();

  const url = `https://${AUTH0_DOMAIN}/authorize?${params}`;

  return url;
};
export default getAuth0LogInUrl;
