
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useEvents } from '@/context/EventContext';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';

const EditEvent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getEvent, updateEvent, deleteEvent } = useEvents();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    capacity: '',
    ticketPrice: '',
    points: '',
    address: {
      cep: '',
      number: '',
      state: '',
      city: '',
      street: '',
      neighborhood: '',
      complement: '',
    },
    startDate: '',
    endDate: '',
    salesStartDate: '',
    salesEndDate: '',
    status: 'active' as const,
    imageUrl: '',
    venue: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (id) {
      const eventData = getEvent(id);
      if (eventData) {
        // Format dates for datetime-local input
        const formatDateForInput = (dateString: string) => {
          const date = new Date(dateString);
          return date.toISOString().slice(0, 16);
        };
        
        setFormData({
          ...eventData,
          capacity: String(eventData.capacity),
          ticketPrice: String(eventData.ticketPrice),
          points: String(eventData.points),
          startDate: formatDateForInput(eventData.startDate),
          endDate: formatDateForInput(eventData.endDate),
          salesStartDate: formatDateForInput(eventData.salesStartDate),
          salesEndDate: formatDateForInput(eventData.salesEndDate),
        });
      } else {
        toast({
          title: "Evento não encontrado",
          description: "Não foi possível carregar os dados do evento",
          variant: "destructive",
        });
        navigate('/organizador/eventos');
      }
    }
  }, [id, getEvent, navigate, toast]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as 'address'],
          [child]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    const requiredFields = [
      'title', 'category', 'description', 'capacity', 
      'ticketPrice', 'address.cep', 'address.number',
      'address.state', 'address.city', 'address.street',
      'address.neighborhood', 'startDate', 'endDate',
      'salesStartDate', 'salesEndDate', 'venue'
    ];
    
    requiredFields.forEach(field => {
      let value;
      
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        value = formData[parent as 'address'][child];
      } else {
        value = formData[field as keyof typeof formData];
      }
      
      if (!value || (typeof value === 'string' && !value.trim())) {
        newErrors[field] = 'Campo obrigatório';
      }
    });
    
    // Numeric validations
    const numericFields = ['capacity', 'ticketPrice', 'points'];
    numericFields.forEach(field => {
      const value = formData[field as keyof typeof formData];
      if (value && (isNaN(Number(value)) || Number(value) <= 0)) {
        newErrors[field] = 'Deve ser um número positivo';
      }
    });
    
    // Date validations
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end <= start) {
        newErrors.endDate = 'A data de término deve ser posterior à data de início';
      }
    }
    
    if (formData.salesStartDate && formData.salesEndDate) {
      const start = new Date(formData.salesStartDate);
      const end = new Date(formData.salesEndDate);
      if (end <= start) {
        newErrors.salesEndDate = 'A data final de vendas deve ser posterior à data inicial';
      }
    }
    
    if (formData.salesEndDate && formData.startDate) {
      const salesEnd = new Date(formData.salesEndDate);
      const eventStart = new Date(formData.startDate);
      if (salesEnd > eventStart) {
        newErrors.salesEndDate = 'A venda de ingressos deve terminar antes do início do evento';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    if (!user || !id) {
      navigate('/login');
      return;
    }
    
    const eventData = {
      ...formData,
      capacity: Number(formData.capacity),
      ticketPrice: Number(formData.ticketPrice),
      points: Number(formData.points) || 0,
    };
    
    const success = await updateEvent(id, eventData);
    
    if (success) {
      toast({
        title: "Evento atualizado",
        description: "As alterações foram salvas com sucesso",
      });
      navigate('/organizador/eventos');
    }
  };
  
  const handleCancel = async () => {
    if (window.confirm('Tem certeza que deseja cancelar este evento?')) {
      if (id) {
        const success = await deleteEvent(id);
        if (success) {
          toast({
            title: "Evento cancelado",
            description: "O evento foi removido com sucesso",
          });
          navigate('/organizador/eventos');
        }
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="bg-culturapp-primary py-12 px-4 bg-cover bg-center" style={{ 
          backgroundImage: 'linear-gradient(rgba(84, 43, 126, 0.8), rgba(84, 43, 126, 0.8)), url(https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000)'
        }}>
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-bold text-white">Editar evento</h1>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md max-w-4xl mx-auto p-6">
            {/* Form Errors Summary */}
            {Object.keys(errors).length > 0 && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Por favor, corrija os erros no formulário:
                    </h3>
                    <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                      {Object.keys(errors).map(key => (
                        <li key={key}>{errors[key]}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {/* Event Information */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-purple-800">Informações do Evento</h2>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Título do evento
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`input-field ${errors.title ? 'border-red-500' : ''}`}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Categoria
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`input-field ${errors.category ? 'border-red-500' : ''}`}
                    >
                      <option value="">Selecione uma categoria</option>
                      <option value="Show">Show</option>
                      <option value="Teatro">Teatro</option>
                      <option value="Dança">Dança</option>
                      <option value="Cinema">Cinema</option>
                      <option value="Exposição">Exposição</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Descrição do evento
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className={`input-field resize-none ${errors.description ? 'border-red-500' : ''}`}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                        Capacidade total
                      </label>
                      <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleInputChange}
                        className={`input-field ${errors.capacity ? 'border-red-500' : ''}`}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-700 mb-1">
                        Menor valor do ingresso
                      </label>
                      <input
                        type="number"
                        id="ticketPrice"
                        name="ticketPrice"
                        value={formData.ticketPrice}
                        onChange={handleInputChange}
                        className={`input-field ${errors.ticketPrice ? 'border-red-500' : ''}`}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="points" className="block text-sm font-medium text-gray-700 mb-1">
                        Pontos
                      </label>
                      <input
                        type="number"
                        id="points"
                        name="points"
                        value={formData.points}
                        onChange={handleInputChange}
                        className={`input-field ${errors.points ? 'border-red-500' : ''}`}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome do local
                    </label>
                    <input
                      type="text"
                      id="venue"
                      name="venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                      className={`input-field ${errors.venue ? 'border-red-500' : ''}`}
                      placeholder="Ex: Teatro Municipal"
                    />
                  </div>
                </div>
              </div>
              
              {/* Event Address */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-purple-800">Endereço do evento</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="address.cep" className="block text-sm font-medium text-gray-700 mb-1">
                      CEP
                    </label>
                    <input
                      type="text"
                      id="address.cep"
                      name="address.cep"
                      value={formData.address.cep}
                      onChange={handleInputChange}
                      className={`input-field ${errors['address.cep'] ? 'border-red-500' : ''}`}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address.number" className="block text-sm font-medium text-gray-700 mb-1">
                      Número
                    </label>
                    <input
                      type="text"
                      id="address.number"
                      name="address.number"
                      value={formData.address.number}
                      onChange={handleInputChange}
                      className={`input-field ${errors['address.number'] ? 'border-red-500' : ''}`}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address.state" className="block text-sm font-medium text-gray-700 mb-1">
                      Estado
                    </label>
                    <select
                      id="address.state"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleInputChange}
                      className={`input-field ${errors['address.state'] ? 'border-red-500' : ''}`}
                    >
                      <option value="">Selecione...</option>
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AP">Amapá</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">São Paulo</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="address.city" className="block text-sm font-medium text-gray-700 mb-1">
                      Cidade
                    </label>
                    <input
                      type="text"
                      id="address.city"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleInputChange}
                      className={`input-field ${errors['address.city'] ? 'border-red-500' : ''}`}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address.street" className="block text-sm font-medium text-gray-700 mb-1">
                      Rua/Avenida
                    </label>
                    <input
                      type="text"
                      id="address.street"
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleInputChange}
                      className={`input-field ${errors['address.street'] ? 'border-red-500' : ''}`}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address.neighborhood" className="block text-sm font-medium text-gray-700 mb-1">
                      Bairro
                    </label>
                    <input
                      type="text"
                      id="address.neighborhood"
                      name="address.neighborhood"
                      value={formData.address.neighborhood}
                      onChange={handleInputChange}
                      className={`input-field ${errors['address.neighborhood'] ? 'border-red-500' : ''}`}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address.complement" className="block text-sm font-medium text-gray-700 mb-1">
                      Complemento
                    </label>
                    <input
                      type="text"
                      id="address.complement"
                      name="address.complement"
                      value={formData.address.complement}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
              
              {/* Date and Time */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-purple-800">Dia e hora</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Data início do evento
                    </label>
                    <input
                      type="datetime-local"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className={`input-field ${errors.startDate ? 'border-red-500' : ''}`}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Data final do evento
                    </label>
                    <input
                      type="datetime-local"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className={`input-field ${errors.endDate ? 'border-red-500' : ''}`}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="salesStartDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Data início da venda do evento
                    </label>
                    <input
                      type="datetime-local"
                      id="salesStartDate"
                      name="salesStartDate"
                      value={formData.salesStartDate}
                      onChange={handleInputChange}
                      className={`input-field ${errors.salesStartDate ? 'border-red-500' : ''}`}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="salesEndDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Data final da venda evento
                    </label>
                    <input
                      type="datetime-local"
                      id="salesEndDate"
                      name="salesEndDate"
                      value={formData.salesEndDate}
                      onChange={handleInputChange}
                      className={`input-field ${errors.salesEndDate ? 'border-red-500' : ''}`}
                    />
                  </div>
                </div>
              </div>
              
              {/* Status */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-purple-800">Status</h2>
                
                <div>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium"
                >
                  Cancelar evento
                </button>
                
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium"
                >
                  Atualizar evento
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditEvent;
