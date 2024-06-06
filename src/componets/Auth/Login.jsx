import React from 'react'
import LandingPage from "./LandingPage";
import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { isLoading, error } = useAuth0();
  return (
    <main className="main">
      <h1>Auth0 User Login App </h1>
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading .....</p>}
      {!error && !isLoading && (
        <>
          <LandingPage />
          <LoginButton />
        </>
      )}
    </main>
  );
}

export default Login