export interface OutgoCardProps {
  studentId: string;
  name: string;
  status: string;
  details: string;
  type: 'pending' | 'approved' | 'rejected';
}

export type OutgoCardData = OutgoCardProps;
