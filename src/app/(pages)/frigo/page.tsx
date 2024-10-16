'use client';

import FrigoCard from '@/app/(pages)/frigo/components/FrigoCard';
import type { FrigoCardData, GenderFilter, GradeFilter } from '@/app/(pages)/frigo/types';
import { useAtom } from 'jotai';
import type React from 'react';
import { useMemo } from 'react';
import { genderFilterAtom, gradeFilterAtom, statusFilterAtom } from './atom';

const MOCK_DATA: FrigoCardData[] = [
  // 1학년 남학생
  {
    type: 'pending',
    student: { grade: 1, class: 1, number: 1, name: '김철수', gender: 'male' },
    details: '학원 수강 / 야자 1타임 후',
  },
  {
    type: 'approved',
    student: { grade: 1, class: 2, number: 2, name: '이영호', gender: 'male' },
    details: '가족 행사 / 야자 2타임 후',
  },
  // 1학년 여학생
  {
    type: 'pending',
    student: { grade: 1, class: 3, number: 3, name: '박지은', gender: 'female' },
    details: '병원 진료 / 야자 1타임 후',
  },
  {
    type: 'rejected',
    student: { grade: 1, class: 4, number: 4, name: '최수영', gender: 'female' },
    details: '개인 사정 / 야자 2타임 후',
  },
  // 2학년 남학생
  {
    type: 'approved',
    student: { grade: 2, class: 1, number: 5, name: '정민우', gender: 'male' },
    details: '학원 수강 / 야자 1타임 후',
  },
  {
    type: 'pending',
    student: { grade: 2, class: 2, number: 6, name: '강동훈', gender: 'male' },
    details: '가족 모임 / 야자 2타임 후',
  },
  // 2학년 여학생
  {
    type: 'rejected',
    student: { grade: 2, class: 3, number: 7, name: '이지현', gender: 'female' },
    details: '학원 상담 / 야자 1타임 후',
  },
  {
    type: 'approved',
    student: { grade: 2, class: 4, number: 8, name: '송미나', gender: 'female' },
    details: '병원 검진 / 야자 2타임 후',
  },
  // 3학년 남학생
  {
    type: 'pending',
    student: { grade: 3, class: 1, number: 9, name: '홍길동', gender: 'male' },
    details: '입시 상담 / 야자 1타임 후',
  },
  {
    type: 'approved',
    student: { grade: 3, class: 2, number: 10, name: '서승표', gender: 'male' },
    details: '학원 수강 / 야자 1타임 후',
  },
  // 3학년 여학생
  {
    type: 'rejected',
    student: { grade: 3, class: 3, number: 11, name: '김영희', gender: 'female' },
    details: '가족 행사 / 야자 2타임 후',
  },
  {
    type: 'pending',
    student: { grade: 3, class: 4, number: 12, name: '이슬기', gender: 'female' },
    details: '학원 수강 / 야자 1타임 후',
  },
];

const sortFrigoRequests = (data: FrigoCardData[]): FrigoCardData[] => {
  const sortOrder = { pending: 0, rejected: 1, approved: 2 };
  return [...data].sort((a, b) => sortOrder[a.type] - sortOrder[b.type]);
};

export default function Frigo() {
  const [activeGrade, setActiveGrade] = useAtom(gradeFilterAtom);
  const [activeGender, setActiveGender] = useAtom(genderFilterAtom);
  const [isPendingActive, setIsPendingActive] = useAtom(statusFilterAtom);

  const FilterButton: React.FC<{
    value: GradeFilter | GenderFilter | 'pending';
    onClick: () => void;
    label: string;
    isActive: boolean;
  }> = ({ onClick, label, isActive }) => (
    <button
      type="button"
      className={isActive ? 'text-core-accent font-bold' : 'text-content-standard-primary'}
      onClick={onClick}>
      {label}
    </button>
  );

  const filteredAndSortedData = useMemo(() => {
    const filteredData = MOCK_DATA.filter((card) => {
      const gradeMatch = activeGrade === null || card.student.grade.toString() === activeGrade;
      const genderMatch = activeGender === null || card.student.gender === activeGender;
      const statusMatch = !isPendingActive || card.type === 'pending';
      return gradeMatch && genderMatch && statusMatch;
    });
    return sortFrigoRequests(filteredData);
  }, [activeGrade, activeGender, isPendingActive]);

  return (
    <div className="w-full rounded-radius-600 bg-background-standard-primary p-spacing-600 flex flex-col gap-spacing-700">
      <div className="flex flex-col gap-spacing-400">
        <strong className="text-heading">금요귀가 신청자 목록</strong>
        <div className="flex flex-row items-center gap-spacing-600">
          <div className="flex flex-row gap-spacing-400">
            {(['1', '2', '3'] as const).map((grade) => (
              <FilterButton
                key={grade}
                value={grade}
                onClick={() => setActiveGrade((prev) => (prev === grade ? null : grade))}
                label={`${grade}학년`}
                isActive={activeGrade === grade}
              />
            ))}
          </div>
          <span>|</span>
          <div className="flex flex-row gap-spacing-400">
            {(['male', 'female'] as const).map((gender) => (
              <FilterButton
                key={gender}
                value={gender}
                onClick={() => setActiveGender((prev) => (prev === gender ? null : gender))}
                label={gender === 'male' ? '남학생' : '여학생'}
                isActive={activeGender === gender}
              />
            ))}
          </div>
          <span>|</span>
          <FilterButton
            value="pending"
            onClick={() => setIsPendingActive((prev) => !prev)}
            label="대기중만 보기"
            isActive={isPendingActive}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-spacing-400 overflow-auto">
        {filteredAndSortedData.map((card, index) => (
          <FrigoCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
