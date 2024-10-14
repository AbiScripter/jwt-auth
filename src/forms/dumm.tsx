import { useEffect, useState } from "react";

const AuthUsers = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const login = async () => {
      try {
        const response = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "emilys",
            password: "emilyspass",
            expiresInMins: 30,
          }),
          //   credentials: "include", // Use cookies if needed
        });

        const data = await response.json();
        console.log(data); // This should contain the JWT

        if (data.accessToken) {
          setToken(data.accessToken); // Store token in state
          localStorage.setItem("token", data.accessToken); // Save token in localStorage for persistence
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    };

    login();
  }, []);

  useEffect(() => {
    const getProtectedData = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch("https://dummyjson.com/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data); // Protected data
    };
    getProtectedData();
  }, [token]);

  return <div>Auth Token: {token ? token : "Logging in..."}</div>;
};

export default AuthUsers;

// import React, { FormEvent, useEffect, useRef, useState } from "react";

// const LoginForm = () => {
//   const usernameRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   const [token, setToken] = useState(null);

//   type loginProps = {
//     username: string;
//     password: string;
//   };

//   const login = async ({ username, password }: loginProps) => {
//     console.log(username, password);
//     try {
//       const response = await fetch("https://dummyjson.com/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username: `michaelw`,
//           password: `michaelwpass`,
//           expiresInMins: 1,
//         }),
//         //   credentials: "include", // Use cookies if needed
//       });

//       const data = await response.json();
//       console.log(data); // This should contain the JWT

//       if (data.accessToken) {
//         setToken(data.accessToken); // Store token in state
//         localStorage.setItem("token", data.accessToken); // Save token in localStorage for persistence
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//     }
//   };

//   const getProtectedData = async () => {
//     const token = localStorage.getItem("token");

//     const response = await fetch("https://dummyjson.com/auth/me", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await response.json();
//     console.log(data); // Protected data
//   };

//   useEffect(() => {
//     let id = setTimeout(() => {
//       getProtectedData();
//     }, 62000);

//     return () => clearTimeout(id);
//   }, []);

//   useEffect(() => {
//     let id = setTimeout(() => {
//       getProtectedData();
//     }, 50000);

//     return () => clearTimeout(id);
//   }, []);
//   useEffect(() => {
//     let id = setTimeout(() => {
//       getProtectedData();
//     }, 10000);

//     return () => clearTimeout(id);
//   }, []);

//   useEffect(() => {
//     if (token) {
//       getProtectedData();
//     }
//   }, [token]);

//   function handleSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     // Check if refs are not null before accessing their value
//     const username = usernameRef.current?.value || "";
//     const password = passwordRef.current?.value || "";

//     login({ username, password });

//     e.currentTarget.reset();
//   }

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="text" ref={usernameRef} placeholder="username" />
//         <input type="password" ref={passwordRef} placeholder="password" />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;
// // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJtaWNoYWVsdyIsImVtYWlsIjoibWljaGFlbC53aWxsaWFtc0B4LmR1bW15anNvbi5jb20iLCJmaXJzdE5hbWUiOiJNaWNoYWVsIiwibGFzdE5hbWUiOiJXaWxsaWFtcyIsImdlbmRlciI6Im1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL21pY2hhZWx3LzEyOCIsImlhdCI6MTcyODgwNDA4NiwiZXhwIjoxNzI4ODA0MTQ2fQ.9w9uJxzUa5DM99-xkbHv-KhssYgGQrVSilmMj3phS60"

// // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJtaWNoYWVsdyIsImVtYWlsIjoibWljaGFlbC53aWxsaWFtc0B4LmR1bW15anNvbi5jb20iLCJmaXJzdE5hbWUiOiJNaWNoYWVsIiwibGFzdE5hbWUiOiJXaWxsaWFtcyIsImdlbmRlciI6Im1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL21pY2hhZWx3LzEyOCIsImlhdCI6MTcyODgwNDA4NiwiZXhwIjoxNzMxMzk2MDg2fQ.kDlKefYrmscXsSk8QamsV3PMov53FRHuoPZAFOQkGjk"

// import React, { FormEvent, useEffect, useRef, useState } from "react";
// import { jwtDecode } from "jwt-decode"; // You'll need a library to decode JWTs

// const LoginForm = () => {
//   const usernameRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   const [token, setToken] = useState<string | null>(null); // accessToken
//   const [refreshToken, setRefreshToken] = useState<string | null>(null); // refreshToken

//   type loginProps = {
//     username: string;
//     password: string;
//   };

//   const login = async ({ username, password }: loginProps) => {
//     console.log(username, password);
//     try {
//       const response = await fetch("https://dummyjson.com/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username: `michaelw`,
//           password: `michaelwpass`,
//           expiresInMins: 1,
//         }),
//       });

//       const data = await response.json();
//       console.log(data); // This should contain the JWT

//       if (data.accessToken && data.refreshToken) {
//         setToken(data.accessToken); // Store access token in state
//         setRefreshToken(data.refreshToken); // Store refresh token in state
//         localStorage.setItem("token", data.accessToken); // Persist access token in localStorage
//         localStorage.setItem("refreshToken", data.refreshToken); // Persist refresh token
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//     }
//   };

//   const refreshAccessToken = async () => {
//     try {
//       const refreshToken = localStorage.getItem("refreshToken"); // Get refresh token
//       if (!refreshToken) {
//         console.log("No refresh token available");
//         return;
//       }

//       const response = await fetch("https://dummyjson.com/auth/refresh", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ refreshToken }),
//       });

//       const data = await response.json();
//       console.log(data); // This should contain the new access token

//       if (data.accessToken) {
//         setToken(data.accessToken); // Update access token
//         localStorage.setItem("token", data.accessToken); // Update in localStorage
//       }
//     } catch (error) {
//       console.error("Error during token refresh:", error);
//     }
//   };

//   const getProtectedData = async () => {
//     const token = localStorage.getItem("token");

//     const response = await fetch("https://dummyjson.com/auth/me", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await response.json();
//     console.log(data); // Protected data
//   };

// Simulate token expiration check and request new token after expiration
// useEffect(() => {
//   const tokenCheck = setInterval(async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       console.log("Token not found or expired, refreshing...");
//       await refreshAccessToken(); // Request new access token using refresh token
//     } else {
//       console.log("Access token is still valid");
//       getProtectedData();
//     }
//   }, 10000); // Check every minute for token expiry

//   return () => clearInterval(tokenCheck);
// }, []);

//   type DecodedToken = {
//     exp: number; // JWT expiration timestamp
//   };

//   useEffect(() => {
//     const tokenCheck = setInterval(async () => {
//       const token = localStorage.getItem("token");

//       if (token) {
//         // Decode the JWT to check expiration
//         const decoded: DecodedToken = jwtDecode(token);
//         console.log(decoded);
//         const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

//         if (decoded.exp < currentTime) {
//           console.log("Token expired, refreshing...");
//           await refreshAccessToken(); // Request new access token using refresh token
//         } else {
//           console.log("Access token is still valid");
//           getProtectedData(); // Fetch data if token is still valid
//         }
//       } else {
//         console.log("No token found, refreshing...");
//         await refreshAccessToken();
//       }
//     }, 10000); // Check every 10 seconds

//     return () => clearInterval(tokenCheck);
//   }, []);

//   function handleSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const username = usernameRef.current?.value || "";
//     const password = passwordRef.current?.value || "";

//     login({ username, password });

//     e.currentTarget.reset();
//   }

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="text" ref={usernameRef} placeholder="username" />
//         <input type="password" ref={passwordRef} placeholder="password" />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;
