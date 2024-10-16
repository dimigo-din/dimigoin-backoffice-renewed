import type { FrigoCardProps } from '@/app/(pages)/frigo/types';
import type React from 'react';

const FrigoCard: React.FC<FrigoCardProps> = ({ studentId, name, status, details, type }) => {
  const getCardStyle = () => {
    switch (type) {
      case 'pending':
        return 'bg-background-standard-secondary';
      case 'approved':
        return 'bg-solid-translucent-green border border-line-outline';
      case 'rejected':
        return 'bg-solid-translucent-red border border-line-outline';
    }
  };

  const getActionButton = () => {
    switch (type) {
      case 'pending':
        return (
          <div className="flex flex-row gap-spacing-200 items-center">
            <div className="flex justify-center items-center bg-solid-green px-spacing-400 py-spacing-200 rounded-radius-300">
              <strong className="text-body text-content-inverted-primary">승인</strong>
            </div>
            <div className="flex justify-center items-center bg-solid-red px-spacing-400 py-spacing-200 rounded-radius-300">
              <strong className="text-body text-content-inverted-primary">거부</strong>
            </div>
          </div>
        );
      case 'approved':
        return (
          <div className="flex justify-center items-center bg-solid-red px-spacing-400 py-spacing-200 rounded-radius-300">
            <strong className="text-body text-content-inverted-primary">승인 취소</strong>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex justify-center items-center bg-solid-red px-spacing-400 py-spacing-200 rounded-radius-300">
            <strong className="text-body text-content-inverted-primary">거부 취소</strong>
          </div>
        );
    }
  };

  return (
    <div
      className={`flex flex-row justify-between rounded-radius-400 px-spacing-700 py-spacing-550 items-center ${getCardStyle()}`}>
      <div className="flex flex-col gap-spacing-200">
        <div className="flex flex-row gap-spacing-200 items-center">
          <strong className="text-body">
            {studentId} {name}
          </strong>
          <span className="text-body text-content-standard-secondary">{status}</span>
        </div>
        <span className="text-body text-content-standard-secondary">{details}</span>
      </div>
      {getActionButton()}
    </div>
  );
};

export default FrigoCard;
