'use client';

import { Section } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SidebarProps {
  sections: Section[];
  currentSection: string;
  onSectionChange: (sectionId: string) => void;
  progress: number;
}

export default function Sidebar({ sections, currentSection, onSectionChange, progress }: SidebarProps) {
  return (
    <aside className="w-60 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 fixed h-screen overflow-y-auto flex flex-col transition-all duration-200 z-100">
      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-primary text-white">
        <h1 className="text-xl font-bold mb-1 tracking-tight">Dart 进阶</h1>
        <p className="text-sm opacity-90 font-normal tracking-wide">后端程序员视角</p>
      </div>
      
      <nav className="flex-1 py-3">
        <ul className="list-none">
          {sections.map((section) => (
            <li key={section.id} className="my-0.5">
              <button
                onClick={() => onSectionChange(section.id)}
                className={cn(
                  'nav-link w-full text-left',
                  currentSection === section.id && 'active'
                )}
              >
                <span className="text-lg w-5 text-center">{section.icon}</span>
                <span>{section.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden mb-2">
          <div 
            className="h-full bg-primary rounded transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold tracking-wide">
          {progress}% 完成
        </span>
      </div>
    </aside>
  );
}