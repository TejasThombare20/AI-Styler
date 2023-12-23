import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";

function App() {
  return (
    <main className="relative w-full h-screen overflow-hidden transition-all ease-in">
      <Home />
      <Customizer />
      <Canvas />
    </main>
  );
}

export default App;
