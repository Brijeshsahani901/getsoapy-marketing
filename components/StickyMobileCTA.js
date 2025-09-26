

import { useState } from 'react';
import Link from 'next/link';

export default function StickyMobileCTA() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="md:hidden fixed bottom-4 right-4 z-40 flex flex-col items-end space-y-2">
      <div 
        className={`bg-primary text-white rounded-full shadow-lg transition-all duration-300 overflow-hidden ${
          isExpanded ? 'w-64 h-12' : 'w-12 h-12'
        }`}
      >
        {isExpanded ? (
          <div className="flex items-center justify-between w-full h-full px-4">
            <span className="text-sm font-medium">Get a Quote</span>
            <Link href="/get-a-quote" className="text-white hover:text-accent transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        ) : (
          <button 
            onClick={() => setIsExpanded(true)}
            className="w-full h-full flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>
        )}
      </div>

      <a 
        href="tel:+441234567890" 
        className="w-12 h-12 bg-accent text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </a>
    </div>
  );
}