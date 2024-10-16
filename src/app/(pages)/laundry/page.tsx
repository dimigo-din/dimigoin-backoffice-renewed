import LaundrySection from '@/islands/sections/LaundrySection';
import React from 'react';

export default function Laundry() {
  return (
    <div className="w-full rounded-radius-600 bg-background-standard-primary p-spacing-600 flex flex-col gap-spacing-700">
      <div className="flex flex-col gap-spacing-400">
        <strong className="text-heading">세탁 신청 현황</strong>
        <div className="flex flex-row items-center gap-spacing-600">
          <div className="flex flex-row gap-spacing-400">
            <strong className="text-core-accent">학봉관</strong>
            <span>우정학사</span>
          </div>
          <span>|</span>
          <div className="flex flex-row gap-spacing-400">
            <strong className="text-core-accent">세탁기</strong>
            <span>건조기</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-spacing-400">
        <span>asdf</span>
        <span>asdf</span>
        <span>asdf</span>
        <span>asdf</span>
        <span>asdf</span>
        <span>asdf</span>
      </div>
    </div>
  );
}
