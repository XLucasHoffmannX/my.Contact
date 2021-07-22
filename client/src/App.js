import { BrowserRouter as Router } from 'react-router-dom'
import { DataProvider } from './State'
import Header from './components/Header/Header';
import MainPages from './components/MainPage/MainPage';
import SideBar from './components/SideBars/SideBar';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <MainPages />
          <SideBar />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
