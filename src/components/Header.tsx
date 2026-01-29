import { A } from '@solidjs/router';
import { ShoppingCart, Menu, X, Guitar, LogIn } from 'lucide-solid';
import { createSignal } from 'solid-js';
import { getCartItemsCount } from '../stores/cartStore';
import { getAuth } from '../stores/authStore';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  const cartCount = () => getCartItemsCount();
  const auth = getAuth;

  return (
    <header class="bg-metal-900/95 backdrop-blur-md border-b border-metal-800 sticky top-0 z-50 shadow-lg shadow-black/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          {/* Logo */}
          <A 
            href="/" 
            class="group flex items-center gap-2 text-white hover:text-fire-red-500 transition-all duration-300"
          >
            <Guitar 
              size={28} 
              class="group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" 
            />
            <span class="text-xl font-bold tracking-tight">ROCKSHOP</span>
          </A>

          {/* Desktop Navigation */}
          <nav class="hidden md:flex items-center gap-8">
            <A 
              href="/" 
              class="text-metal-300 hover:text-white transition-colors duration-200 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-metal-900 rounded-md px-2 py-1"
            >
              Home
            </A>
            <A 
              href="/products" 
              class="text-metal-300 hover:text-white transition-colors duration-200 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-metal-900 rounded-md px-2 py-1"
            >
              Produtos
            </A>
            <A 
              href="/about" 
              class="text-metal-300 hover:text-white transition-colors duration-200 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-metal-900 rounded-md px-2 py-1"
            >
              Sobre
            </A>
          </nav>

          {/* Cart, Auth & Mobile Menu */}
          <div class="flex items-center gap-2">
            <A 
              href="/cart" 
              class="group relative text-metal-300 hover:text-white transition-all duration-200 p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-metal-900"
              aria-label={`Carrinho com ${cartCount()} itens`}
            >
              <ShoppingCart 
                size={24} 
                class="group-hover:scale-110 transition-transform duration-200" 
              />
              {cartCount() > 0 && (
                <span class="absolute -top-1 -right-1 bg-fire-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse-fire">
                  {cartCount() > 9 ? '9+' : cartCount()}
                </span>
              )}
            </A>

            {/* Auth Button */}
            {auth().isAuthenticated ? (
              <A 
                href="/profile" 
                class="group flex items-center gap-2 text-metal-300 hover:text-white transition-all duration-200 p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-metal-900"
                aria-label="Perfil do usuário"
              >
                <img 
                  src={auth().user?.avatar} 
                  alt={auth().user?.name}
                  class="w-8 h-8 rounded-full border-2 border-metal-700 group-hover:border-fire-red-500 transition-colors duration-200"
                />
              </A>
            ) : (
              <A 
                href="/login" 
                class="group flex items-center gap-2 text-metal-300 hover:text-white transition-all duration-200 p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-metal-900"
                aria-label="Entrar"
              >
                <LogIn 
                  size={24} 
                  class="group-hover:scale-110 transition-transform duration-200" 
                />
              </A>
            )}

            <button
              class="md:hidden text-metal-300 hover:text-white p-2 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-metal-900"
              onClick={() => setIsMenuOpen(!isMenuOpen())}
              aria-expanded={isMenuOpen()}
              aria-label={isMenuOpen() ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen() ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen() && (
          <nav class="md:hidden py-4 border-t border-metal-800">
            <div class="flex flex-col gap-2">
              <A 
                href="/" 
                class="text-metal-300 hover:text-white hover:bg-metal-800 transition-all duration-200 font-medium py-3 px-4 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </A>
              <A 
                href="/products" 
                class="text-metal-300 hover:text-white hover:bg-metal-800 transition-all duration-200 font-medium py-3 px-4 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Produtos
              </A>
              <A 
                href="/about" 
                class="text-metal-300 hover:text-white hover:bg-metal-800 transition-all duration-200 font-medium py-3 px-4 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </A>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
