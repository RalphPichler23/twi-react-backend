// components/layout/Layout.tsx
import { Outlet, Link } from 'react-router-dom';
import { useStore } from '@state';
import { signOut } from '@lib/supabaseAuth';
import { protectedRoutes } from '@routes';

const MainLayout = () => {
  const { user } = useStore();

  // Nur Routes die in der Nav angezeigt werden sollen
  const navRoutes = protectedRoutes.filter(route => route.showInNav);

  return (
    <div className="layout">
      <nav className="navbar">
        <h1>My App</h1>
        
        <div className="nav-links">
          {navRoutes.map(route => (
            <Link key={route.path} to={route.path}>
              {route.title}
            </Link>
          ))}
        </div>

        <div className="user-menu">
          <span>{user?.email}</span>
          <button onClick={signOut}>Logout</button>
        </div>
      </nav>
      
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;