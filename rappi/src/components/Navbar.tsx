import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  withCredentials: true,
});

const Navbar = () => {
  const [notifications, setNotifications] = useState(0);
  const prevNotifications = useRef(0);
  const audioRef = useRef<HTMLAudioElement>(null); // <- TIPO CORRECTO

  useEffect(() => {
    socket.on("new_notification", () => {
      setNotifications((prev) => prev + 1);
    });

    return () => {
      socket.off("new_notification");
    };
  }, []);

  useEffect(() => {
    if (notifications > prevNotifications.current && audioRef.current) {
      audioRef.current.play();
    }
    prevNotifications.current = notifications;
  }, [notifications]);

  return (
    <nav className="p-4 bg-blue-600 text-black flex justify-between">
      <div className="relative">
        <audio ref={audioRef} src="/notification.mp3" preload="auto" />
        <button className="relative flex items-center gap-2">
          🔔 Notificaciones
          {notifications > 0 && (
            <span className="bg-red-500 text-xs px-2 py-1 rounded-full">
              {notifications}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
