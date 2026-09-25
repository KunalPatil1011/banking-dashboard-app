export type FileItemType = "file" | "dir" | "symlink" | "submodule";
export interface FileItem {
  id: string;
  name: string;
  path: string;
  type: FileItemType;
  size: number;
  htmlUrl: string;
  downloadUrl: string | null;
}
interface GitHubContentItem {
  sha: string;
  name: string;
  path: string;
  type: FileItemType;
  size: number;
  html_url: string;
  download_url: string | null;
}
const FILES_API_URL = "https://api.github.com/repos/mui/material-ui/contents";
export async function getFiles(signal?: AbortSignal): Promise<FileItem[]> {
  const response = await fetch(FILES_API_URL, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github+json",
    },
    signal,
  });
  if (!response.ok) {
    throw new Error(
      `Unable to load files. Request failed with status ${response.status}.`,
    );
  }
  const responseData = (await response.json()) as GitHubContentItem[];
  return responseData.map((item) => ({
    id: item.sha,
    name: item.name,
    path: item.path,
    type: item.type,
    size: item.size,
    htmlUrl: item.html_url,
    downloadUrl: item.download_url,
  }));
}
