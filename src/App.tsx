import { useState, useEffect } from 'react';
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
import type { Listing, CartItem } from './types';

// Core translation table mapped from prototype designs (with devfrogs options)
const T = {
  en: {
    tagline: 'Local Fashion',
    searchPh: 'Search silk, kurta, tailor…',
    searchBtn: 'Go',
    offersLabel: 'Offers',
    offer1: 'ARLI10 — 10% off first order',
    offer2: '1 point per ₹100',
    featuredTitle: 'Featured near you',
    viewAll: 'View all',
    bizTitle: 'Own a shop? Get discovered.',
    bizSub: 'List your fabrics, garments or tailoring services in minutes. Receive orders, chat with customers, and grow.',
    bizBtn: 'Register your business',
    pincodePh: 'Pincode',
    anyPrice: 'Any price',
    under: 'Under',
    resultsFound: 'results near you',
    noResults: 'No listings match — try clearing filters.',
    sponsored: 'Sponsored',
    backToExplore: 'Back to Explore',
    reviewsWord: 'reviews',
    qtyMeters: 'Meters',
    qtyPieces: 'Quantity',
    subtotal: 'Subtotal',
    attachMeas: 'Attach my measurements',
    attachMeasSub: 'Your digital tailor’s notebook — saved once, used everywhere.',
    addToCart: 'Add to cart',
    chatWithShop: 'Chat with shop',
    payAtShop: 'Pay at shop on delivery · Razorpay coming soon',
    reviewsTitle: 'Customer reviews',
    cartTitle: 'Your cart',
    navCart: 'Cart',
    measAttached: 'Measurements attached',
    designAttached: 'Design attached',
    remove: 'Remove',
    promoPh: 'Promo code (try ARLI10)',
    apply: 'Apply',
    discount: 'Discount',
    total: 'Total',
    youllEarn: 'You’ll earn',
    loyaltyPts: 'loyalty points',
    cartEmpty: 'Your cart is empty.',
    startShopping: 'Start shopping',
    loginProceed: 'Login to continue',
    checkoutProceed: 'Proceed to checkout',
    loginTitle: 'Welcome back',
    loginSub: 'Login or create an account with your phone number.',
    phoneLabel: 'Phone number',
    sendOtp: 'Send OTP',
    or: 'or',
    googleBtn: 'Continue with Google',
    devfrogsBtn: 'Continue with Devfrogs',
    otpTitle: 'Enter OTP',
    otpSub: 'We sent a 4-digit code to',
    otpHint: 'Demo: any 4 digits work',
    verify: 'Verify & continue',
    changeNumber: 'Change number',
    checkoutTitle: 'Checkout',
    deliveryAddr: 'Delivery address',
    fullName: 'Full name',
    addressPh: 'House, street, area…',
    payment: 'Payment',
    payAtShopOpt: 'Pay at shop',
    payAtShopSub: 'Cash or UPI when you collect / on delivery',
    comingSoon: 'Coming soon',
    orderSummary: 'Order summary',
    placeOrder: 'Place order',
    orderPlaced: 'Order placed!',
    orderId: 'Order ID',
    statusTitle: 'Order status',
    stPlaced: 'Placed',
    stAccepted: 'Accepted',
    stProgress: 'In progress',
    stReady: 'Ready',
    stDelivered: 'Delivered',
    continueShopping: 'Continue shopping',
    online: 'Online',
    repliesFast: 'usually replies in minutes',
    typing: 'typing',
    shareMeas: 'Share measurements',
    askPrice: 'Ask for best price',
    chatPh: 'Type a message…',
    footerNote: 'ARLI — local fashion marketplace · English / हिंदी · Prototype',
    toastAdded: 'Added to cart',
    toastMeasShared: 'Measurements shared',
    catAll: 'All',
    catFabric: 'Fabrics',
    catGarment: 'Garments',
    catService: 'Tailoring',
    onbQ1: 'What kind of business are you?',
    onbQ2: 'Tell us about your shop',
    shopNameLabel: 'Shop name',
    shopNamePh: 'e.g. Meera Tailors',
    shopDescPh: 'What do you sell or stitch?',
    continueBtn: 'Continue',
    backBtn: 'Back',
    launchBtn: 'Launch my shop',
  },
  hi: {
    tagline: 'लोकल फ़ैशन',
    searchPh: 'सिल्क, कुर्ता, दर्ज़ी खोजें…',
    searchBtn: 'खोजें',
    offersLabel: 'ऑफ़र',
    offer1: 'ARLI10 — पहले ऑर्डर पर 10% छूट',
    offer2: 'हर ₹100 पर 1 पॉइंट',
    featuredTitle: 'आपके पास के चुनिंदा',
    viewAll: 'सभी देखें',
    bizTitle: 'दुकान है? रजिस्टर करें।',
    bizSub: 'मिनटों में कपड़े, गारमेंट या सिलाई लिस्ट करें। ऑर्डर, चैट और बिक्री बढ़ाएँ।',
    bizBtn: 'व्यवसाय रजिस्टर करें',
    pincodePh: 'पिनकोड',
    anyPrice: 'कोई भी क़ीमत',
    under: 'तक',
    resultsFound: 'नतीजे आपके पास',
    noResults: 'कोई लिस्टिंग नहीं मिली — फ़िल्टर हटाएँ।',
    sponsored: 'प्रायोजित',
    backToExplore: 'वापस खोजें पर',
    reviewsWord: 'समीक्षाएँ',
    qtyMeters: 'मीटर',
    qtyPieces: 'मात्रा',
    subtotal: 'उप-योग',
    attachMeas: 'मेरा नाप जोड़ें',
    attachMeasSub: 'आपकी डिजिटल नाप-डायरी — एक बार सेव, हर जगह इस्तेमाल।',
    addToCart: 'कार्ट में डालें',
    chatWithShop: 'दुकान से चैट करें',
    payAtShop: 'डिलीवरी पर दुकान में भुगतान · Razorpay जल्द आ रहा है',
    reviewsTitle: 'ग्राहक समीक्षाएँ',
    cartTitle: 'आपका कार्ट',
    navCart: 'कार्ट',
    measAttached: 'नाप जुड़ा है',
    designAttached: 'डिज़ाइन जुड़ा है',
    remove: 'हटाएँ',
    promoPh: 'प्रोमो कोड (ARLI10 आज़माएँ)',
    apply: 'लागू करें',
    discount: 'छूट',
    total: 'कुल',
    youllEarn: 'आपको मिलेंगे',
    loyaltyPts: 'लॉयल्टी पॉइंट',
    cartEmpty: 'आपका कार्ट खाली है।',
    startShopping: 'खरीदारी शुरू करें',
    loginProceed: 'जारी रखने के लिए लॉगिन करें',
    checkoutProceed: 'चेकआउट करें',
    loginTitle: 'स्वागत है',
    loginSub: 'फ़ोन नंबर से लॉगिन करें या खाता बनाएँ।',
    phoneLabel: 'फ़ोन नंबर',
    sendOtp: 'OTP भेजें',
    or: 'या',
    googleBtn: 'Google से जारी रखें',
    devfrogsBtn: 'Devfrogs से जारी रखें',
    otpTitle: 'OTP डालें',
    otpSub: 'हमने 4-अंकों का कोड भेजा है',
    otpHint: 'डेमो: कोई भी 4 अंक चलेंगे',
    verify: 'सत्यापित करें',
    changeNumber: 'नंबर बदलें',
    checkoutTitle: 'चेकआउट',
    deliveryAddr: 'डिलीवरी पता',
    fullName: 'पूरा नाम',
    addressPh: 'मकान, गली, इलाक़ा…',
    payment: 'भुगतान',
    payAtShopOpt: 'दुकान पर भुगतान',
    payAtShopSub: 'कलेक्ट/डिलीवरी पर नकद या UPI',
    comingSoon: 'जल्द आ रहा है',
    orderSummary: 'ऑर्डर सारांश',
    placeOrder: 'ऑर्डर करें',
    orderPlaced: 'ऑर्डर हो गया!',
    orderId: 'ऑर्डर ID',
    statusTitle: 'ऑर्डर स्थिति',
    stPlaced: 'प्लेस्ड',
    stAccepted: 'स्वीकृत',
    stProgress: 'बन रहा है',
    stReady: 'तैयार',
    stDelivered: 'डिलीवर',
    continueShopping: 'खरीदारी जारी रखें',
    online: 'ऑनलाइन',
    repliesFast: 'मिनटों में जवाब देते हैं',
    typing: 'लिख रहे हैं',
    shareMeas: 'नाप भेजें',
    askPrice: 'सबसे अच्छा दाम पूछें',
    chatPh: 'संदेश लिखें…',
    footerNote: 'ARLI — लोकल फ़ैशन मार्केटप्लेस · English / हिंदी · प्रोटोटाइप',
    toastAdded: 'कार्ट में जुड़ गया',
    toastMeasShared: 'नाप भेज दिया गया',
    catAll: 'सभी',
    catFabric: 'कपड़े',
    catGarment: 'गारमेंट',
    catService: 'सिलाई',
    onbQ1: 'आपका व्यवसाय किस तरह का है?',
    onbQ2: 'अपनी दुकान के बारे में बताएँ',
    shopNameLabel: 'दुकान का नाम',
    shopNamePh: 'जैसे मीरा टेलर्स',
    shopDescPh: 'आप क्या बेचते या सिलते हैं?',
    continueBtn: 'आगे बढ़ें',
    backBtn: 'पीछे',
    launchBtn: 'दुकान शुरू करें',
  }
};

