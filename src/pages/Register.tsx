import { createSignal } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';
import { Music, Eye, EyeOff, Mail, Lock, User } from 'lucide-solid';
import { register } from '../stores/authStore';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [confirmPassword, setConfirmPassword] = createSignal('');
  const [showPassword, setShowPassword] = createSignal(false);
  const [error, setError] = createSignal('');
  const [isLoading, setIsLoading] = createSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (!name() || !email() || !password()) {
      setError('Preencha todos os campos');
      setIsLoading(false);
      return;
    }

    if (password() !== confirmPassword()) {
      setError('As senhas não coincidem');
      setIsLoading(false);
      return;
    }

    if (password().length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = register(name(), email(), password());
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    
    setIsLoading(false);
  };

  return (
    <div class="min-h-screen bg-rock-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        {/* Logo */}
        <div class="text-center">
          <div class="flex justify-center mb-4">
            <div class="bg-fire-red-600/20 p-4 rounded-full animate-pulse-fire">
              <Music class="text-fire-red-500" size={40} />
            </div>
          </div>
          <h2 class="text-3xl font-bold text-white">
            Crie sua conta
          </h2>
          <p class="mt-2 text-metal-400">
            Junte-se à comunidade ROCKSHOP
          </p>
        </div>

        {/* Form */}
        <form class="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div class="bg-metal-900 rounded-xl p-8 space-y-6 border border-metal-800">
            {/* Error Message */}
            {error() && (
              <div class="bg-fire-red-600/20 border border-fire-red-600 text-fire-red-400 px-4 py-3 rounded-lg text-sm">
                {error()}
              </div>
            )}

            {/* Name */}
            <div>
              <label for="name" class="block text-sm font-medium text-metal-300 mb-2">
                Nome completo
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User class="text-metal-500" size={18} />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autocomplete="name"
                  required
                  value={name()}
                  onInput={(e) => setName(e.currentTarget.value)}
                  class="w-full bg-metal-800 border border-metal-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-fire-red-500 focus:ring-1 focus:ring-fire-red-500/50 transition-all duration-200 placeholder-metal-500"
                  placeholder="Seu nome"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label for="email" class="block text-sm font-medium text-metal-300 mb-2">
                Email
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail class="text-metal-500" size={18} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  value={email()}
                  onInput={(e) => setEmail(e.currentTarget.value)}
                  class="w-full bg-metal-800 border border-metal-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-fire-red-500 focus:ring-1 focus:ring-fire-red-500/50 transition-all duration-200 placeholder-metal-500"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label for="password" class="block text-sm font-medium text-metal-300 mb-2">
                Senha
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock class="text-metal-500" size={18} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword() ? 'text' : 'password'}
                  autocomplete="new-password"
                  required
                  value={password()}
                  onInput={(e) => setPassword(e.currentTarget.value)}
                  class="w-full bg-metal-800 border border-metal-700 text-white pl-10 pr-12 py-3 rounded-lg focus:outline-none focus:border-fire-red-500 focus:ring-1 focus:ring-fire-red-500/50 transition-all duration-200 placeholder-metal-500"
                  placeholder="Mínimo 6 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword())}
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-metal-500 hover:text-metal-300 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 rounded"
                  aria-label={showPassword() ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword() ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-metal-300 mb-2">
                Confirme a senha
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock class="text-metal-500" size={18} />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword() ? 'text' : 'password'}
                  autocomplete="new-password"
                  required
                  value={confirmPassword()}
                  onInput={(e) => setConfirmPassword(e.currentTarget.value)}
                  class="w-full bg-metal-800 border border-metal-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-fire-red-500 focus:ring-1 focus:ring-fire-red-500/50 transition-all duration-200 placeholder-metal-500"
                  placeholder="Repita a senha"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading()}
              class="w-full bg-fire-red-600 hover:bg-fire-red-700 disabled:bg-fire-red-600/50 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-metal-900 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading() ? (
                <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Criar conta'
              )}
            </button>
          </div>

          {/* Login Link */}
          <div class="text-center">
            <p class="text-metal-400">
              Já tem uma conta?{' '}
              <A 
                href="/login" 
                class="text-fire-red-500 hover:text-flame-orange-400 font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rock-black rounded-md px-1"
              >
                Entre aqui
              </A>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
