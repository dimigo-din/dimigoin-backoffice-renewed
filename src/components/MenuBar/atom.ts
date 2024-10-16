import type { MenuBarItem } from '@/components/MenuBar/types';
import { atom } from 'jotai';

export const MenubarAtom = atom<MenuBarItem>('잔류');
