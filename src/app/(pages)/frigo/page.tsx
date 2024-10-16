import FrigoCard from '@/app/(pages)/frigo/components/FrigoCard';
import type { FrigoCardData } from '@/app/(pages)/frigo/types';
import React from 'react';

export default function Frigo() {
  const cardData: FrigoCardData[] = [
    {
      type: 'pending',
      studentId: '2610',
      name: '서승표',
      status: '미선택',
      details: '학원 수강 / 야자 1타임 후',
    },
    {
      type: 'approved',
      studentId: '2610',
      name: '서승표',
      status: '미선택',
      details: '학원 수강 / 야자 1타임 후',
    },
    {
      type: 'rejected',
      studentId: '2610',
      name: '서승표',
      status: '미선택',
      details: '학원 수강 / 야자 1타임 후',
    },
  ];

  return (
    <div className="w-full rounded-radius-600 bg-background-standard-primary p-spacing-600 flex flex-col gap-spacing-700">
      <div className="flex flex-col gap-spacing-400">
        <strong className="text-heading">금요귀가 신청자 목록</strong>
        <div className="flex flex-row items-center gap-spacing-600">
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
          <FrigoCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
