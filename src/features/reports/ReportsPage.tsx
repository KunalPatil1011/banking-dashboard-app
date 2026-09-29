// export default function ReportsPage() {
//   const cards = [
//     {
//       id: "breas",
//       title: "Breas files",
//       description: "View and manage your breas files",
//       count: 12,
//       icon: "📄",
//       color: "bg-teal-500",
//       badgeColor: "#DDF4EF",
//       textColor: "#14B8A6",
//     },
//     {
//       id: "arcs",
//       title: "ARCS files",
//       description: "Access ARCS related files",
//       count: 11,
//       icon: "📊",
//       color: "bg-blue-500",
//       badgeColor: "#E2ECFF",
//       textColor: "#3B82F6",
//     },
//     {
//       id: "processed",
//       title: "Processed files",
//       description: "Track and manage process",
//       count: 17,
//       icon: "⚙️",
//       color: "bg-purple-500",
//       badgeColor: "#F2E9FF",
//       textColor: "#A855F7",
//     },
//   ];
//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
//       </div>
//       <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//         {cards.map((card) => (
//           <div
//             key={card.id}
//             className="group cursor-pointer rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
//           >
//             <div
//               className={`mb-8 flex h-16 w-16 items-center justify-center rounded-full ${card.color}`}
//             >
//               <span className="text-2xl text-white">{card.icon}</span>
//             </div>
//             <h2 className="text-[30px] font-semibold text-slate-800">
//               {card.title}
//             </h2>
//             <p className="mt-2 text-slate-500">{card.description}</p>
//             <div className="mt-8 flex items-center justify-between">
//               <span
//                 className="font-semibold"
//                 style={{
//                   color: card.textColor,
//                 }}
//               >
//                 Download
//               </span>
//               <span
//                 className="rounded-full px-4 py-1 text-sm"
//                 style={{
//                   backgroundColor: card.badgeColor,
//                   color: card.textColor,
//                 }}
//               >
//                 {card.count}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// import { useMemo, useState } from "react";
// import axios from "axios";
// import {
//   Alert,
//   Box,
//   Collapse,
//   Typography,
//   InputAdornment,
//   TextField,
// } from "@mui/material";
// import type { GridColDef, GridRowsProp } from "@mui/x-data-grid";
// import DataTable from "../../components/common/DataTable";
// import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

// import AccountTreeIcon from "@mui/icons-material/AccountTree";
// import FolderIcon from "@mui/icons-material/Folder";
// import SettingsIcon from "@mui/icons-material/Settings";

// type CardId = "breas" | "arcs" | "processed";

// interface ReportCard {
//   id: CardId;
//   title: string;
//   description: string;
//   count: number;
//   icon: string;
//   color: string;
//   badgeColor: string;
//   textColor: string;
//   apiUrl: string;
// }

// // interface ApiFileRecord {
// //   id?: string | number;
// //   fileName?: string;
// //   name?: string;
// //   fileType?: string;
// //   status?: string;
// //   createdAt?: string;
// //   uploadedAt?: string;
// // }

// // interface FileTableRow {
// //   id: string | number;
// //   fileName: string;
// //   fileType: string;
// //   status: string;
// //   createdAt: string;
// // }

// interface ApiUserRecord {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
//   role: string;
// }

// const cards: ReportCard[] = [
//   {
//     id: "breas",
//     title: "Brues files",
//     description: "View and manage your breas files",
//     count: 12,
//     icon: <FolderIcon sx={{ fontSize: 34 }} />,
//     bgColor: "#059b7f",
//     borderColor: "border-emerald-300/40",
//     iconBorderColor: "#059b7f",
//     blobColor: "rgba(5, 155, 127, 0.08)",
//     badgeColor: "#D1FAE5",
//     badgeTextColor: "#059b7f",
//     textColor: "#059b7f",
//     cardBg: "rgba(240, 253, 250)",

