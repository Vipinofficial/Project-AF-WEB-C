import { useState, useEffect } from 'react';
import type { CartItem, Listing } from '@arli/contracts';
import { getCustomerDictionary, toggleLang, otherLangLabel, type Lang } from '@arli/i18n';
import { cartTotals, priceUnit } from '@arli/core';
import { ApiError } from '@arli/api-client';
import { api } from './api';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileTopBar } from './components/MobileTopBar';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { ListingDetail } from './pages/ListingDetail';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { Checkout } from './pages/Checkout';
import { Chat } from './pages/Chat';

const PINCODE_KEY = 'arli.deliveryPincode';

export default function App() {
  const [screen, setScreen] = useState<string>('home');
  const [lang, setLang] = useState<Lang>('en');
  const [query, setQuery] = useState('');
  // ERR-102: the delivery pincode is user location data — kept in localStorage
  // on this device only, never sent anywhere but the catalogue filter.
  const [pincode, setPincode] = useState(() => {
    try {
      return localStorage.getItem(PINCODE_KEY) ?? '';
    } catch {
      return '';
    }
  });
  const [priceMax, setPriceMax] = useState('0');
  const [cat, setCat] = useState('all');

  const [listings, setListings] = useState<Listing[]>([]);
  const [listingsError, setListingsError] = useState<string | null>(null);
  const [selectedListingId, setSelectedListingId] = useState<number | null>(null);

  const [loggedIn, setLoggedIn] = useState(false);
  const [points, setPoints] = useState(0);

  const [cart, setCart] = useState<CartItem[]>([]);

  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const [toastMsg, setToastMsg] = useState('');
  const [toastShow, setToastShow] = useState(false);

  const t = getCustomerDictionary(lang);

  // One promo calculation for the whole app. Cart and Checkout previously each
  // computed their own, and Checkout's ignored the discount entirely.
  const totals = cartTotals(cart, promoApplied ? promo : '');
  const promoOk = totals.appliedCode !== null;

  useEffect(() => {
    let cancelled = false;
    api.listings
      .list()
      .then((data) => {
        if (!cancelled) {
          setListings(data);
          setListingsError(null);
        }
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        // Distinguish "the API is down" from "there is nothing to show" —
        // the old code collapsed both into an empty list.
        setListings([]);
        setListingsError(
          err instanceof ApiError && err.kind === 'network'
            ? 'Cannot reach the ARLI server.'
            : 'Could not load listings.',
        );
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const persistPincode = (value: string) => {
    setPincode(value);
    try {
      localStorage.setItem(PINCODE_KEY, value);
    } catch {
      // Private browsing or storage disabled — the filter still works this session.
    }
  };

  /** From the header picker: set the location AND show what's nearby. */
  const handlePincodeChange = (value: string) => {
    persistPincode(value);
    setScreen('explore');
  };

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setToastShow(true);
    setTimeout(() => setToastShow(false), 2200);
  };

  const handleNavigate = (target: string) => {
    setScreen(target);
    setSelectedListingId(null);
  };

  const handleSelectListing = (id: number) => {
    setSelectedListingId(id);
    setScreen('listingDetail');
  };

  const handleSearchCategory = (category: string) => {
    setCat(category);
    setScreen('explore');
  };

  const handleAddToCart = (qty: number, attachMeas: boolean, designFile: File | null) => {
    const selected = listings.find((l) => l.id === selectedListingId);
    if (!selected) return;

    const newItem: CartItem = {
      id: crypto.randomUUID(),
      listingId: selected.id,
      name: selected.name[lang],
      shop: selected.shop[lang],
      price: selected.price,
      unit: priceUnit(selected),
      qty,
      hasMeas: attachMeas,
      hasDesign: !!designFile,
      swatch: selected.base,
    };

    setCart((prev) => [...prev, newItem]);
    triggerToast(t.toastAdded);
    setScreen('cart');
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleApplyPromo = () => {
    setPromoApplied(true);
  };

  const promoMsg = !promoApplied
    ? ''
    : promoOk
      ? lang === 'hi' ? '10% छूट लागू!' : '10% discount applied!'
      : lang === 'hi' ? 'अमान्य कोड' : 'Invalid code';

  const activeListing = listings.find((l) => l.id === selectedListingId) ?? null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      <Header
        t={t}
        langLabel={otherLangLabel(lang)}
        query={query}
        cartCount={cart.length}
        hasCart={cart.length > 0}
        loggedIn={loggedIn}
        points={points}
        pincode={pincode}
        onPincodeChange={handlePincodeChange}
        listings={listings}
        lang={lang}
        onSelectListing={handleSelectListing}
        onQueryChange={setQuery}
        onSearch={() => setScreen('explore')}
        onNavigate={handleNavigate}
        onToggleLang={() => setLang(toggleLang)}
      />

      <MobileTopBar cartCount={cart.length} onNavigate={handleNavigate} />

      <main style={{ flex: 1 }}>
        {listingsError && (
          <p
            role="alert"
            style={{
              margin: '12px var(--page-px)', padding: '10px 14px', borderRadius: '10px',
              backgroundColor: 'var(--color-warning-bg)', color: 'var(--color-warning-text)',
              fontSize: '13px', fontWeight: 600,
            }}
          >
            {listingsError}
          </p>
        )}

        {screen === 'home' && (
          <Home
            listings={listings}
            t={t}
            lang={lang}
            query={query}
            onQueryChange={setQuery}
            onSearch={() => setScreen('explore')}
            onNavigate={handleNavigate}
            onSelectListing={handleSelectListing}
            onSearchCategory={handleSearchCategory}
          />
        )}
        {screen === 'explore' && (
          <Explore
            listings={listings}
            query={query}
            pincode={pincode}
            priceMax={priceMax}
            cat={cat}
            t={t}
            lang={lang}
            onQueryChange={setQuery}
            onPincodeChange={persistPincode}
            onPriceMaxChange={setPriceMax}
            onCatChange={setCat}
            onSelectListing={handleSelectListing}
            onSearch={() => {}}
          />
        )}
        {screen === 'listingDetail' && (
          <ListingDetail
            item={activeListing}
            t={t}
            lang={lang}
            onBack={() => setScreen('explore')}
            onAddToCart={handleAddToCart}
            onChatWithShop={() => handleNavigate('chat')}
          />
        )}
        {screen === 'cart' && (
          <Cart
            cartItems={cart}
            totals={totals}
            onRemoveItem={handleRemoveCartItem}
            t={t}
            onProceed={() => handleNavigate(loggedIn ? 'checkout' : 'login')}
            promo={promo}
            promoApplied={promoApplied}
            promoMsg={promoMsg}
            promoOk={promoOk}
            onPromoChange={setPromo}
            onApplyPromo={handleApplyPromo}
            onStartShopping={() => setScreen('explore')}
          />
        )}
        {screen === 'login' && (
          <Login
            t={t}
            onLoginSuccess={() => {
              setLoggedIn(true);
              setScreen('home');
            }}
            onToast={triggerToast}
            lang={lang}
          />
        )}
        {screen === 'checkout' && (
          <Checkout
            cartItems={cart}
            totals={totals}
            t={t}
            onClearCart={() => {
              setCart([]);
              setPromo('');
              setPromoApplied(false);
            }}
            onToast={triggerToast}
            onNavigate={handleNavigate}
            onAddPoints={(pts) => setPoints((prev) => prev + pts)}
          />
        )}
        {screen === 'chat' && (
          <Chat
            t={t}
            lang={lang}
            onToast={triggerToast}
            initialShopName={activeListing?.shop[lang]}
          />
        )}
      </main>

      <Footer t={t} />

      <MobileBottomNav
        currentScreen={screen}
        cartCount={cart.length}
        loggedIn={loggedIn}
        onNavigate={handleNavigate}
        t={t}
      />

      {toastShow && (
        <div
          className="animate-toast-in"
          style={{
            position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
            width: 'fit-content', backgroundColor: 'var(--color-ink)', color: 'var(--color-cream)',
            fontSize: '12.5px', fontWeight: 600, padding: '11px 20px', borderRadius: '999px',
            boxShadow: '0 6px 18px rgba(0,0,0,.25)', zIndex: 100,
          }}
        >
          {toastMsg}
        </div>
      )}
    </div>
  );
}
