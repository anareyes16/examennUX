import "./App.css";
import Tours from "./components/Tours";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container className="App">
      <Tours />
    </Container>
  );
}

export default App;