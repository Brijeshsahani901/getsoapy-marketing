import { useState, useEffect, useRef } from 'react';
import Layout from '../components/layout';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ClientBookings() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Refs for animation
  const heroSectionRef = useRef(null);
  const portalSectionRef = useRef(null);
  const loginFormRef = useRef(null);
  const featureCardsRef = useRef([]);

  const handleSSOLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/sso/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Animate before redirect
        if (loginFormRef.current) {
          gsap.to(loginFormRef.current, {
            scale: 0.9,
            opacity: 0.7,
            duration: 0.3,
            onComplete: () => {
              window.location.href = data.ssoUrl;
            }
          });
        } else {
          window.location.href = data.ssoUrl;
        }
      } else {
        window.location.href = `https://${process.env.GETSOAPY_TENANT_ID}.getsoapy.com`;
      }
    } catch (error) {
      window.location.href = `https://${process.env.GETSOAPY_TENANT_ID}.getsoapy.com`;
    } finally {
      setIsLoading(false);
    }
  };

  // Hero section animation
  useEffect(() => {
    if (heroSectionRef.current) {
      gsap.fromTo(heroSectionRef.current,
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  // Portal section animation
  useEffect(() => {
    if (portalSectionRef.current) {
      gsap.fromTo(portalSectionRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: portalSectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Login form animation
      if (loginFormRef.current) {
        gsap.fromTo(loginFormRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: 0.5,
            ease: "back.out(1.2)"
          }
        );
      }

      // Feature cards animation
      if (featureCardsRef.current.length > 0) {
        gsap.fromTo(featureCardsRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            delay: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: portalSectionRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }
  }, []);

  // Icon animation on hover
  useEffect(() => {
    const icons = portalSectionRef.current?.querySelectorAll('.feature-icon');
    if (icons) {
      icons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            scale: 1.1,
            rotation: 5,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        icon.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }
  }, []);

  return (
    <Layout>
      <section className="bg-primary text-white py-16" ref={heroSectionRef}>
        <div className="container text-center">
          <h1 className="text-4xl font-headline font-bold mb-4">Client Portal</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Access your property management dashboard, reports, photos, and booking system.
          </p>
        </div>
      </section>

      <section className="py-16 bg-bgLight" ref={portalSectionRef}>
        <div className="container max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-8" ref={loginFormRef}>
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 feature-icon">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-headline mb-4">Access GetSoapy</h2>
              
              <form onSubmit={handleSSOLogin} className="max-w-md mx-auto mb-8">
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-darkSlate mb-2">
                    Enter your email to login
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn btn-primary text-lg py-3 disabled:opacity-50"
                >
                  {isLoading ? 'Redirecting...' : 'Login to GetSoapy'}
                </button>
              </form>

              <div className="mt-4">
                <a 
                  href={`https://${process.env.GETSOAPY_TENANT_ID}.getsoapy.com`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Or go directly to GetSoapy
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div 
                className="p-6"
                ref={el => featureCardsRef.current[0] = el}
              >
                <div className="w-12 h-12 bg-bgLight rounded-lg flex items-center justify-center mb-4 feature-icon">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-headline mb-2">View Reports</h3>
                <p className="text-darkSlate">Access detailed service reports and maintenance history.</p>
              </div>
              
              <div 
                className="p-6"
                ref={el => featureCardsRef.current[1] = el}
              >
                <div className="w-12 h-12 bg-bgLight rounded-lg flex items-center justify-center mb-4 feature-icon">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-headline mb-2">Job Photos</h3>
                <p className="text-darkSlate">View before-and-after photos and project documentation.</p>
              </div>
              
              <div 
                className="p-6"
                ref={el => featureCardsRef.current[2] = el}
              >
                <div className="w-12 h-12 bg-bgLight rounded-lg flex items-center justify-center mb-4 feature-icon">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-headline mb-2">Book Services</h3>
                <p className="text-darkSlate">Schedule new services and manage existing bookings.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}