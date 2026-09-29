import { useEffect, useMemo, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import axios from "axios";
import dayjs, { type Dayjs } from "dayjs";
import {
  Alert,
  Box,
  ButtonBase,
  Collapse,
  IconButton,
  InputAdornment,
  Popover,
  TextField,
  Tooltip,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import type { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
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
    title: "Breas files",
    description: "View and manage your breas files",
    count: 0,
    icon: <DescriptionOutlinedIcon sx={{ fontSize: 29 }} />,
    backgroundColor: "#F0FCFB",
    borderColor: "#8EE3DE",
    iconBackgroundColor: "#00A58C",
    blobColor: "rgba(0, 165, 140, 0.075)",
    badgeColor: "#CCF4E9",
    badgeTextColor: "#008C77",
    textColor: "#009C85",
    apiUrl:
      "https://6aa26491ccb3db9689a66ef8.mockapi.io/api/response/bot/users",
  },
  {
    id: "arcs",
    title: "ARCS files",
    description: "Access ARCS related files",
    count: 0,
    icon: <BarChartRoundedIcon sx={{ fontSize: 30 }} />,
    backgroundColor: "#F1F8FF",
    borderColor: "#B8DCF8",
    iconBackgroundColor: "#4A9EF4",
    blobColor: "rgba(74, 158, 244, 0.075)",
    badgeColor: "#DDEEFF",
    badgeTextColor: "#4396ED",
    textColor: "#489CF3",
    apiUrl:
      "https://6aa26491ccb3db9689a66ef8.mockapi.io/api/response/bot/users",
  },
  {
    id: "processed",
    title: "Processed files",
    description: "Track and manage process",
    count: 0,
    icon: <SettingsOutlinedIcon sx={{ fontSize: 29 }} />,
    backgroundColor: "#F8F5FF",
    borderColor: "#DFC1FA",
    iconBackgroundColor: "#9455EA",
    blobColor: "rgba(148, 85, 234, 0.075)",
    badgeColor: "#EEE3FF",
    badgeTextColor: "#9253E8",
    textColor: "#9253E8",
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
  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs("2021-07-02"),
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(
    dayjs("2021-07-25"),
  );
  const [dateAnchorEl, setDateAnchorEl] =
    useState<HTMLElement | null>(null);
  const [filterEnabled, setFilterEnabled] = useState(false);
  const [cardCounts, setCardCounts] = useState<CardCounts>({
    breas: 0,
    arcs: 0,
    processed: 0,
  });
  const [cardCountLoading, setCardCountLoading] =
    useState<CardCountLoading>({
      breas: true,
      arcs: true,
      processed: true,
    });
  const dateCalendarOpen = Boolean(dateAnchorEl);
  useEffect(() => {
    const controller = new AbortController();
    const loadCardCounts = async () => {
      const countResults = await Promise.allSettled(
        cards.map(async (card) => {
          try {
            const response = await axios.get<ApiUserRecord[]>(
              card.apiUrl,
              {
                signal: controller.signal,
              },
            );
            if (!Array.isArray(response.data)) {
              throw new Error(
                `${card.title} did not return a valid list.`,
              );
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
  const handleOpenDateCalendar = (
    event: MouseEvent<HTMLElement>,
  ) => {
    setDateAnchorEl(event.currentTarget);
  };
  const handleCloseDateCalendar = () => {
    setDateAnchorEl(null);
  };
  const handleStartDateChange = (newDate: Dayjs | null) => {
    setStartDate(newDate);
    if (
      newDate &&
      endDate &&
      newDate.startOf("day").isAfter(endDate.startOf("day"))
    ) {
      setEndDate(newDate);
    }
  };
  const handleEndDateChange = (newDate: Dayjs | null) => {
    if (
      newDate &&
      startDate &&
      newDate.startOf("day").isBefore(startDate.startOf("day"))
    ) {
      setStartDate(newDate);
    }
    setEndDate(newDate);
  };
  const handleFilterClick = () => {
    setFilterEnabled((previous) => !previous);
  };
  const handleDownloadClick = () => {
    if (filteredRows.length === 0) {
      setError("There are no records available to download.");
      return;
    }
    const csvHeader = ["ID", "Name", "Email Address", "Role"];
    const csvRows = filteredRows.map((row) => [
      row.id,
      row.name,
      row.email,
      row.role,
    ]);
    const escapeCsvValue = (value: unknown) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;
    const csvContent = [csvHeader, ...csvRows]
      .map((row) => row.map(escapeCsvValue).join(","))
      .join("\n");
    const csvBlob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const csvUrl = URL.createObjectURL(csvBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = csvUrl;
    downloadLink.download = `${selectedCardTitle || "reports"
      }-${dayjs().format("YYYY-MM-DD")}.csv`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(csvUrl);
  };
  const handleCardClick = async (card: ReportCard) => {
    try {
      setSelectedCard(card.id);
      setSelectedCardTitle(card.title);
      setSearchText("");
      setRows([]);
      setError(null);
      setLoading(true);
      const response = await axios.get<ApiUserRecord[]>(
        card.apiUrl,
      );
      if (!Array.isArray(response.data)) {
        throw new Error(
          "The API response is not a valid user list.",
        );
      }
      const formattedRows: ApiUserRecord[] = response.data.map(
        (user, index) => ({
          id: user.id ?? String(index + 1),
          name: user.name?.trim() || "Unknown User",
          email: user.email?.trim() || "-",
          role: user.role?.trim() || "CUSTOMER",
          password: user.password,
        }),
      );
      setRows(formattedRows);
    } catch (caughtError: unknown) {
      setRows([]);
      if (axios.isAxiosError(caughtError)) {
        if (caughtError.response?.status === 404) {
          setError(`${card.title} API endpoint was not found.`);
        } else if (!caughtError.response) {
          setError("Unable to connect to the report service.");
        } else {
          const apiMessage =
            typeof caughtError.response.data === "object" &&
              caughtError.response.data !== null &&
              "message" in caughtError.response.data
              ? String(caughtError.response.data.message)
              : null;
          setError(
            apiMessage || "Unable to load report records.",
          );
        }
      } else if (caughtError instanceof Error) {
        setError(caughtError.message);
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
      const normalizedName = String(
        user.name ?? "",
      ).toLowerCase();
      const normalizedEmail = String(
        user.email ?? "",
      ).toLowerCase();
      return (
        normalizedName.includes(normalizedSearch) ||
        normalizedEmail.includes(normalizedSearch)
      );
    });
  }, [rows, searchText]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          width: "100%",
          color: "#081A3A",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            mb: 4,
            display: "flex",
            alignItems: {
              xs: "stretch",
              md: "center",
            },
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            gap: 2,
          }}
        >
          <Typography
            component="h1"
            sx={{
              color: "#081A3A",
              fontSize: {
                xs: "2rem",
                md: "2.75rem",
              },
              lineHeight: 1.15,
              fontWeight: 700,
              letterSpacing: "-0.6px",
            }}
          >
            Reports
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: {
                xs: "flex-start",
                md: "flex-end",
              },
              flexWrap: "wrap",
              gap: 1.75,
            }}
          >
            {/* Clickable date range */}
            <ButtonBase
              onClick={handleOpenDateCalendar}
              aria-label="Select report date range"
              aria-haspopup="dialog"
              aria-expanded={dateCalendarOpen}
              sx={{
                minHeight: 58,
                minWidth: {
                  xs: "100%",
                  sm: 390,
                },
                px: {
                  xs: 2,
                  sm: 2.5,
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.5,
                color: "#334A6B",
                backgroundColor: "#FFFFFF",
                border: "1px solid #DCE3EC",
                borderRadius: "18px",
                boxShadow: "0 2px 6px rgba(15, 23, 42, 0.08)",
                transition:
                  "border-color 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  borderColor: "#9FCFD0",
                  boxShadow:
                    "0 4px 12px rgba(15, 23, 42, 0.1)",
                },
                "&:focus-visible": {
                  outline: "3px solid rgba(0, 137, 123, 0.2)",
                  outlineOffset: "2px",
                },
              }}
            >
              <CalendarMonthOutlinedIcon
                sx={{
                  color: "#61738D",
                  fontSize: 26,
                  flexShrink: 0,
                }}
              />
              <Typography
                component="span"
                sx={{
                  color: "#334A6B",
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1.05rem",
                  },
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                {startDate
                  ? startDate.format("DD MMM YYYY")
                  : "Start date"}
              </Typography>
              <Typography
                component="span"
                sx={{
                  color: "#8090A6",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                }}
              >
                -
              </Typography>
              <Typography
                component="span"
                sx={{
                  color: "#334A6B",
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1.05rem",
                  },
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                {endDate
                  ? endDate.format("DD MMM YYYY")
                  : "End date"}
              </Typography>
              <CalendarMonthOutlinedIcon
                sx={{
                  color: "#61738D",
                  fontSize: 26,
                  flexShrink: 0,
                }}
              />
            </ButtonBase>
            {/* Filter button */}
            <Tooltip title="Filter records">
              <IconButton
                onClick={handleFilterClick}
                aria-label="Filter records"
                aria-pressed={filterEnabled}
                sx={{
                  width: 50,
                  height: 50,
                  color: "#007F7C",
                  backgroundColor: filterEnabled
                    ? "#E6F7F5"
                    : "#FFFFFF",
                  border: "1px solid #9DD4D3",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#E6F7F5",
                  },
                }}
              >
                <FilterListRoundedIcon sx={{ fontSize: 25 }} />
              </IconButton>
            </Tooltip>
            {/* Download button */}
            <Tooltip title="Download records">
              <span>
                <IconButton
                  onClick={handleDownloadClick}
                  aria-label="Download records"
                  disabled={!selectedCard || loading}
                  sx={{
                    width: 50,
                    height: 50,
                    color: "#007F7C",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #9DD4D3",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#E6F7F5",
                    },
                    "&.Mui-disabled": {
                      color: "#A8B7C7",
                      borderColor: "#D8E1EA",
                      backgroundColor: "#F8FAFC",
                    },
                  }}
                >
                  <FileDownloadOutlinedIcon
                    sx={{ fontSize: 25 }}
                  />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        </Box>
        {/* Calendar popup */}
        <Popover
          open={dateCalendarOpen}
          anchorEl={dateAnchorEl}
          onClose={handleCloseDateCalendar}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                p: 1.5,
                maxWidth: "calc(100vw - 24px)",
                borderRadius: "16px",
                border: "1px solid #E2E8F0",
                boxShadow:
                  "0 14px 35px rgba(15, 23, 42, 0.16)",
              },
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                lg: "row",
              },
              gap: 1,
            }}
          >
            <Box>
              <Typography
                sx={{
                  px: 2,
                  pt: 1,
                  color: "#081A3A",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                }}
              >
                Start date
              </Typography>
              <DateCalendar
                value={startDate}
                onChange={handleStartDateChange}
              />
            </Box>
            <Box
              sx={{
                borderLeft: {
                  xs: "none",
                  lg: "1px solid #E2E8F0",
                },
                borderTop: {
                  xs: "1px solid #E2E8F0",
                  lg: "none",
                },
              }}
            >
              <Typography
                sx={{
                  px: 2,
                  pt: 1,
                  color: "#081A3A",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                }}
              >
                End date
              </Typography>
              <DateCalendar
                value={endDate}
                onChange={handleEndDateChange}
                minDate={startDate ?? undefined}
              />
            </Box>
          </Box>
        </Popover>
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
                  minHeight: 232,
                  overflow: "hidden",
                  p: 3.5,
                  borderRadius: "20px",
                  border: isSelected
                    ? `2px solid ${card.textColor}`
                    : `1px solid ${card.borderColor}`,
                  backgroundColor: card.backgroundColor,
                  boxShadow: isSelected
                    ? `0 12px 30px ${card.textColor}20`
                    : "0 2px 5px rgba(15, 23, 42, 0.04)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textAlign: "left",
                  transition:
                    "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 14px 30px ${card.textColor}20`,
                  },
                  "&:focus-visible": {
                    outline: `3px solid ${card.textColor}30`,
                    outlineOffset: "3px",
                  },
                }}
              >
                {/* Decorative bottom curve */}
                <Box
                  component="svg"
                  viewBox="0 0 500 130"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "95px",
                    pointerEvents: "none",
                  }}
                >
                  <path
                    d="
                      M0,0
                      C70,58 140,84 230,100
                      C320,118 405,128 500,130
                      L500,130
                      L0,130
                      Z
                    "
                    fill={card.blobColor}
                  />
                </Box>
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    height: "100%",
                  }}
                >
                  {/* Card icon */}
                  <Box
                    sx={{
                      width: 61,
                      height: 61,
                      mb: 2.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      backgroundColor: card.iconBackgroundColor,
                      borderRadius: "50%",
                    }}
                  >
                    {card.icon}
                  </Box>
                  {/* Card title and arrow */}
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
                        color: "#0B1833",
                        fontSize: {
                          xs: "1.2rem",
                          lg: "1.3rem",
                        },
                        lineHeight: 1.25,
                        fontWeight: 600,
                      }}
                    >
                      {card.title}
                    </Typography>
                    <KeyboardArrowRightRoundedIcon
                      sx={{
                        ml: "auto",
                        color: "#26374F",
                        fontSize: 25,
                      }}
                    />
                  </Box>
                  {/* Description */}
                  <Typography
                    sx={{
                      mt: 0.75,
                      color: "#5D6878",
                      fontSize: "0.92rem",
                      lineHeight: 1.45,
                      fontWeight: 400,
                    }}
                  >
                    {card.description}
                  </Typography>
                  {/* Download and count */}
                  <Box
                    sx={{
                      mt: 2.25,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        color: card.textColor,
                        fontSize: "0.98rem",
                        fontWeight: 600,
                      }}
                    >
                      Download
                    </Typography>
                    <Box
                      component="span"
                      sx={{
                        minWidth: 42,
                        px: 1.6,
                        py: 0.45,
                        color: card.badgeTextColor,
                        backgroundColor: card.badgeColor,
                        borderRadius: "999px",
                        fontSize: "0.85rem",
                        lineHeight: 1.5,
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      {cardCountLoading[card.id]
                        ? "..."
                        : cardCounts[card.id]}
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
        {/* Error message */}
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
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: 3,
            }}
          >
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
                  sx={{
                    color: "#081A3A",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                  }}
                >
                  {selectedCardTitle}
                </Typography>
                <Typography
                  sx={{
                    mt: 0.5,
                    color: "#64748B",
                    fontSize: "0.875rem",
                  }}
                >
                  Records loaded from the selected report service
                </Typography>
              </Box>
              <TextField
                value={searchText}
                onChange={(event) =>
                  setSearchText(event.target.value)
                }
                placeholder="Search by name or email"
                size="small"
                disabled={loading}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRoundedIcon
                          sx={{ color: "#64748B" }}
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
    </LocalizationProvider>
  );
}