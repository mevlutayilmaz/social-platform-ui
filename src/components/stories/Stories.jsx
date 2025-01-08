import "./stories.scss";
import { useQuery } from "@tanstack/react-query";
import { getStories } from "../../api/stories";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import Loading from "../loading/Loading";
import Error from "../error/Error"

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["stories"],
    queryFn: getStories,
  });

  return (
    <div className="stories">
      <div className="story create-story">
        <img src={currentUser.profilePicture} alt=""/>
        <button className="create-button">+</button>
      </div>
      {error
        ? <Error />
        : isLoading
        ? <Loading />
        : data?.map((story) => (
            <div className="story" key={story.id}>
              <img src={story.imageUrl} alt="" />
              <div className="story-info">
                <img className="story-profile-pic" src={story.user.profilePicture} alt="" />
                <span> {story.user.nameSurname}</span>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Stories;