import type { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Fender Stratocaster',
    description: 'Guitarra elétrica icônica com três single-coils, braço em maple e corpo em alder. Som versátil perfeito para rock, blues e jazz.',
    price: 8999.99,
    image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=800&auto=format&fit=crop',
    category: 'Guitarras',
    stock: 5,
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2',
    name: 'Gibson Les Paul',
    description: 'Guitarra de corpo sólido com dois humbuckers, braço em mahogany e topo em maple. Som grosso e sustain infinito.',
    price: 12499.99,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop',
    category: 'Guitarras',
    stock: 3,
    rating: 4.9,
    reviews: 89
  },
  {
    id: '3',
    name: 'Marshall JCM800',
    description: 'Amplificador valvulado 100W head, clássico do rock. Som crunch único que definiu o hard rock dos anos 80.',
    price: 15999.99,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop',
    category: 'Amplificadores',
    stock: 2,
    rating: 4.9,
    reviews: 67
  },
  {
    id: '4',
    name: 'Fender Precision Bass',
    description: 'O baixo que definiu o som do rock e funk. Corpo em alder, braço em maple, captador single-coil split.',
    price: 7499.99,
    image: 'https://images.unsplash.com/photo-1550985543-f4423c9d7481?w=800&auto=format&fit=crop',
    category: 'Baixos',
    stock: 4,
    rating: 4.7,
    reviews: 156
  },
  {
    id: '5',
    name: 'DW Collector\'s Series',
    description: 'Bateria acústica profissional com shells em maple, hardware cromado e acabamento lacquer premium.',
    price: 28999.99,
    image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&auto=format&fit=crop',
    category: 'Bateria',
    stock: 1,
    rating: 5.0,
    reviews: 23
  },
  {
    id: '6',
    name: 'Roland TD-27KV',
    description: 'Bateria eletrônica com pads em mesh, módulo TD-27 com sons SuperNATURAL e conectividade Bluetooth.',
    price: 18999.99,
    image: 'https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=800&auto=format&fit=crop',
    category: 'Bateria',
    stock: 3,
    rating: 4.6,
    reviews: 45
  },
  {
    id: '7',
    name: 'Shure SM58',
    description: 'Microfone dinâmico vocal, padrão da indústria. Construção robusta, som cristalino e rejeição de feedback.',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop',
    category: 'Áudio',
    stock: 15,
    rating: 4.8,
    reviews: 342
  },
  {
    id: '8',
    name: 'Boss DS-1 Distortion',
    description: 'Pedal de distorção clássico, usado por grandes guitarristas. Tom agressivo e sustain controlável.',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1558584673-c834fb1cc3ca?w=800&auto=format&fit=crop',
    category: 'Pedais',
    stock: 20,
    rating: 4.5,
    reviews: 278
  }
];

export const categories = ['Todos', 'Guitarras', 'Baixos', 'Amplificadores', 'Bateria', 'Áudio', 'Pedais'];
