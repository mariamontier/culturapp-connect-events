
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const faqCategories = [
    {
      id: 'payments',
      title: 'Pagamentos',
      icon: '💳',
      questions: [
        {
          id: 'payment-1',
          question: 'Como funciona o pagamento de eventos no CulturApp?',
          answer: 'O CulturApp não processa pagamentos diretamente. Quando você clica em "Ver ingressos", redirecionamos você para o site oficial do evento onde poderá realizar a compra seguindo as opções disponibilizadas pelo organizador.'
        },
        {
          id: 'payment-2',
          question: 'Preciso pagar para usar o CulturApp?',
          answer: 'Não, o CulturApp é completamente gratuito para usuários que desejam descobrir e buscar eventos culturais. Organizadores podem ter taxas específicas para publicação de eventos.'
        },
        {
          id: 'payment-3',
          question: 'Como solicitar reembolso de um evento cancelado?',
          answer: 'Como o CulturApp não processa pagamentos, os reembolsos devem ser solicitados diretamente com o organizador do evento ou plataforma onde você realizou a compra do ingresso.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Gerenciar Conta',
      icon: '👤',
      questions: [
        {
          id: 'account-1',
          question: 'Como faço para criar uma conta no CulturApp?',
          answer: 'Para criar uma conta, clique em "Signup" no canto superior direito da página inicial. Preencha seus dados pessoais, escolha se deseja uma conta de participante ou organizador, e confirme seu cadastro.'
        },
        {
          id: 'account-2',
          question: 'Posso mudar meu tipo de conta de participante para organizador?',
          answer: 'Atualmente não é possível mudar o tipo de conta. Se você precisa de acesso como organizador, recomendamos criar uma nova conta com o tipo adequado.'
        },
        {
          id: 'account-3',
          question: 'Esqueci minha senha, como recuperá-la?',
          answer: 'Na tela de login, clique em "Esqueceu a senha?" e siga as instruções enviadas para o e-mail cadastrado para redefinir sua senha.'
        }
      ]
    },
    {
      id: 'events',
      title: 'Eventos',
      icon: '🎭',
      questions: [
        {
          id: 'events-1',
          question: 'Como encontrar eventos na minha cidade?',
          answer: 'Na página inicial ou na seção "Eventos", utilize o campo de busca e filtros para encontrar eventos por localização, data ou categoria. Você pode inserir o nome da sua cidade e navegar pelos resultados.'
        },
        {
          id: 'events-2',
          question: 'Posso salvar eventos para ver mais tarde?',
          answer: 'Sim, você pode favoritar eventos clicando no ícone de coração na página do evento. Todos os eventos salvos ficam disponíveis na seção "Favoritos" do seu perfil.'
        },
        {
          id: 'events-3',
          question: 'Como compro ingressos para um evento?',
          answer: 'Ao encontrar um evento de seu interesse, clique em "Ver detalhes" e depois em "Ver ingressos". Você será redirecionado para o site oficial de vendas do evento.'
        }
      ]
    },
    {
      id: 'security',
      title: 'Segurança e Privacidade',
      icon: '🔒',
      questions: [
        {
          id: 'security-1',
          question: 'Como o CulturApp protege meus dados pessoais?',
          answer: 'O CulturApp segue rigorosas práticas de segurança e privacidade. Seus dados são criptografados e armazenados de forma segura. Nunca compartilhamos informações pessoais sem seu consentimento ou fora dos termos de nossa política de privacidade.'
        },
        {
          id: 'security-2',
          question: 'Posso excluir minha conta e todos os meus dados?',
          answer: 'Sim, você pode solicitar a exclusão da sua conta e dados associados através da seção "Configurações" do seu perfil. Todos seus dados pessoais serão removidos permanentemente de nossos sistemas.'
        },
        {
          id: 'security-3',
          question: 'Como denunciar um evento suspeito?',
          answer: 'Se você encontrar um evento que pareça suspeito ou fraudulento, clique no botão "Denunciar" na página do evento ou entre em contato conosco através do nosso formulário de suporte no site.'
        }
      ]
    }
  ];
  
  const quickHelpQuestions = [
    {
      id: 'quick-1',
      question: 'Como faço para criar uma conta no CulturApp?',
      answer: 'Para criar uma conta, clique em "Signup" no canto superior direito da página inicial. Preencha seus dados e confirme seu cadastro.'
    },
    {
      id: 'quick-2',
      question: 'Preciso pagar para usar o CulturApp?',
      answer: 'Não, o CulturApp é completamente gratuito para usuários que desejam descobrir e buscar eventos culturais.'
    },
    {
      id: 'quick-3',
      question: 'Como encontro eventos na minha cidade?',
      answer: 'Na página inicial ou na seção "Eventos", utilize o campo de busca e filtros para encontrar eventos por localização, data ou categoria.'
    },
    {
      id: 'quick-4',
      question: 'Como compro ingressos para um evento?',
      answer: 'Ao encontrar um evento de seu interesse, clique em "Ver detalhes" e depois em "Ver ingressos". Você será redirecionado para o site oficial de vendas.'
    }
  ];
  
  const filteredCategories = selectedCategory === 'all' 
    ? faqCategories 
    : faqCategories.filter(cat => cat.id === selectedCategory);
    
  const getFilteredQuestions = (questions) => {
    if (!searchQuery) return questions;
    
    return questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-culturapp-primary py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-bold text-white mb-4">FAQ</h1>
            <p className="text-xl text-white/90 mb-6">Atendimento do CulturApp</p>
            <h2 className="text-3xl font-bold text-white mb-8">COMO PODEMOS AJUDAR?</h2>
            
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="text"
                  placeholder="Busca"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="font-semibold text-lg mb-4">Categorias</h2>
                
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`w-full text-left px-4 py-3 flex items-center rounded-md ${
                        selectedCategory === 'all' 
                          ? 'bg-culturapp-primary text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-3">🔍</span>
                      <span>Todas categorias</span>
                    </button>
                  </li>
                  
                  {faqCategories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-4 py-3 flex items-center rounded-md ${
                          selectedCategory === category.id 
                            ? 'bg-culturapp-primary text-white' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <span className="mr-3">{category.icon}</span>
                        <span>{category.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
            
            <div className="lg:col-span-3">
              {filteredCategories.map((category) => {
                const filteredQuestions = getFilteredQuestions(category.questions);
                
                if (filteredQuestions.length === 0) return null;
                
                return (
                  <div key={category.id} className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center mb-6">
                      <span className="text-2xl mr-3">{category.icon}</span>
                      <h2 className="text-xl font-semibold">{category.title}</h2>
                    </div>
                    
                    <Accordion type="single" collapsible className="space-y-4">
                      {filteredQuestions.map((item) => (
                        <AccordionItem key={item.id} value={item.id} className="border rounded-md p-2">
                          <AccordionTrigger className="text-left font-medium px-2">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="px-2 pt-2 pb-4 text-gray-600">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                );
              })}
              
              {searchQuery && filteredCategories.every(cat => 
                getFilteredQuestions(cat.questions).length === 0
              ) && (
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <p className="text-lg text-gray-600 mb-4">
                    Nenhum resultado encontrado para "{searchQuery}"
                  </p>
                  <p className="text-gray-500">
                    Tente mudar os termos da pesquisa ou navegue pelas categorias.
                  </p>
                </div>
              )}
              
              {!searchQuery && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Ajuda Rápida</h2>
                  
                  <Accordion type="single" collapsible className="space-y-4">
                    {quickHelpQuestions.map((item) => (
                      <AccordionItem key={item.id} value={item.id} className="border rounded-md p-2">
                        <AccordionTrigger className="text-left font-medium px-2">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-2 pt-2 pb-4 text-gray-600">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
