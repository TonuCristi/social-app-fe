import { useEffect, useState } from "react";

export function useWebSocket(url: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [status, setStatus] = useState<string>();

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => setStatus("Connected");

    ws.onerror = () => setStatus("Error");

    ws.onclose = () => console.log("Closed");

    setSocket(ws);

    // return () => {
    //   ws.close();
    // };
  }, [url]);

  return { socket, status };
}
