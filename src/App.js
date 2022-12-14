import { useCallback, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RequireAuth } from 'utils/RequireAuth';
import { Layout } from 'themes/Layouts';

import { AuthProvider } from 'context/AuthContext';

import { PublicPage } from 'pages/PublicPage';

import { ProtectedPage } from 'pages/ProtectedPage';
import { MoviesProvider } from 'context/MoviesContext';

function App() {
  /* const { i18n } = useTranslation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lang = localStorage.getItem('translateLng') || 'en';
      if (lang) {
        i18n.changeLanguage(lang);
      }
    }
  }, [i18n]);
  
  const onChangeLng = useCallback(
    (lng) => {
      i18n.changeLanguage(lng);
      localStorage.setItem('translateLng', lng);
    },
    [i18n]
  ); */

  return (
    <AuthProvider>
      <MoviesProvider>
        <div className="App">
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<PublicPage />} />
              <Route
                path="/protected"
                element={
                  <RequireAuth>
                    <ProtectedPage />
                  </RequireAuth>
                }
              />
            </Route>
          </Routes>
        </div>
      </MoviesProvider>
    </AuthProvider>
  );
}

export default App;
