
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserType } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: Omit<User, 'id'>) => Promise<boolean>;
  updateUserProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem('culturapp-user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('culturapp-user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, check if the user exists in localStorage
      const storedUsers = localStorage.getItem('culturapp-users') || '[]';
      const users = JSON.parse(storedUsers);
      
      const foundUser = users.find((u: User) => u.email === email);
      
      if (!foundUser) {
        toast({
          title: "Falha no login",
          description: "E-mail ou senha incorretos",
          variant: "destructive",
        });
        return false;
      }
      
      // In a real app, we'd verify the password here
      
      setUser(foundUser);
      localStorage.setItem('culturapp-user', JSON.stringify(foundUser));
      
      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo(a), ${foundUser.name}!`,
      });
      return true;
    } catch (error) {
      console.error('Login failed', error);
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro durante o login. Tente novamente.",
        variant: "destructive",
      });
      return false;
    }
  };

  const signup = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    try {
      // Generate a simple ID
      const newUser: User = { 
        ...userData, 
        id: Date.now().toString() 
      };
      
      // Store in localStorage
      const storedUsers = localStorage.getItem('culturapp-users') || '[]';
      const users = JSON.parse(storedUsers);
      
      // Check if email already exists
      if (users.some((u: User) => u.email === userData.email)) {
        toast({
          title: "Falha no cadastro",
          description: "Este e-mail já está em uso",
          variant: "destructive",
        });
        return false;
      }
      
      users.push(newUser);
      localStorage.setItem('culturapp-users', JSON.stringify(users));
      
      // Auto login after signup
      setUser(newUser);
      localStorage.setItem('culturapp-user', JSON.stringify(newUser));
      
      toast({
        title: "Cadastro realizado com sucesso",
        description: "Sua conta foi criada e você já está logado",
      });
      return true;
    } catch (error) {
      console.error('Signup failed', error);
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro durante o cadastro. Tente novamente.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('culturapp-user');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });
  };

  const updateUserProfile = (userData: Partial<User>) => {
    if (!user) return;
    
    try {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('culturapp-user', JSON.stringify(updatedUser));
      
      // Also update in the users array
      const storedUsers = localStorage.getItem('culturapp-users') || '[]';
      const users = JSON.parse(storedUsers);
      const updatedUsers = users.map((u: User) => 
        u.id === user.id ? updatedUser : u
      );
      localStorage.setItem('culturapp-users', JSON.stringify(updatedUsers));
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso",
      });
    } catch (error) {
      console.error('Failed to update profile', error);
      toast({
        title: "Erro na atualização",
        description: "Ocorreu um erro ao atualizar o perfil",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login,
      logout,
      signup,
      updateUserProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
