import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

// --- INLINE ICONS (THAY THẾ CHO LUCIDE-REACT ĐỂ KHÔNG BỊ LỖI MODULE) ---
const Icon = ({ children, size = 24, className = '', style, strokeWidth = 2 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    {children}
  </svg>
);
const ShoppingCart = (p) => <Icon {...p}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></Icon>;
const Coffee = (p) => <Icon {...p}><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></Icon>;
const Plus = (p) => <Icon {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>;
const Minus = (p) => <Icon {...p}><line x1="5" y1="12" x2="19" y2="12"/></Icon>;
const X = (p) => <Icon {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Icon>;
const LogOut = (p) => <Icon {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></Icon>;
const Phone = (p) => <Icon {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></Icon>;
const Lock = (p) => <Icon {...p}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></Icon>;
const User = (p) => <Icon {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Icon>;
const MapPin = (p) => <Icon {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></Icon>;
const ClipboardList = (p) => <Icon {...p}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></Icon>;
const Users = (p) => <Icon {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Icon>;
const Clock = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Icon>;
const CheckCircle = (p) => <Icon {...p}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></Icon>;
const ChevronRight = (p) => <Icon {...p}><polyline points="9 18 15 12 9 6"/></Icon>;
const ArrowRight = (p) => <Icon {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></Icon>;
const Check = (p) => <Icon {...p}><polyline points="20 6 9 17 4 12"/></Icon>;
const PhoneCall = (p) => <Icon {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/><path d="M14.05 2a9 9 0 0 1 8 7.94"/><path d="M14.05 6A5 5 0 0 1 18 10"/></Icon>;
const History = (p) => <Icon {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></Icon>;
const Info = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></Icon>;
const CheckCircle2 = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></Icon>;
const Box = (p) => <Icon {...p}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></Icon>;
const Truck = (p) => <Icon {...p}><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></Icon>;
const Bell = (p) => <Icon {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></Icon>;
const Ticket = (p) => <Icon {...p}><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></Icon>;
const BarChart3 = (p) => <Icon {...p}><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></Icon>;
const PackageOpen = (p) => <Icon {...p}><path d="M12 22v-9"/><path d="M15.17 2.38a2 2 0 0 0-2.31 0L3 7l9 5 9-5-9.87-4.62z"/><path d="M20 13l2-1.14v-4.38"/><path d="M2 9.48v4.38L4 15"/><path d="M20 16.48l-8 4.62-8-4.62"/></Icon>;
const Award = (p) => <Icon {...p}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></Icon>;
const Tag = (p) => <Icon {...p}><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></Icon>;

// --- CONFIG & DATA ---
const ADMIN_PHONE = '0123456789';

const BRAND = {
  blue: '#2B4673',
  brown: '#5A3B31',
  cream: '#F4EFEB',
  white: '#FFFFFF'
};

const hashPass = (str) => {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) { hash = (hash * 33) ^ str.charCodeAt(i); }
  return (hash >>> 0).toString(16);
};
const ADMIN_PASS = hashPass('123123123'); 

const PatLogo = React.memo(({ className = "text-4xl" }) => (
  <div className={`${className} flex items-center justify-center tracking-tighter drop-shadow-sm`} style={{ fontFamily: "'Arial Rounded MT Bold', 'Varela Round', 'Comic Sans MS', 'Fredoka One', sans-serif", fontWeight: 900 }}>
    <span style={{ color: BRAND.blue }}>Pat</span>
    <span style={{ color: BRAND.brown, marginLeft: '6px' }}>Coffee</span>
  </div>
));

const SIZES = [{ id: 'VUA', name: 'Vừa (500ml)' }, { id: 'TO', name: 'To (800ml)' }, { id: 'SIEUTO', name: 'Siêu To (1 Lít)' }];
const ICE_LEVELS = [100, 70, 50, 0];
const SUGAR_LEVELS = [100, 70, 50, 0];

const INITIAL_MENU = [
  { id: 'a1', name: 'Americano', category: 'AMERICANO', prices: { VUA: 15000, TO: 18000, SIEUTO: 22000 }, inStock: true },
  { id: 'a2', name: 'Americano Chanh', category: 'AMERICANO', prices: { VUA: 17000, TO: 20000, SIEUTO: 25000 }, inStock: true },
  { id: 'a3', name: 'Americano Đào', category: 'AMERICANO', prices: { VUA: 17000, TO: 20000, SIEUTO: 25000 }, inStock: true },
  { id: 't1', name: 'Thái Latte', category: 'THÁI ĐỎ', prices: { VUA: 17000, TO: 21000, SIEUTO: 25000 }, inStock: true },
  { id: 't2', name: 'Thái Mashmallow', category: 'THÁI ĐỎ', prices: { VUA: 22000, TO: 28000, SIEUTO: 33000 }, inStock: true },
  { id: 't3', name: 'Trà Đào Thái', category: 'THÁI ĐỎ', prices: { VUA: 17000, TO: 22000, SIEUTO: 26000 }, inStock: true },
  { id: 't4', name: 'Thái Sữa Caramel', category: 'THÁI ĐỎ', prices: { VUA: 22000, TO: 28000, SIEUTO: 33000 }, inStock: true },
  { id: 't5', name: 'Thái Sốt Tắc', category: 'THÁI ĐỎ', prices: { VUA: 12000, TO: 17000, SIEUTO: 22000 }, inStock: true },
  { id: 't6', name: 'Thái Kem Oreo', category: 'THÁI ĐỎ', prices: { VUA: 22000, TO: 26000, SIEUTO: 32000 }, inStock: true },
  { id: 't7', name: 'Thái Sữa Cookie', category: 'THÁI ĐỎ', prices: { VUA: 22000, TO: 28000, SIEUTO: 33000 }, inStock: true },
  { id: 't8', name: 'Thái Trân Châu', category: 'THÁI ĐỎ', prices: { VUA: 17000, TO: 22000, SIEUTO: 26000 }, inStock: true },
  { id: 'm1', name: 'Matcha Latte', category: 'MATCHA (NHẬT)', prices: { VUA: 18000, TO: 22000, SIEUTO: 26000 }, inStock: true },
  { id: 'm2', name: 'Coldwhisk', category: 'MATCHA (NHẬT)', prices: { VUA: 20000, TO: 23000, SIEUTO: 28000 }, inStock: true },
  { id: 'm3', name: 'Coldwhisk Caramel', category: 'MATCHA (NHẬT)', prices: { VUA: 28000, TO: 33000, SIEUTO: 38000 }, inStock: true },
  { id: 'm4', name: 'Matcha Cem Muý', category: 'MATCHA (NHẬT)', prices: { VUA: 22000, TO: 25000, SIEUTO: 30000 }, inStock: true },
  { id: 'm5', name: 'Matcha Mashmallow', category: 'MATCHA (NHẬT)', prices: { VUA: 28000, TO: 33000, SIEUTO: 38000 }, inStock: true },
  { id: 'm6', name: 'Matcha Kem Oreo', category: 'MATCHA (NHẬT)', prices: { VUA: 25000, TO: 28000, SIEUTO: 33000 }, inStock: true },
  { id: 'm7', name: 'Coldwhisk Cookie', category: 'MATCHA (NHẬT)', prices: { VUA: 28000, TO: 33000, SIEUTO: 38000 }, inStock: true },
  { id: 'ch1', name: 'Latte Oreo', category: 'CHOCO', prices: { VUA: 22000, TO: 25000, SIEUTO: 28000 }, inStock: true },
  { id: 'ch2', name: 'Choco Mashmallow', category: 'CHOCO', prices: { VUA: 22000, TO: 28000, SIEUTO: 33000 }, inStock: true },
  { id: 'ch3', name: 'Chocomint', category: 'CHOCO', prices: { VUA: 18000, TO: 22000, SIEUTO: 28000 }, inStock: true },
  { id: 'ch4', name: 'Chocomint Oreo', category: 'CHOCO', prices: { VUA: 24000, TO: 28000, SIEUTO: 33000 }, inStock: true },
  { id: 'ca1', name: 'Cacao Caramel', category: 'CACAO', prices: { VUA: 22000, TO: 28000, SIEUTO: 33000 }, inStock: true },
  { id: 'ca2', name: 'Cacao Latte', category: 'CACAO', prices: { VUA: 15000, TO: 18000, SIEUTO: 22000 }, inStock: true },
  { id: 'ca3', name: 'Cacao Cem Muý', category: 'CACAO', prices: { VUA: 18000, TO: 22000, SIEUTO: 25000 }, inStock: true },
];

const INITIAL_TOPPINGS = [
  { id: 'tp1', name: 'Caramel', price: 5000, inStock: true },
  { id: 'tp2', name: 'Kem', price: 5000, inStock: true },
  { id: 'tp3', name: 'Cookie Yến Mạch', price: 5000, inStock: true },
  { id: 'tp4', name: 'Đào', price: 3000, inStock: true },
  { id: 'tp5', name: 'Trân Châu Đen', price: 3000, inStock: true },
  { id: 'tp6', name: 'Thạch Cà Phê', price: 3000, inStock: true },
  { id: 'tp7', name: 'Oreo', price: 3000, inStock: true },
];

const formatVND = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

const cleanupOldData = () => {
  const now = Date.now();
  const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;
  let orders = JSON.parse(localStorage.getItem('coffee_orders') || '[]');
  const initialLen = orders.length;
  orders = orders.filter(o => {
    if (o.status === 'done') return (now - (o.deliveredAt || o.createdAt)) <= THREE_DAYS;
    return true;
  });
  if (orders.length !== initialLen) localStorage.setItem('coffee_orders', JSON.stringify(orders));
};

function useLongPress(callback, ms = 600) {
  const [startLongPress, setStartLongPress] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    if (startLongPress) timerRef.current = setTimeout(callback, ms);
    else clearTimeout(timerRef.current);
    return () => clearTimeout(timerRef.current);
  }, [callback, ms, startLongPress]);

  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false),
  };
}

const playSound = () => {
  const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
  audio.volume = 0.5; audio.play().catch(() => {});
};

const sendPushNotification = (title, body) => {
  if ('Notification' in window && Notification.permission === 'granted') new Notification(title, { body });
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, msg: '', type: 'info' });

  // OPTIMIZED STATE: Using direct localStorage reading for initial mount
  const [menu, setMenu] = useState(() => JSON.parse(localStorage.getItem('coffee_menu') || JSON.stringify(INITIAL_MENU)));
  const [toppings, setToppings] = useState(() => JSON.parse(localStorage.getItem('coffee_toppings') || JSON.stringify(INITIAL_TOPPINGS)));
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('coffee_orders') || '[]'));

  // RAW REF CACHE (Tối ưu hóa: So sánh chuỗi thay vì parse JSON)
  const rawCache = useRef({
    menu: localStorage.getItem('coffee_menu') || JSON.stringify(INITIAL_MENU),
    toppings: localStorage.getItem('coffee_toppings') || JSON.stringify(INITIAL_TOPPINGS),
    orders: localStorage.getItem('coffee_orders') || '[]'
  });

  const prevPendingRef = useRef(orders.filter(o => o.status === 'pending').length);
  const prevShippingRef = useRef(0);

  const showToast = useCallback((msg, type = 'info') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: '', type: 'info' }), 3000);
  }, []);

  // OPTIMIZED POLLER: Chỉ chuyển đổi (Parse) nếu chuỗi thực sự thay đổi
  const pollData = useCallback(() => {
    const dbOrdersRaw = localStorage.getItem('coffee_orders') || '[]';
    if (dbOrdersRaw !== rawCache.current.orders) {
      setOrders(JSON.parse(dbOrdersRaw));
      rawCache.current.orders = dbOrdersRaw;
    }

    const dbMenuRaw = localStorage.getItem('coffee_menu');
    if (dbMenuRaw && dbMenuRaw !== rawCache.current.menu) {
      setMenu(JSON.parse(dbMenuRaw));
      rawCache.current.menu = dbMenuRaw;
    }

    const dbToppingsRaw = localStorage.getItem('coffee_toppings');
    if (dbToppingsRaw && dbToppingsRaw !== rawCache.current.toppings) {
      setToppings(JSON.parse(dbToppingsRaw));
      rawCache.current.toppings = dbToppingsRaw;
    }
  }, []);

  useEffect(() => {
    cleanupOldData(); 
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
    const savedUser = localStorage.getItem('coffee_active_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    const usersDB = JSON.parse(localStorage.getItem('coffee_users') || '{}');
    if (!usersDB[ADMIN_PHONE]) {
      usersDB[ADMIN_PHONE] = { phone: ADMIN_PHONE, password: ADMIN_PASS, role: 'admin', name: 'Quản Lý', address: 'Trụ sở chính', points: 0 };
      localStorage.setItem('coffee_users', JSON.stringify(usersDB));
    }
    setLoading(false);
    
    const int = setInterval(pollData, 3000);
    return () => clearInterval(int);
  }, [pollData]);

  // WRITERS: Update cache when self-triggered
  useEffect(() => { const raw = JSON.stringify(menu); localStorage.setItem('coffee_menu', raw); rawCache.current.menu = raw; }, [menu]);
  useEffect(() => { const raw = JSON.stringify(toppings); localStorage.setItem('coffee_toppings', raw); rawCache.current.toppings = raw; }, [toppings]);
  useEffect(() => { const raw = JSON.stringify(orders); localStorage.setItem('coffee_orders', raw); rawCache.current.orders = raw; }, [orders]);

  useEffect(() => {
    if (!user) return;
    if (user.role === 'admin') {
      const currentPending = orders.filter(o => o.status === 'pending').length;
      if (currentPending > prevPendingRef.current) { playSound(); sendPushNotification("Đơn mới!", "Có cập nhật đơn hàng mới."); }
      prevPendingRef.current = currentPending;
    }
    if (user.role === 'shipper') {
      const currentShipping = orders.filter(o => o.status === 'shipping' && o.shipperPhone === user.phone).length;
      if (currentShipping > prevShippingRef.current) { playSound(); sendPushNotification("Đơn giao mới!", "Bạn được điều phối đơn hàng mới."); }
      prevShippingRef.current = currentShipping;
    }
  }, [orders, user]);

  const handleLogin = useCallback((userData) => { setUser(userData); localStorage.setItem('coffee_active_user', JSON.stringify(userData)); }, []);
  const handleLogout = useCallback(() => { setUser(null); localStorage.removeItem('coffee_active_user'); }, []);

  const updateUser = useCallback((updatedData) => {
    const usersDB = JSON.parse(localStorage.getItem('coffee_users') || '{}');
    usersDB[updatedData.phone] = updatedData;
    localStorage.setItem('coffee_users', JSON.stringify(usersDB));
    setUser(updatedData);
    localStorage.setItem('coffee_active_user', JSON.stringify(updatedData));
    showToast('Cập nhật hồ sơ thành công!', 'success');
  }, [showToast]);

  const placeOrder = useCallback((newOrdersData) => {
    setOrders(newOrdersData);
    showToast('Đặt hàng thành công! Quán đã nhận đơn.', 'success');
  }, [showToast]);

  const updateOrderStatus = useCallback((id, newStatus, extra = {}) => {
    setOrders(prev => prev.map(o => {
      if (o.id === id) {
        if (newStatus === 'done' && o.status !== 'done') {
          const usersDB = JSON.parse(localStorage.getItem('coffee_users') || '{}');
          if (usersDB[o.customerPhone]) {
            usersDB[o.customerPhone].points = (usersDB[o.customerPhone].points || 0) + 1;
            localStorage.setItem('coffee_users', JSON.stringify(usersDB));
            if (user?.phone === o.customerPhone) {
              const updated = { ...user, points: usersDB[o.customerPhone].points };
              setUser(updated);
              localStorage.setItem('coffee_active_user', JSON.stringify(updated));
            }
          }
        }
        return { ...o, status: newStatus, updatedAt: Date.now(), ...extra };
      }
      return o;
    }));
  }, [user]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen w-full font-sans text-stone-800 selection:bg-[#2B4673]/20 relative" style={{ backgroundColor: BRAND.cream }}>
      {toast.show && <Toast msg={toast.msg} type={toast.type} />}
      <div className="max-w-md mx-auto min-h-[100dvh] h-[100dvh] relative shadow-2xl overflow-hidden flex flex-col" style={{ backgroundColor: BRAND.cream }}>
        {!user ? <AuthScreen onLogin={handleLogin} showToast={showToast} /> :
         user.role === 'admin' ? <AdminApp user={user} orders={orders} menu={menu} toppings={toppings} setMenu={setMenu} setToppings={setToppings} updateOrderStatus={updateOrderStatus} onLogout={handleLogout} showToast={showToast} /> :
         user.role === 'shipper' ? <ShipperApp user={user} orders={orders} updateOrderStatus={updateOrderStatus} onLogout={handleLogout} showToast={showToast} /> :
         <CustomerApp user={user} orders={orders} menu={menu} toppings={toppings} placeOrder={placeOrder} onLogout={handleLogout} onUpdateUser={updateUser} showToast={showToast} />}
      </div>
    </div>
  );
}

const LoadingScreen = React.memo(() => (
  <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: BRAND.cream }}>
    <div className="animate-pulse flex flex-col items-center">
      <PatLogo className="text-5xl mb-4" />
      <p className="mt-2 font-bold tracking-widest text-sm" style={{ color: BRAND.brown }}>LOADING...</p>
    </div>
  </div>
));

