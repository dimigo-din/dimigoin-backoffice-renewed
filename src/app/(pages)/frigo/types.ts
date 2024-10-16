export interface StudentInfo {
  grade: number;
  class: number;
  number: number;
  name: string;
  gender: 'male' | 'female';
}

export interface FrigoCardProps {
  student: StudentInfo;
  details: string;
  type: 'pending' | 'approved' | 'rejected';
}

export type FrigoCardData = FrigoCardProps;

export type GradeFilter = '1' | '2' | '3' | null;
export type GenderFilter = 'male' | 'female' | null;
export type StatusFilter = 'pending' | 'approved' | 'rejected' | null;
