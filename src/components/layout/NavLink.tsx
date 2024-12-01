import React from 'react';

interface NavLinkProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  href: string;
  active?: boolean;
  onClick: () => void;
}

export function NavLink({ icon, children, href, active, onClick }: NavLinkProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 px-4 py-2 rounded-lg w-full text-left ${
        active
          ? 'bg-blue-700 text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}