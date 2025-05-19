import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import 'normalize.css';
import './styles/index.less';
import { Provider } from 'react-redux';
import { store } from './store';
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
