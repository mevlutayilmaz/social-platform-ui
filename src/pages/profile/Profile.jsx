import "./profile.scss";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import { useState } from "react";
import { getUserByUsername, uploadCoverPic, uploadProfilePic, followUser, unfollowUser } from "../../api/users";
import { Save, Cancel, X, FacebookTwoTone, Instagram, LinkedIn, Place, EmailOutlined, Edit } from "@mui/icons-material";

const Profile = () => {
  const [coverPic, setCoverPic] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { username } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUserByUsername(username)
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      return data.isFollowed
        ? await unfollowUser(data.username)
        : await followUser(data.username)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    }
  });

  const mutationCover = useMutation({
    mutationFn: uploadCoverPic,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    }
  });

  const mutationProfile = useMutation({
    mutationFn: async (formData) => {
      const response = await uploadProfilePic(formData);
      setCurrentUser((prevUser) => ({
        ...prevUser,
        profilePicture: response.profilePicture,
      }));      
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    }
  });

  const handleFollow = () => {
    mutation.mutate();
  };

  const handleCoverChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverPic(file);
    }
  };

  const handleCoverSave = async () => {
    const formData = new FormData();
    if (coverPic) {
      formData.append("File", coverPic);
    }

    mutationCover.mutate(formData);
    setCoverPic(null);
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
    }
  };

  const handleProfileSave = async () => {
    const formData = new FormData();
    if (profilePic) {
      formData.append("File", profilePic);
    }

    mutationProfile.mutate(formData);
    setProfilePic(null);
  };

  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <div className="cover-wrapper">
              <img src={coverPic ? URL.createObjectURL(coverPic) : data.coverPicture} alt="Cover" className="cover" />
              {currentUser.username === data.username ? coverPic ? (
                <>
                  <label className="icon-wrapper">
                    <Save onClick={handleCoverSave} />
                  </label>
                  <label className="icon-wrapper" style={{ marginRight: '40px' }}>
                    <Cancel onClick={() => setCoverPic(null)} />
                  </label>
                </>
              ) : (
                <label className="icon-wrapper">
                  <input type="file" accept="image/*" onChange={handleCoverChange} hidden />
                  <Edit />
                </label>
              ) : null}
            </div>
            <div className="profilePic-wrapper">
              <img src={profilePic ? URL.createObjectURL(profilePic) : data.profilePicture} alt="Profile" className="profilePic" />
              {currentUser.username === data.username ? profilePic ? (
                <>
                  <label className="icon-wrapper">
                    <Save onClick={handleProfileSave} />
                  </label>
                  <label className="icon-wrapper" style={{ marginRight: '40px' }}>
                    <Cancel onClick={() => setProfilePic(null)} />
                  </label>
                </>
              ) : (
                <label className="icon-wrapper">
                  <input type="file" accept="image/*" onChange={handleProfileChange} hidden />
                  <Edit />
                </label>
              ) : null}
            </div>
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoTone fontSize="medium" />
                </a>
                <a href="http://facebook.com">
                  <Instagram fontSize="medium" />
                </a>
                <a href="http://facebook.com">
                  <X fontSize="medium" />
                </a>
                <a href="http://facebook.com">
                  <LinkedIn fontSize="medium" />
                </a>
              </div>
              <div className="center">
                <div className="edit-wrapper ">
                  {currentUser.username === data.username 
                    ? <Edit onClick={() => setOpenUpdate(true)} cursor="pointer" />
                    : <button onClick={handleFollow} className={`follow-button ${data.isFollowed ? 'unfollow' : 'follow'}`} >{data.isFollowed ? "Unfollow" : "Follow"}</button>}  
                </div>
                <span>{data.nameSurname}</span>
                <div className="info">
                  <div className="item">
                    <Place />
                    <span>{data.city}</span>
                  </div>
                  <div className="item">
                    <EmailOutlined />
                    <span>{data.email}</span>
                  </div>
                </div>
              </div>
              <div className="right">
                  <div className="followers">
                      <span className="title">Followers</span>
                      <span className="count">{data.follower}</span>
                  </div>
                  <div className="following">
                      <span className="title">Following</span>
                      <span className="count">{data.following}</span>
                  </div>
              </div>
            </div>
            <Posts username={username} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
