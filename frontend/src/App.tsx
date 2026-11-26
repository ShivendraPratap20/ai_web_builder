import { RouterProvider } from 'react-router/dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import router from './routes/routes';
import { ModalProvider } from './provider/ModalProvider';
import './App.css'


const queryClient = new QueryClient();


function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </QueryClientProvider>
    </>
  )
}

export default App;
export {
  queryClient,
}
