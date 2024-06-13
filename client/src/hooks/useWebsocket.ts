// src/hooks/useWebSocket.js
import { DataPayload } from "@/interfaces/api";
import { useState, useEffect } from "react";

const useWebSocket = (url: string) => {
  const [data, setData] = useState<DataPayload | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      setData(parsedData);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, [url]);

  return data;
};

export default useWebSocket;
