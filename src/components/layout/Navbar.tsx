// import { NavLink, useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../app/store";
// import { logout } from "../../features/auth/authSlice";

// function Navbar() {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const userEmail = useAppSelector((state) => state.auth.userEmail);
//   const handleLogout = () => {
// dispatch(logout());
// navigate("/login", {
//   replace: true,
// });
//   };
//   return (
//     <header className="sticky top-0 z-20 border-b border-slate-200 bg-white shadow-sm">
//       <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center gap-8">
//           {/* <NavLink
//                         to="/files"
//                         className="text-xl font-bold text-blue-600"
//                     >
//                         File Portal
//                     </NavLink> */}
//           <nav className="hidden sm:block">
//             <NavLink
//               to="/files"
//               className={({ isActive }) =>
//                 `rounded-md px-3 py-2 text-sm font-medium transition ${
//                   isActive
//                     ? "bg-blue-50 text-blue-700"
//                     : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
//                 }`
//               }
//             >
//               Files
//             </NavLink>
//           </nav>
//         </div>
//         <div className="flex items-center gap-4">
//           {userEmail && (
//             <span className="hidden max-w-48 truncate text-sm text-slate-600 md:block">
//               {userEmail}
//             </span>
//           )}
//           <button
//             type="button"
//             onClick={handleLogout}
//             className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
//           >
//             Logouttt
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }
// export default Navbar;

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

// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
        height: 70,
        px: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "#fff",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <Typography variant="h6" fontWeight={700}>
        {/* Banking Portal */}
      </Typography>

      <Box>
        <IconButton onClick={handleProfileClick}>
          {/* <Avatar
            sx={{
              bgcolor: "#006D6F",
            }}
          >
            <AccountCircleIcon />
          </Avatar> */}
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
      </Box>
    </Box>
  );
}
