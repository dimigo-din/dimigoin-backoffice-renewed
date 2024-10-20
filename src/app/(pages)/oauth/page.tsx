'use client';

import { googleLogin } from '@/lib/api/auth';
import { useLogin } from '@/lib/hooks/useLogin';
import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image';

export default function OAuth() {
  const { login } = useLogin();
  const handleGoogleLogin = () => {
    login();
  };

  return (
    <div className="w-full flex flex-col justify-center items-center rounded-radius-600 border border-line-outline p-spacing-600">
      <div className="flex flex-col bg-background-standard-primary rounded-radius-700 p-spacing-500 gap-y-spacing-550">
        <div className="flex flex-col justify-start items-start p-spacing-100 gap-spacing-150">
          <span className="text-label text-content-standard-tertiary">
            <strong>디미고인 백오피스</strong>에서
          </span>
          <div className="flex flex-row justify-center items-center gap-spacing-200">
            <Image src="/images/dimigoin_logo.svg" alt="dimigoin_logo" width={20} height={20} />
            <strong className="text-heading text-standard-secondary">
              <span className="text-core-accent">디미고인</span>으로 로그인
            </strong>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start p-spacing-100 gap-spacing-150">
          <span className="text-label text-content-standard-tertiary">요청한 정보</span>
          <strong className="text-content-standard-primary text-body">이메일, 이름, 학번</strong>
        </div>
        <button
          type={'button'}
          className="w-[360px] bg-components-translucent-tertiary border border-line-outline rounded-radius-300 flex flex-row justify-center items-center gap-spacing-200 px-spacing-500 py-spacing-400"
          onClick={handleGoogleLogin}>
          <Image src="/images/google_icon.svg" alt="google" width={20} height={20} />
          <span className="text-label text-content-standard-primary">디미고 구글계정으로 로그인</span>
        </button>
      </div>
    </div>
  );
}
