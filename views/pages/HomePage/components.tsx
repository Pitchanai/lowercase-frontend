import { Box, styled } from "@mui/joy";

export const Root = styled(Box)(() => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
}));

export const NotiText = styled(Box)(() => ({
  position: "absolute",
  top: 20,
}));

export const BigInput = styled("input")(({ theme }) => ({
  width: "100%",
  height: "100%",
  outline: "none",
  borderWidth: 0,
  border: "none",
  fontSize: 30,
  background: "inherit",
  color: "inherit",
  fontFamily: "menlo",
  padding: theme.spacing(2),
}));
