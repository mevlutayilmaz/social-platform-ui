import { Link } from "react-router-dom";
import "./register.scss";
import { useForm } from "react-hook-form";
import { createUser } from "../../api/users"

const Register = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) =>
    await createUser(data.nameSurname, data.username, data.email, data.password, data.passwordConfirm);

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Buckety Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register('nameSurname', { required: 'NameSurname is required' })}
              placeholder="NameSurname"
              name="nameSurname"
              id="nameSurname"
              required
            />
            <input
              type="text"
              {...register('username', { required: 'Username is required' })}
              placeholder="Username"
              name="username"
              id="username"
              required
            />
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              placeholder="Email"
              name="email"
              id="email"
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
            <input
              type="password"
              {...register('passwordConfirm', { required: 'Password Confirm is required' })}
              placeholder="Password Confirm"
              name="passwordConfirm"
              id="passwordConfirm"
              required
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
