import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Feed from './Feed/Feed';
import './App.css';
import './styles/utilities.css';
import './styles/colors.css'

function App() {
  return (
    <div className="app flex column light-gray-bg ">
      <Header/>
      <div className="app-body flex">
        <Sidebar/>
        <Feed/>
      </div>
    </div>
  );
}

export default App;
