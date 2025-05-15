
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Eye, EyeOff } from 'lucide-react';
import { UserType } from '@/types';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState<UserType>('participant');

  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    cnpj: '',
    phone: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing again
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (accountType === 'participant' && !formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    }
    
    if (accountType === 'organizer' && !formData.cnpj.trim()) {
      newErrors.cnpj = 'CNPJ é obrigatório';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não conferem';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const userData = {
      name: formData.name,
      email: formData.email,
      username: formData.username,
      phone: formData.phone,
      documentType: accountType === 'participant' ? 'cpf' as const : 'cnpj' as const,
      documentNumber: accountType === 'participant' ? formData.cpf : formData.cnpj,
      userType: accountType,
    };
    
    const success = await signup(userData);
    
    if (success) {
      navigate(accountType === 'participant' ? '/participante/perfil' : '/organizador/perfil');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8 px-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-6">
            <div className="max-w-md mx-auto">
              <h1 className="text-2xl font-bold mb-2">Crie sua conta</h1>
              <p className="text-gray-600 mb-6">Acumule pontos.</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <select 
                    className="input-field"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value as UserType)}
                  >
                    <option value="participant">Conta Física (CPF)</option>
                    <option value="organizer">Conta Jurídica (CNPJ)</option>
                  </select>
                </div>
                
                {accountType === 'participant' ? (
                  <div>
                    <input
                      type="text"
                      name="cpf"
                      placeholder="CPF"
                      className={`input-field ${errors.cpf ? 'border-red-500' : ''}`}
                      value={formData.cpf}
                      onChange={handleChange}
                      disabled={accountType !== 'participant'}
                    />
                    {errors.cpf && <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>}
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      name="cnpj"
                      placeholder="CNPJ"
                      className={`input-field ${errors.cnpj ? 'border-red-500' : ''}`}
                      value={formData.cnpj}
                      onChange={handleChange}
                      disabled={accountType !== 'organizer'}
                    />
                    {errors.cnpj && <p className="text-red-500 text-sm mt-1">{errors.cnpj}</p>}
                  </div>
                )}
                
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Telefone"
                    className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                
                <div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className={`input-field ${errors.username ? 'border-red-500' : ''}`}
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                </div>
                
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Senha"
                    className={`input-field pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirme a senha"
                    className={`input-field pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full bg-culturapp-coral hover:bg-opacity-90 text-white py-3 rounded-md font-medium"
                  >
                    Criar cadastro
                  </button>
                </div>
                
                <div className="text-center mt-4">
                  <p className="text-gray-600">
                    Já tem uma conta?{' '}
                    <Link to="/login" className="text-culturapp-primary hover:underline font-medium">
                      Entre
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 hidden md:block">
            <div className="rounded-lg overflow-hidden h-full">
              <img
                src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070"
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

export default Signup;
