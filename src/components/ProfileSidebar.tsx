
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Home, User, Calendar, HelpCircle, LogOut } from 'lucide-react';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const SidebarLink = ({ to, icon, label, active }: SidebarLinkProps) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 py-3 px-4 rounded-md ${
      active ? 'text-culturapp-coral font-medium' : 'text-gray-600 hover:text-culturapp-coral'
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </Link>
);

const ProfileSidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isOrganizer = user?.userType === 'organizer';
  const basePath = isOrganizer ? '/organizador' : '/participante';
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <aside className="w-full md:w-64 bg-culturapp-primary text-white p-4">
      <div className="mb-8 pb-4 border-b border-white/20">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold">
                {user?.name.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-medium">{user?.name}</h3>
            <p className="text-sm text-white/70">{user?.email}</p>
          </div>
        </div>
        
        <p className="text-sm text-white/80 mt-2">
          {isOrganizer ? 'Área do Organizador' : 'Área do Participante'}
        </p>
      </div>
      
      <nav className="space-y-1">
        <SidebarLink
          to={`${basePath}/inicio`}
          icon={<Home size={18} />}
          label="Início"
          active={currentPath === `${basePath}/inicio`}
        />
        
        <SidebarLink
          to={`${basePath}/perfil`}
          icon={<User size={18} />}
          label="Meus dados"
          active={currentPath === `${basePath}/perfil`}
        />
        
        {isOrganizer ? (
          <SidebarLink
            to={`${basePath}/eventos`}
            icon={<Calendar size={18} />}
            label="Meus eventos"
            active={currentPath === `${basePath}/eventos`}
          />
        ) : (
          <SidebarLink
            to="/eventos"
            icon={<Calendar size={18} />}
            label="Encontrar eventos"
            active={currentPath === "/eventos"}
          />
        )}
        
        <SidebarLink
          to="/faq"
          icon={<HelpCircle size={18} />}
          label="Ajuda"
          active={currentPath === "/faq"}
        />
        
        <div className="pt-6 mt-8 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 py-3 px-4 w-full text-left text-white/80 hover:text-white"
          >
            <LogOut size={18} />
            <span>Sair</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
