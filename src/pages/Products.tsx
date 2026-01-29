import { For, createSignal, createMemo } from 'solid-js';
import { Search, SlidersHorizontal } from 'lucide-solid';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = createSignal('Todos');
  const [searchQuery, setSearchQuery] = createSignal('');
  const [sortBy, setSortBy] = createSignal('name');

  const filteredProducts = createMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory() !== 'Todos') {
      result = result.filter(p => p.category === selectedCategory());
    }

    // Filter by search
    if (searchQuery()) {
      const query = searchQuery().toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy()) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  });

  return (
    <div class="min-h-screen bg-rock-black py-8 lg:py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div class="mb-8">
          <h1 class="text-3xl lg:text-4xl font-bold text-white mb-4">
            Todos os Produtos
          </h1>
          <p class="text-metal-400">
            {filteredProducts().length} produtos encontrados
          </p>
        </div>

        {/* Filters */}
        <div class="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div class="relative flex-1">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-metal-500" size={20} />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery()}
              onInput={(e) => setSearchQuery(e.currentTarget.value)}
              class="w-full bg-metal-900 border border-metal-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-fire-red-500 focus:ring-1 focus:ring-fire-red-500/50 transition-all duration-200 placeholder-metal-500"
            />
          </div>

          {/* Sort */}
          <div class="flex items-center gap-2">
            <SlidersHorizontal class="text-metal-500" size={20} />
            <select
              value={sortBy()}
              onChange={(e) => setSortBy(e.currentTarget.value)}
              class="bg-metal-900 border border-metal-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-fire-red-500 focus:ring-1 focus:ring-fire-red-500/50 transition-all duration-200 cursor-pointer"
            >
              <option value="name">Nome</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="rating">Melhor Avaliação</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div class="flex flex-wrap gap-2 mb-8">
          <For each={categories}>
            {(category) => (
              <button
                onClick={() => setSelectedCategory(category)}
                class={`px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rock-black ${
                  selectedCategory() === category
                    ? 'bg-fire-red-600 text-white hover:bg-fire-red-700'
                    : 'bg-metal-900 text-metal-300 hover:bg-metal-800 hover:text-white'
                }`}
              >
                {category}
              </button>
            )}
          </For>
        </div>

        {/* Products Grid */}
        {filteredProducts().length > 0 ? (
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <For each={filteredProducts()}>
              {(product) => <ProductCard product={product} />}
            </For>
          </div>
        ) : (
          <div class="text-center py-16">
            <div class="text-metal-400 text-lg mb-2">Nenhum produto encontrado</div>
            <p class="text-metal-500">Tente ajustar seus filtros de busca</p>
          </div>
        )}
      </div>
    </div>
  );
}