const Toast = React.memo(({ msg, type }) => (
  <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[999] animate-in fade-in slide-in-from-top-4 pointer-events-none w-[90%] max-w-[360px]">
    <div className={`px-5 py-3 rounded-2xl shadow-xl border font-bold text-sm flex items-center gap-3 bg-white`} style={{ borderColor: type === 'error' ? 'red' : BRAND.blue, color: type === 'error' ? 'red' : BRAND.blue }}>
      {type === 'success' ? <CheckCircle2 size={20} className="shrink-0"/> : type === 'error' ? <Info size={20} className="shrink-0"/> : <Bell size={20} className="shrink-0"/>}
      <span>{msg}</span>
    </div>
  </div>
));

// ==========================================
// 1. AUTH SCREEN
// ==========================================
const AuthScreen = React.memo(({ onLogin, showToast }) => {
  const [authMode, setAuthMode] = useState('login');
  const [formData, setFormData] = useState({ phone: '', password: '', name: '', address: '' });

  const handleChange = useCallback((e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^0\d{9}$/.test(formData.phone)) return showToast('SĐT không hợp lệ (10 số, bắt đầu bằng 0)', 'error');
    const usersDB = JSON.parse(localStorage.getItem('coffee_users') || '{}');
    const existingUser = usersDB[formData.phone];

    if (authMode === 'login') {
      if (existingUser && existingUser.password === hashPass(formData.password)) onLogin(existingUser);
      else showToast('Sai số điện thoại hoặc mật khẩu!', 'error');
    } else if (authMode === 'register') {
      if (formData.password.length < 6) return showToast('Mật khẩu ít nhất 6 ký tự', 'error');
      if (!formData.name.trim() || !formData.address.trim()) return showToast('Nhập đủ Tên và Địa chỉ', 'error');
      if (existingUser) return showToast('SĐT đã được đăng ký!', 'error');
      
      const newUser = { phone: formData.phone, password: hashPass(formData.password), name: formData.name.trim(), address: formData.address.trim(), role: 'customer', avatar: null, points: 0 };
      usersDB[formData.phone] = newUser;
      localStorage.setItem('coffee_users', JSON.stringify(usersDB));
      showToast('Đăng ký thành công!', 'success');
      onLogin(newUser);
    } else if (authMode === 'forgot') {
      if (!existingUser) return showToast('SĐT chưa đăng ký!', 'error');
      if (formData.password.length < 6) return showToast('Mật khẩu mới ít nhất 6 ký tự', 'error');
      existingUser.password = hashPass(formData.password);
      usersDB[formData.phone] = existingUser;
      localStorage.setItem('coffee_users', JSON.stringify(usersDB));
      showToast('Đổi mật khẩu thành công!', 'success');
      setAuthMode('login');
      setFormData(prev => ({ ...prev, password: '' }));
    }
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col justify-center px-8" style={{ backgroundColor: BRAND.cream }}>
      <div className="text-center mb-8 mt-6">
        <PatLogo className="mx-auto text-[3.5rem] mb-2" />
<p className="text-xs font-bold tracking-widest uppercase opacity-60 mt-3" style={{ color: BRAND.brown }}>Chào mừng bạn đến với quán</p>
      </div>
      <div className="bg-white/50 p-1.5 rounded-full flex mb-8 border border-white shadow-sm">
        <button type="button" onClick={() => setAuthMode('login')} className={`flex-1 py-3 text-sm font-bold rounded-full transition-all ${authMode === 'login' ? 'text-white shadow-md' : ''}`} style={{ backgroundColor: authMode === 'login' ? BRAND.blue : 'transparent', color: authMode === 'login' ? 'white' : BRAND.blue }}>Đăng Nhập</button>
        <button type="button" onClick={() => setAuthMode('register')} className={`flex-1 py-3 text-sm font-bold rounded-full transition-all ${authMode === 'register' ? 'text-white shadow-md' : ''}`} style={{ backgroundColor: authMode === 'register' ? BRAND.blue : 'transparent', color: authMode === 'register' ? 'white' : BRAND.blue }}>Đăng Ký</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 pb-12">
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" size={20} style={{ color: BRAND.blue }} />
          <input name="phone" type="tel" placeholder="Số điện thoại" className="w-full pl-12 pr-4 py-4 bg-white border-2 rounded-2xl focus:outline-none font-bold placeholder:font-medium shadow-sm" style={{ borderColor: 'transparent', color: BRAND.blue }} value={formData.phone} onChange={handleChange} />
        </div>
        {authMode === 'register' && (
          <>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" size={20} style={{ color: BRAND.blue }} />
              <input name="name" type="text" placeholder="Tên của bạn" className="w-full pl-12 pr-4 py-4 bg-white border-2 rounded-2xl focus:outline-none font-bold placeholder:font-medium shadow-sm" style={{ borderColor: 'transparent', color: BRAND.blue }} value={formData.name} onChange={handleChange} />
            </div>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" size={20} style={{ color: BRAND.blue }} />
              <input name="address" type="text" placeholder="Địa chỉ giao hàng" className="w-full pl-12 pr-4 py-4 bg-white border-2 rounded-2xl focus:outline-none font-bold placeholder:font-medium shadow-sm" style={{ borderColor: 'transparent', color: BRAND.blue }} value={formData.address} onChange={handleChange} />
            </div>
          </>
        )}
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" size={20} style={{ color: BRAND.blue }} />
          <input name="password" type="password" placeholder={authMode === 'forgot' ? "Mật khẩu mới" : "Mật khẩu"} className="w-full pl-12 pr-4 py-4 bg-white border-2 rounded-2xl focus:outline-none font-bold placeholder:font-medium shadow-sm" style={{ borderColor: 'transparent', color: BRAND.blue }} value={formData.password} onChange={handleChange} />
        </div>
        {authMode === 'login' && <div className="text-right"><button type="button" onClick={() => setAuthMode('forgot')} className="text-sm font-bold opacity-80 hover:opacity-100" style={{ color: BRAND.brown }}>Quên mật khẩu?</button></div>}
        <button type="submit" className="mt-8 w-full py-4 rounded-full font-black text-white shadow-xl text-lg tracking-wide active:scale-[0.98] transition-transform" style={{ backgroundColor: BRAND.brown }}>
          {authMode === 'login' ? 'Vào Quán' : authMode === 'register' ? 'Tạo Tài Khoản' : 'Đổi Mật Khẩu'}
        </button>
        {authMode === 'forgot' && <button type="button" onClick={() => setAuthMode('login')} className="w-full py-4 rounded-full font-bold bg-white/50 mt-2 hover:bg-white transition-colors" style={{ color: BRAND.blue }}>Quay lại Đăng nhập</button>}
      </form>
    </div>
  );
});