//     apiUrl:
//       "https://6aa26491ccb3db9689a66ef8.mockapi.io/api/response/bot/users",
//   },
//   {
//     id: "arcs",
//     title: "ARCS files",
//     description: "Access ARCS related files",
//     count: 11,
//     icon: <AccountTreeIcon sx={{ fontSize: 34 }} />,
//     bgColor: "#4fa4fb",
//     borderColor: "border-sky-300/40",
//     iconBorderColor: "#4fa4fb",
//     blobColor: "rgba(79, 164, 251, 0.08)",
//     badgeColor: "#DBF1FF",
//     badgeTextColor: "#4fa4fb",
//     textColor: "#4fa4fb",
//     cardBg: "rgba(242, 249, 255)",

//     apiUrl: "https://YOUR-PROJECT.mockapi.io/api/v1/arcs",
//   },
//   {
//     id: "processed",
//     title: "Processed files",
//     description: "Track and manage process",
//     count: 17,
//     icon: <SettingsIcon sx={{ fontSize: 34 }} />,
//     bgColor: "#9761ed",
//     borderColor: "border-violet-300/40",
//     iconBorderColor: "#9761ed",
//     blobColor: "rgba(151, 97, 237, 0.08)",
//     badgeColor: "#EDE9FF",
//     badgeTextColor: "#9761ed",
//     textColor: "#9761ed",
//     cardBg: "rgba(246, 245, 252)",

//     // Replace with your MockAPI URL
//     apiUrl: "https://YOUR-PROJECT.mockapi.io/api/v1/processed",
//   },
// ];

// const columns: GridColDef<ApiUserRecord>[] = [
//   {
//     field: "id",
//     headerName: "ID",
//     width: 90,
//   },
//   {
//     field: "name",
//     headerName: "Name",
//     minWidth: 180,
//     flex: 1,
//   },
//   {
//     field: "email",
//     headerName: "Email Address",
//     minWidth: 230,
//     flex: 1,
//   },
//   {
//     field: "role",
//     headerName: "Role",
//     minWidth: 150,
//     flex: 0.5,
//   },
// ];

// export default function ReportsPage() {
//   const [selectedCard, setSelectedCard] = useState<CardId | null>(null);

//   const [selectedCardTitle, setSelectedCardTitle] = useState("");

//   const [rows, setRows] = useState<GridRowsProp<ApiUserRecord>>([]);

//   const [loading, setLoading] = useState(false);

//   const [error, setError] = useState<string | null>(null);

//   const [searchText, setSearchText] = useState("");

//   const handleCardClick = async (card: ReportCard) => {
//     try {
//       setSelectedCard(card.id);
//       setSelectedCardTitle(card.title);
//       setSearchText("");
//       setRows([]);
//       setError(null);
//       setLoading(true);

//       const response = await axios.get<ApiUserRecord[]>(card.apiUrl);
//       console.log(response, "response from mock api");
//       if (!Array.isArray(response.data)) {
//         throw new Error("The API response is not a valid list.");
//       }

//       const formattedRows: ApiUserRecord[] = response.data.map(
//         (user, index) => ({
//           id: user.id ?? index + 1,
//           name: user.name ?? user.name,
//           email: user.email,
//           //   status: user.status ?? "Pending",
//           //   createdAt: record.createdAt ?? record.uploadedAt ?? "-",
//         }),
//       );

//       setRows(formattedRows);
//     } catch (error: unknown) {
//       setRows([]);

//       if (axios.isAxiosError(error)) {
//         if (error.response?.status === 404) {
//           setError(`${card.title} API endpoint was not found.`);
//         } else if (!error.response) {
//           setError("Unable to connect to the file service.");
//         } else {
//           setError(
//             error.response?.data?.message ?? "Unable to load file records.",
//           );
//         }
//       } else if (error instanceof Error) {
//         setError(error.message);
//       } else {
//         setError("An unexpected error occurred.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredRows = useMemo(() => {
//     const normalizedSearch = searchText.trim().toLowerCase();

