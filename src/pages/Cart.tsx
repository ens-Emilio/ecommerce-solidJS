import { For, Show } from 'solid-js';
import { A } from '@solidjs/router';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-solid';
import { getCart, removeFromCart, updateQuantity, getCartTotal, clearCart } from '../stores/cartStore';

export default function Cart() {
  const cart = getCart;
  const total = () => getCartTotal();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div class="min-h-screen bg-rock-black py-8 lg:py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl lg:text-4xl font-bold text-white mb-8">
          Carrinho de Compras
        </h1>

        <Show
          when={cart().items.length > 0}
          fallback={
            <div class="text-center py-16 bg-metal-900 rounded-2xl border border-metal-800">
              <ShoppingBag class="mx-auto text-metal-600 mb-4" size={64} />
              <h2 class="text-2xl font-bold text-white mb-2">
                Seu carrinho está vazio
              </h2>
              <p class="text-metal-400 mb-8">
                Explore nossos produtos e encontre o equipamento perfeito para você
              </p>
              <A
                href="/products"
                class="group inline-flex items-center gap-2 bg-fire-red-600 hover:bg-fire-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rock-black hover:scale-105 active:scale-95"
              >
                Ver Produtos
                <ArrowRight size={20} class="group-hover:translate-x-1 transition-transform duration-200" />
              </A>
            </div>
          }
        >
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div class="lg:col-span-2 space-y-4">
              <For each={cart().items}>
                {(item) => (
                  <div class="bg-metal-900 rounded-xl p-4 flex gap-4 border border-metal-800 hover:border-metal-700 transition-colors duration-200">
                    {/* Image */}
                    <A href={`/products/${item.product.id}`} class="shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        class="w-24 h-24 object-cover rounded-lg"
                      />
                    </A>

                    {/* Info */}
                    <div class="flex-1 min-w-0">
                      <A href={`/products/${item.product.id}`}>
                        <h3 class="text-white font-semibold truncate hover:text-fire-red-400 transition-colors duration-200">
                          {item.product.name}
                        </h3>
                      </A>
                      <p class="text-metal-500 text-sm mb-2">{item.product.category}</p>
                      <div class="text-fire-red-500 font-bold">
                        {formatPrice(item.product.price)}
                      </div>
                    </div>

                    {/* Quantity & Remove */}
                    <div class="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        class="text-metal-500 hover:text-fire-red-500 transition-colors duration-200 p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rock-black"
                        aria-label="Remover item do carrinho"
                      >
                        <Trash2 size={20} />
                      </button>

                      <div class="flex items-center bg-metal-800 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          class="p-2 text-metal-400 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 rounded-l-lg"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus size={16} />
                        </button>
                        <span class="w-10 text-center text-white font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          class="p-2 text-metal-400 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 rounded-r-lg"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </For>

              {/* Clear Cart */}
              <button
                onClick={clearCart}
                class="text-metal-500 hover:text-fire-red-500 transition-colors duration-200 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rock-black rounded-md px-2 py-1"
              >
                Limpar carrinho
              </button>
            </div>

            {/* Summary */}
            <div class="lg:col-span-1">
              <div class="bg-metal-900 rounded-xl p-6 sticky top-24 border border-metal-800">
                <h2 class="text-xl font-bold text-white mb-6">
                  Resumo do Pedido
                </h2>

                <div class="space-y-4 mb-6">
                  <div class="flex justify-between text-metal-400">
                    <span>Subtotal</span>
                    <span>{formatPrice(total())}</span>
                  </div>
                  <div class="flex justify-between text-metal-400">
                    <span>Frete</span>
                    <span class="text-electric-green-500">Grátis</span>
                  </div>
                  <div class="border-t border-metal-800 pt-4">
                    <div class="flex justify-between text-white text-xl font-bold">
                      <span>Total</span>
                      <span>{formatPrice(total())}</span>
                    </div>
                  </div>
                </div>

                <button 
                  class="w-full bg-fire-red-600 hover:bg-fire-red-700 text-white py-4 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rock-black hover:scale-[1.02] active:scale-[0.98] mb-4"
                >
                  Finalizar Compra
                </button>

                <A
                  href="/products"
                  class="block text-center text-metal-400 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rock-black rounded-md px-2 py-1"
                >
                  Continuar comprando
                </A>
              </div>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
}
