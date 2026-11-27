import { RouterProvider } from 'react-router/dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from "react-redux";
import router from './routes/routes';
import { ModalProvider } from './provider/ModalProvider';
import { store } from './redux/store';
import './App.css'


const queryClient = new QueryClient();


function App() {

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default App;
export {
  queryClient,
}
