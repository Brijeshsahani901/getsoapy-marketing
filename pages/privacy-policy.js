import { useEffect, useRef } from 'react';
import Layout from '../components/layout';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PrivacyPolicy() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Content section animation
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate sections with stagger
      const sections = contentRef.current.querySelectorAll('section');
      gsap.fromTo(sections,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.2,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <Layout>
      <section className="bg-primary text-white py-16" ref={heroRef}>
        <div className="container text-center">
          <h1 className="text-4xl font-headline font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Learn how we collect, use, and protect your personal information.
          </p>
        </div>
      </section>

      <section className="py-16 bg-bgLight" ref={contentRef}>
        <div className="container max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="prose max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-headline mb-4">1. Information We Collect</h2>
                <p className="text-darkSlate mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 text-darkSlate mb-4">
                  <li>Personal identification information (Name, email address, phone number, etc.)</li>
                  <li>Business information (Company name, address, service requirements)</li>
                  <li>Property details and service specifications</li>
                  <li>Communication records and correspondence</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-headline mb-4">2. How We Use Your Information</h2>
                <p className="text-darkSlate mb-4">
                  We use the collected information for various purposes:
                </p>
                <ul className="list-disc pl-6 text-darkSlate mb-4">
                  <li>To provide and maintain our services</li>
                  <li>To notify you about changes to our services</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information to improve our services</li>
                  <li>To monitor the usage of our services</li>
                  <li>To detect, prevent and address technical issues</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-headline mb-4">3. Data Protection</h2>
                <p className="text-darkSlate mb-4">
                  We implement appropriate security measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-headline mb-4">4. Data Retention</h2>
                <p className="text-darkSlate mb-4">
                  We will retain your personal information only for as long as is necessary 
                  for the purposes set out in this Privacy Policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-headline mb-4">5. Your Rights</h2>
                <p className="text-darkSlate mb-4">
                  You have the right to access, update, or delete your personal information. 
                  You can also object to the processing of your personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-headline mb-4">6. Contact Us</h2>
                <p className="text-darkSlate">
                  If you have any questions about this Privacy Policy, please contact us at 
                  <strong> privacy@company.com</strong>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}