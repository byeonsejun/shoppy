import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import { handleClickReset } from './components/js/util';

const queryClient = new QueryClient();
function App() {
  useEffect(() => {
    handleClickReset();
    return () => handleClickReset();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Navbar />
        <Outlet />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
