import type { Grade } from '@/app/(pages)/stay/types';
import { atom } from 'jotai';

export const GradeFilterAtom = atom<Grade>('a');
