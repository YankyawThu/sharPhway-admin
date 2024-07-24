import { FaInbox } from "react-icons/fa";
import { SiHappycow } from "react-icons/si";
import { GiNewspaper, GiTakeMyMoney } from "react-icons/gi";
import { LuLayoutDashboard } from "react-icons/lu";

export const data = [
  {
    title: 'Dashboard',
    icon: <LuLayoutDashboard className="text-lg" />,
    link: '/',
  },
  {
    title: 'Exchange',
    icon: <GiTakeMyMoney className="text-lg" />,
    link: '/exchange',
  },
  {
    title: 'News',
    icon: <GiNewspaper className="text-lg" />,
    link: '/news',
  },
  {
    title: 'FYI',
    icon: <SiHappycow className="text-lg" />,
    link: '/fyi',
  },
  {
    title: 'Mail',
    icon: <FaInbox className="text-lg" />,
    link: '/mailBox',
  },
];
