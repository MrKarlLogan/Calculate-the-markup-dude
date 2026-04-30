import { useEffect, useRef, useState } from "react";
import { TAgreement } from "@entities/priceAgreement/types/types";
import agreementApi from "@shared/api/agreementApi";
import { config } from "@shared/config";

export const useWebSocket = (
  userId?: string,
  isAdmin?: boolean,
  onEvent?: (event: string, data: TAgreement) => void,
) => {
  const [agreements, setAgreements] = useState<TAgreement[]>([]);
  const [loading, setLoading] = useState(true);
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await agreementApi.getAllMessages();
        const unique = Array.from(
          new Map(response.data.map((item) => [item.id, item])).values(),
        );

        setAgreements([...unique].reverse());
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  useEffect(() => {
    if (!userId) return;

    let reconnectTimeout: NodeJS.Timeout;
    let isActive = true;

    const connect = () => {
      if (socket.current?.readyState === WebSocket.OPEN) return;
      const ws = new WebSocket(config.WS_URL);
      socket.current = ws;

      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            type: isAdmin ? "join:admin" : "join:user",
            userId,
          }),
        );
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);

        onEvent?.(message.event, message.data);

        setAgreements((prev) => {
          switch (message.event) {
            case "agreement:created":
              return [
                message.data,
                ...prev.filter((item) => item.id !== message.data.id),
              ];

            case "agreement:updated":
              return prev.map((item) =>
                item.id === message.data.id ? message.data : item,
              );

            case "agreement:deleted":
              return prev.filter((item) => item.id !== message.data.id);

            default:
              return prev;
          }
        });
      };

      ws.onclose = () => {
        if (!isActive) return;
        if (reconnectTimeout) clearTimeout(reconnectTimeout);
        reconnectTimeout = setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      isActive = false;
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      socket.current?.close();
      socket.current = null;
    };
  }, [userId, isAdmin]);

  return { agreements, loading };
};
