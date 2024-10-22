export interface StudentCardProps {
  student: {
    grade: number;
    class: number;
    number: number;
    name: string;
  };

  frigo: string | null;
  stay: boolean;
  outgo: number;
}
