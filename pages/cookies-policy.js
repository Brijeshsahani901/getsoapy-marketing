import { useEffect, useRef } from 'react';
import Layout from '../components/layout';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CookiesPolicy() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const cookieTypesRef = useRef([]);

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

      // Cookie types animation
      const cookieTypes = contentRef.current.querySelectorAll('.cookie-type');
      gsap.fromTo(cookieTypes,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          delay: 0.5,
          ease: "back.out(1.2)",
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
          <h1 className="text-4xl font-headline font-bold mb-4">Cookies Policy</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Understand how we use cookies to enhance your browsing experience.
          </p>
        </div>
      </section>

      <section className="py-16 bg-bgLight" ref={contentRef}>
        <div className="container max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="prose max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-headline mb-4">What Are Cookies</h2>
                <p className="text-darkSlate mb-4">
                  Cookies are small text files that are placed on your computer or mobile device 
                  when you visit our website. They help us provide you with a better experience 
                  and allow us to improve our site.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-headline mb-4">How We Use Cookies</h2>
                <p className="text-darkSlate mb-6">
                  We use cookies for various purposes, including:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="cookie-type p-6 bg-bgLight rounded-lg">
                    <h3 className="text-lg font-headline mb-2">Essential Cookies</h3>
                    <p className="text-darkSlate text-sm">
                      Necessary for the website to function properly. They enable basic functions 
                      like page navigation and access to secure areas.
                    </p>
                  </div>
                  
                  <div className="cookie-type p-6 bg-bgLight rounded-lg">
                    <h3 className="text-lg font-headline mb-2">Analytics Cookies</h3>
                    <p className="text-darkSlate text-sm">
                      Help us understand how visitors interact with our website by collecting 
                      and reporting information anonymously.
                    </p>
                  </div>
                  
                  <div className="cookie-type p-6 bg-bgLight rounded-lg">
                    <h3 className="text-lg font-headline mb-2">Preference Cookies</h3>
                    <p className="text-darkSlate text-sm">
                      Enable the website to remember information that changes the way the site 
                      behaves or looks, like your preferred language.
                    </p>
                  </div>
                  
                  <div className="cookie-type p-6 bg-bgLight rounded-lg">
                    <h3 className="text-lg font-headline mb-2">Marketing Cookies</h3>
                    <p className="text-darkSlate text-sm">
                      Used to track visitors across websites to display relevant advertisements.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-headline mb-4">Managing Cookies</h2>
                <p className="text-darkSlate mb-4">
                  You can control and/or delete cookies as you wish. You can delete all cookies 
                  that are already on your computer and you can set most browsers to prevent 
                  them from being placed.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-headline mb-4">Third-Party Cookies</h2>
                <p className="text-darkSlate mb-4">
                  In some special cases, we also use cookies provided by trusted third parties. 
                  These may include analytics cookies and advertising cookies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-headline mb-4">More Information</h2>
                <p className="text-darkSlate">
                  If you have any questions about our use of cookies, please contact us at 
                  <strong> cookies@company.com</strong>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}