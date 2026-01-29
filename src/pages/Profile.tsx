import { createSignal } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';
import { User, Mail, LogOut, Edit2, Check, X, ArrowLeft, ShoppingBag } from 'lucide-solid';
import { getAuth, logout, updateProfile } from '../stores/authStore';

export default function Profile() {
  const navigate = useNavigate();
  const auth = getAuth;
  const [isEditing, setIsEditing] = createSignal(false);
  const [name, setName] = createSignal(auth().user?.name || '');
  const [error, setError] = createSignal('');
  const [success, setSuccess] = createSignal('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = () => {
    setError('');
    setSuccess('');

    if (!name().trim()) {
      setError('O nome não pode estar vazio');
      return;
    }

    const result = updateProfile({ name: name() });
    
    if (result.success) {
      setSuccess(result.message);
      setIsEditing(false);
    } else {
      setError(result.message);
    }
  };

  const handleCancel = () => {
    setName(auth().user?.name || '');
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  // Redirect if not authenticated
  if (!auth().isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div class="min-h-screen bg-rock-black py-8 lg:py-12">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <A
          href="/"
          class="group inline-flex items-center gap-2 text-metal-400 hover:text-white transition-colors duration-200 mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rock-black rounded-md px-2 py-1"
        >
          <ArrowLeft size={20} class="group-hover:-translate-x-1 transition-transform duration-200" />
          Voltar para home
        </A>

        {/* Profile Card */}
        <div class="bg-metal-900 rounded-2xl p-8 border border-metal-800">
          {/* Header */}
          <div class="flex items-center justify-between mb-8">
            <h1 class="text-2xl font-bold text-white">Meu Perfil</h1>
            <button
              onClick={handleLogout}
              class="group flex items-center gap-2 text-fire-red-500 hover:text-fire-red-400 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-metal-900 rounded-md px-2 py-1"
            >
              <LogOut size={18} class="group-hover:scale-110 transition-transform duration-200" />
              Sair
            </button>
          </div>

          {/* Messages */}
          {error() && (
            <div class="bg-fire-red-600/20 border border-fire-red-600 text-fire-red-400 px-4 py-3 rounded-lg text-sm mb-6">
              {error()}
            </div>
          )}
          {success() && (
            <div class="bg-electric-green-600/20 border border-electric-green-600 text-electric-green-400 px-4 py-3 rounded-lg text-sm mb-6">
              {success()}
            </div>
          )}

          {/* Avatar */}
          <div class="flex justify-center mb-8">
            <div class="relative group">
              <img
                src={auth().user?.avatar}
                alt={auth().user?.name}
                class="w-32 h-32 rounded-full border-4 border-metal-800 group-hover:border-fire-red-500 transition-colors duration-300"
              />
              <div class="absolute bottom-0 right-0 bg-electric-green-500 w-6 h-6 rounded-full border-4 border-metal-900 animate-pulse-fire" />
            </div>
          </div>

          {/* Info */}
          <div class="space-y-6">
            {/* Name */}
            <div>
              <label class="block text-sm font-medium text-metal-400 mb-2">
                Nome
              </label>
              {isEditing() ? (
                <div class="flex gap-2">
                  <div class="relative flex-1">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User class="text-metal-500" size={18} />
                    </div>
                    <input
                      type="text"
                      value={name()}
                      onInput={(e) => setName(e.currentTarget.value)}
                      class="w-full bg-metal-800 border border-metal-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-fire-red-500 focus:ring-1 focus:ring-fire-red-500/50 transition-all duration-200"
                    />
                  </div>
                  <button
                    onClick={handleSave}
                    class="bg-electric-green-600 hover:bg-electric-green-700 text-white p-3 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-metal-900 hover:scale-105 active:scale-95"
                    aria-label="Salvar alterações"
                  >
                    <Check size={20} />
                  </button>
                  <button
                    onClick={handleCancel}
                    class="bg-metal-700 hover:bg-metal-600 text-white p-3 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-metal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-metal-900 hover:scale-105 active:scale-95"
                    aria-label="Cancelar edição"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div class="flex items-center justify-between bg-metal-800 rounded-lg px-4 py-3 border border-metal-700">
                  <div class="flex items-center gap-3">
                    <User class="text-metal-500" size={18} />
                    <span class="text-white">{auth().user?.name}</span>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    class="text-metal-400 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 rounded p-1"
                    aria-label="Editar nome"
                  >
                    <Edit2 size={18} />
                  </button>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label class="block text-sm font-medium text-metal-400 mb-2">
                Email
              </label>
              <div class="flex items-center gap-3 bg-metal-800 rounded-lg px-4 py-3 border border-metal-700">
                <Mail class="text-metal-500" size={18} />
                <span class="text-white">{auth().user?.email}</span>
              </div>
            </div>

            {/* Member Since */}
            <div>
              <label class="block text-sm font-medium text-metal-400 mb-2">
                ID do Usuário
              </label>
              <div class="bg-metal-800 rounded-lg px-4 py-3 border border-metal-700">
                <span class="text-metal-500 text-sm font-mono">{auth().user?.id}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div class="mt-8 pt-8 border-t border-metal-800 space-y-3">
            <A
              href="/cart"
              class="group flex items-center justify-center gap-2 w-full bg-metal-800 hover:bg-metal-700 text-white text-center py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-metal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-metal-900 hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShoppingBag size={18} class="group-hover:scale-110 transition-transform duration-200" />
              Ver meu carrinho
            </A>
            <A
              href="/products"
              class="block w-full bg-fire-red-600 hover:bg-fire-red-700 text-white text-center py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-metal-900 hover:scale-[1.02] active:scale-[0.98]"
            >
              Continuar comprando
            </A>
          </div>
        </div>
      </div>
    </div>
  );
}
