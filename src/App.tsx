import "./App.css";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";

function App() {
  return (
    <div>
      <Navbar />
      <Grid width={16} height={16} bombs={40} />
    </div>
  );
}

export default App;
