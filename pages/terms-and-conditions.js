import { useEffect, useRef } from 'react';
import Layout from '../components/layout';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TermsAndConditions() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const termsRef = useRef([]);

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

    // Content animation
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

      // Terms sections animation with stagger
      const terms = contentRef.current.querySelectorAll('.term-section');
      gsap.fromTo(terms,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
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
          <h1 className="text-4xl font-headline font-bold mb-4">Terms & Conditions</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our services.
          </p>
        </div>
      </section>

      <section className="py-16 bg-bgLight" ref={contentRef}>
        <div className="container max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="prose max-w-none">
              <section className="term-section mb-8">
                <h2 className="text-2xl font-headline mb-4">1. Acceptance of Terms</h2>
                <p className="text-darkSlate mb-4">
                  By accessing and using our services, you accept and agree to be bound by 
                  the terms and conditions outlined in this document.
                </p>
              </section>

              <section className="term-section mb-8">
                <h2 className="text-2xl font-headline mb-4">2. Services Provided</h2>
                <p className="text-darkSlate mb-4">
                  We provide property maintenance and landscaping services including but not 
                  limited to grounds maintenance, landscaping, tree work, and seasonal services.
                </p>
              </section>

              <section className="term-section mb-8">
                <h2 className="text-2xl font-headline mb-4">3. User Responsibilities</h2>
                <p className="text-darkSlate mb-4">
                  Users are responsible for:
                </p>
                <ul className="list-disc pl-6 text-darkSlate mb-4">
                  <li>Providing accurate and complete information</li>
                  <li>Maintaining the confidentiality of their account</li>
                  <li>Complying with all applicable laws and regulations</li>
                  <li>Ensuring proper access to the property for service delivery</li>
                </ul>
              </section>

              <section className="term-section mb-8">
                <h2 className="text-2xl font-headline mb-4">4. Payment Terms</h2>
                <p className="text-darkSlate mb-4">
                  Payment terms are as follows:
                </p>
                <ul className="list-disc pl-6 text-darkSlate mb-4">
                  <li>Invoices are due within 30 days of issuance</li>
                  <li>Late payments may incur interest charges</li>
                  <li>Services may be suspended for overdue accounts</li>
                </ul>
              </section>

              <section className="term-section mb-8">
                <h2 className="text-2xl font-headline mb-4">5. Cancellation Policy</h2>
                <p className="text-darkSlate mb-4">
                  Cancellations must be made at least 48 hours before the scheduled service. 
                  Late cancellations may be subject to charges.
                </p>
              </section>

              <section className="term-section mb-8">
                <h2 className="text-2xl font-headline mb-4">6. Liability</h2>
                <p className="text-darkSlate mb-4">
                  Our liability is limited to the value of the services provided. We are not 
                  liable for indirect or consequential damages.
                </p>
              </section>

              <section className="term-section mb-8">
                <h2 className="text-2xl font-headline mb-4">7. Intellectual Property</h2>
                <p className="text-darkSlate mb-4">
                  All content, trademarks, and data on this website are the property of 
                  our company and are protected by intellectual property laws.
                </p>
              </section>

              <section className="term-section mb-8">
                <h2 className="text-2xl font-headline mb-4">8. Termination</h2>
                <p className="text-darkSlate mb-4">
                  We reserve the right to terminate or suspend access to our services 
                  immediately, without prior notice, for any breach of these terms.
                </p>
              </section>

              <section className="term-section mb-8">
                <h2 className="text-2xl font-headline mb-4">9. Changes to Terms</h2>
                <p className="text-darkSlate mb-4">
                  We reserve the right to modify these terms at any time. Continued use 
                  of our services after changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section className="term-section">
                <h2 className="text-2xl font-headline mb-4">10. Governing Law</h2>
                <p className="text-darkSlate mb-4">
                  These terms shall be governed by and construed in accordance with the 
                  laws of the jurisdiction in which our company is registered.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}