import React, { FormEvent, useEffect, useRef } from "react";

const SignupForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {

  // }, []);

  type signupProps = {
    username: string;
    email: string;
    password: string;
  };

  const singup = async ({ username, email, password }: signupProps) => {
    try {
      const response = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: `${username}`,
          email: `${email}`,
          password: `${password}`,
        }),
        //   credentials: "include", // Use cookies if needed
      });

      const data = await response.json();
      console.log(data); // This should contain the JWT
    } catch (error) {
      console.error("Error during Signup:", error);
    }
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Check if refs are not null before accessing their value
    const username = usernameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    singup({ username, email, password });

    //e.currentTarget refers to the form itself, which has the reset() method that clears all the inputs.
    //e.target would refer to the element that triggered the submission (like the button), which doesn't have a reset method.
    //so e.target.reset() wont work
    e.currentTarget.reset();
  }
  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={usernameRef} placeholder="username" />
        <input type="email" ref={emailRef} placeholder="email" />
        <input type="password" ref={passwordRef} placeholder="password" />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupForm;
