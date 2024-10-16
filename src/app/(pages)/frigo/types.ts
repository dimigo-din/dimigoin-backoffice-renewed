export interface FrigoCardProps {
  studentId: string;
  name: string;
  status: string;
  details: string;
  type: 'pending' | 'approved' | 'rejected';
}

export type FrigoCardData = FrigoCardProps;