//     if (!normalizedSearch) {
//       return rows;
//     }

//     return rows.filter((user) => {
//       const normalizedName = user.name?.toLowerCase() ?? "";

//       const normalizedEmail = user.email?.toLowerCase() ?? "";

//       return (
//         normalizedName.includes(normalizedSearch) ||
//         normalizedEmail.includes(normalizedSearch)
//       );
//     });
//   }, [rows, searchText]);

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-slate-900">Reports</h1>

//         <p className="mt-1 text-sm text-slate-500">
//           Select a card to view the corresponding file records.
//         </p>
//       </div>

//       {/* Cards */}

//       <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//         {cards.map((card) => {
//           const isSelected = selectedCard === card.id;

//           return (
//             <button
//               key={card.id}
//               type="button"
//               onClick={() => handleCardClick(card)}
//               className={`
//                 group
//                 cursor-pointer
//                 rounded-3xl
//                 bg-white
//                 p-8
//                 text-left
//                 shadow-sm
//                 transition-all
//                 duration-300
//                 hover:-translate-y-2
//                 hover:shadow-xl
//                 focus:outline-none
//                 focus:ring-4
//                 focus:ring-teal-500/20

//                 ${isSelected ? "ring-2 ring-teal-500 shadow-lg" : ""}
//               `}
//             >
//               <div
//                 className={`
//                   mb-8
//                   flex
//                   h-16
//                   w-16
//                   items-center
//                   justify-center
//                   rounded-full
//                   ${card.color}
//                 `}
//               >
//                 <span className="text-2xl text-white">{card.icon}</span>
//               </div>

//               <h2 className="text-[30px] font-semibold text-slate-800">
//                 {card.title}
//               </h2>

//               <p className="mt-2 text-slate-500">{card.description}</p>

//               <div className="mt-8 flex items-center justify-between">
//                 <span
//                   className="font-semibold"
//                   style={{
//                     color: card.textColor,
//                   }}
//                 >
//                   View files
//                 </span>

//                 <span
//                   className="rounded-full px-4 py-1 text-sm"
//                   style={{
//                     backgroundColor: card.badgeColor,
//                     color: card.textColor,
//                   }}
//                 >
//                   {card.count}
//                 </span>
//               </div>
//             </button>
//           );
//         })}
//       </div>

//       {/* Error */}

//       <Collapse in={Boolean(error)}>
//         {error && (
//           <Alert
//             severity="error"
//             onClose={() => setError(null)}
//             sx={{
//               borderRadius: 2,
//             }}
//           >
//             {error}
//           </Alert>
//         )}
//       </Collapse>

//       {/* Selected card table */}

//       {/* {selectedCard && !error && (
//         <Box
//           sx={{
//             mt: 4,
//             overflow: "hidden",
//             border: "1px solid #E2E8F0",
//             borderRadius: 3,
//             backgroundColor: "#FFFFFF",
//           }}
//         >
//           <Box
//             sx={{
//               px: 3,
//               py: 2.5,
//               borderBottom: "1px solid #E2E8F0",
//             }}
//           >
//             <Typography
//               component="h2"
//               variant="h6"
//               fontWeight={700}
//               color="#0F172A"
//             >
//               {selectedCardTitle}
//             </Typography>

//             <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//               Records loaded from the selected report service
//             </Typography>
//           </Box>

