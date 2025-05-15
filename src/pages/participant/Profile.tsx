
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProfileSidebar from '@/components/ProfileSidebar';

const ParticipantProfile = () => {
  const { user, updateUserProfile } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    documentNumber: '',
    birthDate: '',
  });
  
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        documentNumber: user.documentNumber || '',
        birthDate: user.birthDate || '',
      });
    }
  }, [user]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(formData);
  };
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <ProfileSidebar />
      
      <main className="flex-1 bg-gray-50">
        <div className="p-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold">Meus dados</h1>
              
              <div className="flex space-x-4">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium">
                  Perfil
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
              </div>
              
              <div className="md:w-2/3 md:pl-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Documento</label>
                        <input
                          type="text"
                          name="documentNumber"
                          value={formData.documentNumber}
                          onChange={handleChange}
                          className="input-field"
                          disabled
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Data de nascimento</label>
                        <input
                          type="date"
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={handleChange}
                          className="input-field"
                        />
                      </div>
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

export default ParticipantProfile;
