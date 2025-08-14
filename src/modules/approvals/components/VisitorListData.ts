
import { IconType } from "react-icons";
import { CiClock2 } from "react-icons/ci";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export type Visitor = {
	name: string;
	company: string;
	time: string;
	icon: IconType;
	spanText: string;
	spanBgColor: string;
	spanTextColor: string;
	avatars: string[];
	email: string;
	phone: string;
	purpose: string;
	badge: string;
	badgeAssigned: string;
	badgeIcon?: IconType;
	badgeTextColor?: string;
	status: string;
	statusFinal: string;
	duration: string;
	idnumber: string;
	statusTextColor?: string;
	bgColor?: string;
	visitorsNumber?: string | number;
	date?: string;
	fromTime?: string;
	toTime?: string;
	id?: number;
	cancelReason: string;
};

export const visitors: Visitor[] = [
	{
		name: "James Mathe",
		company: "ABC Company · Developer",
		time: "10:00 - 11:00 AM",
		icon: CiClock2,
		spanText: "One time visitor",
		spanBgColor: "bg-[#0071E314]",
		spanTextColor: "text-[#0071E3]",
		avatars: [
			"https://github.com/shadcn.png",
			"https://i.pravatar.cc/40?img=1",
			"https://i.pravatar.cc/40?img=2",
			"https://i.pravatar.cc/40?img=3",
		],
		email: "james.mathe@abc.com",
		phone: "+1 (555) 123-4567",
		purpose: "Interview",
		badge: "Assign Badge",
		badgeAssigned: "UAE, EMA-24031",
		badgeIcon: FaArrowUpRightFromSquare,
		badgeTextColor: "text-[#23272E]",
		status: "Yet to arrive",
		statusFinal: "Visited",
		statusTextColor: "text-[#F3C303]",
		duration: "2 Hrs",
		idnumber: "784-1992-6543210-3",
		bgColor: "bg-[#0071E30A]",
		visitorsNumber: 4,
		date: "31.Jan.2021",
		fromTime: "10:00 AM",
		toTime: "11:00 AM",
		id: 1,
		cancelReason: "",
	},
	// ...add more visitor objects as needed
];
