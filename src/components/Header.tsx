
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Eventos', path: '/eventos' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Sobre', path: '/sobre' },
  ];

  return (
    <header className="bg-culturapp-primary text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-white text-culturapp-primary w-8 h-8 rounded-md flex items-center justify-center font-bold">
            C
          </div>
          <span className="text-xl font-bold">CulturApp</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`hover:text-gray-200 ${
                  location.pathname === item.path ? 'font-bold' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex space-x-3">
            {isAuthenticated ? (
              <>
                <Link
                  to={user?.userType === 'organizer' ? '/organizador/perfil' : '/participante/perfil'}
                  className="px-4 py-1.5 rounded-md text-white"
                >
                  Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-culturapp-coral hover:bg-opacity-90 px-4 py-1.5 rounded-md"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/cadastro"
                  className="bg-culturapp-coral hover:bg-opacity-90 px-4 py-1.5 rounded-md"
                >
                  Signup
                </Link>
                <Link
                  to="/login"
                  className="bg-white text-culturapp-primary hover:bg-gray-100 px-4 py-1.5 rounded-md"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-culturapp-primary py-4 px-4">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`hover:text-gray-200 ${
                  location.pathname === item.path ? 'font-bold' : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  to={user?.userType === 'organizer' ? '/organizador/perfil' : '/participante/perfil'}
                  className="hover:text-gray-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Perfil
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left hover:text-gray-200"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/cadastro"
                  className="hover:text-gray-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Signup
                </Link>
                <Link
                  to="/login"
                  className="hover:text-gray-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
