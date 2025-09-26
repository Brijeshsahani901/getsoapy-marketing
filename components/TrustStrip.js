// export default function TrustStrip() {
//   const accreditations = [
//     { name: 'SafeContractor', logo: '/images/accreditations/safecontractor.svg' },
//     { name: 'CHAS', logo: '/images/accreditations/chas.svg' },
//     { name: 'Constructionline', logo: '/images/accreditations/constructionline.svg' },
//     { name: 'ISO 9001', logo: '/images/accreditations/iso9001.svg' }
//   ];

//   return (
//     <section className="py-8 bg-white border-b">
//       <div className="container">
//         <div className="flex flex-col md:flex-row items-center justify-between">
//           <div className="mb-4 md:mb-0">
//             <p className="text-lg font-medium">Trusted by commercial clients for over 15 years</p>
//           </div>
//           <div className="flex items-center space-x-8">
//             {accreditations.map((acc, index) => (
//               <div key={index} className="h-12 flex items-center opacity-70 grayscale">
//                 <span className="text-sm font-medium">{acc.name}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

export default function TrustStrip() {
  const accreditations = ['SafeContractor', 'CHAS', 'Constructionline', 'ISO 9001'];
  
  return (
    <section className="py-8 bg-white border-b">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-medium">Trusted by commercial clients for over 15 years</p>
          </div>
          <div className="flex items-center space-x-8">
            {accreditations.map((acc, index) => (
              <div key={index} className="text-sm font-medium opacity-70">
                {acc}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}