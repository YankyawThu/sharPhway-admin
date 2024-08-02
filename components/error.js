import { RiEmotionSadLine } from "react-icons/ri"

export default function Error({children}) {
    return (
        <div className="flex flex-col items-center justify-center screen-h text-2xl text-gray-300">
           <RiEmotionSadLine className="text-[80px] mr-1" />Something went wrong
        </div>
    )
}