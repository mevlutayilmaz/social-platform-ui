import { useContext } from "react";
import { getFollowing, suggestionsUser, followUser } from "../../api/users";
import Error from "../error/Error";
import Loading from "../loading/Loading";
import "./rightBar.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

const RightBar = () => {
  const { currentUser } = useContext(AuthContext)

  const { isLoading, error, data } = useQuery({
    queryKey: ["following"],
    queryFn: async () => await getFollowing(currentUser.username)
  });

  const { isLoading: sIsLoading, error: sError, data: sData } = useQuery({
    queryKey: ["suggestions"],
    queryFn: suggestionsUser
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["suggestions"]);
    }
  });

  const handleFollow = (username) => {
    mutation.mutate(username);
  }

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Following</span>
          {error
            ? <Error />
            : isLoading
            ? <Loading />
            : data.map((user, index) => (
              <div className="user" key={index}>
                <div className="userInfo">
                  <img
                    src={user.profilePicture}
                    alt=""
                  />
                  <div className="online" />
                  <Link
                    to={`/profile/${user.username}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    <span>{user.nameSurname}</span>
                  </Link>
                </div>
              </div>
            ))}
        </div>
        <div className="item">
          <span>Suggestions For You</span>
          {sError
            ? <Error />
            : sIsLoading
            ? <Loading />
            : sData.map((user, index) => (
              <div className="user" key={index}>
                <div className="userInfo">
                  <img
                    src={user.profilePicture}
                    alt=""
                  />
                  <Link
                    to={`/profile/${user.username}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    <span>{user.nameSurname}</span>
                  </Link>
                </div>
                <div className="buttons">
                  <button onClick={() => handleFollow(user.username)}>Follow</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
