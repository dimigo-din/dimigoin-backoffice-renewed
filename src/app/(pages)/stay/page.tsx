'use client';

import { GradeFilterAtom } from '@/app/(pages)/stay/atom';
import type { Gender, Grade } from '@/app/(pages)/stay/types';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import type React from 'react';
import { MaterialSymbol } from 'react-material-symbols';

const getStayData = async () => {
  // const res = axios;
};

export default function Stay() {
  const [gradeFilter, setGradeFilter] = useAtom(GradeFilterAtom);
  const { data: stayData, isLoading: isStayLoading } = useQuery({
    queryKey: ['stayData'],
    queryFn: getStayData,
  });

  const FilterButton: React.FC<{
    value: Grade | 'pending';
    onClick: () => void;
    label: string;
    isActive: boolean;
  }> = ({ onClick, label, isActive }) => (
    <button
      type="button"
      className={isActive ? 'text-core-accent font-bold' : 'text-content-standard -primary'}
      onClick={onClick}>
      {label}
    </button>
  );

  return (
    <div className="w-full flex flex-col gap-spacing-600 overflow-auto">
      <div className="w-full flex flex-row gap-spacing-600 h-[400px]">
        <div className="w-full rounded-radius-600 bg-background-standard-primary p-spacing-600 flex flex-col gap-spacing-700 overflow-auto">
          <div className="flex flex-col gap-spacing-400">
            <strong className="text-heading">잔류 신청자 검색</strong>
            <form className="px-spacing-400 py-spacing-300 flex flex-row bg-background-standard-primary border border-line-outline rounded-radius-400 justify-between">
              <input
                type="text"
                className="text-body text-content-standard-tertiary w-full outline-none bg-transparent"
                placeholder="잔류 신청자를 검색해주세요."
              />
              <button type={'submit'} className="flex justify-center items-center">
                <MaterialSymbol className="text-content-standard-primary" icon={'search'} size={24} weight={300} />
              </button>
            </form>
          </div>
          <div className="flex flex-col gap" />
        </div>
        <div className="w-full rounded-radius-600 bg-background-standard-primary p-spacing-600 flex flex-col gap-spacing-700 overflow-auto">
          <div className="flex flex-col gap-spacing-400">
            <strong className="text-heading">잔류 신청자 목록</strong>
            <div className="flex flex-row gap-spacing-400">
              {(['a', '1', '2', '3'] as const).map((grade) => (
                <FilterButton
                  key={grade}
                  value={grade}
                  onClick={() => setGradeFilter((prev) => (prev === grade ? null : grade))}
                  label={grade === 'a' ? '모두' : `${grade}학년`}
                  isActive={gradeFilter === grade}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-spacing-400 bg-background-standard-secondary rounded-radius-400 px-spacing-700 py-spacing-550">
            asdf
          </div>
        </div>
      </div>
      <div className="w-full rounded-radius-600 bg-background-standard-primary p-spacing-600 flex flex-col gap-spacing-700 overflow-auto">
        <strong className="text-heading">잔류 좌석 현황</strong>
        <div className="flex flex-col gap-spacing-400 bg-background-standard-secondary rounded-radius-400 px-spacing-700 py-spacing-550">
          asdf
        </div>
      </div>
    </div>
  );
}
