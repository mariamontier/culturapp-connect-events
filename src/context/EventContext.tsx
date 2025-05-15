
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Event } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface EventContextType {
  events: Event[];
  getEvent: (id: string) => Event | undefined;
  createEvent: (eventData: Omit<Event, 'id'>) => Promise<string | null>;
  updateEvent: (id: string, eventData: Partial<Event>) => Promise<boolean>;
  deleteEvent: (id: string) => Promise<boolean>;
  getOrganizerEvents: (organizerId: string) => Event[];
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const { toast } = useToast();
  
  // Load events from localStorage on mount
  useEffect(() => {
    const storedEvents = localStorage.getItem('culturapp-events');
    if (storedEvents) {
      try {
        setEvents(JSON.parse(storedEvents));
      } catch (error) {
        console.error('Failed to parse stored events', error);
      }
    } else {
      // If no events exist yet, initialize with sample events
      const sampleEvents = [
        {
          id: '1',
          title: 'Linkin Park: FROM ZERO WORLD TOUR',
          category: 'Show',
          description: 'A banda Linkin Park apresenta sua nova turnê mundial, com shows incríveis trazendo seus maiores sucessos e músicas do novo álbum.',
          capacity: 50000,
          ticketPrice: 350,
          points: 100,
          address: {
            cep: '01000-000',
            number: '123',
            state: 'SP',
            city: 'São Paulo',
            street: 'Avenida Principal',
            neighborhood: 'Centro',
          },
          startDate: '2023-11-15T20:00:00',
          endDate: '2023-11-15T23:30:00',
          salesStartDate: '2023-09-01T09:00:00',
          salesEndDate: '2023-11-15T18:00:00',
          status: 'active' as const,
          organizerId: 'org1',
          imageUrl: 'https://images.unsplash.com/photo-1468234847176-28606331216a?q=80&w=1000',
          venue: 'Allianz Parque'
        },
        {
          id: '2',
          title: 'Coldplay: MUSIC OF THE SPHERES',
          category: 'Show',
          description: 'Coldplay retorna ao Brasil com a turnê Music of the Spheres, um espetáculo visual e sonoro incrível.',
          capacity: 60000,
          ticketPrice: 450,
          points: 120,
          address: {
            cep: '22000-000',
            number: '456',
            state: 'RJ',
            city: 'Rio de Janeiro',
            street: 'Avenida Litorânea',
            neighborhood: 'Barra da Tijuca',
          },
          startDate: '2023-12-20T21:00:00',
          endDate: '2023-12-21T00:30:00',
          salesStartDate: '2023-10-15T10:00:00',
          salesEndDate: '2023-12-20T19:00:00',
          status: 'active' as const,
          organizerId: 'org2',
          imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000',
          venue: 'Estádio Nilton Santos'
        },
        {
          id: '3',
          title: 'Hamlet - Teatro Nacional',
          category: 'Teatro',
          description: 'Uma nova montagem do clássico de Shakespeare, com direção de renomados diretores e elenco de primeira linha.',
          capacity: 1200,
          ticketPrice: 180,
          points: 80,
          address: {
            cep: '70000-000',
            number: '789',
            state: 'DF',
            city: 'Brasília',
            street: 'Setor Cultural',
            neighborhood: 'Asa Sul',
          },
          startDate: '2023-10-05T19:30:00',
          endDate: '2023-10-05T22:00:00',
          salesStartDate: '2023-08-20T09:00:00',
          salesEndDate: '2023-10-05T18:00:00',
          status: 'active' as const,
          organizerId: 'org3',
          imageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=1000',
          venue: 'Teatro Nacional'
        },
        {
          id: '4',
          title: 'Festival de Jazz',
          category: 'Show',
          description: 'Um dia inteiro dedicado ao melhor do jazz nacional e internacional, com várias atrações e food trucks.',
          capacity: 8000,
          ticketPrice: 220,
          points: 90,
          address: {
            cep: '80000-000',
            number: '1001',
            state: 'PR',
            city: 'Curitiba',
            street: 'Parque Barigui',
            neighborhood: 'Santo Inácio',
          },
          startDate: '2023-09-18T14:00:00',
          endDate: '2023-09-18T23:00:00',
          salesStartDate: '2023-07-30T09:00:00',
          salesEndDate: '2023-09-18T16:00:00',
          status: 'active' as const,
          organizerId: 'org4',
          imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000',
          venue: 'Parque Barigui'
        }
      ];
      
      setEvents(sampleEvents);
      localStorage.setItem('culturapp-events', JSON.stringify(sampleEvents));
    }
  }, []);

  const getEvent = (id: string) => {
    return events.find(event => event.id === id);
  };

  const createEvent = async (eventData: Omit<Event, 'id'>): Promise<string | null> => {
    try {
      const newEvent: Event = {
        ...eventData,
        id: Date.now().toString(),
      };
      
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      localStorage.setItem('culturapp-events', JSON.stringify(updatedEvents));
      
      toast({
        title: "Evento criado",
        description: "Seu evento foi criado com sucesso",
      });
      
      return newEvent.id;
    } catch (error) {
      console.error('Failed to create event', error);
      toast({
        title: "Erro ao criar evento",
        description: "Não foi possível criar o evento. Tente novamente.",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateEvent = async (id: string, eventData: Partial<Event>): Promise<boolean> => {
    try {
      const eventIndex = events.findIndex(e => e.id === id);
      if (eventIndex === -1) {
        toast({
          title: "Erro ao atualizar",
          description: "Evento não encontrado",
          variant: "destructive",
        });
        return false;
      }
      
      const updatedEvent = { ...events[eventIndex], ...eventData };
      const updatedEvents = [...events];
      updatedEvents[eventIndex] = updatedEvent;
      
      setEvents(updatedEvents);
      localStorage.setItem('culturapp-events', JSON.stringify(updatedEvents));
      
      toast({
        title: "Evento atualizado",
        description: "As alterações foram salvas com sucesso",
      });
      
      return true;
    } catch (error) {
      console.error('Failed to update event', error);
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível atualizar o evento",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteEvent = async (id: string): Promise<boolean> => {
    try {
      const updatedEvents = events.filter(e => e.id !== id);
      
      setEvents(updatedEvents);
      localStorage.setItem('culturapp-events', JSON.stringify(updatedEvents));
      
      toast({
        title: "Evento excluído",
        description: "O evento foi removido com sucesso",
      });
      
      return true;
    } catch (error) {
      console.error('Failed to delete event', error);
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o evento",
        variant: "destructive",
      });
      return false;
    }
  };

  const getOrganizerEvents = (organizerId: string) => {
    return events.filter(event => event.organizerId === organizerId);
  };
  
  return (
    <EventContext.Provider value={{ 
      events, 
      getEvent,
      createEvent,
      updateEvent,
      deleteEvent,
      getOrganizerEvents,
    }}>
      {children}
    </EventContext.Provider>
  );
};
