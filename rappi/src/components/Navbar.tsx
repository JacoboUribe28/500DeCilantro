import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { getOrders } from "../services/orderService"; // Ajusta la ruta según tu estructura

const API_URL = import.meta.env.VITE_API_URL;

const socket = io(`${API_URL}`, {
  transports: ["websocket"],
  withCredentials: true,
});

const Navbar = () => {
  const [notifications, setNotifications] = useState(0);
  const [lastOrderCount, setLastOrderCount] = useState(0);
  const prevNotifications = useRef(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Función para verificar nuevas órdenes
  const checkForNewOrders = async () => {
    try {
      const orders = await getOrders();
      const currentOrderCount = orders.length;
      
      // Si hay más órdenes que antes, incrementar notificaciones
      if (lastOrderCount > 0 && currentOrderCount > lastOrderCount) {
        const newOrdersCount = currentOrderCount - lastOrderCount;
        setNotifications((prev) => prev + newOrdersCount);
      }
      
      setLastOrderCount(currentOrderCount);
    } catch (error) {
      console.error("Error checking for new orders:", error);
    }
  };

  // Inicializar el conteo de órdenes
  useEffect(() => {
    const initializeOrderCount = async () => {
      try {
        const orders = await getOrders();
        setLastOrderCount(orders.length);
      } catch (error) {
        console.error("Error initializing order count:", error);
      }
    };

    initializeOrderCount();
  }, []);

  // Polling para verificar nuevas órdenes cada 5 segundos
  useEffect(() => {
    intervalRef.current = setInterval(checkForNewOrders, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [lastOrderCount]);

  // Socket.IO listener (mantener por si el backend implementa sockets después)
  useEffect(() => {
    socket.on("new_notification", () => {
      setNotifications((prev) => prev + 1);
    });

    return () => {
      socket.off("new_notification");
    };
  }, []);

  // Reproducir sonido cuando hay nuevas notificaciones
  useEffect(() => {
    if (notifications > prevNotifications.current && audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log("Error playing notification sound:", error);
      });
    }
    prevNotifications.current = notifications;
  }, [notifications]);

  // Función para limpiar notificaciones
  const clearNotifications = () => {
    setNotifications(0);
  };

  return (
    <nav className="p-4 bg-blue-600 text-black flex justify-between">
      <div className="relative">
        <audio ref={audioRef} src="../notification.mp3" preload="auto" />
        <button 
          className="relative flex items-center gap-2 hover:bg-blue-700 px-3 py-2 rounded"
          onClick={clearNotifications}
        >
          🔔 Notificaciones
          {notifications > 0 && (
            <span className="bg-red-500 text-black text-xs px-2 py-1 rounded-full animate-pulse">
              {notifications}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;