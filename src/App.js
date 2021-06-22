import './App.css';
import Container from '@material-ui/core/Container';
import Upload from './components/Upload'

function App() {
  return (
    <Container maxWidth='md' className="App">
      <Upload buttonText='Upload Excel File' />
    </Container>
  );
}

export default App;
