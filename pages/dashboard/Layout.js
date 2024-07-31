import React from 'react';
import { TopBar } from './TopBar';
import { Overlay } from './Overlay';
import { Sidebar } from './sidebar/Sidebar';
import { DashboardProvider, useDashboardContext } from '../../lib/context/dashboardProvider';
import { ShowErrorProvider, useShowErrorContext } from '@/lib/context/showErrorProvider';
import Error from '@/components/error'

const style = {
  open: 'lg:w-full',
  close: 'lg:pl-4 lg:lg:w-[calc(100%-14rem)]',
  mainContainer: 'flex flex-col w-full h-screen pl-0 py-4 lg:space-y-4',
  container: 'bg-gray-100 h-screen overflow-hidden relative',
  main: 'h-screen overflow-auto pb-36 pt-8 px-2 md:pb-8 md:pt-4 lg:pt-0',
};

function Content(props) {
  const { isOpen } = useDashboardContext();
  const {error} = useShowErrorContext()

  return (
    <div className={style.container}>
      <div className="flex items-start">
        <Overlay />
        <Sidebar mobileOrientation="end" />
        <div
          className={`${style.mainContainer} 
             ${isOpen ? style.open : style.close}`}
        >
          <TopBar />
          <main className={style.main}>
            {error ? (
                <Error>{error}</Error>
            ) : (
            <>
              {props.children}
            </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export function DashboardLayout(props) {
  return (
    <DashboardProvider>
      <ShowErrorProvider>
        <Content>
          {props.children}
        </Content>
      </ShowErrorProvider>
    </DashboardProvider>
  );
}
