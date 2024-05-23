import { useEffect, useState } from "react";

export function useWebSocket(url: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [status, setStatus] = useState<string>();

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => setStatus("Connected");

    ws.onerror = () => setStatus("Error");

    ws.onclose = () => console.log("Closed");

    ws.onmessage = (e) => {
      console.log("New noyt");
      // console.log(JSON.parse(JSON.parse(e.data)));
      console.log(JSON.parse(e.data));
      // console.log(e.data);
    };

    setSocket(ws);

    // return () => {
    //   ws.close();
    // };
  }, [url]);

  return { socket, status };
}
