'use client';

import OutgoCard from '@/app/(pages)/outgo/components/OutgoCard';
import type { GenderFilter, GradeFilter, OutgoCardData } from '@/app/(pages)/outgo/types';
import { useAtom } from 'jotai';
import type React from 'react';
import { useMemo } from 'react';
import { genderFilterAtom, gradeFilterAtom, statusFilterAtom } from './atom';

const MOCK_DATA: OutgoCardData[] = [
  // 1학년 남학생
  {
    type: 'pending',
    student: { grade: 1, class: 1, number: 1, name: '김철수', gender: 'male' },
    seat: 'A1',
    details: '자기계발외출 / 중식 취소 / 10:00~14:00',
  },
  {
    type: 'approved',
    student: { grade: 1, class: 2, number: 2, name: '이영호', gender: 'male' },
    seat: 'B2',
    details: '병원진료 / 석식 취소 / 13:00~18:00',
  },
  {
    type: 'rejected',
    student: { grade: 1, class: 3, number: 3, name: '박민준', gender: 'male' },
    seat: 'C3',
    details: '개인사정 / 중식 취소 / 11:30~15:30',
  },
  // 1학년 여학생
  {
    type: 'pending',
    student: { grade: 1, class: 4, number: 4, name: '최서연', gender: 'female' },
    seat: 'D4',
    details: '가족행사 / 중식,석식 취소 / 11:00~19:00',
  },
  {
    type: 'approved',
    student: { grade: 1, class: 5, number: 5, name: '정지은', gender: 'female' },
    seat: 'E5',
    details: '학원수업 / 석식 취소 / 16:00~20:00',
  },
  {
    type: 'rejected',
    student: { grade: 1, class: 6, number: 6, name: '강미나', gender: 'female' },
    seat: 'F6',
    details: '친구 생일 / 석식 취소 / 17:00~21:00',
  },
  // 2학년 남학생
  {
    type: 'pending',
    student: { grade: 2, class: 1, number: 7, name: '황준서', gender: 'male' },
    seat: 'G7',
    details: '진로탐색 / 중식 취소 / 09:30~13:30',
  },
  {
    type: 'approved',
    student: { grade: 2, class: 2, number: 8, name: '송태환', gender: 'male' },
    seat: 'H8',
    details: '대회참가 / 중식,석식 취소 / 08:00~20:00',
  },
  {
    type: 'rejected',
    student: { grade: 2, class: 3, number: 9, name: '임현우', gender: 'male' },
    seat: 'I9',
    details: '가족모임 / 석식 취소 / 16:30~21:30',
  },
  // 2학년 여학생
  {
    type: 'pending',
    student: { grade: 2, class: 4, number: 10, name: '신예은', gender: 'female' },
    seat: 'J10',
    details: '병원검진 / 중식 취소 / 10:30~14:30',
  },
  {
    type: 'approved',
    student: { grade: 2, class: 5, number: 11, name: '오지현', gender: 'female' },
    seat: 'K11',
    details: '봉사활동 / 석식 취소 / 15:00~19:00',
  },
  {
    type: 'rejected',
    student: { grade: 2, class: 6, number: 12, name: '윤서아', gender: 'female' },
    seat: 'L12',
    details: '개인사정 / 중식,석식 취소 / 11:00~18:00',
  },
  // 3학년 남학생
  {
    type: 'pending',
    student: { grade: 3, class: 1, number: 13, name: '장동훈', gender: 'male' },
    seat: 'M13',
    details: '입시설명회 / 석식 취소 / 16:00~20:00',
  },
  {
    type: 'approved',
    student: { grade: 3, class: 2, number: 14, name: '권형준', gender: 'male' },
    seat: 'N14',
    details: '학원상담 / 중식 취소 / 11:30~15:30',
  },
  {
    type: 'rejected',
    student: { grade: 3, class: 3, number: 15, name: '조민재', gender: 'male' },
    seat: 'O15',
    details: '친구약속 / 석식 취소 / 17:30~21:30',
  },
  // 3학년 여학생
  {
    type: 'pending',
    student: { grade: 3, class: 4, number: 16, name: '한소희', gender: 'female' },
    seat: 'P16',
    details: '면접준비 / 중식,석식 취소 / 10:00~18:00',
  },
  {
    type: 'approved',
    student: { grade: 3, class: 5, number: 17, name: '배지원', gender: 'female' },
    seat: 'Q17',
    details: '대학탐방 / 중식,석식 취소 / 09:00~17:00',
  },
  {
    type: 'rejected',
    student: { grade: 3, class: 6, number: 18, name: '류하은', gender: 'female' },
    seat: 'R18',
    details: '가족여행 / 중식,석식 취소 / 08:00~22:00',
  },
];

const sortOutgoRequests = (data: OutgoCardData[]): OutgoCardData[] => {
  const sortOrder = { pending: 0, rejected: 1, approved: 2 };
  return [...data].sort((a, b) => sortOrder[a.type] - sortOrder[b.type]);
};

export default function Outgo() {
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
    return sortOutgoRequests(filteredData);
  }, [activeGrade, activeGender, isPendingActive]);

  return (
    <div className="w-full rounded-radius-600 bg-background-standard-primary p-spacing-600 flex flex-col gap-spacing-700">
      <div className="flex flex-col gap-spacing-400">
        <strong className="text-heading">잔류 외출 신청자 목록</strong>
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
          <OutgoCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
