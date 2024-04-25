import {
  Button,
  Typography,
  Paper,
  Container,
  Box,
  TextField,
} from "@mui/material/";
import { useNavigate } from "react-router-dom";
import { postloginUser , getUserList } from "../../common/api/inter_process.js";
import theme from "../theme/theme.tsx";
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [password, setPassword] = useState("");
  const [User_ID, setUser_ID] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [UserList, setUserList] = useState([]);
  const navigate= useNavigate();

  const handleCreate = async () => {
    if (User_ID === "" || password === "" || 
    UserList.some((value) => User_ID === value.User_ID))
      return;
    if(await postloginUser(User_ID,password)===0){
      //登録成功
      
    }else{
      //登録失敗
      //表示処理
      var elm = document.getElementById("400code");
      elm.style.display = '';
    }
  };

  useEffect(() => {
    (async () => {
      const list = await getUserList();
      setUserList(list);
    })();
  }, []);
  
  return (
    <Container maxWidth="xl">
    <form method="POST">
      <Paper elevation={8}>
        <Typography sx={theme.Big_label}>ログイン</Typography>
      </Paper>
      <Typography 
      sx={{ color:"red",fontSize:"2em"}}
      ><span id="400code"  style={{display:"none"}}>※問題が発生し登録できませんでした</span></Typography>
      <Box sx={{ margin: "80px" }} display="flex">
      
        <Typography sx={theme.Midiam_label}>利用者ID</Typography>
        
        <TextField
          sx={{ width: "100vh", margin: "40px" }}
          label="利用者ID"
          variant="outlined"
          size="large"
          id="userid_field"
          onChange={(e) => {
            setUser_ID(e.target.value);
          }}
        />
        
      </Box>
      <Box sx={{ textAlign: "center", margin: "100px" }} display="flex">
        <Typography sx={theme.Midiam_label}>パスワード</Typography>

        <TextField
          sx={{ width: "100vh", margin: "40px" }}
          value={password}
          type={passwordType}
          label="パスワード"
          variant="outlined"
          size="large"
          placeholder={"英数字を含めてください"}
          autoComplete="new-password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="Password"
        />
        {passwordType === "password" && (
          <VisibilityOffIcon
            onClick={() => setPasswordType("text")}
            className="Password__visual"
          />
        )}
        {passwordType === "text" && (
          <VisibilityIcon
            onClick={() => setPasswordType("password")}
            className="Password__visual"
          />
        )}
      </Box>
      <Box sx={{ textAlign: "center", margin: "100px" }} display="flex">
        <Button
          sx={{ margin: "30px", width: "150vh" }}
          variant="contained"
          color="primary"
          onClick={handleCreate}
        >
          <Typography sx={theme.Midiam_label}>ログイン</Typography>
        </Button>
      </Box>
      </form>
    </Container>
  );
};

export default Login;
