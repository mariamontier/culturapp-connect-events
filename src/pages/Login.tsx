
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Get the page they were trying to access from location state
  const from = location.state?.from || '/';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    
    const success = await login(email, password);
    
    if (success) {
      // Send them back to the page they tried to visit or to the appropriate dashboard
      const isOrganizer = localStorage.getItem('culturapp-user') ? 
        JSON.parse(localStorage.getItem('culturapp-user') || '{}').userType === 'organizer' : 
        false;
        
      if (from === '/') {
        navigate(isOrganizer ? '/organizador/perfil' : '/participante/perfil');
      } else {
        navigate(from);
      }
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8 px-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-6">
            <div className="max-w-md mx-auto">
              <h1 className="text-2xl font-bold mb-6">Entre na sua conta</h1>
              
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                  <p>{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
                    className="input-field pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                
                <div className="text-right">
                  <Link to="/esqueceu-senha" className="text-culturapp-primary hover:underline text-sm">
                    Esqueceu a senha?
                  </Link>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full bg-culturapp-coral hover:bg-opacity-90 text-white py-3 rounded-md font-medium"
                  >
                    Entrar
                  </button>
                </div>
                
                <div className="text-center mt-4">
                  <p className="text-gray-600">
                    Não tem conta?{' '}
                    <Link to="/cadastro" className="text-culturapp-primary hover:underline font-medium">
                      Crie uma conta
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 hidden md:block">
            <div className="rounded-lg overflow-hidden h-full">
              <img
                src="https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=1000"
                alt="CulturApp Cultural Event"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
