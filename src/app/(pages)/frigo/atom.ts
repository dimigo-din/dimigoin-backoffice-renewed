import type { GenderFilter, GradeFilter } from '@/app/(pages)/frigo/types';
import { atom } from 'jotai';

export const gradeFilterAtom = atom<GradeFilter>('1');
export const genderFilterAtom = atom<GenderFilter>('male');
export const statusFilterAtom = atom<boolean>(true);
