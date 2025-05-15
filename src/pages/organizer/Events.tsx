
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '@/context/EventContext';
import { useAuth } from '@/context/AuthContext';
import ProfileSidebar from '@/components/ProfileSidebar';
import { formatDateTime, formatCurrency } from '@/lib/utils';

const OrganizerEvents = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getOrganizerEvents, deleteEvent } = useEvents();
  const [searchQuery, setSearchQuery] = useState('');
  
  const myEvents = user ? getOrganizerEvents(user.id) : [];
  
  const filteredEvents = myEvents.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleCreateEvent = () => {
    navigate('/organizador/criar-evento');
  };
  
  const handleEditEvent = (eventId: string) => {
    navigate(`/organizador/editar-evento/${eventId}`);
  };
  
  const handleDeleteEvent = async (eventId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      const success = await deleteEvent(eventId);
      if (success) {
        // React will re-render with the updated list
      }
    }
  };
  
  const handleViewEvent = (eventId: string) => {
    navigate(`/eventos/${eventId}`);
  };
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <ProfileSidebar />
      
      <main className="flex-1 bg-gray-50">
        <div className="p-6 max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Meus eventos</h1>
            
            <button
              onClick={handleCreateEvent}
              className="bg-culturapp-coral hover:bg-opacity-90 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Criar novo evento
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <div className="relative">
                <svg className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="M21 21l-4.35-4.35"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Buscar nos meus eventos"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-culturapp-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {filteredEvents.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">Evento</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">Data</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">Status</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">Preço</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredEvents.map((event) => (
                      <tr key={event.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded overflow-hidden bg-gray-200 mr-3">
                              <img 
                                src={event.imageUrl} 
                                alt={event.title} 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{event.title}</p>
                              <p className="text-sm text-gray-600">{event.venue}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                          {formatDateTime(event.startDate)}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            event.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {event.status === 'active' ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                          {formatCurrency(event.ticketPrice)}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditEvent(event.id)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(event.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Excluir
                            </button>
                            <button
                              onClick={() => handleViewEvent(event.id)}
                              className="text-gray-600 hover:text-gray-800"
                            >
                              Ver
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 mb-4">Nenhum evento encontrado</p>
                <p className="text-gray-500 mb-8">
                  {myEvents.length === 0
                    ? "Você ainda não criou nenhum evento"
                    : "Nenhum evento corresponde à sua busca"}
                </p>
                <button
                  onClick={handleCreateEvent}
                  className="bg-culturapp-coral hover:bg-opacity-90 text-white px-6 py-2 rounded-md text-sm font-medium"
                >
                  Criar meu primeiro evento
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrganizerEvents;
