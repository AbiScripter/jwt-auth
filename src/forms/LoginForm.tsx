import { FormEvent, useEffect, useRef, useState } from "react";
//!https://dummyjson.com/users only users we can fetch the data

const LoginForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  type loginProps = {
    username: string;
    password: string;
  };

  const login = async ({ username, password }: loginProps) => {
    console.log(username, password);
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: `michaelw`,
          password: `michaelwpass`,
          expiresInMins: 1,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.accessToken && data.refreshToken) {
        console.log(data.accessToken, data.refreshToken);
        setToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const currentRefreshToken = localStorage.getItem("refreshToken");
      if (!currentRefreshToken) {
        console.log("No refresh token available");
        return;
      }

      const response = await fetch("https://dummyjson.com/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: currentRefreshToken }),
      });

      const data = await response.json();
      console.log("New token received:", data);

      if (data.accessToken) {
        setToken(data.accessToken);
        localStorage.setItem("token", data.accessToken);
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  const getProtectedData = async () => {
    const currentToken = localStorage.getItem("token");

    try {
      const response = await fetch("https://dummyjson.com/auth/me", {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      const data = await response.json();
      console.log("Protected data:", data);
    } catch (error) {
      console.error("Error fetching protected data:", error);
    }
  };

  useEffect(() => {
    const tokenRefreshInterval = setInterval(() => {
      console.log("refreshing after 55 seconds");
      refreshAccessToken();
    }, 55000); // Refresh token every 55 seconds (5 seconds before expiry)

    return () => clearInterval(tokenRefreshInterval);
  }, []);

  useEffect(() => {
    if (token) {
      getProtectedData();
    }
  }, [token]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    login({ username, password });

    e.currentTarget.reset();
  }

  useEffect(() => {
    setInterval(() => {
      console.log("5 seconds"); //just for counting seconds
    }, 5000);
  }, []);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={usernameRef} placeholder="username" />
        <input type="password" ref={passwordRef} placeholder="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;
