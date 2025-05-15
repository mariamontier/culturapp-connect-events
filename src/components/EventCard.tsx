
import { Link } from 'react-router-dom';
import { Event } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const formattedDate = new Date(event.startDate).toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric'
  });
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{event.title}</h3>
        <p className="text-gray-600 text-sm mb-2">
          {event.venue}, {event.address.city}
        </p>
        <p className="text-gray-500 text-sm mb-4">
          {formattedDate}
        </p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-900">
            {formatCurrency(event.ticketPrice)}
          </span>
          <Link 
            to={`/eventos/${event.id}`}
            className="bg-culturapp-coral hover:bg-opacity-90 text-white rounded px-4 py-2 text-sm font-medium"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
