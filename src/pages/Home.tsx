import { For } from 'solid-js';
import { A } from '@solidjs/router';
import { ArrowRight, Music, Truck, Shield, Headphones } from 'lucide-solid';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Home() {
  const featuredProducts = () => products.slice(0, 4);

  return (
    <div class="min-h-screen bg-rock-black">
      {/* Hero Section */}
      <section class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-fire-red-900/30 via-rock-black to-metal-900" />
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div class="max-w-2xl">
            <div class="inline-flex items-center gap-2 bg-fire-red-600/20 text-fire-red-400 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse-fire">
              <Music size={16} />
              <span>Equipamentos Profissionais</span>
            </div>
            
            <h1 class="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Som que <span class="text-fire-red-500">Rock</span>
            </h1>
            
            <p class="text-xl text-metal-300 mb-8 leading-relaxed">
              As melhores guitarras, amplificadores e equipamentos para músicos que não aceitam menos que a perfeição.
            </p>
            
            <div class="flex flex-wrap gap-4">
              <A
                href="/products"
                class="group inline-flex items-center gap-2 bg-fire-red-600 hover:bg-fire-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rock-black hover:scale-105 active:scale-95"
              >
                Ver Produtos
                <ArrowRight size={20} class="group-hover:translate-x-1 transition-transform duration-200" />
              </A>
              
              <A
                href="/about"
                class="inline-flex items-center gap-2 bg-metal-800 hover:bg-metal-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-metal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rock-black hover:scale-105 active:scale-95"
              >
                Conheça a Loja
              </A>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section class="border-y border-metal-800 bg-metal-900/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="group flex items-center gap-4">
              <div class="bg-fire-red-600/20 p-3 rounded-lg group-hover:bg-fire-red-600/30 transition-colors duration-200">
                <Truck class="text-fire-red-500 group-hover:scale-110 transition-transform duration-200" size={24} />
              </div>
              <div>
                <h3 class="text-white font-semibold">Frete Grátis</h3>
                <p class="text-metal-400 text-sm">Em compras acima de R$ 1.000</p>
              </div>
            </div>
            
            <div class="group flex items-center gap-4">
              <div class="bg-fire-red-600/20 p-3 rounded-lg group-hover:bg-fire-red-600/30 transition-colors duration-200">
                <Shield class="text-fire-red-500 group-hover:scale-110 transition-transform duration-200" size={24} />
              </div>
              <div>
                <h3 class="text-white font-semibold">Garantia de 2 Anos</h3>
                <p class="text-metal-400 text-sm">Em todos os produtos</p>
              </div>
            </div>
            
            <div class="group flex items-center gap-4">
              <div class="bg-fire-red-600/20 p-3 rounded-lg group-hover:bg-fire-red-600/30 transition-colors duration-200">
                <Headphones class="text-fire-red-500 group-hover:scale-110 transition-transform duration-200" size={24} />
              </div>
              <div>
                <h3 class="text-white font-semibold">Suporte Especializado</h3>
                <p class="text-metal-400 text-sm">Atendimento por músicos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section class="py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between mb-12">
            <div>
              <h2 class="text-3xl lg:text-4xl font-bold text-white mb-2">
                Produtos em Destaque
              </h2>
              <p class="text-metal-400">
                Os equipamentos mais vendidos da nossa loja
              </p>
            </div>
            
            <A
              href="/products"
              class="hidden sm:inline-flex items-center gap-2 text-fire-red-500 hover:text-flame-orange-400 font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rock-black rounded-md px-2 py-1"
            >
              Ver Todos
              <ArrowRight size={18} />
            </A>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <For each={featuredProducts()}>
              {(product) => <ProductCard product={product} />}
            </For>
          </div>
          
          <div class="mt-8 text-center sm:hidden">
            <A
              href="/products"
              class="inline-flex items-center gap-2 text-fire-red-500 hover:text-flame-orange-400 font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rock-black rounded-md px-2 py-1"
            >
              Ver Todos os Produtos
              <ArrowRight size={18} />
            </A>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="py-16 lg:py-24 bg-gradient-to-r from-fire-red-900/20 to-metal-900">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl lg:text-5xl font-bold text-white mb-6">
            Pronto para elevar seu som?
          </h2>
          <p class="text-xl text-metal-300 mb-8">
            Cadastre-se e receba 10% de desconto na primeira compra
          </p>
          <A
            href="/products"
            class="group inline-flex items-center gap-2 bg-fire-red-600 hover:bg-fire-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rock-black hover:scale-105 active:scale-95"
          >
            Explorar Produtos
            <ArrowRight size={20} class="group-hover:translate-x-1 transition-transform duration-200" />
          </A>
        </div>
      </section>
    </div>
  );
}
