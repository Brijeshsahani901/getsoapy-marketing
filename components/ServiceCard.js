// components/ServiceCard.js (if you need to modify it)
import Link from 'next/link';

export default function ServiceCard({ title, description, icon, link }) {
  return (
    <Link href={link}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 h-full cursor-pointer">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-headline font-semibold mb-2">{title}</h3>
        <p className="text-darkSlate">{description}</p>
      </div>
    </Link>
  );
}