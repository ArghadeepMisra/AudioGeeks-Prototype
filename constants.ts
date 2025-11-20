
import { User, Thread, Product, Tour, Review, DMConversation } from './types';

const IMAGES = {
  hd800s: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop',
  utopia: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop',
  amp: 'https://images.unsplash.com/photo-1558403194-611308249627?w=800&auto=format&fit=crop',
  dac: 'https://images.unsplash.com/photo-1544508733-267d43c6c42f?w=800&auto=format&fit=crop',
  setup: 'https://images.unsplash.com/photo-1590845947698-8924d7409b56?w=800&auto=format&fit=crop',
  profile: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop'
};

export const MOCK_USERS: User[] = [
  { 
    id: 'u1', 
    username: 'Pulkit Bhai Chugh', 
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&auto=format&fit=crop', 
    badge: 'Admin', 
    bio: 'System Admin & Audio Enthusiast', 
    joinDate: 'Jan 2020', 
    gearList: ['ZMF Atrium', 'Feliks Envy'] 
  },
  { 
    id: 'u2', 
    username: 'Sandeep Agarwal', 
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop', 
    badge: 'Admin', 
    bio: 'Building amps is my passion.', 
    joinDate: 'Mar 2021', 
    gearList: ['Bottlehead Crack'] 
  },
  { 
    id: 'u3', 
    username: 'Sandeep Bhai Pro', 
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop', 
    badge: 'Admin',
    bio: 'If it does not rumble, I do not want it.', 
    joinDate: 'Feb 2022' 
  },
  { 
    id: 'u4', 
    username: 'Rahul Nayyar', 
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop', 
    badge: 'Moderator', 
    bio: 'Keeping the forums clean.', 
    joinDate: 'Jan 2019' 
  },
  {
    id: 'u5',
    username: 'Rohit Upadhyay',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&auto=format&fit=crop',
    bio: 'Music is life.',
    joinDate: 'May 2020'
  },
  {
    id: 'u6',
    username: 'Mark DeVitre',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop',
    bio: 'Audio enthusiast from LA.',
    joinDate: 'Jun 2021'
  },
  {
    id: 'u7',
    username: 'Ezra',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop',
    joinDate: 'Jul 2021'
  },
  {
    id: 'u8',
    username: 'Carlos',
    avatar: 'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=200&auto=format&fit=crop',
    joinDate: 'Aug 2021'
  },
  {
    id: 'u9',
    username: 'Luc',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop',
    joinDate: 'Sep 2021'
  },
  {
    id: 'u10',
    username: 'Chai Lee',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop',
    joinDate: 'Oct 2021'
  },
  {
    id: 'u11',
    username: 'Narendra Yadav',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&auto=format&fit=crop',
    joinDate: 'Nov 2021'
  },
  {
    id: 'u12',
    username: 'Jo',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop',
    joinDate: 'Dec 2021'
  }
];

export const MOCK_THREADS: Thread[] = [
  { 
    id: 't1', 
    title: 'Sennheiser HD800S vs Focal Utopia 2022', 
    author: MOCK_USERS[1], 
    replies: 142, 
    views: 5400, 
    category: 'Headphones', 
    lastActivity: '2m ago', 
    tags: ['High-End', 'Comparison'], 
    isPinned: true,
    posts: [
      { id: 'p1', author: MOCK_USERS[1], timestamp: '2 days ago', content: 'I have been testing both for a week. The soundstage on the HD800S is wider, but the Utopia has better dynamics.', images: [IMAGES.hd800s, IMAGES.utopia] },
      { id: 'p2', author: MOCK_USERS[0], timestamp: '1 day ago', content: 'Agreed. The Utopia slams harder.', images: [] }
    ]
  },
  { 
    id: 'admin-room', 
    title: 'Administration', 
    author: MOCK_USERS[0], 
    replies: 0, 
    views: 0, 
    category: 'Private', 
    lastActivity: 'Now', 
    tags: ['Admin Only'], 
    isAdmin: true, 
    isPrivate: true 
  },
  { id: 't2', title: 'Tube Rolling 101: Where to start?', author: MOCK_USERS[1], replies: 89, views: 3200, category: 'Amplifiers', lastActivity: '15m ago', tags: ['Guides', 'Tubes'] },
  { id: 't3', title: 'New Chi-Fi IEMs hitting the market in Q4', author: MOCK_USERS[2], replies: 34, views: 1200, category: 'IEMs', lastActivity: '1h ago', tags: ['Budget', 'News'] },
  { id: 't4', title: 'Vinyl Setup Showcase', author: MOCK_USERS[0], replies: 567, views: 12000, category: 'Source Gear', lastActivity: '4h ago', tags: ['Gallery'] },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'HD 800 S', brand: 'Sennheiser', price: 1699, currency: 'USD', image: IMAGES.hd800s, category: 'Headphones', rating: 4.8, reviewCount: 320, affiliateLink: 'https://amazon.com', condition: 'New', description: 'Reference class open back headphones.', specs: [{label: 'Driver', value: 'Dynamic'}, {label: 'Impedance', value: '300 ohm'}] },
  { id: 'p2', name: 'Utopia 2022', brand: 'Focal', price: 4999, currency: 'USD', image: IMAGES.utopia, category: 'Headphones', rating: 4.9, reviewCount: 85, affiliateLink: 'https://headphones.com', condition: 'New', description: 'The best dynamic driver headphone in the world?', specs: [{label: 'Driver', value: 'Beryllium'}, {label: 'Impedance', value: '80 ohm'}] },
  { id: 'p3', name: 'Cayin HA-300', brand: 'Cayin', price: 3999, currency: 'USD', image: IMAGES.amp, category: 'Amplifiers', rating: 4.7, reviewCount: 42, affiliateLink: '#', condition: 'New' },
  { id: 'p4', name: 'Chord Dave', brand: 'Chord', price: 12000, currency: 'USD', image: IMAGES.dac, category: 'DAC/Amp', rating: 4.5, reviewCount: 12, affiliateLink: '#', condition: 'New' },
];

