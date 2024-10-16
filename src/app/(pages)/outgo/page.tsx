import OutgoCard from '@/app/(pages)/outgo/components/OutgoCard';
import type { OutgoCardData } from '@/app/(pages)/outgo/types';
import React from 'react';

export default function Outgo() {
  const cardData: OutgoCardData[] = [
    {
      type: 'pending',
      studentId: '2610',
      name: '서승표',
      status: '미선택',
      details: '자기계발외출 / 중식 취소 / 10:20~14:00',
    },
    {
      type: 'approved',
      studentId: '2610',
      name: '서승표',
      status: '미선택',
      details: '자기계발외출 / 중식 취소 / 10:20~14:00',
    },
    {
      type: 'rejected',
      studentId: '2610',
      name: '서승표',
      status: '미선택',
      details: '자기계발외출 / 중식 취소 / 10:20~14:00',
    },
  ];

  return (
    <div className="w-full rounded-radius-600 bg-background-standard-primary p-spacing-600 flex flex-col gap-spacing-700">
      <div className="flex flex-col gap-spacing-400">
        <strong className="text-heading">잔류 외출 신청자 목록</strong>
        <div className="flex flex-row items-center gap-spacing-600">
          <div className="flex flex-row gap-spacing-400">
            <span>1학년</span>
            <strong className="text-core-accent">2학년</strong>
            <span>3학년</span>
          </div>
          <span>|</span>
          <div className="flex flex-row gap-spacing-400">
            <strong className="text-core-accent">남학생</strong>
            <span>여학생</span>
          </div>
          <span>|</span>
          <strong className="text-core-accent">대기중만 보기</strong>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-spacing-400">
        {cardData.map((card, index) => (
          <OutgoCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
