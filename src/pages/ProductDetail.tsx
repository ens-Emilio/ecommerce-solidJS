import { useParams, A } from '@solidjs/router';
import { createSignal, Show } from 'solid-js';
import { ArrowLeft, ShoppingCart, Star, Check, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-solid';
import { products } from '../data/products';
import { addToCart } from '../stores/cartStore';

export default function ProductDetail() {
  const params = useParams();
  const [quantity, setQuantity] = createSignal(1);
  const [added, setAdded] = createSignal(false);

  const product = () => products.find(p => p.id === params.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleAddToCart = () => {
    const p = product();
    if (!p) return;
    
    for (let i = 0; i < quantity(); i++) {
      addToCart(p);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Show
      when={product()}
      fallback={
        <div class="min-h-screen bg-rock-black flex items-center justify-center">
          <div class="text-center">
            <h1 class="text-2xl font-bold text-white mb-4">Produto não encontrado</h1>
            <A 
              href="/products" 
              class="text-fire-red-500 hover:text-flame-orange-400 font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rock-black rounded-md px-2 py-1"
            >
              Voltar para produtos
            </A>
          </div>
        </div>
      }
    >
      <div class="min-h-screen bg-rock-black py-8 lg:py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <A
            href="/products"
            class="group inline-flex items-center gap-2 text-metal-400 hover:text-white transition-colors duration-200 mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rock-black rounded-md px-2 py-1"
          >
            <ArrowLeft size={20} class="group-hover:-translate-x-1 transition-transform duration-200" />
            Voltar para produtos
          </A>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div class="bg-metal-900 rounded-2xl overflow-hidden border border-metal-800">
              <img
                src={product()!.image}
                alt={product()!.name}
                class="w-full aspect-square object-cover"
              />
            </div>

            {/* Info */}
            <div>
              <div class="text-sm text-fire-red-500 font-medium uppercase tracking-wider mb-2">
                {product()!.category}
              </div>
              
              <h1 class="text-3xl lg:text-4xl font-bold text-white mb-4">
                {product()!.name}
              </h1>

              {/* Rating */}
              <div class="flex items-center gap-2 mb-6">
                <div class="flex items-center gap-1">
                  <Star class="text-gold-400 fill-gold-400" size={20} />
                  <span class="text-white font-semibold">{product()!.rating}</span>
                </div>
                <span class="text-metal-500">({product()!.reviews} avaliações)</span>
              </div>

              {/* Price */}
              <div class="text-4xl font-bold text-white mb-6">
                {formatPrice(product()!.price)}
              </div>

              {/* Description */}
              <p class="text-metal-300 text-lg leading-relaxed mb-8">
                {product()!.description}
              </p>

              {/* Stock */}
              <div class="flex items-center gap-2 mb-8">
                <div class={`w-2 h-2 rounded-full ${product()!.stock > 0 ? 'bg-electric-green-500' : 'bg-fire-red-500'}`} />
                <span class={product()!.stock > 0 ? 'text-electric-green-400' : 'text-fire-red-400'}>
                  {product()!.stock > 0 ? `Em estoque (${product()!.stock} unidades)` : 'Fora de estoque'}
                </span>
              </div>

              {/* Quantity & Add to Cart */}
              <div class="flex flex-col sm:flex-row gap-4 mb-8">
                {/* Quantity Selector */}
                <div class="flex items-center bg-metal-900 rounded-lg border border-metal-800">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity() - 1))}
                    class="p-4 text-metal-400 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rock-black rounded-l-lg disabled:opacity-50"
                    disabled={quantity() <= 1}
                    aria-label="Diminuir quantidade"
                  >
                    <Minus size={20} />
                  </button>
                  <span class="w-16 text-center text-white font-semibold">{quantity()}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product()!.stock, quantity() + 1))}
                    class="p-4 text-metal-400 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rock-black rounded-r-lg disabled:opacity-50"
                    disabled={quantity() >= product()!.stock}
                    aria-label="Aumentar quantidade"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={product()!.stock === 0 || added()}
                  class={`flex-1 flex items-center justify-center gap-3 py-4 px-8 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-rock-black ${
                    added()
                      ? 'bg-electric-green-500 text-white focus-visible:ring-electric-green-500'
                      : product()!.stock > 0
                        ? 'bg-fire-red-600 hover:bg-fire-red-700 text-white focus-visible:ring-fire-red-500 hover:scale-[1.02] active:scale-[0.98]'
                        : 'bg-metal-800 text-metal-500 cursor-not-allowed'
                  }`}
                >
                  {added() ? (
                    <>
                      <Check size={24} />
                      Adicionado ao Carrinho!
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={24} />
                      Adicionar ao Carrinho
                    </>
                  )}
                </button>
              </div>

              {/* Benefits */}
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-metal-800">
                <div class="flex items-center gap-3 group">
                  <Truck class="text-fire-red-500 group-hover:scale-110 transition-transform duration-200" size={24} />
                  <div>
                    <div class="text-white font-medium">Frete Grátis</div>
                    <div class="text-metal-500 text-sm">Acima de R$ 1.000</div>
                  </div>
                </div>
                <div class="flex items-center gap-3 group">
                  <Shield class="text-fire-red-500 group-hover:scale-110 transition-transform duration-200" size={24} />
                  <div>
                    <div class="text-white font-medium">Garantia 2 Anos</div>
                    <div class="text-metal-500 text-sm">Cobertura completa</div>
                  </div>
                </div>
                <div class="flex items-center gap-3 group">
                  <RotateCcw class="text-fire-red-500 group-hover:scale-110 transition-transform duration-200" size={24} />
                  <div>
                    <div class="text-white font-medium">7 Dias</div>
                    <div class="text-metal-500 text-sm">Para devolução</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
}
