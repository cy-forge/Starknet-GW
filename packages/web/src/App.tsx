import { Route, Routes } from 'react-router';
import './App.css';
import DashboardLayout from './components/layout/DashboardLayout';
import ProfileLayout from './components/layout/ProfileLayout';
import { dashboardRoutes } from './lib/routes';
import HomePage from './pages/Home';
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<DashboardLayout />}>
        {dashboardRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="/profile" element={<ProfileLayout />} />
      </Route>
    </Routes>
  );
}

export default App;
