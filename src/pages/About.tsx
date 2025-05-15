
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-culturapp-primary py-16 px-4">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-white text-center">Sobre</h1>
          </div>
        </div>
        
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 border-b border-culturapp-coral pb-2">
                O CulturApp
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                O CulturApp é um aplicativo que conecta você aos melhores eventos culturais da sua cidade, como peças de teatro e shows. Acreditamos que a cultura transforma vidas e torna as cidades mais vibrantes e acolhedoras.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nossa plataforma foi desenvolvida para facilitar o acesso à cultura, ajudando pessoas a descobrirem eventos interessantes e organizadores a divulgarem suas programações culturais. O CulturApp não realiza vendas de ingressos, mas sim conecta os interessados diretamente aos canais oficiais de cada evento.
              </p>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 border-b border-culturapp-coral pb-2">
                Nossa Missão
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Nossa missão é facilitar o acesso a experiências culturais de qualidade, oferecendo informações claras e atualizadas sobre eventos presenciais e virtuais. Valorizamos a diversidade e buscamos inspirar as pessoas a explorarem novas formas de arte, lazer e conhecimento.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-gray-50 rounded-lg p-6 border-t-4 border-culturapp-primary">
                  <h3 className="font-bold mb-3 text-lg">Inclusão</h3>
                  <p className="text-gray-600">
                    Acreditamos que a cultura deve ser acessível a todos, independentemente de background ou limitações.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 border-t-4 border-culturapp-primary">
                  <h3 className="font-bold mb-3 text-lg">Diversidade</h3>
                  <p className="text-gray-600">
                    Promovemos uma ampla variedade de expressões culturais, valorizando diferentes tradições e inovações.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 border-t-4 border-culturapp-primary">
                  <h3 className="font-bold mb-3 text-lg">Comunidade</h3>
                  <p className="text-gray-600">
                    Fortalecemos o senso de pertencimento e conexão através de experiências culturais compartilhadas.
                  </p>
                </div>
              </div>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 border-b border-culturapp-coral pb-2">
                Visão
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Queremos fazer parte de uma cidade mais criativa, inclusiva e cheia de vida! Acreditamos que a cultura tem o poder de transformar não apenas indivíduos, mas comunidades inteiras, criando espaços de diálogo, reflexão e celebração.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-6 border-b border-culturapp-coral pb-2">
                Sobre a empresa
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                CulturApp Portal e Comunicação LTDA. é uma empresa brasileira fundada em 2023 por um grupo de entusiastas das artes e tecnologia. Nossa equipe é formada por profissionais de diversas áreas que compartilham a paixão pela democratização do acesso à cultura.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Estamos comprometidos com a construção de uma plataforma que não apenas informe sobre eventos culturais, mas também inspire novas conexões e descobertas no universo das artes e entretenimento.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
