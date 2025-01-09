import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { WbSunnyRounded, DarkModeRounded, TableRowsRounded, LogoutRounded, NotificationsRounded, EmailRounded, GroupRounded, HomeRounded, Search } from "@mui/icons-material";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const hanleClick = async (e) => {
    e.preventDefault();

    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.log("Logout failed with error:" + err);
    }
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span>SoMedia</span>
        </Link>
        <HomeRounded cursor="pointer" />
        {darkMode ? (
          <WbSunnyRounded onClick={toggle} cursor="pointer" />
        ) : (
          <DarkModeRounded onClick={toggle} cursor="pointer" />
        )}
        <TableRowsRounded cursor="pointer" />
        <div className="search">
          <Search />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <GroupRounded  cursor="pointer" />
        <EmailRounded  cursor="pointer" />
        <NotificationsRounded  cursor="pointer" />
        <Link
          to={`/profile/${currentUser.username}`}
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="user">
            <img src={currentUser.profilePicture} alt="" />
            <span>{currentUser.nameSurname}</span>
          </div>
        </Link>
        <LogoutRounded onClick={hanleClick}  cursor="pointer" />
      </div>
    </div>
  );
};

export default Navbar;
