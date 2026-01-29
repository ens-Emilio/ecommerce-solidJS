import { Route } from '@solidjs/router';
import type { RouteSectionProps } from '@solidjs/router';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function Layout(props: RouteSectionProps) {
  return (
    <div class="min-h-screen bg-rock-black">
      <Header />
      <main>{props.children}</main>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/" component={Layout}>
        <Route path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/products/:id" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/about" component={About} />
        <Route path="/profile" component={Profile} />
      </Route>
    </>
  );
}
