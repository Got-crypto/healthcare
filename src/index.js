import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import 'simplebar/src/simplebar.css';

import { Provider as ReduxProvider } from 'react-redux';

import 'assets/third-party/apex-chart.css';

import App from './App';
import { store } from 'store';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReduxProvider>
    </LocalizationProvider>
  </StrictMode>
);
