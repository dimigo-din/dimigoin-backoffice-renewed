import Image from 'next/image';

export default function Custom404() {
  return (
    <div className="w-full flex flex-col justify-center items-center rounded-radius-600 border border-line-outline p-spacing-600">
      <strong className="text-title text-components-translucent-primary">404 | Not Found</strong>
    </div>
  );
}
