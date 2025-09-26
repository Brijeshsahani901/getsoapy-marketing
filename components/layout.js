import Header from './Header';
import Footer from './Footer';
import StickyMobileCTA from './StickyMobileCTA';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}



// import { useEffect, useRef } from 'react';
// import 'locomotive-scroll/dist/locomotive-scroll.css';
// import Header from './Header';
// import Footer from './Footer';
// import StickyMobileCTA from './StickyMobileCTA';
// import CustomCursor from './CustomCursor';

// export default function Layout({ children }) {
//   const scrollRef = useRef(null);
//   const scrollInstance = useRef(null);

// // Layout.js में
// useEffect(() => {
//   let isMounted = true;
//   let scrollInitialized = false;

//   const initLocomotive = async () => {
//     try {
//       // Wait for DOM to be fully ready
//       if (document.readyState !== 'complete') {
//         await new Promise(resolve => window.addEventListener('load', resolve));
//       }

//       // Check if component is still mounted
//       if (!isMounted || !scrollRef.current) return;

//       const LocomotiveScroll = (await import('locomotive-scroll')).default;

//       // Additional safety check
//       if (!scrollRef.current || !scrollRef.current.children.length) {
//         console.warn('Scroll container not ready');
//         return;
//       }

//       scrollInstance.current = new LocomotiveScroll({
//         el: scrollRef.current,
//         smooth: true,
//         lerp: 0.08,
//         class: 'is-reveal',
//         multiplier: 1,
//         getSpeed: true,
//         getDirection: true,
//         scrollbarClass: 'scrollbar-hidden',
//         // Add safety options
//         reloadOnContextChange: true,
//         resetNativeScroll: true,
//         smartphone: {
//           smooth: true,
//           breakpoint: 768
//         },
//         tablet: {
//           smooth: true,
//           breakpoint: 1024
//         }
//       });

//       scrollInitialized = true;

//       // Safe scrollbar hide
//       setTimeout(() => {
//         if (!isMounted || !scrollInstance.current) return;
        
//         try {
//           // Multiple ways to hide scrollbar
//           if (scrollInstance.current.scrollbar) {
//             scrollInstance.current.scrollbar.style.display = 'none';
//             scrollInstance.current.scrollbar.style.opacity = '0';
//             scrollInstance.current.scrollbar.style.visibility = 'hidden';
//           }
          
//           // Hide scrollbar track elements
//           const scrollbarElements = document.querySelectorAll('.scrollbar-track, .scrollbar-thumb');
//           scrollbarElements.forEach(el => {
//             el.style.display = 'none';
//             el.style.opacity = '0';
//           });

//         } catch (error) {
//           console.warn('Scrollbar hide error:', error);
//         }
//       }, 100);

//       // Safe update with error handling
//       const safeUpdate = () => {
//         if (!isMounted || !scrollInstance.current) return;
        
//         try {
//           scrollInstance.current.update();
//         } catch (updateError) {
//           console.warn('Scroll update failed:', updateError);
//           // Retry after delay
//           setTimeout(safeUpdate, 300);
//         }
//       };

//       setTimeout(safeUpdate, 500);

//     } catch (error) {
//       console.error('Locomotive Scroll initialization failed:', error);
//     }
//   };

//   if (typeof window !== 'undefined') {
//     // Delay initialization to ensure DOM is ready
//     const timer = setTimeout(initLocomotive, 100);
    
//     return () => {
//       isMounted = false;
//       clearTimeout(timer);
      
//       if (scrollInstance.current && scrollInitialized) {
//         try {
//           scrollInstance.current.destroy();
//         } catch (destroyError) {
//           console.warn('Scroll destroy error:', destroyError);
//         }
//       }
//     };
//   }
// }, []);

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />

//       {/* Locomotive Scroll Container */}
//       <main
//         id="main-scroll"
//         data-scroll-container
//         ref={scrollRef}
//         className="flex-grow"
//       >
//         {children}
//         <Footer />
//       </main>

//       {/* Place outside of Locomotive Scroll container */}
//       <StickyMobileCTA />
//         <CustomCursor />
//     </div>
//   );
// }

