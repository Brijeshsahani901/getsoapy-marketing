// import { useState } from 'react';
// import Link from 'next/link';

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <header className="bg-white shadow-sm sticky top-0 z-50">
//       <div className="container">
//         {/* Desktop Header */}
//         <div className="hidden md:flex items-center justify-between py-4">
//           <div className="flex items-center">
//             <Link href="/" className="text-2xl font-headline font-bold text-primary">
//               Greenways
//             </Link>
//           </div>
          
//           <nav className="flex items-center space-x-8">
//             <Link href="/services" className="font-medium hover:text-primary transition-colors">
//               Services
//             </Link>
//             <Link href="/case-studies" className="font-medium hover:text-primary transition-colors">
//               Case Studies
//             </Link>
//             <Link href="/pricing-and-contracts" className="font-medium hover:text-primary transition-colors">
//               Pricing & Contracts
//             </Link>
//           </nav>
          
//           <div className="flex items-center space-x-4">
//             <a href="tel:+441234567890" className="font-medium hover:text-primary transition-colors">
//               +44 123 456 7890
//             </a>
//             <Link href="/client-bookings" className="btn btn-secondary">
//               Client Login
//             </Link>
//             <Link href="/get-a-quote" className="btn btn-primary">
//               Get a Quote
//             </Link>
//           </div>
//         </div>

//         {/* Mobile Header */}
//         <div className="md:hidden flex items-center justify-between py-3">
//           <button 
//             onClick={toggleMenu}
//             className="p-2 rounded-md text-darkSlate"
//             aria-label="Toggle menu"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
          
//           <Link href="/" className="text-xl font-headline font-bold text-primary">
//             Greenways
//           </Link>
          
//           <a href="tel:+441234567890" className="p-2 rounded-md text-darkSlate">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//             </svg>
//           </a>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden bg-white border-t py-4">
//             <nav className="flex flex-col space-y-4">
//               <Link href="/services" className="font-medium py-2" onClick={() => setIsMenuOpen(false)}>
//                 Services
//               </Link>
//               <Link href="/case-studies" className="font-medium py-2" onClick={() => setIsMenuOpen(false)}>
//                 Case Studies
//               </Link>
//               <Link href="/pricing-and-contracts" className="font-medium py-2" onClick={() => setIsMenuOpen(false)}>
//                 Pricing & Contracts
//               </Link>
//               <div className="pt-4 border-t flex flex-col space-y-3">
//                 <Link href="/client-bookings" className="btn btn-secondary text-center" onClick={() => setIsMenuOpen(false)}>
//                   Client Login
//                 </Link>
//                 <Link href="/get-a-quote" className="btn btn-primary text-center" onClick={() => setIsMenuOpen(false)}>
//                   Get a Quote
//                 </Link>
//               </div>
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container">
        <div className="hidden md:flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-headline font-bold text-primary">
            Greenways
          </Link>
          
          <nav className="flex items-center space-x-8">
            <Link href="/services" className="font-medium hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/case-studies" className="font-medium hover:text-primary transition-colors">
              Case Studies
            </Link>
            <Link href="/pricing-and-contracts" className="font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <a href="tel:+441234567890" className="font-medium hover:text-primary transition-colors">
              +44 123 456 7890
            </a>
            <Link href="/client-bookings" className="btn btn-secondary">
              Client Login
            </Link>
            <Link href="/get-a-quote" className="btn btn-primary">
              Get a Quote
            </Link>
          </div>
        </div>

        <div className="md:hidden flex items-center justify-between py-3">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-darkSlate"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <Link href="/" className="text-xl font-headline font-bold text-primary">
            Greenways
          </Link>
          
          <a href="tel:+441234567890" className="p-2 rounded-md text-darkSlate">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/services" className="font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Services
              </Link>
              <Link href="/case-studies" className="font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Case Studies
              </Link>
              <Link href="/pricing-and-contracts" className="font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Pricing
              </Link>
              <div className="pt-4 border-t flex flex-col space-y-3">
                <Link href="/client-bookings" className="btn btn-secondary text-center" onClick={() => setIsMenuOpen(false)}>
                  Client Login
                </Link>
                <Link href="/get-a-quote" className="btn btn-primary text-center" onClick={() => setIsMenuOpen(false)}>
                  Get a Quote
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}