import styled from "@emotion/styled";
import { Box, Input, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { Button, style } from "./LoginModal";

export const RegisterModal = ({ ...props }) => {
  const { open, handleClose, onChangeToLogin } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    // if (user) navigate("/");
    handleClose();
  }, [user, loading]);

  return (
    <Modal
      style={{ marginTop: "150px" }}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style} style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "100%" }}>
          <div style={{ flexDirection: "column", display: "flex", width: "40%" }}>
            <Input
              value={name}
              type="text"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              aria-describedby="standard-weight-helper-text"
              inputProps={{
                "aria-label": "Name",
              }}
            />
            <Input
              style={{ margin: "10px 0" }}
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
              value={password}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby="standard-weight-helper-text"
              inputProps={{
                "aria-label": "password",
              }}
            />
          </div>
          <Button className="register__btn" onClick={register}>
            Register
          </Button>
          <Button className="register__btn register__google" onClick={signInWithGoogle}>
            Register with Google
          </Button>
          <div>
            Already have an account?
            <div onClick={onChangeToLogin} style={{ color: "red", cursor: "pointer" }}>
              Login
            </div>
            now.
          </div>

          <div style={{ display: "absolute", marginRight: "50px", textAlign: "right" }}>
            <h3 style={{ marginTop: "100px" }}>TastyBook</h3>
            <p style={{ marginLeft: "200px" }}>
              Bring out the smart chef in you and bring compliments your way
            </p>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
