
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useEvents } from '@/context/EventContext';
import ProfileSidebar from '@/components/ProfileSidebar';
import { formatCurrency } from '@/lib/utils';

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getOrganizerEvents } = useEvents();
  
  const myEvents = user ? getOrganizerEvents(user.id) : [];
  const activeEvents = myEvents.filter(event => event.status === 'active');
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.userType !== 'organizer') {
      navigate('/participante/inicio');
    }
  }, [user, navigate]);
  
  const handleCreateEvent = () => {
    navigate('/organizador/criar-evento');
  };
  
  const handleManageEvents = () => {
    navigate('/organizador/eventos');
  };
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <ProfileSidebar />
      
      <main className="flex-1 bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-2xl font-bold mb-4">Bem-vindo(a), {user?.name}!</h1>
            <p className="text-gray-600">
              Gerencie seus eventos culturais e alcance mais público através da nossa plataforma.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-2">Total de eventos</h3>
              <p className="text-3xl font-bold text-culturapp-primary">{myEvents.length}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-2">Eventos ativos</h3>
              <p className="text-3xl font-bold text-green-600">{activeEvents.length}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-2">Valor médio</h3>
              <p className="text-3xl font-bold text-culturapp-coral">
                {myEvents.length > 0 
                  ? formatCurrency(myEvents.reduce((sum, event) => sum + event.ticketPrice, 0) / myEvents.length)
                  : formatCurrency(0)}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <button
              onClick={handleCreateEvent}
              className="flex-1 bg-culturapp-coral hover:bg-opacity-90 text-white py-4 rounded-md font-medium"
            >
              Criar novo evento
            </button>
            
            <button
              onClick={handleManageEvents}
              className="flex-1 bg-culturapp-primary hover:bg-opacity-90 text-white py-4 rounded-md font-medium"
            >
              Gerenciar meus eventos
            </button>
          </div>
          
          <div className="bg-culturapp-primary bg-opacity-10 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Dica para organizadores</h2>
            <p className="text-gray-700">
              Eventos com descrições detalhadas e imagens atrativas tendem a atrair mais público.
              Não se esqueça de incluir informações importantes como acessibilidade e regras do local.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrganizerDashboard;
