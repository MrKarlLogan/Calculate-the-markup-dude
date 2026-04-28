import { useEffect, useRef, useState } from "react";
import { TAgreement } from "@/entities/priceAgreement/types/types";
import agreementApi from "@/shared/api/agreementApi";
import { config } from "@/shared/config";

export const useWebSocket = (userId?: string, isAdmin?: boolean) => {
  const [agreements, setAgreements] = useState<TAgreement[]>([]);
  const [loading, setLoading] = useState(true);
  const wsRef = useRef<WebSocket | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    let isActive = true;

    const loadHistory = async () => {
      try {
        const response = await agreementApi.getAllMessages();
        const data = response.data;

        if (isActive) {
          const unique = Array.from(
            new Map(data.map((item) => [item.id, item])).values(),
          );
          setAgreements(unique.reverse());
          setLoading(false);
        }
      } catch {
        if (isActive) setLoading(false);
      }
    };

    loadHistory();

    return () => {
      isActive = false;
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!userId) return;

    let reconnectTimeout: NodeJS.Timeout;
    let shouldReconnect = true;

    const connect = () => {
      const ws = new WebSocket(config.WS_URL);
      wsRef.current = ws;

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

        setAgreements((prev) => {
          switch (message.event) {
            case "agreement:created":
              if (prev.some((agrement) => agrement.id === message.data.id))
                return prev;

              return [message.data, ...prev];

            case "agreement:updated":
              if (prev.some((agrement) => agrement.id === message.data.id))
                return prev.map((agrement) =>
                  agrement.id === message.data.id ? message.data : agrement,
                );
              return [message.data, ...prev];

            case "agreement:deleted":
              return prev.filter((agrement) => agrement.id !== message.data.id);

            default:
              return prev;
          }
        });
      };

      ws.onclose = () => {
        if (shouldReconnect) reconnectTimeout = setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      shouldReconnect = false;
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, [userId, isAdmin]);

  return { agreements, loading, setAgreements };
};
