import Image from "next/image"
import { MdOutlinePeopleAlt } from "react-icons/md"
import { FaBahtSign } from "react-icons/fa6"
import { SiHappycow } from "react-icons/si"

export default function Dashboard() {
  return (
    <div className="flex flex-row gap-4">
      <div className="inline-block w-48 p-3 bg-[#E4D6A7] rounded-lg">
        <div className="inline-flex items-center"><MdOutlinePeopleAlt className="text-lg mr-1 text-[#DFAD4A]" />Total Users</div>
        <div className="py-3"></div>
        <div className="text-2xl leading-none">11,920</div>
      </div>

      <div className="inline-block w-48 p-3 bg-[#DFAD4A] rounded-lg">
        <div className="inline-flex items-center"><FaBahtSign className="text-lg mr-1 text-[#E4D6A7]" />Today Exchange</div>
        <div className="py-3"></div>
        <div className="inline-flex gap-3">
          <div className="text-2xl leading-none"><span className="text-[9px] mr-1">BUY</span>715</div>
          <div className="text-2xl leading-none"><span className="text-[9px] mr-1">SELL</span>699</div>
        </div>
      </div>

      <div className="inline-block w-48 p-3 bg-[#9B2915] rounded-lg text-white">
        <div className="inline-flex items-center"><FaBahtSign className="text-lg mr-1 text-[#DFAD4A]" />Today Exchange</div>
        <div className="py-3"></div>
        <div className="inline-flex gap-3">
          <div className="text-2xl leading-none"><span className="text-[9px] mr-1">BUY</span>135</div>
          <div className="text-2xl leading-none"><span className="text-[9px] mr-1">SELL</span>120</div>
        </div>
      </div>

      <div className="inline-block w-48 p-3 bg-[#DFAD4A] rounded-lg">
        <div className="inline-flex items-center"><SiHappycow className="text-lg mr-1 text-[#E4D6A7]" />Total Agents</div>
        <div className="py-3"></div>
        <div className="text-2xl leading-none">24</div>
      </div>
    </div>
  )
}
