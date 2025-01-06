'use client';

import { Home, CalendarDays, Users, Utensils, Settings, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Reservations', href: '/reservations', icon: CalendarDays },
  { name: 'Customers', href: '/customers', icon: Users },
  { 
    name: 'Menu', 
    icon: Utensils,
    submenu: [
      { name: 'Starters', href: '/menu/starters' },
      { name: 'Main Courses', href: '/menu/main-courses' },
    ],
  },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuToggle = (name: string) => {
    if (name === 'Menu') {
      setOpenMenu((prev) => !prev);
    } else {
      setOpenMenu(false); // Close submenu when other items are clicked
    }
  };

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white/10 backdrop-blur-lg border-r border-white/20">
      <div className="flex flex-col h-full">
        <div className="flex h-25  items-center border-b border-white/20">
          {/* <h1 className="text-xl font-semibold text-white">Restaurant</h1> */}
          <img src="/images/x4.png" alt="Logo" className="p-2 h-40 m-auto" />

          {/* <img src="../../lib/images/restaurant-logo.svg" alt="Logo" className="h-8 w-8 ml-auto" /> */}
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || item.submenu?.some((sub) => pathname === sub.href);

            if (!item.submenu) {
              // Normal navigation link (e.g., Dashboard)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => handleMenuToggle(item.name)}
                  className={cn(
                    'flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            }

            // Menu item with submenu
            return (
              <div key={item.name} className="space-y-1">
                <button
                  onClick={() => handleMenuToggle(item.name)}
                  className={cn(
                    'flex items-center w-full px-2 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                  {item.submenu && <ChevronDown className="ml-auto h-4 w-4" />}
                </button>
                {item.submenu && openMenu && item.name === 'Menu' && (
                  <div className="pl-8 space-y-1">
                    {item.submenu.map((submenu) => (
                      <Link
                        key={submenu.name}
                        href={submenu.href}
                        className={cn(
                          'block px-2 py-2 text-sm font-medium rounded-md transition-colors',
                          pathname === submenu.href
                            ? 'bg-white/20 text-white'
                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                        )}
                      >
                        {submenu.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
