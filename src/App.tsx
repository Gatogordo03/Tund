import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from "./components/Card";
import User_name from "./components/User_name";
import Map from "./components/Map";

function App() {
  return (
    <main>
      <div className="Bienvenida">
        <User_name />
        {/* <Card />  */}
      </div>
      <div className="Map">
        <Map/>
      </div>
    </main>
  );
}

export default App;