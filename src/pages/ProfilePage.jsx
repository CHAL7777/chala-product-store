import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Heart,
  MapPin,
  Pencil,
  Save,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useWishlist } from '../context/WishlistContext';
import { ShopContext } from '../context/ShopContext';
import { useContext } from 'react';

const defaultProfile = {
  name: 'Alex Morgan',
  email: 'alex@soleflow.store',
  phone: '+1 (555) 000-0124',
  city: 'Portland, OR',
  size: 'US 9',
};

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const ProfilePage = () => {
  const { addToast } = useToast();
  const { wishlistCount } = useWishlist();
  const { getTotalCartItems } = useContext(ShopContext);
  const [profile, setProfile] = useState(() => {
    try {
      const savedProfile = localStorage.getItem('soleflow_profile');
      return savedProfile ? { ...defaultProfile, ...JSON.parse(savedProfile) } : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });
  const [draftProfile, setDraftProfile] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (event) => {
    event.preventDefault();
    const nextProfile = {
      ...draftProfile,
      name: draftProfile.name.trim() || defaultProfile.name,
      email: draftProfile.email.trim() || defaultProfile.email,
    };

    try {
      localStorage.setItem('soleflow_profile', JSON.stringify(nextProfile));
    } catch {
      // The profile remains available for the current session if storage is unavailable.
    }

    setProfile(nextProfile);
    setDraftProfile(nextProfile);
    setIsEditing(false);
    addToast('Profile updated successfully', 'success');
  };

  const handleCancel = () => {
    setDraftProfile(profile);
    setIsEditing(false);
  };

  const updateField = (field, value) => {
    setDraftProfile((current) => ({ ...current, [field]: value }));
  };

  const statItems = [
    { label: 'Saved pairs', value: wishlistCount, icon: Heart, tone: 'text-rose-400' },
    { label: 'Cart items', value: getTotalCartItems(), icon: ShoppingBag, tone: 'text-brand' },
    { label: 'Member since', value: '2026', icon: Sparkles, tone: 'text-amber-400' },
  ];

  return (
    <div className="section-container py-12 md:py-16 space-y-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div>
          <span className="eyebrow">Your SoleFlow space</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-[-0.05em] text-zinc-100 mt-2">
            Profile & preferences
          </h1>
          <p className="text-sm md:text-base text-zinc-400 mt-3 max-w-xl">
            Keep your details close, your favorite pairs closer, and checkout ready for your next move.
          </p>
        </div>
        <Link to="/products" className="btn-secondary text-xs font-bold uppercase tracking-wider px-4 py-2.5">
          Continue shopping
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Profile overview */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 p-5 sm:p-7 shadow-2xl shadow-black/15">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-7">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-3xl bg-gradient-to-br from-brand to-cyan-300 flex items-center justify-center text-2xl sm:text-3xl font-black text-zinc-950 shadow-xl shadow-brand/20">
              {getInitials(profile.name)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-100">{profile.name}</h2>
                <span className="inline-flex items-center gap-1 rounded-full border border-brand/25 bg-brand/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand">
                  <ShieldCheck size={12} /> Flow member
                </span>
              </div>
              <p className="text-sm text-zinc-400 mt-1">{profile.email}</p>
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-2">
                <MapPin size={13} className="text-brand" />
                <span>{profile.city}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:min-w-[360px]">
            {statItems.map(({ label, value, icon: Icon, tone }) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:p-4">
                <Icon size={16} className={`${tone} mb-3`} />
                <p className="text-lg sm:text-xl font-black text-zinc-100">{value}</p>
                <p className="text-[10px] sm:text-xs text-zinc-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        {/* Personal details */}
        <section className="lg:col-span-3 rounded-3xl border border-white/10 bg-zinc-900/55 p-5 sm:p-7 shadow-xl shadow-black/10">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <span className="eyebrow">Personal details</span>
              <h2 className="text-xl font-black text-zinc-100 mt-1">Make it yours</h2>
            </div>
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="btn-ghost text-xs font-bold" type="button">
                <Pencil size={14} /> Edit
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-6">
              <label className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Full name</span>
                <input
                  value={draftProfile.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  className="profile-input"
                  autoComplete="name"
                  required
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Email address</span>
                <input
                  type="email"
                  value={draftProfile.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  className="profile-input"
                  autoComplete="email"
                  required
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Phone number</span>
                <input
                  type="tel"
                  value={draftProfile.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  className="profile-input"
                  autoComplete="tel"
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Location</span>
                <input
                  value={draftProfile.city}
                  onChange={(event) => updateField('city', event.target.value)}
                  className="profile-input"
                  autoComplete="address-level2"
                />
              </label>
              <label className="space-y-2 sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Preferred shoe size</span>
                <select
                  value={draftProfile.size}
                  onChange={(event) => updateField('size', event.target.value)}
                  className="profile-input"
                >
                  {['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'].map((size) => (
                    <option key={size}>{size}</option>
                  ))}
                </select>
              </label>
              <div className="sm:col-span-2 flex flex-wrap gap-3 pt-1">
                <button type="submit" className="btn-primary text-sm font-bold px-5 py-3">
                  <Save size={15} /> Save changes
                </button>
                <button type="button" onClick={handleCancel} className="btn-secondary text-sm font-bold px-5 py-3">
                  <X size={15} /> Cancel
                </button>
              </div>
            </form>
          ) : (
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 pt-6">
              {[
                ['Full name', profile.name],
                ['Email address', profile.email],
                ['Phone number', profile.phone],
                ['Location', profile.city],
                ['Preferred shoe size', profile.size],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs font-bold uppercase tracking-wider text-zinc-500">{label}</dt>
                  <dd className="text-sm font-semibold text-zinc-200 mt-1.5">{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </section>

        {/* Quick actions */}
        <section className="lg:col-span-2 space-y-4">
          <div className="rounded-3xl border border-white/10 bg-zinc-900/55 p-5 sm:p-7 shadow-xl shadow-black/10">
            <span className="eyebrow">Quick access</span>
            <h2 className="text-xl font-black text-zinc-100 mt-1">Your shortcuts</h2>
            <div className="space-y-3 mt-5">
              <Link to="/wishlist" className="profile-action group">
                <span className="profile-action-icon text-rose-400 bg-rose-400/10 border-rose-400/20"><Heart size={17} /></span>
                <span><strong>Saved wishlist</strong><small>{wishlistCount ? `${wishlistCount} pair${wishlistCount === 1 ? '' : 's'} waiting for you` : 'Save pairs you love'}</small></span>
                <ArrowRight size={16} className="ml-auto text-zinc-600 group-hover:text-brand transition-colors" />
              </Link>
              <Link to="/cart" className="profile-action group">
                <span className="profile-action-icon text-brand bg-brand/10 border-brand/20"><ShoppingBag size={17} /></span>
                <span><strong>Shopping cart</strong><small>{getTotalCartItems() ? `${getTotalCartItems()} item${getTotalCartItems() === 1 ? '' : 's'} ready to check out` : 'Your cart is waiting'}</small></span>
                <ArrowRight size={16} className="ml-auto text-zinc-600 group-hover:text-brand transition-colors" />
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-brand/20 bg-gradient-to-br from-brand/15 via-zinc-900/70 to-zinc-900/70 p-5 sm:p-7">
            <div className="flex items-center gap-2 text-brand">
              <UserRound size={18} />
              <span className="text-xs font-black uppercase tracking-widest">Profile tip</span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed mt-3">
              Add your preferred size to make future drops easier to browse and keep your best fits in one place.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-500 mt-4">
              <Check size={14} className="text-brand" />
              <span>Your details stay on this device</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
