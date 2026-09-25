import { useEffect, useMemo, useState } from "react";
import { Alert, Button, Chip, IconButton, Snackbar, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import DataTable from "../../components/common/DataTable";
import { getFiles, type FileItem } from "../../services/fileService";
type SnackbarSeverity = "success" | "error" | "info";
interface SnackbarState {
    open: boolean;
    message: string;
    severity: SnackbarSeverity;
}
function FilesPage() {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        message: "",
        severity: "info",
    });
    const [selectedCard, setSelectedCard] =
        useState<string | null>(null);
    const cards = [
        {
            id: "breas",
            title: "Breas files",
            description:
                "View and manage your breas files",
            count: 12,
            icon: "📄",
            color: "bg-teal-500",
            badgeColor: "#DDF4EF",
            textColor: "#14B8A6",
        },

        {
            id: "arcs",
            title: "ARCS files",
            description:
                "Access ARCS related files",
            count: 11,
            icon: "📊",
            color: "bg-blue-500",
            badgeColor: "#E2ECFF",
            textColor: "#3B82F6",
        },

        {
            id: "processed",
            title: "Processed files",
            description:
                "Track and manage process",
            count: 17,
            icon: "⚙️",
            color: "bg-purple-500",
            badgeColor: "#F2E9FF",
            textColor: "#A855F7",
        },
    ];
    const loadFiles = async (showSuccessMessage = false) => {
        try {
            setLoading(true);
            const fileData = await getFiles();
            setFiles(fileData);
            if (showSuccessMessage) {
                setSnackbar({
                    open: true,
                    message: "Files loaded successfully.",
                    severity: "success",
                });
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Something went wrong while loading files.";
            setSnackbar({
                open: true,
                message: errorMessage,
                severity: "error",
            });
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        void loadFiles(true);
    }, []);
    const columns = useMemo<GridColDef[]>(
        () => [
            {
                field: "name",
                headerName: "File Name",
                minWidth: 240,
                flex: 1.4,
                renderCell: (params: GridRenderCellParams) => {
                    const isFolder = params.row.type === "dir";
                    return (
                        <div className="flex h-full items-center gap-2">
                            {isFolder ? (
                                <FolderIcon fontSize="small" sx={{ color: "#f59e0b" }} />
                            ) : (
                                <InsertDriveFileIcon
                                    fontSize="small"
                                    sx={{ color: "#2563eb" }}
                                />
                            )}
                            <span className="truncate font-medium text-slate-800">
                                {params.row.name}
                            </span>
                        </div>
                    );
                },
            },
            {
                field: "path",
                headerName: "Path",
                minWidth: 240,
                flex: 1.4,
            },
            {
                field: "type",
                headerName: "Type",
                width: 130,
                renderCell: (params: GridRenderCellParams) => {
                    const isFolder = params.row.type === "dir";
                    return (
                        <Chip
                            size="small"
                            label={isFolder ? "Folder" : "File"}
                            color={isFolder ? "warning" : "primary"}
                            variant="outlined"
                        />
                    );
                },
            },
            {
                field: "size",
                headerName: "Size",
                width: 120,
                align: "right",
                headerAlign: "right",
            },
            {
                field: "action",
                headerName: "Action",
                width: 110,
                sortable: false,
                filterable: false,
                align: "center",
                headerAlign: "center",
                renderCell: (params: GridRenderCellParams) => (
                    <Tooltip title="Open in GitHub">
                        <IconButton
                            component="a"
                            href={params.row.htmlUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                            aria-label={`Open ${params.row.name} in GitHub`}
                        >
                            <OpenInNewIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                ),
            },
        ],
        []
    );
    const handleRefresh = () => {
        void loadFiles(true);
    };
    const handleCloseSnackbar = () => {
        setSnackbar((previousState) => ({
            ...previousState,
            open: false,
        }));
    };
    return (
        <section className="mx-auto max-w-7xl px-6 py-8">
            {!selectedCard ? (
                <>
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-slate-900">
                            Dashboard
                        </h1>
                        <p className="mt-3 text-lg text-slate-500">
                            Overview of your files and process
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {cards.map((card) => (
                            <div
                                key={card.id}
                                onClick={() => setSelectedCard(card.id)}
                                className="group cursor-pointer rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div
                                    className={`mb-8 flex h-16 w-16 items-center justify-center rounded-full ${card.color}`}
                                >
                                    <span className="text-2xl text-white">
                                        {card.icon}
                                    </span>
                                </div>
                                <h2 className="text-[30px] font-semibold text-slate-800">
                                    {card.title}
                                </h2>
                                <p className="mt-2 text-slate-500">
                                    {card.description}
                                </p>
                                <div className="mt-8 flex items-center justify-between">
                                    <span
                                        className="font-semibold"
                                        style={{
                                            color: card.textColor,
                                        }}
                                    >
                                        Download
                                    </span>

                                    <span
                                        className="rounded-full px-4 py-1 text-sm"
                                        style={{
                                            backgroundColor: card.badgeColor,
                                            color: card.textColor,
                                        }}
                                    >
                                        {card.count}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <Button
                                onClick={() => setSelectedCard(null)}
                            >
                                Back
                            </Button>
                            <h2 className="text-2xl font-bold">
                                {
                                    cards.find(
                                        (card) =>
                                            card.id === selectedCard
                                    )?.title
                                }
                            </h2>
                        </div>
                        <Button
                            variant="contained"
                            startIcon={<RefreshIcon />}
                            onClick={handleRefresh}
                        >
                            Refresh
                        </Button>
                    </div>
                    <DataTable
                        rows={files}
                        columns={columns}
                        loading={loading}
                        emptyMessage="No files are available."
                    />
                </>
            )}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                <Alert
                    severity={snackbar.severity}
                    variant="filled"
                    onClose={handleCloseSnackbar}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </section>
    );
}
export default FilesPage;