export const MOCK_PREOWNED: Product[] = [
  { id: 'po1', name: 'Focal Clear Mg', brand: 'Focal', price: 850, currency: 'USD', image: 'https://images.unsplash.com/photo-1618422398838-4135335eb794?w=500&auto=format&fit=crop', category: 'Headphones', rating: 0, reviewCount: 0, affiliateLink: '#', condition: 'Used - Excellent', seller: MOCK_USERS[2] },
  { id: 'po2', name: 'Burson Soloist 3X', brand: 'Burson', price: 600, currency: 'USD', image: IMAGES.amp, category: 'Amplifiers', rating: 0, reviewCount: 0, affiliateLink: '#', condition: 'Used - Good', seller: MOCK_USERS[1] },
];

export const MOCK_REVIEWS: Review[] = [
  { id: 'r1', title: 'The King of Resolution?', productName: 'Hifiman Susvara Unveiled', image: IMAGES.setup, rating: 5, author: MOCK_USERS[1], snippet: 'The detail retrieval on this headphone is simply unmatched...', category: 'Headphones', fullContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { id: 'r2', title: 'Bang for Buck Champion', productName: 'Sennheiser HD600', image: IMAGES.hd800s, rating: 5, author: MOCK_USERS[3], snippet: 'Even in 2024, the HD600 remains the benchmark.', category: 'Headphones', fullContent: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { id: 'r3', title: 'Tube Magic on a Budget', productName: 'Bottlehead Crack', image: IMAGES.amp, rating: 4, author: MOCK_USERS[1], snippet: 'Building it is half the fun. Listening is the other half.', category: 'DAC/Amp' },
  { id: 'r4', title: 'Desktop End Game', productName: 'Ferrum OOR', image: IMAGES.dac, rating: 5, author: MOCK_USERS[0], snippet: 'Solid state that sounds organic.', category: 'DAC/Amp' },
];

export const MOCK_DMS: DMConversation[] = [
  { 
    id: 'dm1', 
    user: MOCK_USERS[1], 
    lastMessage: 'Did you see the new measurements?', 
    timestamp: '10:30 AM', 
    unreadCount: 2,
    messages: [
      { id: 'm1', sender: MOCK_USERS[1], content: 'Hey Pulkit!', timestamp: '10:28 AM', isMe: false },
      { id: 'm2', sender: MOCK_USERS[0], content: 'Yo, what is up?', timestamp: '10:29 AM', isMe: true },
      { id: 'm3', sender: MOCK_USERS[1], content: 'Did you see the new measurements?', timestamp: '10:30 AM', isMe: false },
    ]
  },
  { 
    id: 'dm2', 
    user: MOCK_USERS[2], 
    lastMessage: 'Thanks for the trade!', 
    timestamp: 'Yesterday', 
    unreadCount: 0,
    messages: [
        { id: 'm4', sender: MOCK_USERS[0], content: 'Tracking number sent.', timestamp: 'Yesterday', isMe: true },
        { id: 'm5', sender: MOCK_USERS[2], content: 'Thanks for the trade!', timestamp: 'Yesterday', isMe: false },
    ]
  },
];

export const MOCK_TOURS: Tour[] = [
  { 
    id: 'tr1', 
    title: 'ZMF Atrium Closed Tour', 
    equipmentName: 'ZMF Atrium Closed', 
    specs: [{ label: 'Driver', value: 'Bio-Cellulose' }, { label: 'Impedance', value: '300 ohm' }],
    description: 'The closed-back version of the legendary Atrium. Features the ADS damping system.',
    host: MOCK_USERS[3], 
    startDate: '2023-11-01', 
    endDate: '2024-02-01', 
    status: 'In Progress', 
    participants: 15, 
    region: 'North America',
    image: IMAGES.hd800s,
    productId: 'p1',
    impressions: [
      { id: 'imp1', author: MOCK_USERS[1], content: 'The bass texture is phenomenal. I was worried about the closed-back resonance but ZMF nailed the damping. It feels spacious yet intimate. Definitely buying one.', date: '2023-12-10' },
    ]
  },
  { 
    id: 'tr2', 
    title: 'Cayin N30LE DAP Tour', 
    equipmentName: 'Cayin N30LE', 
    specs: [{ label: 'DAC', value: 'Dual AK4499EQ' }, { label: 'Power', value: 'Tube/Solid State' }],
    description: '30th Anniversary Limited Edition Digital Audio Player.',
    host: MOCK_USERS[3], 
    startDate: '2023-12-15', 
    endDate: '2024-03-15', 
    status: 'Open', 
    participants: 8, 
    region: 'Europe',
    image: IMAGES.amp,
    productId: 'p3',
    impressions: []
  },
];
