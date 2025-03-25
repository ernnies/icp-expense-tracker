import {SnackbarProvider} from 'notistack';
import Home from './AppPages/Home/Home';
const App=()=> {
  return (
    <SnackbarProvider>
      <div>
        <Home/>
      </div>
    </SnackbarProvider>
  );
}

export default App;
