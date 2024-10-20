'use client';

import { IsLoginedAtom, MenubarAtom } from '@/components/MenuBar/atom';
import type { MenuItemProps } from '@/components/MenuBar/types';
import { logout } from '@/lib/api/auth';
import * as cookie from '@/lib/cookie';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';
import { MaterialSymbol } from 'react-material-symbols';

const menuItems: MenuItemProps[] = [
  { icon: 'home', label: '메인', href: '/' },
  { icon: 'school', label: '잔류', href: '/stay' },
  { icon: 'forest', label: '잔류 외출', href: '/outgo' },
  { icon: 'door_open', label: '금요귀가', href: '/frigo' },
  { icon: 'local_laundry_service', label: '세탁', href: '/laundry' },
  { icon: 'artist', label: '기상송', href: '/song' },
];

const MenuItem = React.memo(({ icon, label, href }: MenuItemProps) => {
  const pathname = usePathname();
  const isSelected = pathname === href;

  return (
    <Link href={href} passHref>
      <div
        className={`flex flex-row items-center gap-spacing-400 cursor-pointer py-spacing-400 ${
          isSelected ? 'text-core-accent' : 'text-content-standard-quaternary'
        }`}>
        <MaterialSymbol icon={icon} size={24} weight={300} />
        <span className={isSelected ? 'font-bold' : ''}>{label}</span>
      </div>
    </Link>
  );
});

MenuItem.displayName = 'MenuItem';

export default function MenuBar() {
  const [, setSelectedMenuItem] = useAtom(MenubarAtom);
  const [isLogined, setIsLogined] = useAtom(IsLoginedAtom);
  const pathname = usePathname();

  const updateSelectedMenuItem = useCallback(() => {
    const currentMenuItem = menuItems.find((item) => item.href === pathname);
    if (currentMenuItem) {
      setSelectedMenuItem(currentMenuItem.label);
    }
  }, [pathname, setSelectedMenuItem]);

  useEffect(() => {
    updateSelectedMenuItem();
  }, [updateSelectedMenuItem]);

  useEffect(() => {
    if (cookie.get('token')) setIsLogined(true);
  }, [setIsLogined]);

  return (
    <>
      {isLogined ? (
        <div className="w-[240px] flex flex-col rounded-radius-600 bg-background-standard-primary p-spacing-600 justify-between overflow-hidden flex-shrink-0">
          <div className="flex flex-col gap-spacing-900">
            <div className="flex flex-col gap-spacing-550">
              <Link href="/">
                <Image src="/images/dimigoin_logo.svg" alt="dimigoin" width={24} height={24} draggable={false} />
              </Link>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-spacing-100 items-end">
                  <strong className="text-heading">김아이</strong>
                  <span className="text-body text-content-standard-tertiary">선생님</span>
                </div>
                <button type={'button'} onClick={() => logout()}>
                  <MaterialSymbol className="text-content-standard-secondary" icon="logout" size={24} weight={300} />
                </button>
              </div>
            </div>
            <nav className="flex flex-col">
              {menuItems.map((item) => (
                <MenuItem key={item.label} {...item} />
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
