import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../src/app/hooks";
import { logout } from "../../features/auth/authSlice";

import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Badge from "@mui/material/Badge";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Header() {
  const user = useAppSelector((state) => state.auth.user);
  console.log(user, " user nam ");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <Box
      sx={{
        bgcolor: "#e7f5f7",
      }}
    >
      <Box
        className="p-3"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          {/* Banking Portal */}
        </Typography>

        {/* Right Side */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            ml: "auto",
          }}
        >
          <IconButton>
            <Badge badgeContent={3} color="error">
              <NotificationsNoneIcon
                sx={{
                  fontSize: 35, // increase size
                  color: "#006D6F",
                }}
              />
            </Badge>
          </IconButton>
          <IconButton onClick={handleProfileClick}>
            <Avatar
              sx={{
                bgcolor: "#006D6F",
              }}
            >
              {user?.name
                ?.split(" ")
                .map((word) => word.charAt(0))
                .join("")
                .toUpperCase()}
            </Avatar>
            <KeyboardArrowDownIcon
              sx={{
                color: "#006D6F",
                transition: "0.2s",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                width: 240,
                borderRadius: 2,
                mt: 1,
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                overflow: "hidden",
              },
            }}
          >
            {/* User Details */}
            <Box
              sx={{
                px: 3,
                py: 2,
                backgroundColor: "#F8F9FA",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  color: "#666",
                }}
              >
                {user?.name}
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontSize: "1rem",
                  color: "#8a8a8a",
                }}
              >
                {user?.email}
              </Typography>
            </Box>

            <Divider />

            {/* Logout */}
            <MenuItem
              onClick={handleLogout}
              sx={{
                py: 2,
                px: 3,
                fontSize: "1.1rem",
                color: "#222",

                "&:hover": {
                  backgroundColor: "#F5F5F5",
                },
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Divider color="#e7f5f7"></Divider>
      {/* <Box
        sx={{
          ml: "auto",
          display: "flex",
          alignItems: "center",
          gap: 1,
         
        }}
      >
       
        <IconButton
          sx={{
            color: "#006D6F",

            "&:hover": {
              bgcolor: "#EAF4F5",
            },
          }}
        >
          <NotificationsNoneIcon />
        </IconButton>

        
        <IconButton onClick={handleProfileClick}>
          <Avatar
            sx={{
              bgcolor: "#006D6F",
            }}
          >
            {user?.name
              ?.split(" ")
              .map((word) => word.charAt(0))
              .join("")
              .toUpperCase()}
          </Avatar>
        </IconButton>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem disabled>{user?.name}</MenuItem>
          <MenuItem disabled>{user?.email}</MenuItem>

          <Divider />

          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box> */}
    </Box>
  );
}
