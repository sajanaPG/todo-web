import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <Home />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
