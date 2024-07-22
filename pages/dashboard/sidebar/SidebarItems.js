import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { data } from './data';

const style = {
  title: 'font-normal mx-4 text-sm',
  // active: 'bg-gradient-to-r border-r-4 border-yellow-600 border-r-4 border-yellow-800 from-black to-yellow-600 text-yellow-600 lg:text-yellow-600',
  active: 'border-yellow-600 border-r-4 bg-[#231c0c] text-yellow-600 lg:text-yellow-600',
  // active: '',
  link: 'duration-200 flex font-thin items-center justify-start my-2 p-4 transition-colors text-gray-300 w-full hover:text-yellow-600 lg:hover:text-yellow-600',
};

export function SidebarItems() {
  const pathname = usePathname();
  return (
    <ul>
      {data.map((item) => (
        <li key={item.title}>
          <Link href={item.link}>
            <span
              className={`${style.link} 
              ${item.link === pathname && style.active}`}
            >
              <span>{item.icon}</span>
              <span className={style.title}>{item.title}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
