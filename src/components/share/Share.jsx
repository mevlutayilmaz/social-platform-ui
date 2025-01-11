import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import { createPost } from "../../api/posts";

const Share = () => {
  const { currentUser } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    }
  });

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Content", content);
    if (file) {
      formData.append("File", file);
    }

    mutation.mutate(formData);
    setContent("");
    setFile(null);
  };

  const handleClear = () => {
    setFile(null);
    setContent("")
  }

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={currentUser.profilePicture} alt="" />
            <textarea
              rows="1"
              maxLength="200"
              type="text"
              placeholder={`What's on your mind ${currentUser.nameSurname}?`}
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button className="clear" onClick={handleClear}>Clear</button>
            <button className="share" onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
