import css from '../style.module.css';
import { SidebarItems } from './SidebarItems';
import { SidebarHeader } from './SidebarHeader';
import { useDashboardContext } from '../Provider';
import { signOut } from "next-auth/react"

const style = {
  mobileOrientation: {
    start: 'left-0',
    end: 'right-0',
  },
  container: 'pb-32 lg:pb-10',
  close: 'hidden lg:block lg:w-56 lg:z-auto',
  open: 'w-8/12 absolute z-40 sm:w-4/12 lg:hidden',
  default: 'bg-black h-screen overflow-y-auto top-0 lg:relative',
};

export function Sidebar(props) {
  const { isOpen } = useDashboardContext();
  return (
    <aside
      className={`${style.default} 
        ${style.mobileOrientation[props.mobileOrientation]} 
        ${isOpen ? style.open : style.close} ${css.scrollbar}`}
    >
      <div className={style.container}>
        <SidebarHeader />
        <SidebarItems />
      </div>
      <div className='text-center text-white font-semibold mb-5'><button onClick={signOut} className='p-2'>Sign Out</button></div>
    </aside>
  );
}