//           <DataTable
//             rows={rows}
//             columns={columns}
//             loading={loading}
//             emptyMessage={`No ${selectedCardTitle.toLowerCase()} found.`}
//           />
//         </Box>
//       )} */}
//       {selectedCard && !error && (
//         <Box
//           sx={{
//             mt: 4,
//             overflow: "hidden",
//             border: "1px solid #E2E8F0",
//             borderRadius: 3,
//             backgroundColor: "#FFFFFF",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: {
//                 xs: "column",
//                 md: "row",
//               },
//               alignItems: {
//                 xs: "stretch",
//                 md: "center",
//               },
//               justifyContent: "space-between",
//               gap: 2,
//               px: 3,
//               py: 2.5,
//               borderBottom: "1px solid #E2E8F0",
//             }}
//           >
//             <Box>
//               <Typography
//                 component="h2"
//                 variant="h6"
//                 fontWeight={700}
//                 color="#0F172A"
//               >
//                 {selectedCardTitle}
//               </Typography>

//               <Typography
//                 variant="body2"
//                 color="text.secondary"
//                 sx={{ mt: 0.5 }}
//               >
//                 Users loaded from the selected service
//               </Typography>
//             </Box>

//             <TextField
//               value={searchText}
//               onChange={(event) => setSearchText(event.target.value)}
//               placeholder="Search by name or email"
//               size="small"
//               disabled={loading}
//               slotProps={{
//                 input: {
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchRoundedIcon
//                         sx={{
//                           color: "#64748B",
//                         }}
//                       />
//                     </InputAdornment>
//                   ),
//                 },
//               }}
//               sx={{
//                 width: {
//                   xs: "100%",
//                   md: 320,
//                 },

//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: 2,

//                   "&.Mui-focused fieldset": {
//                     borderColor: "#0D9488",
//                   },
//                 },
//               }}
//             />
//           </Box>

//           <DataTable
//             rows={filteredRows}
//             columns={columns}
//             loading={loading}
//             emptyMessage={
//               searchText.trim()
//                 ? `No user found matching "${searchText.trim()}".`
//                 : `No users found for ${selectedCardTitle}.`
//             }
//           />
//         </Box>
//       )}
//     </div>
//   );
// }

