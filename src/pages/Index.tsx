
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import { useEvents } from '@/context/EventContext';

const Index = () => {
  const { events } = useEvents();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas categorias');
  
  const categories = ['Todas categorias', 'Show', 'Teatro', 'Dança', 'Cinema', 'Exposição'];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call with the search params
    console.log('Search query:', searchQuery);
    console.log('Selected category:', selectedCategory);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative bg-culturapp-primary py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(84, 43, 126, 0.8), rgba(84, 43, 126, 0.8)), url(https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070)'
        }}
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Seu próximo evento inesquecível começa aqui.
          </h1>
          
          <form 
            onSubmit={handleSearch}
            className="bg-white p-2 rounded-lg flex flex-col sm:flex-row sm:items-center mt-8 max-w-3xl mx-auto shadow-lg"
          >
            <div className="flex-1 flex items-center px-3 py-2">
              <svg className="w-5 h-5 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="M21 21l-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder="Pesquisar artista ou evento"
                className="w-full outline-none text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="border-t sm:border-t-0 sm:border-l border-gray-200 flex items-center px-3 py-2 my-2 sm:my-0">
              <select
                className="w-full outline-none bg-white text-gray-800"
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
            
            <button
              type="submit"
              className="bg-culturapp-coral hover:bg-opacity-90 text-white px-6 py-2 rounded-md font-medium"
            >
              Pesquisar
            </button>
          </form>
        </div>
      </section>
      
      {/* Featured Events Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Eventos em Destaque
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.slice(0, 4).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link
              to="/eventos"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-culturapp-primary hover:bg-opacity-90"
            >
              Ver todos os eventos
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
