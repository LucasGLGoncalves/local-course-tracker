import { RootProvider } from './RootContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Chapters from './Chapters';
import VideoPlayer from './VideoPlayer'; // nova tela
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/module/:moduleId" element={<Chapters />} />
          <Route path="/module/:moduleId/:chapterId" element={<VideoPlayer />} />
          <Route path="*" element={<div className="p-4">Página não encontrada</div>} />
        </Routes>
      </BrowserRouter>
    </RootProvider>
  </React.StrictMode>,
);