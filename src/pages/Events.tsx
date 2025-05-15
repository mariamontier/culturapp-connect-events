
import { useState } from 'react';
import { useEvents } from '@/context/EventContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';

const Events = () => {
  const { events } = useEvents();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const categories = ['Todas', 'Show', 'Teatro', 'Dança', 'Cinema', 'Exposição'];
  
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
                         
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Todas' || 
                           event.category === selectedCategory;
                           
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="bg-culturapp-primary py-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-white text-center mb-8">
              Encontre Eventos
            </h1>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-white p-2 rounded-lg flex flex-wrap md:flex-nowrap shadow-lg">
                <div className="flex-1 flex items-center px-3 py-2 w-full md:w-auto mb-2 md:mb-0">
                  <svg className="w-5 h-5 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="M21 21l-4.35-4.35"></path>
                  </svg>
                  <input
                    type="text"
                    placeholder="Buscar eventos"
                    className="w-full outline-none text-gray-800"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="w-full md:w-auto flex items-center">
                  <select
                    className="w-full md:w-40 outline-none bg-white text-gray-800 px-3 py-2 border-t md:border-t-0 md:border-l border-gray-200"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto py-12 px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {filteredEvents.length} eventos encontrados
            </h2>
            
            {searchQuery && (
              <p className="text-gray-600">
                Resultados da busca por: "{searchQuery}"
              </p>
            )}
          </div>
          
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">Nenhum evento encontrado</p>
              <p className="mt-2 text-gray-500">Tente ajustar seus critérios de busca</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
