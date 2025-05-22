import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const navigate = useNavigate();

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Cerrar dropdown si se hace clic fuera
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  // Cerrar dropdown con tecla Escape
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!dropdownOpen || key !== 'Escape') return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setDropdownOpen(false);
    navigate('/auth/signin');
  };

  return (
    <div className="relative">
      <button
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user?.name || 'Invitado'}
          </span>
          {/* <span className="block text-xs">UX Designer</span> */}
        </span>
        <span className="h-12 w-12 rounded-full overflow-hidden">
          <img
            src={user?.picture || '/default-avatar.png'}
            alt="User"
            className="object-cover w-full h-full"
          />
        </span>
        <svg
          className={`hidden fill-current sm:block transition-transform ${
            dropdownOpen ? 'rotate-180' : ''
          }`}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.41 0.91a1 1 0 011.18 0L6 5.32l4.41-4.41a1 1 0 111.18 1.18L6.59 7.09a1 1 0 01-1.18 0L0.41 2.09a1 1 0 010-1.18z"
          />
        </svg>
      </button>

      {/* Dropdown */}
      <div
        ref={dropdown}
        className={`absolute right-0 mt-4 w-64 rounded-sm border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-6 dark:border-strokedark">
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-3.5 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              🧑 Mi Perfil
            </Link>
          </li>
          <li>
            <Link
              to="/contacts"
              className="flex items-center gap-3.5 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              📇 Mis Contactos
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center gap-3.5 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              ⚙️ Configuración
            </Link>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="block w-full px-6 py-4 text-left text-sm font-medium text-red-600 hover:text-red-800"
        >
          🚪 Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default DropdownUser;
