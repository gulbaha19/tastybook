import styled from "@emotion/styled";
import { Box, Button as MuiButton, IconButton, Input, InputAdornment, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { VisibilityOff, Visibility } from "@mui/icons-material";
export const Button = styled(MuiButton)`
  color: rgba(48, 69, 109, 255);
`;

export const style = {
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  backgroundImage: "url(https://recipebook.io/public/images/login%208xxxhdpi.svg)",
  width: "80%",
  p: 4,
  position: "relative",
  display: "flex",
};
export const LoginModal = ({ ...props }) => {
  const { open, handleClose, onChangeToRegister } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      // navigate("/");
      handleClose();
    }
  }, [user, loading]);

  const handleChange = (prop: string) => (event: { target: { value: any } }) => {
    setPassword(event.target.value);
  };

  return (
    <Modal
      style={{ marginTop: "150px" }}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <div className="login__container">
          <div style={{ flexDirection: "column", display: "flex" }}>
            <Input
              value={email}
              type="text"
              placeholder="E-mail Address"
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="standard-weight-helper-text"
              inputProps={{
                "aria-label": "email",
              }}
            />

            <Input
              style={{ marginTop: "10px" }}
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>

          <Button className="login__btn" onClick={() => logInWithEmailAndPassword(email, password)}>
            Login
          </Button>
          <Button className="login__btn login__google" onClick={signInWithGoogle}>
            Login with Google
          </Button>
          <div>
            <Link to="/reset">Forgot Password</Link>
          </div>
          <div>
            Don't have an account?
            <div>
              <span onClick={onChangeToRegister} style={{ color: "red", cursor: "pointer" }}>
                Register
              </span>
              <span> now.</span>
            </div>
          </div>
        </div>
        <div style={{ display: "absolute", marginRight: "50px", textAlign: "right" }}>
          <h3 style={{ marginTop: "170px" }}>TastyBook</h3>
          <p style={{ marginLeft: "200px" }}>
            Bring out the smart chef in you and bring compliments your way
          </p>
        </div>
      </Box>
    </Modal>
  );
};
