import type { MenuBarItem } from '@/types/components/MenuBarTypes';
import { atom } from 'jotai';

export const selectedMenuItemAtom = atom<MenuBarItem>('잔류');
