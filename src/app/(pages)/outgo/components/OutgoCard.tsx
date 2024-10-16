import type { OutgoCardProps } from '@/app/(pages)/outgo/types';
import type React from 'react';

const OutgoCard: React.FC<OutgoCardProps> = ({ student, seat, details, type }) => {
  const getCardStyle = () => {
    const styles = {
      pending: 'bg-background-standard-secondary',
      approved: 'bg-solid-translucent-green border border-line-outline',
      rejected: 'bg-solid-translucent-red border border-line-outline',
    };
    return styles[type] || styles.pending;
  };

  const ActionButton: React.FC<{ text: string; color: string }> = ({ text, color }) => (
    <strong className={`text-body ${color}`}>{text}</strong>
  );

  const getActionButton = () => {
    const buttons = {
      pending: (
        <div className="flex flex-row gap-spacing-400 items-center">
          <ActionButton text="승인" color="text-solid-green" />
          <ActionButton text="반려" color="text-solid-red" />
        </div>
      ),
      approved: <ActionButton text="승인 취소" color="text-content-standard-primary" />,
      rejected: <ActionButton text="반려 취소" color="text-content-standard-primary" />,
    };
    return buttons[type] || null;
  };

  const studentId = `${student.grade}${student.class.toString()}${student.number.toString().padStart(2, '0')}`;

  return (
    <div
      className={`flex flex-row justify-between rounded-radius-400 px-spacing-700 p-spacing-400 items-center ${getCardStyle()}`}>
      <div className="flex flex-col gap-spacing-200">
        <div className="flex flex-row gap-spacing-200 items-center">
          <strong className="text-body">
            {studentId} {student.name}
          </strong>
          <span className="text-body text-content-standard-secondary">{seat}</span>
        </div>
        <span className="text-body text-content-standard-secondary">{details}</span>
      </div>
      {getActionButton()}
    </div>
  );
};

export default OutgoCard;