// ==========================================
// 2. CUSTOMER APP
// ==========================================
const CustomerApp = React.memo(({ user, orders, menu, toppings, placeOrder, onLogout, onUpdateUser, showToast }) => {
  const [activeTab, setActiveTab] = useState('menu'); 
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem(`cart_${user.phone}`) || '[]'));
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => { localStorage.setItem(`cart_${user.phone}`, JSON.stringify(cart)); }, [cart, user.phone]);

  const myOrders = useMemo(() => orders.filter(o => o.customerPhone === user.phone).sort((a,b) => b.createdAt - a.createdAt), [orders, user.phone]);

  const handleAddToCart = useCallback((item) => {
    setCart(prev => {
      const sortedToppings = [...item.toppings].map(t => t.id).sort().join(',');
      const signature = `${item.product.id}_${item.size}_${item.ice}_${item.sugar}_${sortedToppings}`;
      const existingIdx = prev.findIndex(i => i.signature === signature);
      if (existingIdx > -1) {
        const newCart = [...prev];
        newCart[existingIdx].qty += item.qty;
        newCart[existingIdx].total += (item.total / item.qty) * item.qty;
        return newCart;
      }
      return [...prev, { ...item, signature }];
    });
    setSelectedProduct(null);
    showToast(`Đã thêm ${item.product.name} vào giỏ`, 'success');
  }, [showToast]);

  const handleCheckout = useCallback((note, finalTotal, deductPoints) => {
    if (cart.length === 0) return;
    const dbOrders = JSON.parse(localStorage.getItem('coffee_orders') || '[]');
    const newOrder = {
      id: Math.random().toString(36).substring(2, 8).toUpperCase(),
      customerPhone: user.phone, customerName: user.name, customerAddress: user.address,
      items: cart, total: finalTotal, note: note, status: 'pending', createdAt: Date.now(), shipperPhone: null
    };
    placeOrder([newOrder, ...dbOrders]);
    if (deductPoints) onUpdateUser({ ...user, points: Math.max(0, (user.points || 0) - 10) });
    setCart([]);
    setActiveTab('orders');
  }, [cart, user, placeOrder, onUpdateUser]);

  return (
    <>
      {activeTab !== 'profile' && (
        <header className="bg-white/95 backdrop-blur-md px-6 py-4 flex justify-between items-center shrink-0 z-10 sticky top-0 shadow-sm rounded-b-3xl">
          <div className="flex items-center gap-4">
            <PatLogo className="text-[1.75rem] shrink-0" />
            <div>
              <h1 className="font-bold text-lg truncate max-w-[180px]" style={{ color: BRAND.blue }}>Xin chào, {user.name}</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-[11px] font-bold uppercase flex items-center gap-1 opacity-70" style={{ color: BRAND.brown }}><MapPin size={12}/> {user.address}</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 text-white" style={{ backgroundColor: BRAND.brown }}><Award size={10}/> {user.points || 0} điểm</span>
              </div>
            </div>
          </div>
        </header>
      )}

      <div className="flex-1 overflow-y-auto pb-28 no-scrollbar scroll-smooth relative">
        {activeTab === 'menu' && <CustomerMenu menu={menu} onSelect={setSelectedProduct} />}
        {activeTab === 'cart' && <CustomerCart cart={cart} setCart={setCart} user={user} onCheckout={handleCheckout} />}
        {activeTab === 'orders' && <CustomerOrders orders={myOrders} />}
        {activeTab === 'profile' && <CustomerProfile user={user} onUpdateUser={onUpdateUser} onLogout={onLogout} showToast={showToast} />}
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none z-20">
        <div className="w-full bg-white border-t flex justify-around p-2 pb-safe-bottom shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.05)] pointer-events-auto rounded-t-3xl border-gray-100">
          <NavItem icon={<Coffee size={24}/>} label="Menu" active={activeTab==='menu'} onClick={()=>setActiveTab('menu')} />
          <NavItem icon={<ShoppingCart size={24}/>} label="Giỏ hàng" active={activeTab==='cart'} onClick={()=>setActiveTab('cart')} badge={cart.reduce((s,i)=>s+i.qty,0)} />
          <NavItem icon={<History size={24}/>} label="Đơn hàng" active={activeTab==='orders'} onClick={()=>setActiveTab('orders')} />
          <NavItem icon={<User size={24}/>} label="Hồ sơ" active={activeTab==='profile'} onClick={()=>setActiveTab('profile')} />
        </div>
      </div>

      {selectedProduct && (
        <div className="absolute inset-0 z-[100] flex justify-center items-end pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" onClick={() => setSelectedProduct(null)} />
          <div className="w-full bg-white rounded-t-[2.5rem] relative shadow-2xl flex flex-col h-[85%] pointer-events-auto animate-in slide-in-from-bottom-full duration-300" onClick={e => e.stopPropagation()}>
            <ProductModal product={selectedProduct} availableToppings={toppings.filter(t=>t.inStock)} onClose={()=>setSelectedProduct(null)} onAdd={handleAddToCart}/>
          </div>
        </div>
      )}
    </>
  );
});