import { useMemo, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";

import {
  Alert,
  Box,
  Collapse,
  InputAdornment,
  TextField,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import type { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import FolderIcon from "@mui/icons-material/Folder";
import SettingsIcon from "@mui/icons-material/Settings";
import DataTable from "../../components/common/DataTable";

type CardId = "breas" | "arcs" | "processed";
type CardCounts = Record<CardId, number>;
type CardCountLoading = Record<CardId, boolean>;

interface ReportCard {
  id: CardId;
  title: string;
  description: string;
  count: number;
  icon: ReactNode;
  backgroundColor: string;
  borderColor: string;
  iconBackgroundColor: string;
  iconBorderColor: string;
  blobColor: string;
  badgeColor: string;
  badgeTextColor: string;
  textColor: string;
  apiUrl: string;
}

interface ApiUserRecord {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
}

const cards: ReportCard[] = [
  {
    id: "breas",
    title: "Breas Files",
    description: "View and manage your Breas files",
    count: 0,
    icon: (
      <FolderIcon
        sx={{
          fontSize: 30,
        }}
      />
    ),
    backgroundColor: "rgb(240, 253, 250)",
    borderColor: "rgba(110, 231, 183, 0.55)",
    iconBackgroundColor: "#059B7F",
    iconBorderColor: "#059B7F",
    blobColor: "rgba(5, 155, 127, 0.08)",
    badgeColor: "#D1FAE5",
    badgeTextColor: "#059B7F",
    textColor: "#059B7F",
    apiUrl:
      "https://6aa26491ccb3db9689a66ef8.mockapi.io/api/response/bot/users",
  },

  {
    id: "arcs",
    title: "ARCS Files",
    description: "Access ARCS related files",
    count: 0,
    icon: (
      <AccountTreeIcon
        sx={{
          fontSize: 30,
        }}
      />
    ),
    backgroundColor: "rgb(242, 249, 255)",
    borderColor: "rgba(125, 211, 252, 0.55)",
    iconBackgroundColor: "#4FA4FB",
    iconBorderColor: "#4FA4FB",
    blobColor: "rgba(79, 164, 251, 0.08)",
    badgeColor: "#DBF1FF",
    badgeTextColor: "#4FA4FB",
    textColor: "#4FA4FB",
    apiUrl:
      "https://6aa26491ccb3db9689a66ef8.mockapi.io/api/response/bot/users",
  },

  {
    id: "processed",
    title: "Processed Files",
    description: "Track and manage processed files",
    count: 0,
    icon: (
      <SettingsIcon
        sx={{
          fontSize: 30,
        }}
      />
    ),
    backgroundColor: "rgb(246, 245, 252)",
    borderColor: "rgba(196, 181, 253, 0.55)",
    iconBackgroundColor: "#9761ED",
    iconBorderColor: "#9761ED",
    blobColor: "rgba(151, 97, 237, 0.08)",
    badgeColor: "#EDE9FF",
    badgeTextColor: "#9761ED",
    textColor: "#9761ED",
    apiUrl:
      "https://6aa26491ccb3db9689a66ef8.mockapi.io/api/response/bot/users",
  },
];

const columns: GridColDef<ApiUserRecord>[] = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "name",
    headerName: "Name",
    minWidth: 180,
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email Address",
    minWidth: 230,
    flex: 1,
  },
  {
    field: "role",
    headerName: "Role",
    minWidth: 150,
    flex: 0.5,
  },
  {
    field: "actions",
    headerName: "Actions",
    minWidth: 220,
    sortable: false,
    filterable: false,

    renderCell: () => (
      <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
        {/* <Button
          variant="contained"
          size="small"
          sx={{
            bgcolor: "#10B981",

            "&:hover": {
              bgcolor: "#059669",
            },
          }}
        >
          Approve
        </Button>

        <Button
          variant="contained"
          size="small"
          sx={{
            bgcolor: "#EF4444",

            "&:hover": {
              bgcolor: "#DC2626",
            },
          }}
        >
          Reject
        </Button> */}
        <Button variant="outlined" color="success" size="small">
          Approve
        </Button>

        <Button variant="outlined" color="error" size="small">
          Reject
        </Button>
      </Stack>
    ),
  },
];

export default function ReportsPage() {
  const [selectedCard, setSelectedCard] = useState<CardId | null>(null);

  const [selectedCardTitle, setSelectedCardTitle] = useState("");

  const [rows, setRows] = useState<GridRowsProp<ApiUserRecord>>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [searchText, setSearchText] = useState("");

  const [cardCounts, setCardCounts] = useState<CardCounts>({
    breas: 0,
    arcs: 0,
    processed: 0,
  });

  const [cardCountLoading, setCardCountLoading] = useState<CardCountLoading>({
    breas: true,
    arcs: true,
    processed: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    const loadCardCounts = async () => {
      const countResults = await Promise.allSettled(
        cards.map(async (card) => {
          try {
            const response = await axios.get<ApiUserRecord[]>(card.apiUrl, {
              signal: controller.signal,
            });

            if (!Array.isArray(response.data)) {
              throw new Error(`${card.title} did not return a valid list.`);
            }

            return {
              id: card.id,
              count: response.data.length,
            };
          } finally {
            setCardCountLoading((previous) => ({
              ...previous,
              [card.id]: false,
            }));
          }
        }),
      );

      if (controller.signal.aborted) {
        return;
      }

      countResults.forEach((result) => {
        if (result.status === "fulfilled") {
          setCardCounts((previous) => ({
            ...previous,
            [result.value.id]: result.value.count,
          }));
        }
      });
    };

    loadCardCounts();

    return () => {
      controller.abort();
    };
  }, []);

  const handleCardClick = async (card: ReportCard) => {
    try {
      setSelectedCard(card.id);
      setSelectedCardTitle(card.title);
      setSearchText("");
      setRows([]);
      setError(null);
      setLoading(true);

      const response = await axios.get<ApiUserRecord[]>(card.apiUrl);

      if (!Array.isArray(response.data)) {
        throw new Error("The API response is not a valid user list.");
      }

      const formattedRows: ApiUserRecord[] = response.data.map(
        (user, index) => ({
          id: user.id ?? String(index + 1),
          name: user.name?.trim() || "Unknown User",
          email: user.email?.trim() || "-",
          role: user.role?.trim() || "CUSTOMER",

          // Password is retained because the API returns it,
          // but it is intentionally not displayed.
          password: user.password,
        }),
      );

      setRows(formattedRows);
    } catch (error: unknown) {
      setRows([]);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setError(`${card.title} API endpoint was not found.`);
        } else if (!error.response) {
          setError("Unable to connect to the report service.");
        } else {
          const apiMessage =
            typeof error.response.data === "object" &&
            error.response.data !== null &&
            "message" in error.response.data
              ? String(error.response.data.message)
              : null;

          setError(apiMessage || "Unable to load report records.");
        }
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredRows = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    if (!normalizedSearch) {
      return rows;
    }

    return rows.filter((user) => {
      const normalizedName = String(user.name ?? "").toLowerCase();

      const normalizedEmail = String(user.email ?? "").toLowerCase();

      return (
        normalizedName.includes(normalizedSearch) ||
        normalizedEmail.includes(normalizedSearch)
      );
    });
  }, [rows, searchText]);

  return (
    <Box>
      {/* Page heading */}

      <Box sx={{ mb: 3 }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            color: "#0F172A",
            fontWeight: 700,
          }}
        >
          Reports
        </Typography>

        {/* <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
          Select a card to view the corresponding records.
        </Typography> */}
      </Box>

      {/* Cards */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(3, minmax(0, 1fr))",
          },

          gap: 3,
        }}
      >
        {cards.map((card) => {
          const isSelected = selectedCard === card.id;

          return (
            <Box
              key={card.id}
              component="button"
              type="button"
              onClick={() => handleCardClick(card)}
              aria-pressed={isSelected}
              sx={{
                position: "relative",
                minHeight: 205,
                overflow: "hidden",

                padding: 2.5,
                borderRadius: 4,

                border: isSelected
                  ? `2px solid ${card.textColor}`
                  : `1px solid ${card.borderColor}`,

                backgroundColor: card.backgroundColor,

                boxShadow: isSelected
                  ? `0 12px 28px ${card.textColor}25`
                  : "0 2px 4px rgba(15, 23, 42, 0.05)",

                cursor: "pointer",
                textAlign: "left",

                transition:
                  "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",

                "&:hover": {
                  transform: "translateY(-6px)",

                  boxShadow: `0 16px 35px ${card.textColor}25`,
                },

                "&:focus-visible": {
                  outline: `3px solid ${card.textColor}35`,
                  outlineOffset: "3px",
                },
              }}
            >
              {/* Decorative background shape */}

              <Box
                component="svg"
                viewBox="0 0 200 120"
                preserveAspectRatio="none"
                aria-hidden="true"
                sx={{
                  position: "absolute",
                  bottom: "-25px",
                  left: "-25px",
                  width: "180px",
                  height: "125px",
                  transform: "rotate(-3deg)",
                  transformOrigin: "bottom left",
                  pointerEvents: "none",
                }}
              >
                <path
                  d="
                    M0,0
                    C5,0 12,20 25,28
                    C40,38 55,50 70,58
                    C90,70 110,80 130,88
                    C150,96 170,102 185,104
                    C192,105 197,105 200,105
                    L200,120
                    L12,120
                    Q0,120 0,108
                    Z
                  "
                  fill={card.blobColor}
                />
              </Box>

              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* Icon */}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    width: 50,
                    height: 50,

                    mb: 2,
                    borderRadius: "50%",

                    color: "#FFFFFF",

                    backgroundColor: card.iconBackgroundColor,

                    border: `2px solid ${card.iconBorderColor}`,
                  }}
                >
                  {card.icon}
                </Box>

                {/* Title and arrow */}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography
                    component="h2"
                    sx={{
                      color: "#1E293B",
                      fontSize: "1.25rem",
                      fontWeight: 600,
                    }}
                  >
                    {card.title}
                  </Typography>

                  <Box
                    component="svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    sx={{
                      ml: "auto",
                      color: "#334155",
                    }}
                  >
                    <path d="M7 7l6 6-6 6" />
                  </Box>
                </Box>

                {/* Description */}

                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    color: "#64748B",
                  }}
                >
                  {card.description}
                </Typography>

                {/* Action and count */}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: 2.5,
                  }}
                >
                  <Typography
                    sx={{
                      color: card.textColor,
                      fontSize: "0.95rem",
                      fontWeight: 600,
                    }}
                  >
                    View records
                  </Typography>

                  <Box
                    component="span"
                    sx={{
                      minWidth: 42,
                      px: 1.5,
                      py: 0.5,

                      borderRadius: 10,

                      color: card.badgeTextColor,

                      backgroundColor: card.badgeColor,

                      fontSize: "0.85rem",
                      fontWeight: 700,
                      textAlign: "center",
                    }}
                  >
                    {cardCountLoading[card.id] ? "..." : cardCounts[card.id]}
                  </Box>
                </Box>

                {/* Decorative vertical arrow */}

                <Box
                  component="svg"
                  viewBox="0 0 40 200"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  sx={{
                    position: "absolute",
                    left: "50%",
                    top: "calc(100% - 160px)",

                    width: "2px",
                    height: "160px",

                    transform: "translateX(-50%)",

                    opacity: 0.08,
                    pointerEvents: "none",
                  }}
                >
                  <line
                    x1="20"
                    y1="0"
                    x2="20"
                    y2="185"
                    stroke={card.textColor}
                    strokeWidth="1.5"
                  />

                  <polygon
                    points="20,198 15,188 25,188"
                    fill={card.textColor}
                  />
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* API error */}

      <Collapse in={Boolean(error)}>
        {error && (
          <Alert
            severity="error"
            onClose={() => setError(null)}
            sx={{
              mt: 3,
              borderRadius: 2,
            }}
          >
            {error}
          </Alert>
        )}
      </Collapse>

      {/* Table section */}

      {selectedCard && !error && (
        <Box
          sx={{
            mt: 4,
            overflow: "hidden",

            border: "1px solid #E2E8F0",

            borderRadius: 3,

            backgroundColor: "#FFFFFF",
          }}
        >
          {/* Table heading and search */}

          <Box
            sx={{
              display: "flex",

              flexDirection: {
                xs: "column",
                md: "row",
              },

              alignItems: {
                xs: "stretch",
                md: "center",
              },

              justifyContent: "space-between",

              gap: 2,

              px: 3,
              py: 2.5,

              borderBottom: "1px solid #E2E8F0",
            }}
          >
            <Box>
              <Typography
                component="h2"
                variant="h6"
                sx={{
                  color: "#0F172A",
                  fontWeight: 700,
                }}
              >
                {selectedCardTitle}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Records loaded from the selected report service
              </Typography>
            </Box>

            <TextField
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search by name or email"
              size="small"
              disabled={loading}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon
                        sx={{
                          color: "#64748B",
                        }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                width: {
                  xs: "100%",
                  md: 320,
                },

                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,

                  "&.Mui-focused fieldset": {
                    borderColor: "#0D9488",
                  },
                },
              }}
            />
          </Box>

          {/* Reusable DataGrid */}

          <DataTable
            rows={filteredRows}
            columns={columns}
            loading={loading}
            emptyMessage={
              searchText.trim()
                ? `No user found matching "${searchText.trim()}".`
                : `No records found for ${selectedCardTitle}.`
            }
          />
        </Box>
      )}
    </Box>
  );
}
