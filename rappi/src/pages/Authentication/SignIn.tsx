import { Link } from 'react-router-dom';
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';
import {useGoogleLogin} from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            'Authorization': `Bearer ${tokenResponse.access_token}`
          },
        });
        const userInfo = await res.json();
        localStorage.setItem('user', JSON.stringify(userInfo));
        console.log('Usuario de Google:', userInfo);
        navigate('/');
      } catch (error) {
        console.error('Error al obtener información del usuario', error);
      }
    },
    onError: () => {
      console.error('Error al iniciar sesión con Google');
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 flex items-center justify-center p-4 bg-black ">
      <div className="w-full max-w-6xl bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Lado izquierdo - Imagen y texto */}
          <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-gray-900 to-gray-950 p-12 text-white">
            <div className="flex flex-col h-full">
              <Link className="inline-block mb-8" to="/">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12">
                    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="12" y="20" width="40" height="24" rx="4" fill="#007bff"/>
                      <path d="M12 20L6 12H58L52 20H12Z" fill="#0056b3"/>
                      <circle cx="20" cy="48" r="6" fill="#ff6f61"/>
                      <circle cx="44" cy="48" r="6" fill="#ff6f61"/>
                      <path d="M14 14V8H50V14" stroke="#004080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M52 20V40H12V20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M28 34H36" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    Vene<span className="text-[#ff6f61]">cFood</span>
                  </div>
                </div>
              </Link>
              
              <div className="mb-8">
                <div className="w-full h-64 flex items-center justify-center bg-gray-800 rounded-lg shadow-lg">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 h-48">
                    <rect x="12" y="20" width="40" height="24" rx="4" fill="#007bff"/>
                    <path d="M12 20L6 12H58L52 20H12Z" fill="#0056b3"/>
                    <circle cx="20" cy="48" r="6" fill="#ff6f61"/>
                    <circle cx="44" cy="48" r="6" fill="#ff6f61"/>
                    <path d="M14 14V8H50V14" stroke="#004080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M52 20V40H12V20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M28 34H36" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <div>
                <h1 className="text-4xl font-bold mb-6">¡Bienvenido a VenecFood!</h1>
                <p className="text-lg text-gray-300">
                  Tu app favorita para pedir domicilios. Accede para disfrutar de las mejores ofertas y la comida más deliciosa.
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center text-gray-200">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Entrega rápida y segura</span>
                  </div>
                  <div className="flex items-center text-gray-200">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Los mejores restaurantes</span>
                  </div>
                  <div className="flex items-center text-gray-200">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Ofertas exclusivas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lado derecho - Formulario */}
          <div className="w-full md:w-1/2 p-8 md:p-12 bg-gray-900">
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">
                Inicia Sesión
              </h2>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-black placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-black placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-700 rounded bg-gray-800"
                    />
                    <label className="ml-2 block text-sm text-gray-200">
                      Recordarme
                    </label>
                  </div>
                  <a href="#" className="text-sm text-green-500 hover:text-green-400">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
                >
                  Iniciar Sesión
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-900 text-gray-400">
                      O continúa con
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    login();
                  }}
                  className="w-full flex items-center justify-center gap-3 bg-gray-800 text-white font-medium py-3 px-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition duration-200"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                      fill="#4285F4"
                    />
                    <path
                      d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                      fill="#34A853"
                    />
                    <path
                      d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                      fill="#EB4335"
                    />
                  </svg>
                  Continuar con Google
                </button>

                <p className="text-center text-sm text-gray-400">
                  ¿No tienes una cuenta?{' '}
                  <Link to="/auth/signup" className="text-green-500 hover:text-green-400 font-medium">
                    Regístrate
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
