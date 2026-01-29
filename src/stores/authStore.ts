import { createStore } from 'solid-js/store';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const STORAGE_KEY = 'rockshop_auth';
const USERS_KEY = 'rockshop_users';

// Load auth state from localStorage
function loadAuthFromStorage(): AuthState {
  if (typeof window === 'undefined') return { user: null, isAuthenticated: false };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { user: parsed.user, isAuthenticated: true };
    }
  } catch {
    // Ignore storage errors
  }
  return { user: null, isAuthenticated: false };
}

// Save auth state to localStorage
function saveAuthToStorage(user: User | null) {
  if (typeof window === 'undefined') return;
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Ignore storage errors
  }
}

// Get registered users from localStorage
function getRegisteredUsers(): Array<{ email: string; password: string; user: User }> {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Save registered users to localStorage
function saveRegisteredUsers(users: Array<{ email: string; password: string; user: User }>) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // Ignore storage errors
  }
}

// Create the auth store
const [auth, setAuth] = createStore<AuthState>(loadAuthFromStorage());

// Auth functions
export function getAuth() {
  return auth;
}

export function login(email: string, password: string): { success: boolean; message: string } {
  const users = getRegisteredUsers();
  const userRecord = users.find(u => u.email === email && u.password === password);
  
  if (!userRecord) {
    return { success: false, message: 'Email ou senha incorretos' };
  }
  
  setAuth({ user: userRecord.user, isAuthenticated: true });
  saveAuthToStorage(userRecord.user);
  return { success: true, message: 'Login realizado com sucesso' };
}

export function register(name: string, email: string, password: string): { success: boolean; message: string } {
  const users = getRegisteredUsers();
  
  // Check if email already exists
  if (users.some(u => u.email === email)) {
    return { success: false, message: 'Este email já está cadastrado' };
  }
  
  // Validate password
  if (password.length < 6) {
    return { success: false, message: 'A senha deve ter pelo menos 6 caracteres' };
  }
  
  // Create new user
  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    name,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
  };
  
  // Save to registered users
  users.push({ email, password, user: newUser });
  saveRegisteredUsers(users);
  
  // Auto login after registration
  setAuth({ user: newUser, isAuthenticated: true });
  saveAuthToStorage(newUser);
  
  return { success: true, message: 'Conta criada com sucesso' };
}

export function logout() {
  setAuth({ user: null, isAuthenticated: false });
  saveAuthToStorage(null);
}

export function updateProfile(updates: Partial<User>): { success: boolean; message: string } {
  if (!auth.user) {
    return { success: false, message: 'Usuário não está logado' };
  }
  
  const updatedUser = { ...auth.user, ...updates };
  
  // Update in registered users
  const users = getRegisteredUsers();
  const userIndex = users.findIndex(u => u.email === auth.user?.email);
  if (userIndex !== -1) {
    users[userIndex].user = updatedUser;
    saveRegisteredUsers(users);
  }
  
  // Update current auth
  setAuth('user', updatedUser);
  saveAuthToStorage(updatedUser);
  
  return { success: true, message: 'Perfil atualizado com sucesso' };
}

export function isAuthenticated(): boolean {
  return auth.isAuthenticated;
}

export function getCurrentUser(): User | null {
  return auth.user;
}

// Create a demo user for testing (optional)
export function createDemoUser() {
  const users = getRegisteredUsers();
  if (!users.some(u => u.email === 'demo@rockshop.com')) {
    const demoUser: User = {
      id: 'demo-001',
      email: 'demo@rockshop.com',
      name: 'Usuário Demo',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo'
    };
    users.push({ 
      email: 'demo@rockshop.com', 
      password: '123456', 
      user: demoUser 
    });
    saveRegisteredUsers(users);
  }
}
