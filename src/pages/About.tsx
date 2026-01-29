import { Music, Users, Award, Heart } from 'lucide-solid';

export default function About() {
  return (
    <div class="min-h-screen bg-rock-black py-8 lg:py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div class="text-center mb-16">
          <h1 class="text-4xl lg:text-5xl font-bold text-white mb-6">
            Sobre a <span class="text-fire-red-500">ROCKSHOP</span>
          </h1>
          <p class="text-xl text-metal-300">
            A loja dos músicos, feita por músicos
          </p>
        </div>

        {/* Story */}
        <div class="bg-metal-900 rounded-2xl p-8 lg:p-12 mb-12 border border-metal-800">
          <h2 class="text-2xl font-bold text-white mb-4">Nossa História</h2>
          <p class="text-metal-300 leading-relaxed mb-4">
            A ROCKSHOP nasceu da paixão por música e da frustração de não encontrar equipamentos 
            de qualidade com atendimento especializado. Fundada em 2020 por músicos experientes, 
            nossa missão é simples: oferecer os melhores instrumentos e equipamentos com o 
            conhecimento técnico que só quem vive a música pode ter.
          </p>
          <p class="text-metal-300 leading-relaxed">
            Cada produto em nosso catálogo é cuidadosamente selecionado e testado por nossa equipe. 
            Não vendemos o que não usaríamos em nossos próprios setups. Essa é a nossa garantia 
            de qualidade.
          </p>
        </div>

        {/* Values */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div class="group bg-metal-900 rounded-xl p-6 border border-metal-800 hover:border-flame-orange-500 transition-all duration-300 hover:-translate-y-1">
            <div class="bg-fire-red-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-fire-red-600/30 transition-colors duration-200">
              <Music class="text-fire-red-500 group-hover:scale-110 transition-transform duration-200" size={24} />
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Paixão pela Música</h3>
            <p class="text-metal-400">
              Cada membro da nossa equipe é músico. Entendemos suas necessidades porque 
              vivemos o mesmo dia a dia.
            </p>
          </div>

          <div class="group bg-metal-900 rounded-xl p-6 border border-metal-800 hover:border-flame-orange-500 transition-all duration-300 hover:-translate-y-1">
            <div class="bg-fire-red-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-fire-red-600/30 transition-colors duration-200">
              <Award class="text-fire-red-500 group-hover:scale-110 transition-transform duration-200" size={24} />
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Qualidade Garantida</h3>
            <p class="text-metal-400">
              Trabalhamos apenas com marcas reconhecidas e produtos que passam por 
              rigoroso controle de qualidade.
            </p>
          </div>

          <div class="group bg-metal-900 rounded-xl p-6 border border-metal-800 hover:border-flame-orange-500 transition-all duration-300 hover:-translate-y-1">
            <div class="bg-fire-red-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-fire-red-600/30 transition-colors duration-200">
              <Users class="text-fire-red-500 group-hover:scale-110 transition-transform duration-200" size={24} />
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Atendimento Especializado</h3>
            <p class="text-metal-400">
              Nossa equipe está preparada para tirar dúvidas técnicas e ajudar na 
              escolha do equipamento ideal para você.
            </p>
          </div>

          <div class="group bg-metal-900 rounded-xl p-6 border border-metal-800 hover:border-flame-orange-500 transition-all duration-300 hover:-translate-y-1">
            <div class="bg-fire-red-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-fire-red-600/30 transition-colors duration-200">
              <Heart class="text-fire-red-500 group-hover:scale-110 transition-transform duration-200" size={24} />
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Compromisso com o Cliente</h3>
            <p class="text-metal-400">
              Sua satisfação é nossa prioridade. Oferecemos garantia estendida e 
              política de devolução sem burocracia.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div class="bg-gradient-to-r from-fire-red-900/20 to-metal-900 rounded-2xl p-8 border border-metal-800">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div class="group">
              <div class="text-3xl lg:text-4xl font-bold text-fire-red-500 mb-2 group-hover:scale-110 transition-transform duration-200">5k+</div>
              <div class="text-metal-400">Clientes Satisfeitos</div>
            </div>
            <div class="group">
              <div class="text-3xl lg:text-4xl font-bold text-fire-red-500 mb-2 group-hover:scale-110 transition-transform duration-200">500+</div>
              <div class="text-metal-400">Produtos</div>
            </div>
            <div class="group">
              <div class="text-3xl lg:text-4xl font-bold text-fire-red-500 mb-2 group-hover:scale-110 transition-transform duration-200">50+</div>
              <div class="text-metal-400">Marcas</div>
            </div>
            <div class="group">
              <div class="text-3xl lg:text-4xl font-bold text-fire-red-500 mb-2 group-hover:scale-110 transition-transform duration-200">4.9</div>
              <div class="text-metal-400">Avaliação Média</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
