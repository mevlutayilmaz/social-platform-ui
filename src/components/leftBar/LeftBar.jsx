import "./leftBar.scss";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { CameraRollRounded, CollectionsRounded, EventAvailableRounded, ForumRounded, GroupsRounded, LiveTvRounded, PersonRounded, SportsEsportsRounded, StorefrontRounded, VideocamRounded } from "@mui/icons-material";

const LeftBar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={currentUser.profilePicture}
              alt=""
            />
            <span>{currentUser.nameSurname}</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <div className="item">
            <PersonRounded />
            <span>Friends</span>
          </div>
          <div className="item">
            <GroupsRounded />
            <span>Groups</span>
          </div>
          <div className="item">
            <StorefrontRounded />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <LiveTvRounded />
            <span>Watch</span>
          </div>
          <div className="item">
            <CameraRollRounded />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <div className="item">
            <EventAvailableRounded />
            <span>Events</span>
          </div>
          <div className="item">
            <SportsEsportsRounded />
            <span>Gaming</span>
          </div>
          <div className="item">
            <CollectionsRounded />
            <span>Gallery</span>
          </div>
          <div className="item">
            <VideocamRounded />
            <span>Videos</span>
          </div>
          <div className="item">
            <ForumRounded />
            <span>Messages</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
