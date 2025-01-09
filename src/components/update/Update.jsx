import { useState } from "react";
import "./update.scss";

const Update = ({ setOpenUpdate, user }) => {
  const [texts, setTexts] = useState({
    name: user.nameSurname,
    email: user.email,
    password: "password",
    city: user.city,
    bio: user.bio
  });

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <label>Name</label>
          <input
            type="text"
            value={texts.name}
            name="name"
            onChange={handleChange}
          />
          <label>Email</label>
          <input
            type="text"
            value={texts.email}
            name="email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            value={texts.password}
            name="password"
            onChange={handleChange}
          />
          <label>City</label>
          <input
            type="text"
            name="city"
            value={texts.city}
            onChange={handleChange}
          />
          <label>Bio (max 10 characters)</label>
          <input
            type="text"
            name="bio"
            value={texts.bio}
            onChange={handleChange}
            maxLength={40}
          />
          <button className="update-button" onClick={handleClick}>
            Update
          </button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          <span className="close-text">✖</span>
        </button>
      </div>
    </div>
  );
};

export default Update;