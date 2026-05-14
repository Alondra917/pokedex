import { Route, Routes } from "react-router-dom";

import ListaPokemon from "./paginas/ListaPokemon";
import DetallePoke from "./paginas/DestallePoke";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListaPokemon />} />
      <Route path="/pokemon/:name" element={<DetallePoke />} />
    </Routes>
    
  );
}

export default App;
