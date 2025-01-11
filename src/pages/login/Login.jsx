import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useForm } from 'react-hook-form';
import "./login.scss";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useContext(AuthContext);

  const onSubmit = async (data) => await login(data);

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>SoMedia Login</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register('username', { required: 'Username is required' })}
              placeholder="Username"
              name="username"
              id="username"
              required
            />
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              placeholder="Password"
              name="password"
              id="password"
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
