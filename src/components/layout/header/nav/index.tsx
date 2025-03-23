'use client';

import { PAGE_CEDE, PAGE_FOOD, PAGE_HOME, PAGE_JOB, PAGE_RELAX, REF_CEDE, REF_FOOD, REF_HOME, REF_JOB, REF_RELAX } from "@/common/consts";
import { Pizza, PersonStanding, Home, Users, Palmtree } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const navigations = [
  {
    id: 1,
    label: PAGE_HOME,
    href: REF_HOME,
    icon: <Home size={15}/>
  },
  {
    id: 2,
    label: PAGE_CEDE,
    href: REF_CEDE,
    icon: <Users size={15}/>
  },
  {
    id: 3,
    label: PAGE_RELAX,
    href: REF_RELAX,
    icon: <Palmtree size={15}/>
  },
  {
    id: 4,
    label: PAGE_FOOD,
    href: REF_FOOD,
    icon: <Pizza size={15}/>
  },
  {
    id: 5,
    label: PAGE_JOB,
    href: REF_JOB,
    icon: <PersonStanding size={15}/>
  }
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center space-x-6 ml-8">
      {navigations.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={`
            flex flex-col items-center
            text-sm font-semibold transition-colors relative py-1 mx-3.5
            ${pathname === item.href 
              ? "text-primary after:h-[2px] after:bg-primary" 
              : "hover:text-lime-600 hover:after:h-[2px] after:bg-lime-600"
            }
            after:content-[''] 
            after:absolute 
            after:bottom-0 
            after:left-0 
            after:w-full 
            after:h-0
            after:rounded-xl
            after:transform 
            after:scale-x-0 
            after:origin-left
            after:transition-all
            after:duration-300 
            hover:after:scale-x-100
            ${pathname === item.href ? "after:scale-x-100" : ""}
          `}
        >
          {item.icon}
          {item.label}
        </Link>
      ))}
    </nav>
  );
}