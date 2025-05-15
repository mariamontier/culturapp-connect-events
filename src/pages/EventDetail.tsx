
import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '@/context/EventContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { formatCurrency, formatDateTime } from '@/lib/utils';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEvent } = useEvents();
  
  const event = getEvent(id || '');
  
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-gray-50 p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Evento não encontrado</h1>
            <p className="text-gray-600 mb-6">O evento que você está procurando não existe ou foi removido.</p>
            <button
              onClick={() => navigate('/eventos')}
              className="px-6 py-2 bg-culturapp-coral text-white rounded-md hover:bg-opacity-90"
            >
              Ver outros eventos
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleBuyTickets = () => {
    // In a real app, this would redirect to the official event page
    alert('Redirecionando para o site oficial de venda de ingressos...');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Event Header/Banner */}
        <div 
          className="w-full bg-culturapp-primary bg-cover bg-center relative"
          style={{ 
            backgroundImage: `linear-gradient(rgba(84, 43, 126, 0.8), rgba(84, 43, 126, 0.8)), url(${event.imageUrl})`,
            height: '300px' 
          }}
        >
          <div className="container mx-auto h-full flex items-center px-4">
            <div className="text-white max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{event.title}</h1>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto py-8 px-4">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {/* Event Details */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Descrição</h2>
                  <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
                </div>
                
                {/* Event Info */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Informações do Evento</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-culturapp-primary mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <div>
                        <p className="font-medium">Data e hora</p>
                        <p className="text-gray-700">{formatDateTime(event.startDate)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-culturapp-primary mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <div>
                        <p className="font-medium">Duração</p>
                        <p className="text-gray-700">
                          Aprox. {Math.round((new Date(event.endDate).getTime() - new Date(event.startDate).getTime()) / (1000 * 60 * 60))} horas
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-culturapp-primary mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <div>
                        <p className="font-medium">Local</p>
                        <p className="text-gray-700">
                          {event.venue}<br />
                          {event.address.street}, {event.address.number}<br />
                          {event.address.neighborhood}, {event.address.city} - {event.address.state}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-culturapp-primary mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <div>
                        <p className="font-medium">Capacidade</p>
                        <p className="text-gray-700">{event.capacity} pessoas</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sidebar/Card with Pricing and Button */}
              <div>
                <div className="bg-gray-50 rounded-lg p-6 sticky top-4 border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4">
                    Ingresso a partir de:
                  </h3>
                  <p className="text-2xl font-bold text-culturapp-primary mb-4">
                    {formatCurrency(event.ticketPrice)}
                  </p>
                  
                  <div className="mb-6">
                    <p className="text-gray-600 text-sm mb-1">
                      Período de vendas:
                    </p>
                    <p className="text-gray-800">
                      {formatDateTime(event.salesStartDate)} até {formatDateTime(event.salesEndDate)}
                    </p>
                  </div>
                  
                  <button
                    onClick={handleBuyTickets}
                    className="w-full bg-culturapp-coral hover:bg-opacity-90 text-white py-3 rounded-md font-medium"
                  >
                    Ver ingressos
                  </button>
                </div>
              </div>
            </div>
            
            {/* Map Section */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">Localização</h2>
              <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                {/* This would be a real map in a production app */}
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-600">Mapa não disponível no momento</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetail;
