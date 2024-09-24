import logo from './logo.svg';
import './App.css';
import { DataProvider } from './DataProvider';
import GetData from './GetData';
import AmountHead from './AmountHead';
import ItemList from './ItemList';
import AddItem from './AddItem';

function App() {
  return (
    <div className="App">
    <DataProvider>
      <AmountHead/>
      <GetData/>
      <ItemList/>
      <AddItem/>
    </DataProvider>
    </div>
  );
}

export default App;