export default function App() {
  const [screen, setScreen] = useState<string>('home');
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [query, setQuery] = useState('');
  const [pincode, setPincode] = useState('');
  const [priceMax, setPriceMax] = useState('0');
  const [cat, setCat] = useState('all');
  
  // App listings loaded from backend API (no dummy mock data!)
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedListingId, setSelectedListingId] = useState<number | null>(null);

  // User details
  const [loggedIn, setLoggedIn] = useState(false);
  const [points, setPoints] = useState(0);

  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Promocode details
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoOk, setPromoOk] = useState(false);
  const [promoMsg, setPromoMsg] = useState('');

  // Toast notifier
  const [toastMsg, setToastMsg] = useState('');
  const [toastShow, setToastShow] = useState(false);

  // Fetch listings from Express Backend on Mount
  useEffect(() => {
    fetch('http://localhost:5000/api/listings')
      .then((res) => {
        if (!res.ok) throw new Error('API down');
        return res.json();
      })
      .then((data) => {
        setListings(data);
      })
      .catch(() => {
        // Fallback to empty array if backend is not started/running yet
        setListings([]);
      });
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setToastShow(true);
    setTimeout(() => setToastShow(false), 2200);
  };

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'hi' : 'en'));
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
    const selectedItem = listings.find((l) => l.id === selectedListingId);
    if (!selectedItem) return;

    const newItem: CartItem = {
      id: Math.random(),
      name: selectedItem.name[lang],
      shop: selectedItem.shop[lang],
      price: selectedItem.price,
      unit: selectedItem.cat === 'fabric' ? 'm' : ' pcs',
      qty,
      hasMeas: attachMeas,
      hasDesign: !!designFile,
      swatch: selectedItem.base,
      total: selectedItem.price * qty,
    };

    setCart((prev) => [...prev, newItem]);
    triggerToast(T[lang].toastAdded);
    setScreen('cart');
  };

  const handleRemoveCartItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleApplyPromo = () => {
    const ok = promo.trim().toUpperCase() === 'ARLI10';
    setPromoApplied(true);
    setPromoOk(ok);
    setPromoMsg(ok 
      ? (lang === 'hi' ? '10% छूट लागू!' : '10% discount applied!') 
      : (lang === 'hi' ? 'अमान्य कोड' : 'Invalid code')
    );
  };

  const activeListing = listings.find((l) => l.id === selectedListingId) || null;
  const currentT = T[lang];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      <Header
        t={currentT}
        langLabel={lang === 'en' ? 'हिं' : 'EN'}
        query={query}
        cartCount={cart.length}
        hasCart={cart.length > 0}
        loggedIn={loggedIn}
        points={points}
        onQueryChange={setQuery}
        onSearch={() => setScreen('explore')}
        onNavigate={handleNavigate}
        onToggleLang={toggleLang}
      />

      {/* Mobile-only top bar: logo + cart button */}
      <MobileTopBar
        cartCount={cart.length}
        onNavigate={handleNavigate}
      />

      <main style={{ flex: 1 }}>
        {screen === 'home' && (
          <Home
            listings={listings}
            t={currentT}
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
            t={currentT}
            lang={lang}
            onQueryChange={setQuery}
            onPincodeChange={setPincode}
            onPriceMaxChange={setPriceMax}
            onCatChange={setCat}
            onSelectListing={handleSelectListing}
            onSearch={() => {}}
          />
        )}
        {screen === 'listingDetail' && (
          <ListingDetail
            item={activeListing}
            t={currentT}
            lang={lang}
            onBack={() => setScreen('explore')}
            onAddToCart={handleAddToCart}
            onChatWithShop={() => {
              handleNavigate('chat');
            }}
          />
        )}
        {screen === 'cart' && (
          <Cart
            cartItems={cart}
            onRemoveItem={handleRemoveCartItem}
            t={currentT}
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
            t={currentT}
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
            t={currentT}
            onClearCart={() => setCart([])}
            onToast={triggerToast}
            onNavigate={handleNavigate}
            onAddPoints={(pts) => setPoints((prev) => prev + pts)}
          />
        )}
        {screen === 'chat' && (
          <Chat
            t={currentT}
            lang={lang}
            onToast={triggerToast}
            initialShopName={activeListing?.shop[lang]}
          />
        )}

      </main>

      <Footer t={currentT} />

      <MobileBottomNav
        currentScreen={screen}
        cartCount={cart.length}
        loggedIn={loggedIn}
        onNavigate={handleNavigate}
        t={currentT}
      />

      {/* Dynamic alert notification toasts */}
      {toastShow && (
        <div 
          className="animate-toast-in"
          style={{
            position: 'fixed',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'fit-content',
            backgroundColor: '#22201C',
            color: '#FAF5EC',
            fontSize: '12.5px',
            fontWeight: 600,
            padding: '11px 20px',
            borderRadius: '999px',
            boxShadow: '0 6px 18px rgba(0,0,0,.25)',
            zIndex: 100,
          }}
        >
          {toastMsg}
        </div>
      )}
    </div>
  );
}