const CustomerMenu = React.memo(({ menu, onSelect }) => {
  const categories = ['AMERICANO', 'THÁI ĐỎ', 'MATCHA (NHẬT)', 'CHOCO', 'CACAO'];
  
  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-300">
      {categories.map(cat => {
        const isBlueCat = ['AMERICANO', 'THÁI ĐỎ'].includes(cat);
        const headerBg = isBlueCat ? BRAND.blue : BRAND.brown;
        const items = menu.filter(i => i.category === cat);
        if(items.length === 0) return null;

        return (
          <div key={cat}>
            <div className="inline-block px-5 py-2 rounded-full text-white font-black tracking-wider mb-5 shadow-sm" style={{ backgroundColor: headerBg }}>
              {cat}
            </div>
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.id} onClick={() => item.inStock ? onSelect(item) : null} className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden transition-all group flex items-center justify-between p-4 relative ${item.inStock ? 'cursor-pointer active:scale-95 border-transparent hover:border-gray-200' : 'opacity-50 grayscale border-gray-200'}`}>
                  {!item.inStock && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black/80 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase">Tạm hết</div>}
                  <div className="flex flex-col">
                    <h3 className="font-bold text-base leading-tight mb-1" style={{ color: BRAND.blue }}>{item.name}</h3>
                    <p className="font-black text-sm" style={{ color: BRAND.brown }}>{formatVND(item.prices.VUA)}</p>
                  </div>
                  {item.inStock && (
                    <div className="bg-gray-100 text-black p-2 rounded-full shadow-sm" style={{ color: BRAND.blue }}>
                      <Plus size={20} strokeWidth={3} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
});

const NavItem = React.memo(({ icon, label, active, onClick, badge }) => (
  <button onClick={onClick} className={`flex flex-col items-center p-2 px-4 transition-all relative ${active ? 'translate-y-[-4px]' : 'opacity-40 hover:opacity-100'}`} style={{ color: active ? BRAND.blue : BRAND.blue }}>
    <div className="relative">
      {icon}
      {badge > 0 && <span className="absolute -top-1.5 -right-2.5 bg-red-500 text-white text-[10px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full border-2 border-white">{badge}</span>}
    </div>
    <span className="text-[11px] font-black mt-1.5">{label}</span>
    {active && <div className="absolute -bottom-2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BRAND.blue }}/>}
  </button>
));

const ProductModal = React.memo(({ product, availableToppings, onClose, onAdd }) => {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('VUA');
  const [selToppings, setSelToppings] = useState([]);
  const [ice, setIce] = useState(100);
  const [sugar, setSugar] = useState(100);

  const toggleTopping = useCallback((t) => {
    setSelToppings(prev => prev.some(x => x.id === t.id) ? prev.filter(x => x.id !== t.id) : [...prev, t]);
  }, []);

  const total = useMemo(() => {
    const basePrice = product.prices[size] || product.prices.VUA;
    const toppingsPrice = selToppings.reduce((s, t) => s + t.price, 0);
    return (basePrice + toppingsPrice) * qty;
  }, [product.prices, size, selToppings, qty]);

  return (
    <>
      <button onClick={onClose} className="absolute top-5 right-5 z-20 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shadow-sm active:scale-95" style={{ color: BRAND.blue }}><X size={20}/></button>
      <div className="overflow-y-auto no-scrollbar rounded-t-[2.5rem] pb-32 h-full pt-16" style={{ backgroundColor: BRAND.cream }}>
        <div className="p-6 relative z-10 bg-white rounded-[2rem] shadow-sm mx-4 text-center">
          <h2 className="text-2xl font-black mb-2" style={{ color: BRAND.blue }}>{product.name}</h2>
          <p className="font-black text-xl" style={{ color: BRAND.brown }}>{formatVND(product.prices.VUA)} - {formatVND(product.prices.SIEUTO)}</p>
        </div>
        
        <div className="p-6 space-y-8 mt-2">
          {/* SIZES */}
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full text-white font-bold text-xs uppercase tracking-widest mb-4" style={{ backgroundColor: BRAND.blue }}>Kích cỡ</div>
            <div className="grid grid-cols-3 gap-2">
              {SIZES.map(s => (
                <div key={s.id} onClick={() => setSize(s.id)} className={`text-center py-3 rounded-2xl border-2 font-bold cursor-pointer transition-all ${size === s.id ? 'bg-white shadow-md' : 'bg-transparent border-transparent opacity-60'}`} style={{ borderColor: size === s.id ? BRAND.blue : '', color: size === s.id ? BRAND.blue : BRAND.blue }}>
                  <div className="text-sm">{s.name.split(' ')[0]}</div>
                  <div className="text-[10px] mt-1 opacity-70">{formatVND(product.prices[s.id])}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ICE & SUGAR */}
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full text-white font-bold text-xs uppercase tracking-widest mb-4" style={{ backgroundColor: BRAND.blue }}>Lượng Đá</div>
            <div className="flex gap-2">
              {ICE_LEVELS.map(level => (
                <button key={level} onClick={() => setIce(level)} className={`flex-1 py-2.5 rounded-xl font-bold text-sm border-2 transition-all ${ice === level ? 'bg-white shadow-sm' : 'border-transparent opacity-60'}`} style={{ borderColor: ice === level ? BRAND.blue : '', color: BRAND.blue }}>{level}%</button>
              ))}
            </div>
          </div>
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full text-white font-bold text-xs uppercase tracking-widest mb-4" style={{ backgroundColor: BRAND.blue }}>Lượng Đường</div>
            <div className="flex gap-2">
              {SUGAR_LEVELS.map(level => (
                <button key={level} onClick={() => setSugar(level)} className={`flex-1 py-2.5 rounded-xl font-bold text-sm border-2 transition-all ${sugar === level ? 'bg-white shadow-sm' : 'border-transparent opacity-60'}`} style={{ borderColor: sugar === level ? BRAND.blue : '', color: BRAND.blue }}>{level}%</button>
              ))}
            </div>
          </div>

          {/* TOPPINGS */}
          {availableToppings.length > 0 && (
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full text-white font-bold text-xs uppercase tracking-widest mb-4" style={{ backgroundColor: BRAND.blue }}>Topping</div>
              <div className="space-y-3">
                {availableToppings.map(t => {
                  const isSel = selToppings.some(x => x.id === t.id);
                  return (
                    <div key={t.id} onClick={() => toggleTopping(t)} className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${isSel ? 'bg-white shadow-sm' : 'bg-transparent border-white/50'}`} style={{ borderColor: isSel ? BRAND.blue : 'rgba(255,255,255,0.5)' }}>
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSel ? '' : 'border-black/20'}`} style={{ backgroundColor: isSel ? BRAND.blue : 'transparent', borderColor: isSel ? BRAND.blue : '' }}>
                          {isSel && <Check size={12} className="text-white" strokeWidth={4}/>}
                        </div>
                        <span className={`text-sm font-bold ${isSel ? '' : 'opacity-70'}`} style={{ color: BRAND.blue }}>{t.name}</span>
                      </div>
                      <span className="text-sm font-bold" style={{ color: BRAND.brown }}>+{formatVND(t.price)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* ADD TO CART BAR */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pt-4 pb-safe-bottom bg-white border-t border-gray-100 flex gap-4 rounded-t-3xl shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center bg-gray-100 rounded-full p-1 shrink-0">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm"><Minus size={20} style={{ color: BRAND.blue }} /></button>
          <span className="w-10 text-center font-black text-lg" style={{ color: BRAND.blue }}>{qty}</span>
          <button onClick={() => setQty(qty + 1)} className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm"><Plus size={20} style={{ color: BRAND.blue }} /></button>
        </div>
        <button onClick={() => onAdd({ cartId: Math.random().toString(36).substring(2), product, size, sizeName: SIZES.find(s=>s.id===size).name, toppings: selToppings, ice, sugar, qty, total })} className="flex-1 rounded-full font-black text-white active:scale-95 shadow-xl text-lg flex items-center justify-center gap-2" style={{ backgroundColor: BRAND.brown }}>
          Thêm • {formatVND(total)}
        </button>
      </div>
    </>
  );
});

const CustomerCart = React.memo(({ cart, setCart, user, onCheckout }) => {
  const [note, setNote] = useState('');
  const [voucher, setVoucher] = useState('');
  const [useLoyalty, setUseLoyalty] = useState(false);

  const canUseLoyalty = (user.points || 0) >= 10;

  const calculations = useMemo(() => {
    let subtotal = cart.reduce((s, i) => s + i.total, 0);
    let discount = 0;
    let highestBasePrice = 0;
    let totalToppingsCost = 0;

    cart.forEach(item => {
      const basePrice = item.product.prices[item.size] || 0;
      if (basePrice > highestBasePrice) highestBasePrice = basePrice;
      const itemToppingsCost = item.toppings.reduce((s,t) => s + t.price, 0) * item.qty;
      totalToppingsCost += itemToppingsCost;
    });

    if (useLoyalty && canUseLoyalty) discount += highestBasePrice;

    const vText = voucher.trim().toUpperCase();
    let vApplied = false;
    if (vText === 'DAYLAMAGIAMGIA1') { discount += 10000; vApplied = true; } 
    else if (vText === 'DAYLAMAGIAMGIA2') { discount += totalToppingsCost; vApplied = true; }

    const finalTotal = Math.max(0, subtotal - discount);
    return { subtotal, discount, finalTotal, vApplied, vText };
  }, [cart, useLoyalty, canUseLoyalty, voucher]);

  if (cart.length === 0) return <div className="p-10 text-center opacity-50 mt-32 flex flex-col items-center animate-in fade-in" style={{ color: BRAND.blue }}><ShoppingCart size={48} className="mb-4"/><p className="font-bold text-lg">Giỏ hàng trống</p></div>;

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-300 pb-32">
      <h2 className="text-2xl font-black" style={{ color: BRAND.blue }}>Giỏ hàng của bạn</h2>

      <div className="space-y-4">
        {cart.map(item => (
          <div key={item.signature || item.cartId} className="bg-white p-4 rounded-3xl shadow-sm flex gap-4">
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-[15px] truncate pr-2" style={{ color: BRAND.blue }}>{item.product.name}</h4>
                <button onClick={()=>setCart(cart.filter(i=>i.signature !== item.signature && i.cartId !== item.cartId))} className="opacity-40 hover:opacity-100 p-1 bg-gray-50 rounded-full" style={{ color: BRAND.blue }}><X size={16}/></button>
              </div>
              <div className="mt-1 flex flex-wrap gap-1">
                <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: BRAND.blue }}>{item.sizeName.split(' ')[0]}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: BRAND.cream, color: BRAND.blue }}>Đá {item.ice}% • Đường {item.sugar}%</span>
                {item.toppings.map(t=> <span key={t.id} className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: BRAND.brown }}>+{t.name}</span>)}
              </div>
              <div className="flex justify-between items-end mt-3">
                <p className="font-black text-lg" style={{ color: BRAND.brown }}>{formatVND(item.total)}</p>
                <span className="text-xs font-bold px-2 py-1 rounded-lg bg-gray-100" style={{ color: BRAND.blue }}>SL: {item.qty}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-4">
        {canUseLoyalty && (
          <div className="p-4 rounded-2xl border-2 flex justify-between items-center cursor-pointer bg-white" style={{ borderColor: useLoyalty ? BRAND.blue : 'transparent' }} onClick={() => setUseLoyalty(!useLoyalty)}>
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm" style={{ backgroundColor: BRAND.blue }}><Ticket size={20}/></div>
               <div><p className="font-bold text-sm" style={{ color: BRAND.blue }}>Dùng 10 điểm thưởng</p><p className="text-xs opacity-70" style={{ color: BRAND.blue }}>Đổi 1 ly nước miễn phí</p></div>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center`} style={{ backgroundColor: useLoyalty ? BRAND.blue : 'transparent', borderColor: useLoyalty ? BRAND.blue : 'rgba(0,0,0,0.1)' }}>
               {useLoyalty && <Check size={14} className="text-white"/>}
            </div>
          </div>
        )}
        <div className="relative">
          <Tag className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" size={18} style={{ color: BRAND.blue }} />
          <input type="text" placeholder="Mã khuyến mãi" className="w-full pl-11 pr-4 py-4 bg-white rounded-2xl text-sm font-bold uppercase shadow-sm focus:outline-none" style={{ color: BRAND.blue }} value={voucher} onChange={e=>setVoucher(e.target.value)} />
          {calculations.vApplied && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" size={18}/>}
        </div>
      </div>
      <textarea placeholder="Ghi chú" className="w-full p-4 bg-white rounded-2xl text-sm font-medium resize-none shadow-sm focus:outline-none" rows="2" style={{ color: BRAND.blue }} value={note} onChange={e=>setNote(e.target.value)} />
      
      <div className="bg-white p-5 rounded-3xl shadow-sm space-y-3">
         <div className="flex justify-between text-sm font-bold opacity-70" style={{ color: BRAND.blue }}><span>Tạm tính</span><span>{formatVND(calculations.subtotal)}</span></div>
         {calculations.discount > 0 && <div className="flex justify-between text-sm font-bold text-green-600"><span>Khuyến mãi</span><span>-{formatVND(calculations.discount)}</span></div>}
         <div className="border-t pt-3 flex justify-between items-end mt-2 border-gray-100"><span className="font-bold text-sm" style={{ color: BRAND.blue }}>Tổng thanh toán</span><span className="font-black text-2xl" style={{ color: BRAND.brown }}>{formatVND(calculations.finalTotal)}</span></div>
      </div>
      <button onClick={() => onCheckout(note, calculations.finalTotal, useLoyalty && canUseLoyalty)} className="w-full py-4 rounded-full font-black text-white active:scale-95 shadow-xl text-lg tracking-wide" style={{ backgroundColor: BRAND.brown }}>
        Đặt Hàng Ngay
      </button>
    </div>
  );
});

