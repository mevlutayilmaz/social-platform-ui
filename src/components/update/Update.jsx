import { useState } from "react";
import "./update.scss";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateUser } from "../../api/users";

const Update = ({ setOpenUpdate, user }) => {
  const [texts, setTexts] = useState({
    nameSurname: user.nameSurname,
    email: user.email,
    city: user.city,
    bio: user.bio
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    }
  });

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = () => {
    mutation.mutate(texts);
    setOpenUpdate(false)
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form action={handleClick}>
          <label>NameSurname</label>
          <input
            type="text"
            value={texts.nameSurname}
            name="nameSurname"
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type="text"
            value={texts.email}
            name="email"
            onChange={handleChange}
            required
          />
          <label>City</label>
          <input
            type="text"
            name="city"
            value={texts.city}
            onChange={handleChange}
            required
          />
          <label>Bio (max 40 characters)</label>
          <input
            type="text"
            name="bio"
            value={texts.bio}
            onChange={handleChange}
            maxLength={40}
            required
          />
          <button type="submit" className="update-button">
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