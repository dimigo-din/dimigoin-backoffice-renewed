'use client'

import { StudentCard } from '@/app/(pages)/(main)/components/StudentCard';
import axiosClient from '@/lib/api/axiosClient';
import { useAtom } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';

const getStudentList = async () => {
  const res = await axiosClient.get('/manage/user/student');
  return res.data;
};
const studentListAtom = atomWithQuery(() => ({
  queryKey: ['studentList'],
  queryFn: getStudentList,
}));

export default function Home() {
  const [{ data: studentListData, isLoading: isStudentDataPending, isError: isStudentDataError }] =
    useAtom(studentListAtom);
  return (
    <>
      {!isStudentDataPending && !isStudentDataError && studentListData.length ? (
        <div className="w-full flex flex-col items-center rounded-radius-600 border border-line-outline p-spacing-600">
          {studentListData.map((student: any, index: number) => (
            <StudentCard
              key={index}
              student={student.student}
              frigo={student.frigo}
              stay={student.stay}
              outgo={student.outgo}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center rounded-radius-600 border border-line-outline p-spacing-600">
          <strong className="text-title text-components-translucent-primary">
            디미고인 백오피스에 오신 것을 환영합니다!
          </strong>
        </div>
      )}
    </>
  );
}
