import { ReactNode } from 'react'

export const Content = ({ children }: { children?: ReactNode }) => (
  <div
    className={[
      'flex flex-col flex-grow h-full items-center overflow-y-auto',
      // 'scrollbar scrollbar-thumb-gray-200 scrollbar-track-gray-100',
    ].join(' ')}
  >
    <div className="w-full max-w-7xl md:w-[450px] lg:w-[700px] xl:w-[800px] 2xl:w-[900px]  flex flex-col px-4 md:px-0">
      {children}
    </div>
  </div>
)
