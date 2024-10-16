import type { MenuBarItem } from '@/types/components/MenuBarTypes';
import { atom } from 'jotai';

export const MenubarAtom = atom<MenuBarItem>('잔류');
