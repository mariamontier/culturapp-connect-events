
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useEvents } from '@/context/EventContext';
import ProfileSidebar from '@/components/ProfileSidebar';
import EventCard from '@/components/EventCard';

const ParticipantDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { events } = useEvents();
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <ProfileSidebar />
      
      <main className="flex-1 bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-2xl font-bold mb-4">Bem-vindo(a), {user?.name}!</h1>
            <p className="text-gray-600">
              Explore os eventos disponíveis e descubra experiências culturais incríveis para aproveitar.
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Eventos recomendados para você</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {events.slice(0, 4).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
          
          <div className="bg-culturapp-primary bg-opacity-10 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Dica Cultural</h2>
            <p className="text-gray-700">
              Muitos teatros e casas de shows oferecem descontos para estudantes e idosos. 
              Não se esqueça de verificar se você tem direito a algum benefício antes de comprar seus ingressos!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParticipantDashboard;
