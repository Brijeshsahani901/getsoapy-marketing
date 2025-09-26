// import Link from 'next/link';

// export default function Hero({ title, subtitle, primaryCta, primaryLink, secondaryCta, secondaryLink }) {
//   return (
//     <section className="relative bg-darkSlate text-white py-20">
//       <div className="absolute inset-0 bg-gradient-to-r from-darkSlate to-neutralDark opacity-90"></div>
//       <div className="container relative z-10">
//         <div className="max-w-3xl">
//           <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">{title}</h1>
//           <p className="text-xl mb-8 opacity-90">{subtitle}</p>
//           <div className="flex flex-col sm:flex-row gap-4">
//             <Link href={primaryLink} className="btn btn-primary text-lg px-8 py-3">
//               {primaryCta}
//             </Link>
//             <Link href={secondaryLink} className="btn btn-secondary text-lg px-8 py-3">
//               {secondaryCta}
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import Link from 'next/link';

export default function Hero({ title, subtitle, primaryCta, primaryLink, secondaryCta, secondaryLink }) {
  return (
    <section className="relative bg-darkSlate text-white py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0 bg-gradient-to-r from-darkSlate to-neutralDark opacity-90"></div>
      <div className="container relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">{title}</h1>
          <p className="text-xl mb-8 opacity-90">{subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={primaryLink} className="btn btn-primary text-lg px-8 py-3">
              {primaryCta}
            </Link>
            <Link href={secondaryLink} className="btn btn-secondary text-lg px-8 py-3">
              {secondaryCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}