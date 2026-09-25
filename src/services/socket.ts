let socket: WebSocket | null = null;
export function connectSocket(socketUrl: string): WebSocket {
  if (
    socket &&
    (socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING)
  ) {
    return socket;
  }
  socket = new WebSocket(socketUrl);
  return socket;
}
export function getSocket(): WebSocket | null {
  return socket;
}
export function disconnectSocket(): void {
  if (!socket) {
    return;
  }
  socket.close();
  socket = null;
}
