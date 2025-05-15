import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow p-4">
        {/* Aquí va el contenido principal */}
        <h2 className="text-2xl font-semibold">Bienvenido a la app 🎉</h2>
        <p className="mt-2">Este es el contenido principal.</p>
      </main>

      <Footer />
    </div>
  );
}

export default App;
