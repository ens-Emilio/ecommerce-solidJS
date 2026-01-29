import { A } from '@solidjs/router';
import { ShoppingCart, Star, Check } from 'lucide-solid';
import type { Product } from '../types';
import { addToCart } from '../stores/cartStore';
import { createSignal } from 'solid-js';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard(props: ProductCardProps) {
  const [added, setAdded] = createSignal(false);
  const product = () => props.product;

  const handleAddToCart = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product());
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div class="group bg-metal-900 rounded-xl overflow-hidden border border-metal-800 hover:border-flame-orange-500 transition-all duration-300 hover:shadow-xl hover:shadow-fire-red-900/20 hover:-translate-y-1">
      {/* Image */}
      <A href={`/products/${product().id}`} class="block relative aspect-square overflow-hidden">
        <img
          src={product().image}
          alt={product().name}
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product().stock <= 3 && product().stock > 0 && (
          <span class="absolute top-3 left-3 bg-fire-red-600 text-white text-xs font-bold px-2 py-1 rounded animate-pulse-fire">
            {product().stock} RESTANTES
          </span>
        )}
      </A>

      {/* Content */}
      <div class="p-4">
        <div class="text-xs text-metal-400 uppercase tracking-wider mb-1">
          {product().category}
        </div>
        
        <A href={`/products/${product().id}`}>
          <h3 class="text-white font-semibold text-lg mb-2 group-hover:text-fire-red-400 transition-colors duration-200 line-clamp-1">
            {product().name}
          </h3>
        </A>

        {/* Rating */}
        <div class="flex items-center gap-1 mb-3">
          <Star size={14} class="text-gold-400 fill-gold-400" />
          <span class="text-metal-300 text-sm">{product().rating}</span>
          <span class="text-metal-500 text-sm">({product().reviews})</span>
        </div>

        {/* Price & Add to Cart */}
        <div class="flex items-center justify-between">
          <span class="text-xl font-bold text-white">
            {formatPrice(product().price)}
          </span>
          
          <button
            onClick={handleAddToCart}
            class={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-metal-900 ${
              added()
                ? 'bg-electric-green-500 text-white focus-visible:ring-electric-green-500'
                : 'bg-fire-red-600 hover:bg-fire-red-700 text-white focus-visible:ring-fire-red-500 hover:scale-105 active:scale-95'
            }`}
            disabled={added()}
            aria-label={added() ? 'Produto adicionado ao carrinho' : 'Adicionar ao carrinho'}
          >
            {added() ? (
              <>
                <Check size={18} />
                <span>Adicionado</span>
              </>
            ) : (
              <>
                <ShoppingCart size={18} class="group-hover:rotate-3 transition-transform duration-200" />
                <span>Comprar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
