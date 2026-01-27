import { IoHomeOutline } from "react-icons/io5";
import { IoMdTrendingUp } from "react-icons/io";
import { IoMdTrendingDown } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineSettings } from "react-icons/md";
    export const SideBarItems = [
        { id: 'dashboard', label: 'Dashboard', path: "/", icon: IoHomeOutline },
        { id: 'income', label: 'Income', path: "/income", icon: IoMdTrendingUp },
        { id: 'expenses', label: 'Expenses', path: "/expenses", icon: IoMdTrendingDown },
        { id: 'profile', label: 'Profile', path: "/profile", icon: AiOutlineUser },
        { id: 'settings', label: 'Settings', path: "/setting", icon: MdOutlineSettings },
    ]
