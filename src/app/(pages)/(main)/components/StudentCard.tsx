import type { StudentCardProps } from '@/app/(pages)/(main)/types';

export const StudentCard: React.FC<StudentCardProps> = ({ student, frigo, stay, outgo }) => {
  return (
    <div className="w-full flex flex-row justify-between items-center rounded-radius-600 border border-line-outline p-spacing-500">
      <div className="w-1/2 font-bold">
        {student.grade}
        {student.class}
        {student.number}
        &nbsp;
        {student.name}
      </div>
      <div className="w-1/2 text-right">asdf</div>
    </div>
  );
};
