import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Menu, 
  X, 
  MapPin, 
  Home as HomeIcon, 
  IndianRupee, 
  Maximize2, 
  BedDouble, 
  Filter, 
  ChevronRight, 
  Heart, 
  Phone,
  Info,
  Building2,
  CheckCircle2,
  ArrowRight,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  Plus,
  Trash2,
  Edit,
  Users,
  Settings,
  PlusCircle,
  BarChart3,
  Globe,
  Camera,
  PieChart,
  FileText,
  Upload,
  Download,
  Eye,
  RefreshCw
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart as RePieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from 'recharts';
import { PROPERTIES, CITIES } from './data';
import { Property, City, ViewState, User, AdminTab } from './types';

// --- Components ---

const ReviewSection: React.FC<{ 
  property: Property; 
  onAddReview: (review: any) => void;
}> = ({ 
  property, 
  onAddReview 
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment || !userName) return;

    const newReview = {
      id: `r-${Date.now()}`,
      user: userName,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };

    onAddReview(newReview);
    setComment('');
    setUserName('');
    setRating(5);
  };

  return (
    <div className="mt-12 pt-12 border-t border-gray-100">
      <h3 className="text-2xl font-bold text-blue-900 mb-8">User Reviews & Ratings</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Review List */}
        <div className="space-y-6">
          {property.reviews && property.reviews.length > 0 ? (
            property.reviews.map((review) => (
              <div key={review.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-gray-900">{review.user}</h4>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                  <div className="flex items-center bg-white px-2 py-1 rounded-lg shadow-sm">
                    <span className="text-sm font-bold text-orange-600 mr-1">{review.rating}</span>
                    <Heart className="h-3 w-3 text-orange-600 fill-orange-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-400 text-sm">No reviews yet. Be the first to review!</p>
            </div>
          )}
        </div>

        {/* Add Review Form */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-fit">
          <h4 className="font-bold text-lg text-blue-900 mb-6">Leave a Review</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Your Name</label>
              <input 
                type="text" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Rating</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setRating(num)}
                    className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all ${
                      rating >= num ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${rating >= num ? 'fill-white' : ''}`} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Comment</label>
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this property..."
                rows={4}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10 resize-none"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-900 text-white font-bold py-4 rounded-xl hover:bg-blue-800 transition-colors"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const AuthPage = ({ onLogin }: { onLogin: (user: User) => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Admin Simulation
    if (email === 'admin@indiapropertyfinder.com' && password === 'admin123') {
      onLogin({
        id: 'admin-1',
        name: 'Admin User',
        email: email,
        role: 'admin',
        savedProperties: [],
        recentlyViewed: [],
        signupDate: '2025-01-01',
        status: 'active'
      });
      return;
    }

    // User Simulation
    onLogin({
      id: 'user-1',
      name: name || 'Demo User',
      email: email,
      role: 'user',
      savedProperties: [],
      recentlyViewed: [],
      signupDate: new Date().toISOString().split('T')[0],
      status: 'active'
    });
  };

  return (
    <div className="max-w-md mx-auto my-20 px-4">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
        <div className="flex mb-8 bg-gray-50 p-1 rounded-xl">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${isLogin ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-400'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!isLogin ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-400'}`}
          >
            Signup
          </button>
        </div>

        <h2 className="text-2xl font-bold text-blue-900 mb-6">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-900 text-white font-bold py-4 rounded-xl hover:bg-blue-800 transition-colors"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-blue-900 font-bold hover:underline">
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const UserDashboard = ({ 
  user, 
  onLogout, 
  onNavigateToProperty,
  properties
}: { 
  user: User, 
  onLogout: () => void, 
  onNavigateToProperty: (id: string) => void,
  properties: Property[]
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'saved' | 'history'>('profile');
  const savedProperties = properties.filter(p => user.savedProperties.includes(p.id) && !p.isDeleted);
  const recentProperties = properties.filter(p => user.recentlyViewed.includes(p.id) && !p.isDeleted);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar */}
        <div className="w-full md:w-80 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="text-center mb-8">
            <div className="h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-md">
              <UserIcon className="h-12 w-12 text-blue-900" />
            </div>
            <h3 className="font-bold text-xl text-blue-900">{user.name}</h3>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
          
          <div className="space-y-2">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-3 rounded-xl flex items-center transition-all ${
                activeTab === 'profile' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-gray-500 hover:bg-gray-50 font-medium'
              }`}
            >
              <UserIcon className="h-5 w-5 mr-3" />
              My Profile
            </button>
            <button 
              onClick={() => setActiveTab('saved')}
              className={`w-full text-left px-4 py-3 rounded-xl flex items-center transition-all ${
                activeTab === 'saved' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-gray-500 hover:bg-gray-50 font-medium'
              }`}
            >
              <Heart className="h-5 w-5 mr-3" />
              Saved Properties
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`w-full text-left px-4 py-3 rounded-xl flex items-center transition-all ${
                activeTab === 'history' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-gray-500 hover:bg-gray-50 font-medium'
              }`}
            >
              <Search className="h-5 w-5 mr-3" />
              Search History
            </button>
            <button 
              onClick={onLogout}
              className="w-full text-left px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-bold flex items-center transition-colors mt-8"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
              <h2 className="text-2xl font-bold text-blue-900">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Full Name</label>
                  <p className="text-gray-900 font-medium bg-gray-50 p-4 rounded-xl border border-gray-100">{user.name}</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email Address</label>
                  <p className="text-gray-900 font-medium bg-gray-50 p-4 rounded-xl border border-gray-100">{user.email}</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Phone Number</label>
                  <p className="text-gray-900 font-medium bg-gray-50 p-4 rounded-xl border border-gray-100">{user.phone || 'Not provided'}</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Member Since</label>
                  <p className="text-gray-900 font-medium bg-gray-50 p-4 rounded-xl border border-gray-100">{user.signupDate || 'Jan 2026'}</p>
                </div>
              </div>
              <div className="pt-8 border-t border-gray-50">
                <button className="bg-blue-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          )}

          {activeTab === 'saved' && (
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Saved Properties</h2>
              {savedProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedProperties.map(p => (
                    <PropertyCard key={p.id} property={p} onClick={() => onNavigateToProperty(p.id)} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <Heart className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-400">No saved properties yet.</p>
                </div>
              )}
            </section>
          )}

          {activeTab === 'history' && (
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Search History</h2>
              {recentProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentProperties.map(p => (
                    <PropertyCard key={p.id} property={p} onClick={() => onNavigateToProperty(p.id)} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <Search className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-400">Your search history is empty.</p>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ 
  onLogout, 
  properties, 
  cities,
  users,
  siteSettings,
  onAddProperty,
  onUpdateProperty,
  onDeleteProperty,
  onRestoreProperty,
  onPermanentDeleteProperty,
  onAddCity,
  onUpdateCity,
  onDeleteCity,
  onRestoreCity,
  onPermanentDeleteCity,
  onUpdateUserStatus,
  onDeleteUser,
  onUpdateSettings,
  onNavigateToProperty
}: { 
  onLogout: () => void, 
  properties: Property[], 
  cities: City[],
  users: User[],
  siteSettings: any,
  onAddProperty: (p: Property) => void,
  onUpdateProperty: (p: Property) => void,
  onDeleteProperty: (id: string) => void,
  onRestoreProperty: (id: string) => void,
  onPermanentDeleteProperty: (id: string) => void,
  onAddCity: (c: City) => void,
  onUpdateCity: (oldName: string, c: City) => void,
  onDeleteCity: (name: string) => void,
  onRestoreCity: (name: string) => void,
  onPermanentDeleteCity: (name: string) => void,
  onUpdateUserStatus: (id: string, status: 'active' | 'disabled') => void,
  onDeleteUser: (id: string) => void,
  onUpdateSettings: (s: any) => void,
  onNavigateToProperty: (id: string) => void
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [showDeletedProperties, setShowDeletedProperties] = useState(false);
  const [showDeletedCities, setShowDeletedCities] = useState(false);

  const activeProperties = properties.filter(p => !p.isDeleted);
  const deletedProperties = properties.filter(p => p.isDeleted);
  const activeCities = cities.filter(c => !c.isDeleted);
  const deletedCities = cities.filter(c => c.isDeleted);

  const stats = [
    { label: 'Total Properties', value: activeProperties.length, icon: Building2, color: 'bg-blue-500' },
    { label: 'Total Users', value: users.length, icon: Users, color: 'bg-emerald-500' },
    { label: 'Cities Available', value: activeCities.length, icon: Globe, color: 'bg-orange-500' },
    { label: 'New Listings', value: '12', icon: PlusCircle, color: 'bg-purple-500' },
  ];

  const [newProperty, setNewProperty] = useState<Partial<Property>>({
    type: 'Apartment',
    amenities: [],
    gallery: {
      exterior: '',
      living: '',
      bedroom: '',
      kitchen: '',
      bathroom: '',
      balcony: '',
      surroundings: '',
      aerial: ''
    }
  });

  const handleAddPropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `p-${Date.now()}`;
    const priceValue = parseInt(newProperty.price?.replace(/[^0-9]/g, '') || '0');
    const p: Property = {
      ...newProperty as Property,
      id,
      priceValue,
      image: newProperty.gallery?.exterior || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80',
      reviews: []
    };
    onAddProperty(p);
    setActiveTab('properties');
    setNewProperty({
      type: 'Apartment',
      amenities: [],
      gallery: {
        exterior: '',
        living: '',
        bedroom: '',
        kitchen: '',
        bathroom: '',
        balcony: '',
        surroundings: '',
        aerial: ''
      }
    });
  };

  const handleEditPropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProperty) {
      onUpdateProperty(editingProperty);
      setEditingProperty(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6 hidden lg:block sticky top-0 h-screen">
        <div className="flex items-center mb-12">
          <Building2 className="h-8 w-8 mr-2" />
          <span className="font-bold text-lg">Admin Panel</span>
        </div>

        <nav className="space-y-2">
          {[
            { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'properties', label: 'Manage Properties', icon: Building2 },
            { id: 'add-property', label: 'Add Property', icon: Plus },
            { id: 'cities', label: 'Manage Cities', icon: Globe },
            { id: 'users', label: 'Manage Users', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: PieChart },
            { id: 'reports', label: 'Reports', icon: FileText },
            { id: 'settings', label: 'Site Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as AdminTab);
                setEditingProperty(null);
                setEditingCity(null);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${
                activeTab === item.id ? 'bg-white/10 text-white font-bold' : 'text-white/60 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </button>
          ))}
          <button 
            onClick={onLogout}
            className="w-full flex items-center px-4 py-3 rounded-xl text-red-400 hover:text-red-300 transition-colors mt-12"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-2xl font-bold text-blue-900 capitalize">{activeTab.replace('-', ' ')}</h1>
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-full shadow-sm">
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-900">
              A
            </div>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <div className={`${stat.color} h-12 w-12 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-blue-900">{stat.value}</h3>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { text: 'New property added in Mumbai', time: '2 hours ago', icon: Plus },
                    { text: 'User "Rahul S." signed up', time: '5 hours ago', icon: UserIcon },
                    { text: 'Property IPF-PROP0042 deleted', time: '1 day ago', icon: Trash2 },
                    { text: 'Site settings updated', time: '2 days ago', icon: Settings },
                  ].map((act, i) => (
                    <div key={i} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                          <act.icon className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{act.text}</p>
                          <p className="text-xs text-gray-400">{act.time}</p>
                        </div>
                      </div>
                      <button className="text-blue-900 text-xs font-bold hover:underline">View</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-6">Quick Stats</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Mon', v: 40 },
                      { name: 'Tue', v: 30 },
                      { name: 'Wed', v: 50 },
                      { name: 'Thu', v: 45 },
                      { name: 'Fri', v: 60 },
                    ]}>
                      <Bar dataKey="v" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
                      <XAxis dataKey="name" hide />
                      <Tooltip />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-center text-gray-400 mt-4">Daily property views (last 5 days)</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'properties' && !editingProperty && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex bg-white p-1 rounded-xl border border-gray-100">
                <button 
                  onClick={() => setShowDeletedProperties(false)}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${!showDeletedProperties ? 'bg-blue-900 text-white shadow-md' : 'text-gray-400'}`}
                >
                  Active Listings
                </button>
                <button 
                  onClick={() => setShowDeletedProperties(true)}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${showDeletedProperties ? 'bg-blue-900 text-white shadow-md' : 'text-gray-400'}`}
                >
                  Deleted Properties
                </button>
              </div>
              <button 
                onClick={() => setActiveTab('add-property')}
                className="bg-blue-900 text-white px-6 py-2 rounded-xl font-bold flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </button>
              <button 
                onClick={() => {
                  alert('Simulating bulk upload... 50 new properties have been added to the system.');
                }}
                className="bg-white text-blue-900 border border-blue-900 px-6 py-2 rounded-xl font-bold flex items-center ml-2"
              >
                <Upload className="h-4 w-4 mr-2" />
                Bulk Upload
              </button>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-bold">
                  <tr>
                    <th className="px-6 py-4">Property</th>
                    <th className="px-6 py-4">City</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {(showDeletedProperties ? deletedProperties : activeProperties).map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img src={p.image} className="h-10 w-10 rounded-lg object-cover mr-3" referrerPolicy="no-referrer" />
                          <span className="text-sm font-bold text-gray-900">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{p.city}</td>
                      <td className="px-6 py-4 text-sm font-bold text-orange-600">{p.price}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{p.type}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          {!p.isDeleted ? (
                            <>
                              <button 
                                onClick={() => onNavigateToProperty(p.id)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Globe className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => setEditingProperty(p)}
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => onDeleteProperty(p.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button 
                                onClick={() => onRestoreProperty(p.id)}
                                className="px-3 py-1 text-xs font-bold text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                              >
                                Restore
                              </button>
                              <button 
                                onClick={() => onPermanentDeleteProperty(p.id)}
                                className="px-3 py-1 text-xs font-bold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                              >
                                Delete Permanently
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {(showDeletedProperties ? deletedProperties : activeProperties).length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-20 text-center text-gray-400 italic">
                        No {showDeletedProperties ? 'deleted' : 'active'} properties found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {editingProperty && (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-blue-900">Edit Property: {editingProperty.name}</h2>
              <button onClick={() => setEditingProperty(null)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleEditPropertySubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Property Name</label>
                  <input 
                    type="text" 
                    value={editingProperty.name}
                    onChange={(e) => setEditingProperty({...editingProperty, name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">City</label>
                  <select 
                    value={editingProperty.city}
                    onChange={(e) => setEditingProperty({...editingProperty, city: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10"
                  >
                    {cities.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Price (e.g. ₹50 Lakhs)</label>
                  <input 
                    type="text" 
                    value={editingProperty.price}
                    onChange={(e) => setEditingProperty({...editingProperty, price: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Property Type</label>
                  <select 
                    value={editingProperty.type}
                    onChange={(e) => setEditingProperty({...editingProperty, type: e.target.value as any})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Independent House">Independent House</option>
                    <option value="Plot">Plot</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Bedrooms</label>
                  <select 
                    value={editingProperty.bedrooms}
                    onChange={(e) => setEditingProperty({...editingProperty, bedrooms: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10"
                  >
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4+ BHK">4+ BHK</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Area (sq ft)</label>
                  <input 
                    type="text" 
                    value={editingProperty.area}
                    onChange={(e) => setEditingProperty({...editingProperty, area: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Description</label>
                <textarea 
                  value={editingProperty.description}
                  onChange={(e) => setEditingProperty({...editingProperty, description: e.target.value})}
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10 resize-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Parking', 'Garden', 'Gym', 'Swimming Pool', 'Security', 'Lift'].map(amenity => (
                    <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={editingProperty.amenities.includes(amenity)}
                        onChange={(e) => {
                          const amenities = e.target.checked 
                            ? [...editingProperty.amenities, amenity]
                            : editingProperty.amenities.filter(a => a !== amenity);
                          setEditingProperty({...editingProperty, amenities});
                        }}
                        className="rounded text-blue-900"
                      />
                      <span className="text-sm text-gray-600">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="pt-6 border-t border-gray-50 flex space-x-4">
                <button type="submit" className="bg-blue-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition-colors">
                  Save Changes
                </button>
                <button type="button" onClick={() => setEditingProperty(null)} className="bg-gray-100 text-gray-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'add-property' && (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-blue-900 mb-8">Add New Property Listing</h2>
            <form onSubmit={handleAddPropertySubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Property Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Skyline Apartments"
                    onChange={(e) => setNewProperty({...newProperty, name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">City</label>
                  <select 
                    onChange={(e) => setNewProperty({...newProperty, city: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10"
                    required
                  >
                    <option value="">Select City</option>
                    {cities.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Price (e.g. ₹50 Lakhs)</label>
                  <input 
                    type="text" 
                    placeholder="₹50 Lakhs"
                    onChange={(e) => setNewProperty({...newProperty, price: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Property Type</label>
                  <select 
                    onChange={(e) => setNewProperty({...newProperty, type: e.target.value as any})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Independent House">Independent House</option>
                    <option value="Plot">Plot</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Bedrooms</label>
                  <select 
                    onChange={(e) => setNewProperty({...newProperty, bedrooms: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10"
                  >
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4+ BHK">4+ BHK</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Area (sq ft)</label>
                  <input 
                    type="text" 
                    placeholder="1200 sq ft"
                    onChange={(e) => setNewProperty({...newProperty, area: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Description</label>
                <textarea 
                  placeholder="Describe the property..."
                  onChange={(e) => setNewProperty({...newProperty, description: e.target.value})}
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10 resize-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Parking', 'Garden', 'Gym', 'Swimming Pool', 'Security', 'Lift'].map(amenity => (
                    <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        onChange={(e) => {
                          const amenities = e.target.checked 
                            ? [...(newProperty.amenities || []), amenity]
                            : (newProperty.amenities || []).filter(a => a !== amenity);
                          setNewProperty({...newProperty, amenities});
                        }}
                        className="rounded text-blue-900"
                      />
                      <span className="text-sm text-gray-600">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Gallery Images (URLs)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['exterior', 'living', 'bedroom', 'kitchen', 'bathroom', 'balcony', 'surroundings', 'aerial'].map(key => (
                    <div key={key}>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">{key} View</label>
                      <input 
                        type="text" 
                        placeholder={`URL for ${key} view`}
                        onChange={(e) => setNewProperty({
                          ...newProperty, 
                          gallery: { ...newProperty.gallery!, [key]: e.target.value }
                        })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-blue-900/10"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-6 border-t border-gray-50">
                <button type="submit" className="bg-blue-900 text-white px-12 py-4 rounded-xl font-bold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20">
                  Add Property Listing
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'cities' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex bg-white p-1 rounded-xl border border-gray-100">
                <button 
                  onClick={() => setShowDeletedCities(false)}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${!showDeletedCities ? 'bg-blue-900 text-white shadow-md' : 'text-gray-400'}`}
                >
                  Active Cities
                </button>
                <button 
                  onClick={() => setShowDeletedCities(true)}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${showDeletedCities ? 'bg-blue-900 text-white shadow-md' : 'text-gray-400'}`}
                >
                  Deleted Cities
                </button>
              </div>
              <button 
                onClick={() => setEditingCity({ name: '', image: '' })}
                className="bg-blue-900 text-white px-6 py-2 rounded-xl font-bold flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add City
              </button>
            </div>

            {editingCity && (
              <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm mb-6">
                <h3 className="font-bold text-blue-900 mb-4">{editingCity.name ? 'Edit City' : 'Add New City'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="City Name"
                    value={editingCity.name}
                    onChange={(e) => setEditingCity({...editingCity, name: e.target.value})}
                    className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="Image URL"
                    value={editingCity.image}
                    onChange={(e) => setEditingCity({...editingCity, image: e.target.value})}
                    className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm outline-none"
                  />
                </div>
                <div className="mt-4 flex space-x-2">
                  <button 
                    onClick={() => {
                      if (editingCity.name) {
                        const exists = cities.find(c => c.name === editingCity.name);
                        if (exists && !editingCity.isDeleted) {
                          onUpdateCity(editingCity.name, editingCity);
                        } else {
                          onAddCity(editingCity);
                        }
                        setEditingCity(null);
                      }
                    }}
                    className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-bold"
                  >
                    Save
                  </button>
                  <button onClick={() => setEditingCity(null)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-bold">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(showDeletedCities ? deletedCities : activeCities).map((city) => (
                <div key={city.name} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center">
                    <img src={city.image} className="h-12 w-12 rounded-xl object-cover mr-4" referrerPolicy="no-referrer" />
                    <span className="font-bold text-gray-900">{city.name}</span>
                  </div>
                  <div className="flex space-x-2">
                    {!city.isDeleted ? (
                      <>
                        <button 
                          onClick={() => setEditingCity(city)}
                          className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => onDeleteCity(city.name)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => onRestoreCity(city.name)}
                          className="px-3 py-1 text-xs font-bold text-emerald-600 bg-emerald-50 rounded-lg"
                        >
                          Restore
                        </button>
                        <button 
                          onClick={() => onPermanentDeleteCity(city.name)}
                          className="px-3 py-1 text-xs font-bold text-red-600 bg-red-50 rounded-lg"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-bold">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Signup Date</th>
                  <th className="px-6 py-4">Saved</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center mr-3 font-bold text-blue-900">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{u.name}</p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{u.signupDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{u.savedProperties.length}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        u.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => onUpdateUserStatus(u.id, u.status === 'active' ? 'disabled' : 'active')}
                          className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                            u.status === 'active' ? 'text-orange-600 bg-orange-50' : 'text-emerald-600 bg-emerald-50'
                          }`}
                        >
                          {u.status === 'active' ? 'Disable' : 'Enable'}
                        </button>
                        <button 
                          onClick={() => onDeleteUser(u.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg text-blue-900 mb-6">Properties by City (Top 10)</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cities.map(c => ({ name: c.name, value: properties.filter(p => p.city === c.name && !p.isDeleted).length })).sort((a,b) => b.value - a.value).slice(0, 10)}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        cursor={{ fill: '#f9fafb' }}
                      />
                      <Bar dataKey="value" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg text-blue-900 mb-6">Property Type Distribution</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={[
                          { name: 'Apartment', value: activeProperties.filter(p => p.type === 'Apartment').length },
                          { name: 'Villa', value: activeProperties.filter(p => p.type === 'Villa').length },
                          { name: 'House', value: activeProperties.filter(p => p.type === 'Independent House').length },
                          { name: 'Plot', value: activeProperties.filter(p => p.type === 'Plot').length },
                          { name: 'Commercial', value: activeProperties.filter(p => p.type === 'Commercial').length },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {['#1e3a8a', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'].map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36}/>
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-blue-900 mb-6">Monthly Listing Growth (Simulated)</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { name: 'Jan', value: 40 },
                    { name: 'Feb', value: 30 },
                    { name: 'Mar', value: 60 },
                    { name: 'Apr', value: 45 },
                    { name: 'May', value: 90 },
                    { name: 'Jun', value: 75 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#1e3a8a" strokeWidth={3} dot={{ r: 6, fill: '#1e3a8a', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Property Listings', desc: 'Full inventory report with details', icon: Building2 },
                { title: 'User Activity', desc: 'User signups and engagement metrics', icon: Users },
                { title: 'Saved Properties', desc: 'Popular properties report', icon: Heart },
              ].map((report) => (
                <div key={report.title} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <div className="bg-blue-50 h-12 w-12 rounded-2xl flex items-center justify-center mb-6 text-blue-900">
                    <report.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{report.title}</h3>
                  <p className="text-sm text-gray-400 mb-8">{report.desc}</p>
                  <div className="flex flex-col space-y-3">
                    <button 
                      onClick={() => alert(`Downloading ${report.title} as CSV...`)}
                      className="flex items-center justify-center space-x-2 bg-gray-50 text-gray-900 py-3 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download CSV</span>
                    </button>
                    <button 
                      onClick={() => alert(`Downloading ${report.title} as PDF...`)}
                      className="flex items-center justify-center space-x-2 bg-blue-900 text-white py-3 rounded-xl text-sm font-bold hover:bg-blue-800 transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-blue-900 mb-6">General Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Website Name</label>
                  <input 
                    type="text" 
                    value={siteSettings.websiteName}
                    onChange={(e) => onUpdateSettings({...siteSettings, websiteName: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Contact Email</label>
                  <input 
                    type="email" 
                    value={siteSettings.contactEmail}
                    onChange={(e) => onUpdateSettings({...siteSettings, contactEmail: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-blue-900 mb-6">Property Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Default City</label>
                  <select 
                    value={siteSettings.defaultCity}
                    onChange={(e) => onUpdateSettings({...siteSettings, defaultCity: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10"
                  >
                    {cities.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Default Budget Range (Lakhs)</label>
                  <input 
                    type="number" 
                    value={siteSettings.defaultBudgetRange}
                    onChange={(e) => onUpdateSettings({...siteSettings, defaultBudgetRange: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-blue-900 mb-6">Admin Account</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Admin Email</label>
                  <input 
                    type="email" 
                    value={siteSettings.adminEmail}
                    onChange={(e) => onUpdateSettings({...siteSettings, adminEmail: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">New Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-900/10"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => alert('Settings saved successfully!')}
                className="bg-blue-900 text-white px-12 py-4 rounded-xl font-bold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20"
              >
                Save All Settings
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const Navbar = ({ 
  onNavigate, 
  activeView,
  user
}: { 
  onNavigate: (view: ViewState) => void; 
  activeView: ViewState;
  user: User | null;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', view: 'home' as ViewState },
    { name: 'Browse Properties', view: 'browse' as ViewState },
    { name: 'Cities', view: 'cities-page' as ViewState },
    { name: 'Budget Categories', view: 'home' as ViewState, hash: '#budget' },
    { name: 'About', view: 'about' as ViewState },
  ];

  const handleProfileClick = () => {
    if (!user) {
      onNavigate('auth');
    } else if (user.role === 'admin') {
      onNavigate('admin-dashboard');
    } else {
      onNavigate('user-dashboard');
    }
  };

  const handleLinkClick = (link: typeof navLinks[0]) => {
    onNavigate(link.view);
    if (link.hash) {
      setTimeout(() => {
        const el = document.querySelector(link.hash!);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <Building2 className="h-8 w-8 text-blue-900" />
            <span className="ml-2 text-xl font-bold text-blue-900 tracking-tight">
              IndiaPropertyFinder
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link)}
                className={`text-sm font-medium transition-colors hover:text-blue-900 ${
                  activeView === link.view ? 'text-blue-900' : 'text-gray-500'
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-blue-900 transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <button 
                onClick={handleProfileClick}
                className={`p-2 transition-colors rounded-full ${
                  user ? 'bg-blue-50 text-blue-900' : 'text-gray-500 hover:text-blue-900'
                }`}
              >
                <UserIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-500 hover:text-blue-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link)}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-900 rounded-md"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between px-3">
                <button className="flex items-center text-gray-700 font-medium" onClick={handleProfileClick}>
                  <UserIcon className="h-5 w-5 mr-3 text-blue-900" />
                  {user ? 'Dashboard' : 'Login / Signup'}
                </button>
                <button className="p-2 text-gray-500">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const PropertyCard: React.FC<{ 
  property: Property; 
  onClick: (p: Property) => void;
}> = ({ 
  property, 
  onClick 
}) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer"
      onClick={() => onClick(property)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
          <Heart className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" />
        </div>
        <div className="absolute bottom-3 left-3 bg-blue-900 text-white text-xs font-bold px-2 py-1 rounded">
          {property.type}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-900 truncate flex-1 mr-2">{property.name}</h3>
          <span className="text-orange-600 font-bold whitespace-nowrap">{property.price}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin className="h-3 w-3 mr-1" />
          {property.city}
        </div>
        <div className="flex items-center justify-between border-t border-gray-50 pt-4 text-gray-500 text-xs">
          <div className="flex items-center">
            <BedDouble className="h-3 w-3 mr-1" />
            {property.bedrooms}
          </div>
          <div className="flex items-center">
            <Maximize2 className="h-3 w-3 mr-1" />
            {property.area}
          </div>
        </div>
        <button 
          className="w-full mt-4 bg-gray-50 hover:bg-blue-900 hover:text-white text-blue-900 font-semibold py-2 rounded-lg transition-colors text-sm"
          onClick={(e) => {
            e.stopPropagation();
            onClick(property);
          }}
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

const CityCard: React.FC<{ 
  city: City; 
  onClick: (cityName: string) => void;
}> = ({ 
  city, 
  onClick 
}) => {
  const [imgSrc, setImgSrc] = useState(city.image);

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="relative h-40 rounded-2xl overflow-hidden cursor-pointer group"
      onClick={() => onClick(city.name)}
    >
      <img 
        src={imgSrc} 
        alt={city.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        referrerPolicy="no-referrer"
        onError={() => setImgSrc(`https://picsum.photos/seed/${city.name}/800/600`)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
        <div>
          <h4 className="text-white font-bold text-lg">{city.name}</h4>
          <p className="text-white/70 text-xs">Browse Properties</p>
        </div>
        <div className="bg-white/20 backdrop-blur-md p-2 rounded-full">
          <ChevronRight className="h-4 w-4 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

const Footer = ({ onNavigate }: { onNavigate: (view: ViewState) => void }) => {
  return (
    <footer className="bg-blue-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">About</button></li>
              <li><button onClick={() => onNavigate('careers')} className="hover:text-white transition-colors">Careers</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Contact</button></li>
              <li><button onClick={() => onNavigate('help')} className="hover:text-white transition-colors">Help</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><button onClick={() => onNavigate('cities-page')} className="hover:text-white transition-colors">Cities</button></li>
              <li><button onClick={() => onNavigate('budget-homes')} className="hover:text-white transition-colors">Budget Homes</button></li>
              <li><button onClick={() => onNavigate('luxury-homes')} className="hover:text-white transition-colors">Luxury Homes</button></li>
              <li><button onClick={() => onNavigate('browse')} className="hover:text-white transition-colors">New Projects</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Feedback</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">IndiaPropertyFinder</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              The most trusted real estate platform in India. Helping millions find their dream home across 20+ major cities.
            </p>
            <div className="mt-6 flex space-x-4">
              {/* Social Icons Placeholder */}
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                <span className="text-xs">FB</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                <span className="text-xs">TW</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                <span className="text-xs">IG</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
          <p>© 2026 IndiaPropertyFinder. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [user, setUser] = useState<User | null>(null);
  const [propertiesState, setPropertiesState] = useState<Property[]>(PROPERTIES);
  const [citiesState, setCitiesState] = useState<City[]>(CITIES);
  const [usersState, setUsersState] = useState<User[]>([
    {
      id: 'user-1',
      name: 'Demo User',
      email: 'user@example.com',
      role: 'user',
      phone: '+91 98765 43210',
      signupDate: '2026-01-15',
      status: 'active',
      savedProperties: [],
      recentlyViewed: []
    }
  ]);
  const [siteSettings, setSiteSettings] = useState({
    websiteName: 'IndiaPropertyFinder',
    contactEmail: 'support@indiapropertyfinder.com',
    contactPhone: '+91 1800 123 4567',
    defaultCity: 'Mumbai',
    defaultBudgetRange: '50',
    adminEmail: 'admin@indiapropertyfinder.com'
  });
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [searchCity, setSearchCity] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchBudget, setSearchBudget] = useState('');

  // Filters for Browse Page
  const [filterCity, setFilterCity] = useState('All');
  const [filterTypes, setFilterTypes] = useState<string[]>([]);
  const [filterPrice, setFilterPrice] = useState(300); // Max 300 Lakhs (3Cr)
  const [filterBHK, setFilterBHK] = useState<string[]>([]);

  const selectedProperty = useMemo(() => {
    return propertiesState.find(p => p.id === selectedPropertyId) || null;
  }, [propertiesState, selectedPropertyId]);

  const filteredProperties = useMemo(() => {
    return propertiesState.filter(p => {
      if (p.isDeleted) return false;
      const cityMatch = filterCity === 'All' || p.city === filterCity;
      const typeMatch = filterTypes.length === 0 || filterTypes.includes(p.type);
      const priceMatch = p.priceValue <= filterPrice;
      const bhkMatch = filterBHK.length === 0 || filterBHK.includes(p.bedrooms);
      return cityMatch && typeMatch && priceMatch && bhkMatch;
    });
  }, [propertiesState, filterCity, filterTypes, filterPrice, filterBHK]);

  const handlePropertyClick = (p: Property) => {
    setSelectedPropertyId(p.id);
    setView('details');
    window.scrollTo(0, 0);
    
    // Add to recently viewed
    if (user && user.role === 'user') {
      setUser(prev => {
        if (!prev) return null;
        const recentlyViewed = [p.id, ...prev.recentlyViewed.filter(id => id !== p.id)].slice(0, 10);
        return { ...prev, recentlyViewed };
      });
    }
  };

  const handleSaveProperty = (id: string) => {
    if (!user) {
      setView('auth');
      return;
    }
    if (user.role !== 'user') return;

    setUser(prev => {
      if (!prev) return null;
      const isSaved = prev.savedProperties.includes(id);
      const savedProperties = isSaved 
        ? prev.savedProperties.filter(pid => pid !== id)
        : [...prev.savedProperties, id];
      return { ...prev, savedProperties };
    });
  };

  const handleAddReview = (newReview: any) => {
    if (!selectedPropertyId) return;
    setPropertiesState(prev => prev.map(p => {
      if (p.id === selectedPropertyId) {
        return {
          ...p,
          reviews: [newReview, ...(p.reviews || [])]
        };
      }
      return p;
    }));
  };

  const handleLogin = (userData: User) => {
    // For demo purposes, if it's a new user (not admin), we reset saved properties
    const finalUser = userData.role === 'admin' ? userData : { ...userData, savedProperties: [], recentlyViewed: [] };
    setUser(finalUser);
    if (userData.role === 'admin') {
      setView('admin-dashboard');
    } else {
      setView('home');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setView('home');
  };

  const handleDeleteProperty = (id: string) => {
    setPropertiesState(prev => prev.map(p => p.id === id ? { ...p, isDeleted: true } : p));
  };

  const handleRestoreProperty = (id: string) => {
    setPropertiesState(prev => prev.map(p => p.id === id ? { ...p, isDeleted: false } : p));
  };

  const handlePermanentDeleteProperty = (id: string) => {
    setPropertiesState(prev => prev.filter(p => p.id !== id));
  };

  const handleAddProperty = (property: Property) => {
    setPropertiesState(prev => [property, ...prev]);
  };

  const handleUpdateProperty = (property: Property) => {
    setPropertiesState(prev => prev.map(p => p.id === property.id ? property : p));
  };

  const handleDeleteCity = (name: string) => {
    setCitiesState(prev => prev.map(c => c.name === name ? { ...c, isDeleted: true } : c));
  };

  const handleRestoreCity = (name: string) => {
    setCitiesState(prev => prev.map(c => c.name === name ? { ...c, isDeleted: false } : c));
  };

  const handlePermanentDeleteCity = (name: string) => {
    setCitiesState(prev => prev.filter(c => c.name !== name));
  };

  const handleAddCity = (city: City) => {
    setCitiesState(prev => [...prev, city]);
  };

  const handleUpdateCity = (oldName: string, city: City) => {
    setCitiesState(prev => prev.map(c => c.name === oldName ? city : c));
  };

  const handleUpdateUserStatus = (id: string, status: 'active' | 'disabled') => {
    setUsersState(prev => prev.map(u => u.id === id ? { ...u, status } : u));
  };

  const handleDeleteUser = (id: string) => {
    setUsersState(prev => prev.filter(u => u.id !== id));
  };

  const handleCityClick = (cityName: string) => {
    setFilterCity(cityName);
    setView('browse');
    window.scrollTo(0, 0);
  };

  const handleSearch = () => {
    if (searchCity) setFilterCity(searchCity);
    if (searchType) setFilterTypes([searchType]);
    if (searchBudget === 'budget') setFilterPrice(50);
    else if (searchBudget === 'mid') setFilterPrice(150);
    else if (searchBudget === 'luxury') setFilterPrice(500);
    setView('browse');
    window.scrollTo(0, 0);
  };

  // Sections
  const budgetHomes = useMemo(() => propertiesState.filter(p => !p.isDeleted && p.priceValue >= 10 && p.priceValue <= 50).slice(0, 4), [propertiesState]);
  const midRangeHomes = useMemo(() => propertiesState.filter(p => !p.isDeleted && p.priceValue > 50 && p.priceValue <= 150).slice(0, 4), [propertiesState]);
  const luxuryHomes = useMemo(() => propertiesState.filter(p => !p.isDeleted && p.priceValue > 150).slice(0, 4), [propertiesState]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pt-16">
      <Navbar onNavigate={setView} activeView={view} user={user} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1920&q=80" 
                  alt="Modern Indian Apartment"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
              
              <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight"
                >
                  Find Your Perfect Property in India
                </motion.h1>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
                >
                  Browse verified properties across major cities based on your budget and preferred location.
                </motion.p>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-2"
                >
                  <div className="flex-1 w-full flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-100">
                    <MapPin className="h-5 w-5 text-blue-900 mr-2" />
                    <select 
                      className="w-full bg-transparent outline-none text-sm font-medium"
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                    >
                      <option value="">Select City</option>
                      {CITIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="flex-1 w-full flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-100">
                    <HomeIcon className="h-5 w-5 text-blue-900 mr-2" />
                    <select 
                      className="w-full bg-transparent outline-none text-sm font-medium"
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                    >
                      <option value="">Property Type</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="Independent House">Independent House</option>
                    </select>
                  </div>
                  <div className="flex-1 w-full flex items-center px-4 py-2">
                    <IndianRupee className="h-5 w-5 text-blue-900 mr-2" />
                    <select 
                      className="w-full bg-transparent outline-none text-sm font-medium"
                      value={searchBudget}
                      onChange={(e) => setSearchBudget(e.target.value)}
                    >
                      <option value="">Budget Range</option>
                      <option value="budget">₹10L - ₹50L</option>
                      <option value="mid">₹50L - ₹1.5Cr</option>
                      <option value="luxury">₹1.5Cr+</option>
                    </select>
                  </div>
                  <button 
                    onClick={handleSearch}
                    className="w-full md:w-auto bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </button>
                </motion.div>
              </div>
            </section>

            {/* Budget Categories */}
            <section id="budget" className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-blue-900 mb-4">Browse by Budget</h2>
                  <p className="text-gray-500">Find homes that fit your financial plan perfectly.</p>
                </div>

                {/* Budget Homes */}
                <div className="mb-16">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Budget Homes</h3>
                      <p className="text-gray-500 text-sm">₹10 Lakhs – ₹50 Lakhs</p>
                    </div>
                    <button 
                      onClick={() => { setFilterPrice(50); setView('browse'); }}
                      className="text-blue-900 font-semibold flex items-center hover:underline"
                    >
                      View All <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {budgetHomes.map(p => <PropertyCard key={p.id} property={p} onClick={handlePropertyClick} />)}
                  </div>
                </div>

                {/* Mid Range */}
                <div className="mb-16">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Mid Range Homes</h3>
                      <p className="text-gray-500 text-sm">₹50 Lakhs – ₹1.5 Crore</p>
                    </div>
                    <button 
                      onClick={() => { setFilterPrice(150); setView('browse'); }}
                      className="text-blue-900 font-semibold flex items-center hover:underline"
                    >
                      View All <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {midRangeHomes.map(p => <PropertyCard key={p.id} property={p} onClick={handlePropertyClick} />)}
                  </div>
                </div>

                {/* Luxury */}
                <div>
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Luxury Homes</h3>
                      <p className="text-gray-500 text-sm">₹1.5 Crore+</p>
                    </div>
                    <button 
                      onClick={() => { setFilterPrice(500); setView('browse'); }}
                      className="text-blue-900 font-semibold flex items-center hover:underline"
                    >
                      View All <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {luxuryHomes.map(p => <PropertyCard key={p.id} property={p} onClick={handlePropertyClick} />)}
                  </div>
                </div>
              </div>
            </section>

            {/* Cities Section */}
            <section id="cities" className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-blue-900 mb-4">Explore Top Cities</h2>
                  <p className="text-gray-500">Find properties in the most vibrant urban centers of India.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {citiesState.map(city => <CityCard key={city.name} city={city} onClick={handleCityClick} />)}
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {view === 'browse' && (
          <motion.div
            key="browse"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filter Panel */}
              <aside className="w-full lg:w-64 space-y-8">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg flex items-center">
                      <Filter className="h-5 w-5 mr-2 text-blue-900" />
                      Filters
                    </h3>
                    <button 
                      onClick={() => {
                        setFilterCity('All');
                        setFilterTypes([]);
                        setFilterPrice(300);
                        setFilterBHK([]);
                      }}
                      className="text-xs text-blue-900 font-semibold hover:underline"
                    >
                      Reset
                    </button>
                  </div>

                  {/* Location */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-3">Location</label>
                    <select 
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900/10"
                      value={filterCity}
                      onChange={(e) => setFilterCity(e.target.value)}
                    >
                      <option value="All">All Cities</option>
                      {CITIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>

                  {/* Property Type */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-3">Property Type</label>
                    <div className="space-y-2">
                      {['Apartment', 'Villa', 'Independent House', 'Plot', 'Commercial'].map(type => (
                        <label key={type} className="flex items-center text-sm text-gray-600 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 text-blue-900 focus:ring-blue-900 mr-2"
                            checked={filterTypes.includes(type)}
                            onChange={(e) => {
                              if (e.target.checked) setFilterTypes([...filterTypes, type]);
                              else setFilterTypes(filterTypes.filter(t => t !== type));
                            }}
                          />
                          <span className="group-hover:text-blue-900 transition-colors">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-bold text-gray-700">Max Price</label>
                      <span className="text-xs font-bold text-blue-900">₹{filterPrice >= 100 ? `${(filterPrice/100).toFixed(1)}Cr` : `${filterPrice}L`}</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="1000" 
                      step="10"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
                      value={filterPrice}
                      onChange={(e) => setFilterPrice(parseInt(e.target.value))}
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>₹10L</span>
                      <span>₹3Cr</span>
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-3">Bedrooms</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['1 BHK', '2 BHK', '3 BHK', '4 BHK'].map(bhk => (
                        <button
                          key={bhk}
                          onClick={() => {
                            if (filterBHK.includes(bhk)) setFilterBHK(filterBHK.filter(b => b !== bhk));
                            else setFilterBHK([...filterBHK, bhk]);
                          }}
                          className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
                            filterBHK.includes(bhk) 
                              ? 'bg-blue-900 text-white border-blue-900' 
                              : 'bg-white text-gray-600 border-gray-200 hover:border-blue-900'
                          }`}
                        >
                          {bhk}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Amenities</label>
                    <div className="space-y-2">
                      {['Parking', 'Garden', 'Gym', 'Swimming Pool', 'Security', 'Lift'].map(amenity => (
                        <label key={amenity} className="flex items-center text-sm text-gray-600 cursor-pointer group">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-900 focus:ring-blue-900 mr-2" />
                          <span className="group-hover:text-blue-900 transition-colors">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              {/* Listings Grid */}
              <main className="flex-1">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-blue-900">
                    {filteredProperties.length} Properties Found
                  </h2>
                  <div className="flex items-center text-sm text-gray-500">
                    Sort by: 
                    <select className="ml-2 bg-transparent font-bold text-blue-900 outline-none">
                      <option>Newest</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                    </select>
                  </div>
                </div>

                {filteredProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProperties.map(p => (
                      <PropertyCard key={p.id} property={p} onClick={handlePropertyClick} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                    <HomeIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No properties found</h3>
                    <p className="text-gray-500">Try adjusting your filters to find more results.</p>
                  </div>
                )}
              </main>
            </div>
          </motion.div>
        )}

        {view === 'details' && selectedProperty && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          >
            <button 
              onClick={() => setView('browse')}
              className="flex items-center text-blue-900 font-bold mb-8 hover:underline"
            >
              <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
              Back to Listings
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left: Gallery & Info */}
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                  <div className="rounded-3xl overflow-hidden h-[400px] md:h-[500px] shadow-lg">
                    <img 
                      src={selectedProperty.image} 
                      alt={selectedProperty.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { label: 'Exterior', url: selectedProperty.gallery?.exterior },
                      { label: 'Living', url: selectedProperty.gallery?.living },
                      { label: 'Bedroom', url: selectedProperty.gallery?.bedroom },
                      { label: 'Kitchen', url: selectedProperty.gallery?.kitchen },
                      { label: 'Bathroom', url: selectedProperty.gallery?.bathroom },
                      { label: 'Balcony', url: selectedProperty.gallery?.balcony },
                      { label: 'Surroundings', url: selectedProperty.gallery?.surroundings },
                      { label: 'Aerial', url: selectedProperty.gallery?.aerial }
                    ].filter(img => img.url).map((img, i) => (
                      <div key={i} className="relative rounded-xl overflow-hidden h-20 md:h-24 cursor-pointer border-2 border-transparent hover:border-blue-900 transition-all group">
                        <img 
                          src={img.url} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                          referrerPolicy="no-referrer" 
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        <span className="absolute bottom-1 left-1 text-[8px] text-white font-bold uppercase bg-black/40 px-1 rounded">{img.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                      <h1 className="text-3xl font-extrabold text-blue-900 mb-2">{selectedProperty.name}</h1>
                      <div className="flex items-center text-gray-500">
                        <MapPin className="h-4 w-4 mr-1 text-blue-900" />
                        {selectedProperty.city}, India
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-extrabold text-orange-600">{selectedProperty.price}</div>
                      <div className="text-sm text-gray-400">Estimated EMI: ₹{Math.round(selectedProperty.priceValue * 0.8)}k/mo</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-gray-100 mb-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-blue-50 p-3 rounded-2xl mb-3">
                        <HomeIcon className="h-6 w-6 text-blue-900" />
                      </div>
                      <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Type</span>
                      <span className="font-bold text-gray-900">{selectedProperty.type}</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-blue-50 p-3 rounded-2xl mb-3">
                        <BedDouble className="h-6 w-6 text-blue-900" />
                      </div>
                      <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Bedrooms</span>
                      <span className="font-bold text-gray-900">{selectedProperty.bedrooms}</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-blue-50 p-3 rounded-2xl mb-3">
                        <Maximize2 className="h-6 w-6 text-blue-900" />
                      </div>
                      <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Area</span>
                      <span className="font-bold text-gray-900">{selectedProperty.area}</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-blue-50 p-3 rounded-2xl mb-3">
                        <CheckCircle2 className="h-6 w-6 text-blue-900" />
                      </div>
                      <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Status</span>
                      <span className="font-bold text-emerald-600">Verified</span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">Description</h3>
                    <p className="text-gray-600 leading-relaxed">
                      This stunning {selectedProperty.bedrooms} {selectedProperty.type} in {selectedProperty.city} offers a perfect blend of luxury and comfort. 
                      Spanning across {selectedProperty.area}, this property is designed with modern aesthetics and high-quality finishes. 
                      Located in a prime neighborhood, it provides easy access to major landmarks and essential services. 
                      The spacious layout ensures ample natural light and ventilation throughout the day.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-6">Key Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedProperty.amenities.map(amenity => (
                        <div key={amenity} className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <CheckCircle2 className="h-4 w-4 text-blue-900 mr-3" />
                          <span className="text-sm font-medium text-gray-700">{amenity}</span>
                        </div>
                      ))}
                      {/* Add some default ones if list is short */}
                      <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <CheckCircle2 className="h-4 w-4 text-blue-900 mr-3" />
                        <span className="text-sm font-medium text-gray-700">24/7 Water Supply</span>
                      </div>
                      <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <CheckCircle2 className="h-4 w-4 text-blue-900 mr-3" />
                        <span className="text-sm font-medium text-gray-700">Power Backup</span>
                      </div>
                    </div>
                  </div>

                  {/* Reviews Section */}
                  <ReviewSection 
                    property={selectedProperty} 
                    onAddReview={handleAddReview} 
                  />
                </div>
              </div>

              {/* Right: Contact Card */}
              <div className="space-y-6">
                <div className="bg-blue-900 text-white p-8 rounded-3xl shadow-xl sticky top-24">
                  <h3 className="text-xl font-bold mb-6">Interested in this property?</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-white/60 uppercase font-bold">Call Agent</p>
                        <p className="font-bold">+91 98765 43210</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                        <Info className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-white/60 uppercase font-bold">Listing ID</p>
                        <p className="font-bold">IPF-{selectedProperty.id}0023</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button 
                      onClick={(e) => {
                        const btn = e.currentTarget as HTMLButtonElement;
                        const originalContent = btn.innerHTML;
                        btn.disabled = true;
                        btn.innerHTML = '<span class="flex items-center justify-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...</span>';
                        setTimeout(() => {
                          btn.innerHTML = 'Message Sent Successfully!';
                          btn.classList.add('!bg-emerald-500', '!text-white');
                          setTimeout(() => {
                            btn.innerHTML = originalContent;
                            btn.disabled = false;
                            btn.classList.remove('!bg-emerald-500', '!text-white');
                          }, 3000);
                        }, 1500);
                      }}
                      className="w-full bg-white text-blue-900 font-bold py-4 rounded-xl hover:bg-gray-100 transition-all shadow-lg"
                    >
                      Contact Seller
                    </button>
                    <button 
                      onClick={() => {
                        handleSaveProperty(selectedProperty.id);
                        const btn = document.activeElement as HTMLButtonElement;
                        const originalText = btn.innerText;
                        const isSaved = user?.savedProperties.includes(selectedProperty.id);
                        btn.innerText = isSaved ? 'Removed from Saved!' : 'Saved to Profile!';
                        btn.disabled = true;
                        setTimeout(() => {
                          btn.innerText = originalText;
                          btn.disabled = false;
                        }, 2000);
                      }}
                      className="w-full bg-blue-800 text-white font-bold py-4 rounded-xl border border-blue-700 hover:bg-blue-700 transition-colors flex items-center justify-center disabled:bg-emerald-600 disabled:border-emerald-600"
                    >
                      <Heart className={`h-5 w-5 mr-2 ${user?.savedProperties.includes(selectedProperty.id) ? 'fill-white' : ''}`} />
                      {user?.savedProperties.includes(selectedProperty.id) ? 'Saved' : 'Save Property'}
                    </button>
                  </div>
                  <p className="text-center text-[10px] text-white/40 mt-6">
                    By clicking "Contact Seller", you agree to our Terms of Use and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto px-4 py-20 text-center"
          >
            <div className="bg-blue-50 h-20 w-20 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Building2 className="h-10 w-10 text-blue-900" />
            </div>
            <h1 className="text-4xl font-extrabold text-blue-900 mb-6">About IndiaPropertyFinder</h1>
            <div className="prose prose-lg mx-auto text-gray-600 leading-relaxed">
              <p className="mb-6">
                IndiaPropertyFinder is India's leading real estate platform, dedicated to helping users explore and find their dream properties across 20+ major Indian cities.
              </p>
              <p className="mb-6">
                Our mission is to bring transparency and ease to the property buying process. Whether you're looking for a budget-friendly apartment in Mumbai, a luxury villa in Hyderabad, or a commercial space in Bangalore, we provide verified listings and an intuitive filtering system to match your specific needs.
              </p>
              <p>
                With over a decade of experience in the Indian real estate market, we understand the unique requirements of Indian home buyers. Our platform is designed to be mobile-friendly and visually attractive, ensuring a seamless browsing experience on any device.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-blue-900 mb-2">Verified Listings</h3>
                <p className="text-sm text-gray-500">Every property on our platform undergoes a rigorous verification process.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-blue-900 mb-2">20+ Cities</h3>
                <p className="text-sm text-gray-500">Extensive coverage across all major urban hubs in India.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-blue-900 mb-2">Smart Filters</h3>
                <p className="text-sm text-gray-500">Find exactly what you need with our advanced budget and type filters.</p>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <AuthPage onLogin={handleLogin} />
          </motion.div>
        )}

        {view === 'user-dashboard' && user && (
          <motion.div
            key="user-dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <UserDashboard 
              user={user} 
              onLogout={handleLogout} 
              onNavigateToProperty={(id) => {
                setSelectedPropertyId(id);
                setView('details');
              }} 
              properties={propertiesState}
            />
          </motion.div>
        )}

        {view === 'admin-dashboard' && user?.role === 'admin' && (
          <motion.div
            key="admin-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AdminDashboard 
              onLogout={handleLogout}
              properties={propertiesState}
              cities={citiesState}
              users={usersState}
              siteSettings={siteSettings}
              onAddProperty={handleAddProperty}
              onUpdateProperty={handleUpdateProperty}
              onDeleteProperty={handleDeleteProperty}
              onRestoreProperty={handleRestoreProperty}
              onPermanentDeleteProperty={handlePermanentDeleteProperty}
              onAddCity={handleAddCity}
              onUpdateCity={handleUpdateCity}
              onDeleteCity={handleDeleteCity}
              onRestoreCity={handleRestoreCity}
              onPermanentDeleteCity={handlePermanentDeleteCity}
              onUpdateUserStatus={handleUpdateUserStatus}
              onDeleteUser={handleDeleteUser}
              onUpdateSettings={setSiteSettings}
              onNavigateToProperty={(id) => {
                setSelectedPropertyId(id);
                setView('details');
              }}
            />
          </motion.div>
        )}

        {view === 'cities-page' && (
          <motion.div
            key="cities-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
          >
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-blue-900 mb-4">Properties by City</h1>
              <p className="text-gray-500">Discover your next home in one of India's top urban destinations.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {citiesState.map(city => (
                <CityCard key={city.name} city={city} onClick={handleCityClick} />
              ))}
            </div>
          </motion.div>
        )}

        {(view === 'careers' || view === 'contact' || view === 'help') && (
          <motion.div
            key="simple-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto px-4 py-20 text-center"
          >
            <div className="bg-blue-50 h-20 w-20 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Info className="h-10 w-10 text-blue-900" />
            </div>
            <h1 className="text-4xl font-extrabold text-blue-900 mb-6 capitalize">{view}</h1>
            <p className="text-gray-600 leading-relaxed">
              This page is currently under development. We are working hard to bring you more information about our {view} section.
            </p>
            <button 
              onClick={() => setView('home')}
              className="mt-8 bg-blue-900 text-white px-8 py-3 rounded-xl font-bold"
            >
              Back to Home
            </button>
          </motion.div>
        )}

        {(view === 'budget-homes' || view === 'luxury-homes') && (
          <motion.div
            key="filtered-browse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto px-4 py-20"
          >
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-blue-900 mb-4 capitalize">{view.replace('-', ' ')}</h1>
              <p className="text-gray-500">Handpicked properties just for you.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(view === 'budget-homes' ? budgetHomes : luxuryHomes).map(p => (
                <PropertyCard key={p.id} property={p} onClick={handlePropertyClick} />
              ))}
            </div>
            <div className="text-center mt-12">
              <button 
                onClick={() => {
                  if (view === 'budget-homes') setFilterPrice(50);
                  else setFilterPrice(500);
                  setView('browse');
                }}
                className="bg-blue-900 text-white px-8 py-3 rounded-xl font-bold"
              >
                View All in Browse
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer onNavigate={setView} />
    </div>
  );
}
