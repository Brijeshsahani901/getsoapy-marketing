import Layout from '../../components/layout';
import ServiceCard from '../../components/ServiceCard';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Services() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const servicesRef = useRef(null);
  const serviceCardsRef = useRef([]);
  const ctaRef = useRef(null);

  // Add to service cards ref array
  const addToServiceCardsRef = (el) => {
    if (el && !serviceCardsRef.current.includes(el)) {
      serviceCardsRef.current.push(el);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.fromTo(titleRef.current, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: "power3.out"
        }
      );

      gsap.fromTo(subtitleRef.current, 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          delay: 0.3,
          ease: "power3.out"
        }
      );

      // Services section animation
      gsap.fromTo(servicesRef.current, 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 80%',
          }
        }
      );

      // Service cards stagger animation
      gsap.fromTo(serviceCardsRef.current, 
        { y: 60, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 70%',
          }
        }
      );

      // Add hover animations to service cards
      serviceCardsRef.current.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // CTA section animation
      gsap.fromTo(ctaRef.current, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
          }
        }
      );

      // Background pattern animation (subtle movement)
      const bgPattern = heroRef.current?.querySelector('.bg-pattern');
      if (bgPattern) {
        gsap.to(bgPattern, {
          x: 30,
          y: 20,
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    });

    return () => ctx.revert(); // Cleanup
  }, []);

  const allServices = [
    {
      title: 'Grounds Maintenance',
      description: 'Regular maintenance to keep your grounds in pristine condition year-round.',
      icon: '🌿',
      link: '/services/grounds-maintenance',
      features: ['Lawn Care', 'Hedge Trimming', 'Weed Control', 'Seasonal Planting']
    },
    {
      title: 'Landscaping & Softworks',
      description: 'Creative landscaping solutions to enhance your property\'s appeal.',
      icon: '🏞️',
      link: '/services/landscaping-softworks',
      features: ['Garden Design', 'Planting Schemes', 'Turf Installation', 'Water Features']
    },
    {
      title: 'Reactive Property Maintenance',
      description: 'Quick response to urgent maintenance issues on your property.',
      icon: '⚡',
      link: '/services/reactive-property-maintenance',
      features: ['Emergency Repairs', '24/7 Service', 'Damage Assessment', 'Rapid Response']
    },
    {
      title: 'Tree Work',
      description: 'Professional tree care, pruning, and removal services.',
      icon: '🌳',
      link: '/services/tree-work',
      features: ['Tree Pruning', 'Stump Removal', 'Health Assessments', 'Storm Damage']
    },
    {
      title: 'Seasonal & Winter Services',
      description: 'Specialist services for seasonal challenges and winter conditions.',
      icon: '❄️',
      link: '/services/seasonal-winter-services',
      features: ['Snow Clearance', 'Gritting', 'Leaf Removal', 'Winter Prep']
    }
  ];

  return (
    <Layout>
      {/* Hero Section with Animated Background */}
      <section ref={heroRef} className="bg-primary text-white py-20 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="bg-pattern absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-r from-white to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-l from-white to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 ref={titleRef} className="text-5xl md:text-6xl font-headline font-bold mb-6">
              Our Services
            </h1>
            <p ref={subtitleRef} className="text-xl md:text-2xl opacity-90 leading-relaxed">
              Comprehensive property maintenance solutions designed for commercial clients. 
              Experience unmatched quality and reliability across all our specialist services.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section ref={servicesRef} className="py-20 bg-bgLight">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-headline font-bold mb-4 text-gray-900">
              Specialist Commercial Services
            </h2>
            <p className="text-xl text-darkSlate max-w-2xl mx-auto">
              From routine maintenance to emergency response, we provide end-to-end solutions 
              tailored to your commercial property needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service, index) => (
              <div
                key={index}
                ref={addToServiceCardsRef}
                className="service-card bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  link={service.link}
                />
                
                {/* Enhanced hover content */}
                <div className="px-6 pb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <h4 className="font-semibold text-sm text-gray-600 mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, idx) => (
                        <span 
                          key={idx}
                          className="inline-block bg-primary bg-opacity-10 text-primary text-xs px-3 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="font-headline font-semibold mb-2">Award Winning</h3>
              <p className="text-darkSlate text-sm">Industry-recognized excellence in commercial maintenance</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-headline font-semibold mb-2">Rapid Response</h3>
              <p className="text-darkSlate text-sm">24/7 emergency services with quick turnaround times</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-headline font-semibold mb-2">Fully Insured</h3>
              <p className="text-darkSlate text-sm">Comprehensive coverage for your peace of mind</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-white">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-headline font-bold mb-4">
              Ready to Transform Your Property?
            </h2>
            <p className="text-xl text-darkSlate mb-8">
              Get a personalized quote tailored to your specific needs and budget requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/get-a-quote" 
                className="btn btn-primary btn-lg group relative overflow-hidden"
              >
                <span className="relative z-10">Get a Custom Quote</span>
                <div className="absolute inset-0 bg-primary-dark transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>
              <Link 
                href="/contact" 
                className="btn btn-outline btn-lg"
              >
                Speak to Our Team
              </Link>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Average response time: 2 hours during business hours
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-12 bg-gray-50 border-t">
        <div className="container">
          <div className="text-center">
            <p className="text-gray-600 mb-6">Trusted by leading commercial properties across the UK</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-2xl font-bold text-gray-400">TechHub</div>
              <div className="text-2xl font-bold text-gray-400">Metro Centre</div>
              <div className="text-2xl font-bold text-gray-400">University</div>
              <div className="text-2xl font-bold text-gray-400">Heritage Trust</div>
              <div className="text-2xl font-bold text-gray-400">Industrial Ltd</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}