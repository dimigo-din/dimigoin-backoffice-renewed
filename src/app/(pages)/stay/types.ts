export const GradeValues = ['a', '1', '2', '3', null] as const;
export const GenderValues = ['a', 'm', 'f', null] as const;

export type Grade = (typeof GradeValues)[number];
export type Gender = (typeof GenderValues)[number];
