
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import ProfileSidebar from '@/components/ProfileSidebar';

const OrganizerProfile = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pageUrl: '',
    description: '',
  });
  
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        pageUrl: user.pageUrl || '',
        description: user.description || '',
      });
    }
  }, [user]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(formData);
  };

  const handleCreateEvent = () => {
    navigate('/organizador/criar-evento');
  };
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <ProfileSidebar />
      
      <main className="flex-1 bg-gray-50">
        <div className="p-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6 flex flex-wrap justify-between items-center">
              <h1 className="text-2xl font-bold">Meus dados</h1>
              
              <div className="flex space-x-4 mt-3 sm:mt-0">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium">
                  Perfil do organizador
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium bg-gray-100">
                  Senha
                </button>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-32 h-32 rounded-full bg-gray-200 mb-2 overflow-hidden">
                    {user?.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt={user.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400">
                        {user?.name?.charAt(0) || '?'}
                      </div>
                    )}
                  </div>
                  <button className="text-sm text-culturapp-primary hover:underline">
                    Alterar foto
                  </button>
                </div>
                
                <div className="mt-6 text-center">
                  <button
                    onClick={handleCreateEvent}
                    className="bg-culturapp-coral hover:bg-opacity-90 text-white px-6 py-2 rounded-md text-sm font-medium"
                  >
                    Crie seu evento
                  </button>
                </div>
              </div>
              
              <div className="md:w-2/3 md:pl-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome do organizador</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email do organizador</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="input-field"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">URL da sua página</label>
                      <input
                        type="text"
                        name="pageUrl"
                        value={formData.pageUrl}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="culturapp/organizador/seuNome"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Descrição da sua página (opcional)</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        className="input-field resize-none"
                        placeholder="Conte mais sobre sua empresa ou organização..."
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    >
                      Salvar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrganizerProfile;