const CustomerOrders = React.memo(({ orders }) => {
  if (orders.length === 0) return <div className="p-10 text-center opacity-50 mt-32" style={{ color: BRAND.blue }}><History size={48} className="mx-auto mb-4"/><p className="font-bold text-lg">Chưa có đơn hàng</p></div>;
  return (
    <div className="p-6 space-y-5 animate-in fade-in pb-32">
      <h2 className="text-2xl font-black mb-6" style={{ color: BRAND.blue }}>Lịch sử đơn hàng</h2>
      {orders.map(o => (
        <div key={o.id} className={`p-5 rounded-3xl shadow-sm border-2 ${o.status === 'done' ? 'bg-white/50 border-transparent' : 'bg-white border-white'}`}>
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
            <div><span className="font-black text-lg block" style={{ color: BRAND.blue }}>#{o.customerPhone.slice(-3)}</span><span className="text-[10px] uppercase tracking-widest opacity-50" style={{ color: BRAND.blue }}>{o.id}</span></div>
            <span className="font-black text-lg" style={{ color: BRAND.brown }}>{formatVND(o.total)}</span>
          </div>
          {o.status !== 'done' && <OrderTimeline status={o.status} />}
          <div className="space-y-3 mt-2">
            {o.items.map((i, idx) => (
              <div key={idx} className="text-sm font-bold" style={{ color: BRAND.blue }}>
                <div className="flex justify-between items-start">
                  <span><span style={{ color: BRAND.brown }}>{i.qty}x</span> {i.product.name} ({i.sizeName.split(' ')[0]})</span>
                </div>
                {i.product.category !== 'Bánh' && <p className="text-[11px] opacity-60 ml-5">Đá {i.ice}% - Đường {i.sugar}% {i.toppings.length > 0 ? `- ${i.toppings.map(t=>t.name).join(', ')}` : ''}</p>}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-end pt-3 border-t mt-3 text-[11px] font-bold border-gray-100 opacity-60" style={{ color: BRAND.blue }}>
            <span className="flex flex-col gap-1">
              <span className="flex items-center gap-1"><Clock size={12}/> Đặt: {new Date(o.createdAt).toLocaleTimeString('vi-VN')}</span>
              {o.deliveredAt && <span className="flex items-center gap-1 text-green-600"><CheckCircle size={12}/> Giao: {new Date(o.deliveredAt).toLocaleString('vi-VN')}</span>}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
});

const OrderTimeline = React.memo(({ status }) => {
  const steps = [{ id: 'pending', label: 'Chờ nhận' }, { id: 'making', label: 'Đang làm' }, { id: 'shipping', label: 'Đang giao' }];
  const currentIndex = steps.findIndex(s => s.id === status);
  return (
    <div className="flex items-center justify-between w-full mb-6 relative">
      <div className="absolute top-1/2 left-0 right-0 h-1 rounded-full -translate-y-1/2 z-0" style={{ backgroundColor: BRAND.cream }}></div>
      <div className="absolute top-1/2 left-0 h-1 rounded-full -translate-y-1/2 z-0 transition-all duration-500" style={{ backgroundColor: BRAND.blue, width: `${(currentIndex / (steps.length - 1)) * 100}%` }}></div>
      {steps.map((step, idx) => {
        const isActive = idx <= currentIndex;
        return (
          <div key={step.id} className="relative z-10 flex flex-col items-center gap-1.5 bg-white p-1 rounded-full">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-colors duration-300`} style={{ backgroundColor: isActive ? BRAND.blue : BRAND.cream, borderColor: isActive ? BRAND.blue : BRAND.cream }}>
              {isActive && <Check size={10} strokeWidth={4} className="text-white" />}
            </div>
          </div>
        );
      })}
    </div>
  );
});

const CustomerProfile = React.memo(({ user, onUpdateUser, onLogout, showToast }) => {
  const [formData, setFormData] = useState({ name: user.name, address: user.address, password: '' });
  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = () => {
    if (!formData.name.trim() || !formData.address.trim()) return showToast('Nhập đủ Tên và Địa chỉ', 'error');
    const updatedUser = { ...user, name: formData.name.trim(), address: formData.address.trim() };
    if (formData.password) {
      if (formData.password.length < 6) return showToast('Mật khẩu mới ít nhất 6 ký tự', 'error');
      updatedUser.password = hashPass(formData.password);
    }
    onUpdateUser(updatedUser);
    setFormData(prev => ({ ...prev, password: '' }));
  };

  return (
    <div className="p-6 animate-in fade-in pb-32">
      <h2 className="text-2xl font-black mb-6" style={{ color: BRAND.blue }}>Hồ sơ cá nhân</h2>
      <div className="bg-white p-6 rounded-3xl shadow-sm flex flex-col items-center mb-6 text-center">
        <PatLogo className="text-5xl mb-4" />
        <h3 className="font-black text-lg" style={{ color: BRAND.blue }}>{user.name}</h3>
        <p className="text-sm font-bold opacity-60 mt-1" style={{ color: BRAND.blue }}>{user.phone}</p>
        <div className="mt-4 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm text-white" style={{ backgroundColor: BRAND.brown }}>
           <Award size={18}/><span className="font-bold text-sm">Điểm thưởng: {user.points || 0}</span>
        </div>
      </div>
      <div className="space-y-4 bg-white p-6 rounded-3xl shadow-sm mb-8">
        <div>
          <label className="text-xs font-black uppercase block opacity-50" style={{ color: BRAND.blue }}>Tên hiển thị</label>
          <input name="name" value={formData.name} onChange={handleChange} className="w-full mt-2 p-3 bg-gray-50 rounded-xl font-bold text-sm focus:outline-none" style={{ color: BRAND.blue }} />
        </div>
        <div>
          <label className="text-xs font-black uppercase block opacity-50" style={{ color: BRAND.blue }}>Địa chỉ nhận hàng</label>
          <input name="address" value={formData.address} onChange={handleChange} className="w-full mt-2 p-3 bg-gray-50 rounded-xl font-bold text-sm focus:outline-none" style={{ color: BRAND.blue }} />
        </div>
        <div>
          <label className="text-xs font-black uppercase block opacity-50" style={{ color: BRAND.blue }}>Đổi mật khẩu</label>
          <input name="password" type="password" placeholder="Bỏ trống nếu không đổi" value={formData.password} onChange={handleChange} className="w-full mt-2 p-3 bg-gray-50 rounded-xl font-bold text-sm focus:outline-none" style={{ color: BRAND.blue }} />
        </div>
        <button onClick={handleSave} className="w-full mt-4 py-4 rounded-full font-black text-white shadow-md active:scale-95 transition-transform" style={{ backgroundColor: BRAND.blue }}>Lưu Thay Đổi</button>
      </div>
      <button onClick={onLogout} className="w-full py-4 rounded-full font-black text-white active:scale-95 flex justify-center gap-2 shadow-md bg-red-500"><LogOut size={20}/> Đăng Xuất</button>
    </div>
  );
});

// ==========================================
// 3. ADMIN APP
// ==========================================
const AdminApp = React.memo(({ user, orders, menu, toppings, setMenu, setToppings, updateOrderStatus, onLogout, showToast }) => {
  const [tab, setTab] = useState('orders'); 
  const [targetPhone, setTargetPhone] = useState('');
  const [selectedForDelivery, setSelectedForDelivery] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const shippers = useMemo(() => {
    const uDB = JSON.parse(localStorage.getItem('coffee_users') || '{}');
    return Object.values(uDB).filter(u => u.role === 'shipper');
  }, [tab]);

  const activeOrders = useMemo(() => orders.filter(o => o.status === 'pending' || o.status === 'making').sort((a,b) => a.createdAt - b.createdAt), [orders]);
  
  const groupedActiveOrders = useMemo(() => {
    const groups = {};
    activeOrders.forEach(o => {
      if (!groups[o.customerPhone]) groups[o.customerPhone] = { name: o.customerName, address: o.customerAddress, orders: [] };
      groups[o.customerPhone].orders.push(o);
    });
    return groups;
  }, [activeOrders]);

  const stats = useMemo(() => {
    const today = new Date().toLocaleDateString('vi-VN');
    const todayDone = orders.filter(o => o.status === 'done' && new Date(o.deliveredAt || o.createdAt).toLocaleDateString('vi-VN') === today);
    return { revenue: todayDone.reduce((sum, o) => sum + o.total, 0), count: todayDone.length, orders: todayDone }
  }, [orders]);

  const toggleOrderSelection = useCallback((id) => { setSelectedForDelivery(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]); }, []);

  const assignOrdersToShipper = useCallback((shipperPhone, shipperName) => {
    selectedForDelivery.forEach(id => updateOrderStatus(id, 'shipping', { shipperPhone }));
    setSelectedForDelivery([]);
    setShowAssignModal(false);
    showToast(`Đã giao ${selectedForDelivery.length} đơn cho ${shipperName}!`, 'success');
  }, [selectedForDelivery, updateOrderStatus, showToast]);

  const handleGrantShipper = useCallback(() => {
    if (!/^0\d{9}$/.test(targetPhone)) return showToast('SĐT không hợp lệ', 'error');
    const db = JSON.parse(localStorage.getItem('coffee_users') || '{}');
    if (!db[targetPhone]) return showToast('Tài khoản không tồn tại', 'error');
    if (db[targetPhone].role === 'shipper') return showToast('Đã là Shipper rồi', 'info');

    db[targetPhone].role = 'shipper';
    localStorage.setItem('coffee_users', JSON.stringify(db));
    showToast(`Đã cấp quyền Shipper cho ${db[targetPhone].name}`, 'success');
    setTargetPhone('');
  }, [targetPhone, showToast]);

  return (
    <div style={{ backgroundColor: BRAND.cream }} className="min-h-screen flex flex-col">
      <header className="text-white p-6 shrink-0 z-20 flex justify-between items-center shadow-lg rounded-b-3xl sticky top-0" style={{ backgroundColor: BRAND.blue }}>
        <div><h1 className="font-serif font-black text-2xl tracking-wide">Quản Lý Trạm</h1><p className="text-[10px] font-bold uppercase mt-1 opacity-70">Admin Dashboard</p></div>
        <button onClick={onLogout} className="bg-white/20 p-2.5 rounded-full hover:bg-white/30"><LogOut size={20}/></button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 pb-36 no-scrollbar">
        {tab === 'orders' && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="font-black text-lg flex items-center gap-2 mb-4" style={{ color: BRAND.blue }}><ClipboardList size={22}/> Đơn chờ xử lý</h2>
            
            {Object.entries(groupedActiveOrders).map(([phone, group]) => (
              <div key={phone} className="mb-8">
                <div className="flex items-center gap-2 mb-4 pl-1">
                  <div className="w-2 h-6 rounded-full" style={{ backgroundColor: BRAND.brown }}></div>
                  <h3 className="font-black text-lg" style={{ color: BRAND.blue }}>Khách: {group.name}</h3>
                  <span className="text-sm font-bold opacity-60 ml-1" style={{ color: BRAND.blue }}>({phone})</span>
                </div>
                
                <div className="space-y-4 pl-3 border-l-2" style={{ borderColor: 'rgba(43, 70, 115, 0.1)' }}>
                  {group.orders.map((o, index) => (
                    <div key={o.id} className={`bg-white rounded-3xl p-5 shadow-sm border-2 transition-all`} style={{ borderColor: selectedForDelivery.includes(o.id) ? BRAND.blue : 'transparent' }}>
                      <div className="flex justify-between items-center border-b pb-3 mb-3 border-gray-100">
                        <div className="flex items-center gap-3">
                          {o.status === 'making' && (
                            <div onClick={() => toggleOrderSelection(o.id)} className={`w-6 h-6 rounded-md border-2 flex items-center justify-center cursor-pointer`} style={{ backgroundColor: selectedForDelivery.includes(o.id) ? BRAND.blue : 'transparent', borderColor: selectedForDelivery.includes(o.id) ? BRAND.blue : 'rgba(43,70,115,0.2)' }}>
                              <Check size={16} strokeWidth={3} className="text-white" />
                            </div>
                          )}
                          <h4 className="font-black text-lg" style={{ color: BRAND.blue }}>
                            {group.orders.length > 1 ? `Đơn ${index + 1}` : 'Đơn hàng'}
                            <span className="text-[11px] font-bold ml-2 bg-gray-100 px-2 py-1 rounded-full">{new Date(o.createdAt).toLocaleTimeString('vi-VN')}</span>
                          </h4>
                        </div>
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase text-white`} style={{ backgroundColor: o.status === 'pending' ? '#ef4444' : BRAND.brown }}>
                          {o.status === 'pending' ? 'Chờ Nhận' : 'Đang Pha'}
                        </span>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        {o.items.map((i, idx) => (
                          <OrderItem key={idx} item={i} />
                        ))}
                      </div>
                      
                      {o.status === 'pending' && <button onClick={()=>updateOrderStatus(o.id, 'making')} className="w-full py-3 text-white font-black rounded-xl active:scale-95 shadow-md" style={{ backgroundColor: BRAND.blue }}>Nhận Đơn Này</button>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {Object.keys(groupedActiveOrders).length === 0 && <div className="text-center opacity-50 py-12" style={{ color: BRAND.blue }}><CheckCircle size={48} className="mx-auto mb-4"/><p className="font-bold">Tuyệt vời, không có đơn ùn tắc!</p></div>}
          </div>
        )}

        {tab === 'inventory' && (
          <div className="space-y-6 animate-in fade-in">
             <h2 className="font-black text-lg flex items-center gap-2" style={{ color: BRAND.blue }}><PackageOpen size={22}/> Quản lý Tồn kho</h2>
             <div className="space-y-3">
               <h3 className="font-black uppercase text-xs ml-2 mt-4 opacity-50" style={{ color: BRAND.blue }}>Menu Nước</h3>
               {menu.map(item => (
                 <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between mb-3">
                    <div>
                       <p className={`font-black ${item.inStock ? '' : 'opacity-40 line-through'}`} style={{ color: BRAND.blue }}>{item.name}</p>
                       <p className="text-xs font-black mt-1" style={{ color: BRAND.brown }}>{formatVND(item.prices.VUA)} - {formatVND(item.prices.SIEUTO)}</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors shrink-0`} style={{ backgroundColor: item.inStock ? BRAND.blue : 'rgba(0,0,0,0.1)' }} onClick={() => setMenu(prev => prev.map(m => m.id === item.id ? { ...m, inStock: !m.inStock } : m))}>
                       <div className={`w-4 h-4 bg-white rounded-full transition-transform ${item.inStock ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </div>
                 </div>
               ))}
               <h3 className="font-black uppercase text-xs ml-2 mt-6 opacity-50" style={{ color: BRAND.blue }}>Topping</h3>
               {toppings.map(item => (
                 <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between mb-3">
                    <div><p className={`font-black ${item.inStock ? '' : 'opacity-40 line-through'}`} style={{ color: BRAND.blue }}>{item.name}</p><p className="text-xs font-black opacity-60 mt-1" style={{ color: BRAND.blue }}>+{formatVND(item.price)}</p></div>
                    <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors`} style={{ backgroundColor: item.inStock ? BRAND.blue : 'rgba(0,0,0,0.1)' }} onClick={() => setToppings(prev => prev.map(t => t.id === item.id ? { ...t, inStock: !t.inStock } : t))}>
                       <div className={`w-4 h-4 bg-white rounded-full transition-transform ${item.inStock ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        )}
        
        {tab === 'personnel' && (
          <div className="space-y-6 animate-in fade-in">
             <h2 className="font-black text-lg flex items-center gap-2" style={{ color: BRAND.blue }}><Users size={22}/> Quản lý Nhân sự</h2>
             <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h3 className="font-black mb-2" style={{ color: BRAND.blue }}>Thêm Shipper Mới</h3>
                <p className="text-xs opacity-60 mb-5 leading-relaxed" style={{ color: BRAND.blue }}>Nhập SĐT tài khoản đã đăng ký trên hệ thống để cấp quyền Shipper.</p>
                <div className="relative mb-4">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" size={18} style={{ color: BRAND.blue }} />
                  <input type="tel" placeholder="Nhập số điện thoại..." className="w-full pl-11 pr-4 py-3.5 bg-gray-50 rounded-xl focus:outline-none font-bold text-sm" style={{ color: BRAND.blue }} value={targetPhone} onChange={e=>setTargetPhone(e.target.value)} />
                </div>
                <button onClick={handleGrantShipper} className="w-full py-3.5 text-white font-black rounded-xl active:scale-95 shadow-md" style={{ backgroundColor: BRAND.blue }}>Cấp quyền</button>
             </div>

             <div>
                <h3 className="font-black text-sm uppercase mb-4 pl-2 flex items-center gap-2" style={{ color: BRAND.blue }}><Truck size={16}/> Danh sách Shipper ({shippers.length})</h3>
                <div className="space-y-3">
                  {shippers.map((shipper, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4">
                       <div className="w-10 h-10 text-white rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: BRAND.brown }}><User size={20} /></div>
                       <div><p className="font-black text-sm" style={{ color: BRAND.blue }}>{shipper.name}</p><p className="text-xs font-bold opacity-60 mt-0.5" style={{ color: BRAND.blue }}>{shipper.phone}</p></div>
                    </div>
                  ))}
                  {shippers.length === 0 && <p className="text-sm opacity-50 pl-2" style={{ color: BRAND.blue }}>Chưa có Shipper nào.</p>}
                </div>
             </div>
          </div>
        )}

        {tab === 'history' && (
          <div className="space-y-6 animate-in fade-in">
             <h2 className="font-black text-lg flex items-center gap-2" style={{ color: BRAND.blue }}><BarChart3 size={22}/> Báo Cáo Doanh Thu (Hôm nay)</h2>
             <div className="flex gap-4 mb-4">
                <div className="flex-1 bg-white p-5 rounded-3xl shadow-sm border-2 border-transparent">
                   <p className="text-xs font-bold opacity-60 uppercase mb-1" style={{ color: BRAND.blue }}>Tổng thu</p>
                   <p className="text-xl font-black" style={{ color: BRAND.brown }}>{formatVND(stats.revenue)}</p>
                </div>
                <div className="bg-white p-5 rounded-3xl shadow-sm border-2 border-transparent text-center">
                   <p className="text-xs font-bold opacity-60 uppercase mb-1" style={{ color: BRAND.blue }}>Số đơn</p>
                   <p className="text-xl font-black" style={{ color: BRAND.blue }}>{stats.count}</p>
                </div>
             </div>
             
             <h3 className="font-black uppercase text-xs ml-2 mb-2 opacity-50" style={{ color: BRAND.blue }}>Chi tiết đơn đã giao</h3>
             {stats.orders.map(o => (
                <div key={o.id} className="bg-white p-4 rounded-2xl shadow-sm mb-3">
                   <div className="flex justify-between items-center mb-2 border-b border-gray-100 pb-2">
                      <span className="font-black" style={{ color: BRAND.blue }}>#{o.customerPhone.slice(-3)}</span>
                      <span className="font-black text-sm" style={{ color: BRAND.brown }}>{formatVND(o.total)}</span>
                   </div>
                   <div className="space-y-1 mt-2 text-xs font-bold opacity-70" style={{ color: BRAND.blue }}>
                      <p><Clock size={12} className="inline mr-1"/> Đặt lúc: {new Date(o.createdAt).toLocaleTimeString('vi-VN')}</p>
                      <p className="text-green-600"><CheckCircle size={12} className="inline mr-1"/> Giao lúc: {new Date(o.deliveredAt).toLocaleTimeString('vi-VN')}</p>
                   </div>
                </div>
             ))}
             {stats.orders.length === 0 && <p className="text-sm font-bold opacity-50 ml-2" style={{ color: BRAND.blue }}>Hôm nay chưa có đơn nào hoàn thành.</p>}
          </div>
        )}

      </div>

      {tab === 'orders' && selectedForDelivery.length > 0 && (
        <div className="absolute bottom-[72px] left-0 right-0 p-4 pointer-events-none z-30 animate-in slide-in-from-bottom-10">
          <button onClick={() => setShowAssignModal(true)} className="w-full pointer-events-auto text-white py-4 rounded-full font-black shadow-xl flex items-center justify-center gap-2 text-lg active:scale-95" style={{ backgroundColor: BRAND.brown }}>Giao {selectedForDelivery.length} Đơn <ArrowRight size={20}/></button>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none z-40">
        <div className="w-full bg-white border-t flex justify-around p-2 pb-safe-bottom shadow-xl pointer-events-auto border-gray-100 rounded-t-3xl">
          <button onClick={()=>setTab('orders')} className={`flex flex-col items-center py-2 px-4 rounded-2xl ${tab==='orders'?'':'opacity-40'}`} style={{ color: BRAND.blue }}><ClipboardList size={22}/><span className="text-[10px] font-black mt-1">Đơn</span></button>
          <button onClick={()=>setTab('inventory')} className={`flex flex-col items-center py-2 px-4 rounded-2xl ${tab==='inventory'?'':'opacity-40'}`} style={{ color: BRAND.blue }}><PackageOpen size={22}/><span className="text-[10px] font-black mt-1">Kho</span></button>
          <button onClick={()=>setTab('personnel')} className={`flex flex-col items-center py-2 px-4 rounded-2xl ${tab==='personnel'?'':'opacity-40'}`} style={{ color: BRAND.blue }}><Users size={22}/><span className="text-[10px] font-black mt-1">Nhân Sự</span></button>
          <button onClick={()=>setTab('history')} className={`flex flex-col items-center py-2 px-4 rounded-2xl ${tab==='history'?'':'opacity-40'}`} style={{ color: BRAND.blue }}><BarChart3 size={22}/><span className="text-[10px] font-black mt-1">Báo Cáo</span></button>
        </div>
      </div>

      {showAssignModal && (
        <div className="absolute inset-0 z-[100] flex justify-center items-end overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAssignModal(false)} />
          <div className="w-full max-h-[70%] bg-white rounded-t-[2.5rem] relative shadow-2xl flex flex-col animate-in slide-in-from-bottom-full">
             <div className="p-6 border-b flex justify-between items-center border-gray-100 bg-gray-50 rounded-t-[2.5rem]">
               <div><h3 className="font-black text-lg" style={{ color: BRAND.blue }}>Chọn Shipper</h3><p className="text-xs font-bold opacity-60 mt-1" style={{ color: BRAND.blue }}>Đang giao {selectedForDelivery.length} đơn</p></div>
               <button onClick={() => setShowAssignModal(false)} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center" style={{ color: BRAND.blue }}><X size={16}/></button>
             </div>
             <div className="overflow-y-auto p-4 space-y-3 pb-safe-bottom" style={{ backgroundColor: BRAND.cream }}>
               {shippers.map((s, idx) => (
                 <button key={idx} onClick={() => assignOrdersToShipper(s.phone, s.name)} className="w-full bg-white border-2 border-transparent p-4 rounded-3xl flex items-center justify-between active:scale-95 shadow-sm hover:border-[#2B4673]/20">
                   <div className="flex gap-4"><div className="w-12 h-12 text-white rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: BRAND.blue }}><Truck size={24} /></div><div><p className="font-black text-left" style={{ color: BRAND.blue }}>{s.name}</p><p className="text-xs font-bold opacity-60 mt-0.5" style={{ color: BRAND.blue }}>{s.phone}</p></div></div>
                   <ChevronRight size={20} style={{ color: BRAND.blue }} className="opacity-40"/>
                 </button>
               ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
});

// ==========================================
// 4. SHIPPER APP (Styled)
// ==========================================
const ShipperApp = React.memo(({ user, orders, updateOrderStatus, onLogout, showToast }) => {
  const [tab, setTab] = useState('deliveries'); 
  const [session, setSession] = useState(() => JSON.parse(localStorage.getItem(`shipper_session_${user.phone}`)) || { active: false, start: null, logs: [] });
  const [deliveredCount, setDeliveredCount] = useState(() => parseInt(localStorage.getItem(`shipper_count_${user.phone}`)) || 0);

  useEffect(() => { localStorage.setItem(`shipper_session_${user.phone}`, JSON.stringify(session)); }, [session, user.phone]);
  useEffect(() => { localStorage.setItem(`shipper_count_${user.phone}`, deliveredCount.toString()); }, [deliveredCount, user.phone]);
  
  const groupedDeliveries = useMemo(() => {
    const pending = orders.filter(o => o.status === 'shipping' && o.shipperPhone === user.phone).sort((a,b) => a.createdAt - b.createdAt);
    const groups = {};
    pending.forEach(o => {
      if(!groups[o.customerAddress]) groups[o.customerAddress] = [];
      groups[o.customerAddress].push(o);
    });
    return groups;
  }, [orders, user.phone]);

  // TÍNH TOÁN LỊCH SỬ ĐƠN ĐÃ GIAO GẦN ĐÂY
  const completedOrders = useMemo(() => {
    return orders.filter(o => o.status === 'done' && o.shipperPhone === user.phone)
                 .sort((a, b) => (b.deliveredAt || 0) - (a.deliveredAt || 0));
  }, [orders, user.phone]);

  const callCustomer = useCallback((phone, name) => {
    showToast(`Đang kết nối gọi cho ${name}...`, 'info');
    setTimeout(() => { window.location.href = `tel:${phone}`; }, 1000);
  }, [showToast]);

  const toggleClock = () => {
    if (session.active) {
        const hrs = ((Date.now() - session.start) / 3600000).toFixed(2);
        setSession({ active: false, start: null, logs: [{ date: new Date().toLocaleDateString('vi-VN'), hrs: parseFloat(hrs) }, ...session.logs] });
        showToast('Đã chốt ca làm việc!', 'success');
    } else {
        setSession({ ...session, active: true, start: Date.now() });
        showToast('Điểm danh thành công!', 'success');
    }
  };

  const handleComplete = useCallback((id) => {
    updateOrderStatus(id, 'done', { deliveredAt: Date.now() });
    setDeliveredCount(p => p + 1);
  }, [updateOrderStatus]);

  const totalHours = session.logs.reduce((s, l) => s + l.hrs, 0).toFixed(1);

  return (
    <div style={{ backgroundColor: BRAND.cream }} className="min-h-screen flex flex-col">
      <header className="text-white p-6 rounded-b-[2rem] sticky top-0 z-20 shadow-xl shrink-0" style={{ backgroundColor: BRAND.blue }}>
        <div className="flex justify-between items-center mb-2">
          <div><h1 className="font-serif font-black text-2xl">Trạm Giao Hàng</h1><p className="text-sm font-bold mt-1 uppercase opacity-80">Shipper: {user.name}</p></div>
          <button onClick={onLogout} className="bg-white/20 p-2.5 rounded-full"><LogOut size={20}/></button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-28 no-scrollbar">
        {tab === 'deliveries' && (
          <>
            {Object.keys(groupedDeliveries).length === 0 && (
              <div className="text-center py-24 opacity-50" style={{ color: BRAND.blue }}>
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm"><CheckCircle size={40}/></div>
                <p className="font-black text-lg">Đã giao hết đơn.</p>
              </div>
            )}
            {Object.entries(groupedDeliveries).map(([address, addsOrders]) => (
              <div key={address} className="mb-8 animate-in fade-in">
                 <div className="flex items-center gap-2 mb-4 pl-2"><div className="w-2 h-6 rounded-full" style={{ backgroundColor: BRAND.brown }}></div><h2 className="font-black text-lg uppercase" style={{ color: BRAND.blue }}>{address} <span className="text-sm normal-case opacity-60">({addsOrders.length} đơn)</span></h2></div>
                 <div className="space-y-4">
                    {addsOrders.map(o => <ShipperOrderCard key={o.id} order={o} onCall={callCustomer} onComplete={() => handleComplete(o.id)} />)}
                 </div>
              </div>
            ))}
          </>
        )}

        {tab === 'history' && (
          <div className="space-y-6 animate-in fade-in">
             <div className="bg-white p-6 rounded-3xl shadow-sm text-center border-2 border-transparent">
                <h2 className="text-sm font-black uppercase opacity-50 mb-2" style={{ color: BRAND.blue }}>Tổng đơn đã giao</h2>
                <p className="text-6xl font-black mb-4" style={{ color: BRAND.brown }}>{deliveredCount}</p>
                <button onClick={() => { if(window.confirm('Reset dữ liệu tuần này?')) { setDeliveredCount(0); setSession({ active: false, start: null, logs: [] }); } }} className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-full">Reset Tuần Mới</button>
             </div>

             <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-transparent">
                <h2 className="text-lg font-black flex justify-between items-center mb-4" style={{ color: BRAND.blue }}>
                   <span className="flex items-center gap-2"><Clock size={20}/> Chấm Công</span>
                   <span className="text-sm" style={{ color: BRAND.brown }}>{totalHours}h</span>
                </h2>
                <div className={`p-4 rounded-2xl mb-4 text-center border-2 transition-colors`} style={{ borderColor: session.active ? '#10b981' : BRAND.cream, backgroundColor: session.active ? '#ecfdf5' : BRAND.cream }}>
                   <p className="text-xs font-black uppercase mb-1" style={{ color: BRAND.blue }}>Trạng thái</p>
                   <p className="font-black text-lg" style={{ color: session.active ? '#059669' : BRAND.blue }}>{session.active ? 'ĐANG LÀM VIỆC' : 'ĐANG NGHỈ NGƠI'}</p>
                   {session.active && <p className="text-xs font-bold opacity-60 mt-2" style={{ color: BRAND.blue }}>Vào ca: {new Date(session.start).toLocaleTimeString('vi-VN')}</p>}
                </div>
                <button onClick={toggleClock} className="w-full py-4 text-white font-black rounded-full active:scale-95 shadow-md" style={{ backgroundColor: session.active ? '#ef4444' : '#10b981' }}>
                   {session.active ? 'Xong Ngày (Chốt Ca)' : 'Điểm Danh'}
                </button>
             </div>
             
             {/* BỔ SUNG LẠI DANH SÁCH LỊCH SỬ GIAO HÀNG (HISTORY) */}
             <div>
                <h2 className="text-lg font-black flex justify-between items-center mb-4 mt-8" style={{ color: BRAND.blue }}>
                   <span className="flex items-center gap-2"><History size={20}/> Lịch sử đơn đã giao</span>
                   <span className="text-sm" style={{ color: BRAND.brown }}>{completedOrders.length} đơn</span>
                </h2>
                <div className="space-y-3">
                   {completedOrders.length === 0 ? (
                       <p className="text-sm opacity-50 text-center py-4" style={{ color: BRAND.blue }}>Gần đây chưa giao đơn nào.</p>
                   ) : (
                       completedOrders.map(o => (
                           <div key={o.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                               <div className="flex justify-between items-center mb-2 border-b border-gray-50 pb-2">
                                   <div>
                                       <span className="font-black block" style={{ color: BRAND.blue }}>#{o.customerPhone.slice(-3)} - {o.customerName}</span>
                                       <span className="text-[10px] font-bold opacity-50 block mt-0.5" style={{ color: BRAND.blue }}>{o.customerAddress}</span>
                                   </div>
                                   <span className="font-black text-sm" style={{ color: BRAND.brown }}>{formatVND(o.total)}</span>
                               </div>
                               <div className="text-[11px] font-bold opacity-70" style={{ color: BRAND.blue }}>
                                   <span className="text-green-600"><CheckCircle size={12} className="inline mr-1"/> Đã giao lúc: {new Date(o.deliveredAt).toLocaleString('vi-VN')}</span>
                               </div>
                           </div>
                       ))
                   )}
                </div>
             </div>

          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none z-30">
        <div className="w-full bg-white border-t flex justify-around p-2 pb-safe-bottom shadow-xl pointer-events-auto rounded-t-3xl">
          <button onClick={()=>setTab('deliveries')} className={`flex flex-col items-center py-2 px-10 rounded-2xl ${tab==='deliveries'?'':'opacity-40'}`} style={{ color: BRAND.blue }}><Box size={22}/><span className="text-[10px] font-black mt-1">Giao Hàng</span></button>
          <button onClick={()=>setTab('history')} className={`flex flex-col items-center py-2 px-10 rounded-2xl ${tab==='history'?'':'opacity-40'}`} style={{ color: BRAND.blue }}><ClipboardList size={22}/><span className="text-[10px] font-black mt-1">Lịch Sử</span></button>
        </div>
      </div>
    </div>
  );
});

// -----------------------------------------------------
// SHARED COMPONENTS 
// -----------------------------------------------------
const OrderItem = React.memo(({ item }) => (
  <div className="flex flex-col text-sm font-bold" style={{ color: BRAND.blue }}>
    <div className="flex justify-between">
      <span><strong className="mr-1" style={{ color: BRAND.brown }}>{item.qty}x</strong> {item.product.name} <span className="text-[10px] uppercase opacity-60">({item.sizeName.split(' ')[0]})</span></span>
      <span className="font-black">{formatVND(item.total)}</span>
    </div>
    {item.product.category !== 'Bánh' && <span className="text-[11px] font-bold opacity-60 ml-5 mt-1 block">Đá {item.ice}% - Đường {item.sugar}% {item.toppings.length > 0 ? ` - ${item.toppings.map(t=>t.name).join(', ')}` : ''}</span>}
  </div>
));

const ShipperOrderCard = React.memo(({ order, onCall, onComplete }) => {
  const longPressEvent = useLongPress(() => onCall(order.customerPhone, order.customerName), 600);
  const [showQR, setShowQR] = useState(false);
  const qrUrl = `https://img.vietqr.io/image/bidv-8818542021-compact2.png?amount=${order.total}&addInfo=${order.id}&accountName=Nguyen%20Huynh%20Minh%20Thu`;

  return (
    <div className="bg-white rounded-[2rem] p-2 shadow-sm relative">
      <div className="p-5">
        <div className="flex justify-between items-center mb-5 border-b pb-4 border-gray-100">
          <div><span className="font-black text-2xl tracking-wide block" style={{ color: BRAND.blue }}>#{order.customerPhone.slice(-3)}</span><span className="text-[10px] font-bold tracking-widest uppercase block mt-1 opacity-50" style={{ color: BRAND.blue }}>Mã: {order.id}</span></div>
          <span className="bg-gray-100 text-[11px] px-3 py-1.5 rounded-full font-bold flex gap-1.5" style={{ color: BRAND.blue }}><Clock size={14}/> {new Date(order.createdAt).toLocaleTimeString('vi-VN')}</span>
        </div>
        <div className="p-5 rounded-3xl mb-6 relative overflow-hidden" style={{ backgroundColor: BRAND.cream }}>
          <p className="font-black text-[17px] leading-snug mb-3" style={{ color: BRAND.blue }}>{order.customerAddress}</p>
          <button {...longPressEvent} className="w-full flex items-center justify-between text-white px-5 py-4 rounded-2xl active:scale-95 select-none touch-none shadow-md" style={{ backgroundColor: BRAND.blue }}>
            <div className="text-left"><p className="font-black text-sm">{order.customerName}</p><p className="text-xs font-bold opacity-70 mt-0.5">{order.customerPhone}</p></div>
            <div className="bg-white/20 px-3 py-2 rounded-xl flex items-center gap-2 text-xs font-bold"><PhoneCall size={14}/> Giữ gọi</div>
          </button>
        </div>
        <div className="mb-6 px-1 space-y-3">
          {order.items.map((i, idx) => <OrderItem key={idx} item={i} />)}
          <div className="border-t-2 border-dashed mt-5 pt-5 flex justify-between items-center border-gray-100"><span className="font-black uppercase text-[11px] opacity-50" style={{ color: BRAND.blue }}>Tổng thu</span><span className="font-black text-2xl" style={{ color: BRAND.brown }}>{formatVND(order.total)}</span></div>
        </div>
        
        {/* NÚT XEM QR CODE */}
        <div className="p-4 rounded-3xl flex items-center gap-4 mb-4 cursor-pointer active:scale-95 transition-transform" style={{ backgroundColor: BRAND.cream }} onClick={() => setShowQR(true)}>
          <div className="bg-white p-1.5 rounded-2xl shadow-sm shrink-0">
            <img src={qrUrl} className="w-16 h-16 object-contain rounded-xl" alt="QR" />
          </div>
          <div className="flex-1 text-[11px] font-bold opacity-80" style={{ color: BRAND.blue }}>
            Mã QR thanh toán tự động.<br/>
            <span className="font-black text-blue-500">Chạm để phóng to.</span>
          </div>
        </div>
      </div>
      <div className="px-2 pb-2"><SwipeToComplete onComplete={onComplete} /></div>

      {/* POPUP PHÓNG TO QR CODE */}
      {showQR && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6" onClick={() => setShowQR(false)}>
           <div className="bg-white p-6 rounded-[2rem] relative shadow-2xl flex flex-col items-center max-w-[320px] w-full animate-in zoom-in" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowQR(false)} className="absolute -top-4 -right-4 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-lg active:scale-95 border border-gray-100">
                <X size={20}/>
              </button>
              <h3 className="font-black text-lg mb-4 text-center" style={{color: BRAND.blue}}>Quét để thanh toán</h3>
              <img src={qrUrl} className="w-full h-auto object-contain rounded-xl shadow-inner border border-gray-100 p-2" alt="Full QR" />
              <div className="mt-5 text-center">
                <p className="text-sm font-bold opacity-60 uppercase tracking-widest" style={{color: BRAND.blue}}>Tổng số tiền:</p>
                <p className="font-black text-3xl mt-1" style={{color: BRAND.brown}}>{formatVND(order.total)}</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
});

const SwipeToComplete = React.memo(({ onComplete }) => {
  const [value, setValue] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(300);

  useEffect(() => { if(containerRef.current) setContainerWidth(containerRef.current.offsetWidth); }, []);

  const handlePointerDown = useCallback((e) => { setIsDragging(true); e.currentTarget.setPointerCapture(e.pointerId); }, []);
  const handlePointerMove = useCallback((e) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setValue(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
  }, [isDragging]);
  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    if (value > 85) { setValue(100); onComplete(); } else { setValue(0); }
  }, [value, onComplete]);

  return (
    <div ref={containerRef} className="relative h-16 rounded-[2rem] overflow-hidden touch-none shadow-inner select-none cursor-pointer" style={{ backgroundColor: BRAND.cream }} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp} onPointerLeave={handlePointerUp}>
      <div className="absolute left-0 top-0 h-full rounded-[2rem] pointer-events-none" style={{ backgroundColor: BRAND.brown, width: `${value}%`, transition: isDragging ? 'none' : 'width 0.3s ease-out' }} />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"><span className={`font-black text-[13px] uppercase tracking-wider transition-colors`} style={{ color: value > 50 ? 'white' : BRAND.blue, opacity: value > 50 ? 1 : 0.4 }}>{value > 85 ? 'Đã giao xong!' : 'Vuốt để xác nhận giao'}</span></div>
      <div className="absolute top-2 bottom-2 w-12 bg-white rounded-2xl shadow-md flex items-center justify-center pointer-events-none z-20" style={{ left: `4px`, transform: `translateX(${(value / 100) * (containerWidth - 56)}px)`, transition: isDragging ? 'none' : 'transform 0.3s ease-out' }}>
        <ChevronRight style={{ color: value > 50 ? BRAND.brown : BRAND.blue, opacity: value > 50 ? 1 : 0.4 }} strokeWidth={4} />
      </div>
      <style dangerouslySetInnerHTML={{__html: `.pb-safe-bottom { padding-bottom: env(safe-area-inset-bottom); } .animate-in { animation: fadeIn 0.3s ease-out forwards; } .fade-in { opacity: 0; } .zoom-in { animation: zoomIn 0.2s ease-out forwards; } .no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; } @keyframes fadeIn { to { opacity: 1; transform: translateY(0); } } @keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`}}/>
    </div>
  );
});
