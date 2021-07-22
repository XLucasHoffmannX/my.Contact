import { BrowserRouter as Router } from 'react-router-dom'
import { DataProvider } from './State'
import Header from './components/Header/Header';
import MainPages from './components/MainPage/MainPage';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <MainPages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
