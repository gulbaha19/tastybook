import { BoxDef, BoxReverse } from "../pages/Profile";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../firebase";
import { Avatar } from "@mui/material";
import { Icon } from "../utils/Icon";
import { useNavigate } from "react-router-dom";

export const SideBarProfile = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <BoxDef>
      <BoxReverse>
        {user?.photoURL ? (
          <Avatar
            alt="user"
            src={user.photoURL}
            sx={{ width: 160, height: 160 }}
            style={{ marginBottom: "20px" }}
          />
        ) : (
          <Avatar
            alt="user"
            src="https://www.gravatar.com/avatar/42b09ebc77c2204d70c537e2fcc910ff?s=360/&d=robohash"
            sx={{ width: 160, height: 160 }}
          />
        )}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="email ">{user?.email}</div>
          <div className="name">{user?.displayName && "No name availabe"}</div>
        </div>
      </BoxReverse>
      <BoxReverse className="adaptiveButton">
        <div
          className="email button"
          onClick={() => {
            navigate("/profile", {});
          }}>
          <Icon type="Cook" className="iconAdap" />

          <p className="textAdap">My Recipes</p>
        </div>
        <div
          className="email button"
          onClick={() => {
            navigate("/favourites", {});
          }}>
          <Icon type="IconD" className="iconAdap" />

          <p className="textAdap">My Favourites</p>
        </div>
        <div className="email button" onClick={() => logout()}>
          <Icon type="Exit" className="iconAdap" />

          <p className="textAdap"> Log out</p>
        </div>
      </BoxReverse>
    </BoxDef>
  );
};
