// @ts-nocheck
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { lazy, Suspense } from 'react';

import Header from './components/Header';
import Dashboard from './pages/Dashboard';

// Lazy load all pages except Dashboard
const Plants = lazy(() => import('./pages/Plants'));
const PlantDetail = lazy(() => import('./pages/PlantDetail'));
const Calculator = lazy(() => import('./pages/Calculator'));
const Environment = lazy(() => import('./pages/Environment'));

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="container mx-auto py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/plants"
              element={
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center h-64">
                      Loading...
                    </div>
                  }
                >
                  <Plants />
                </Suspense>
              }
            />
            <Route
              path="/plants/:id"
              element={
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center h-64">
                      Loading...
                    </div>
                  }
                >
                  <PlantDetail />
                </Suspense>
              }
            />
            <Route
              path="/calculator"
              element={
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center h-64">
                      Loading...
                    </div>
                  }
                >
                  <Calculator />
                </Suspense>
              }
            />
            <Route
              path="/environment"
              element={
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center h-64">
                      Loading...
                    </div>
                  }
                >
                  <Environment />
                </Suspense>
              }
            />
          </Routes>
        </main>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
