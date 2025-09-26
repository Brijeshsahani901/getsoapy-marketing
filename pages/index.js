import Layout from '../components/layout';
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import ServiceCard from '../components/ServiceCard';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const services = [
    {
      title: 'Grounds Maintenance',
      description: 'Regular maintenance to keep your grounds in pristine condition year-round.',
      icon: '🌿',
      link: '/services/grounds-maintenance'
    },
    {
      title: 'Landscaping & Softworks',
      description: 'Creative landscaping solutions to enhance your property\'s appeal.',
      icon: '🏞️',
      link: '/services/landscaping-softworks'
    },
    {
      title: 'Reactive Property Maintenance',
      description: 'Quick response to urgent maintenance issues on your property.',
      icon: '⚡',
      link: '/services/reactive-property-maintenance'
    },
    {
      title: 'Tree Work',
      description: 'Professional tree care, pruning, and removal services.',
      icon: '🌳',
      link: '/services/tree-work'
    }
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Survey',
      description: 'We assess your site and discuss your requirements'
    },
    {
      step: '2',
      title: 'Quote',
      description: 'We provide a detailed, transparent quote'
    },
    {
      step: '3',
      title: 'Delivery',
      description: 'Our team delivers quality work on schedule'
    }
  ];

  const caseStudies = [
    {
      id: 1,
      title: 'Commercial Park Restoration',
        route: 'commercial-office-park-transformation',
      service: 'Grounds Maintenance',
      image: '/images/case-study-1.jpg',
      summary: 'Transformed a neglected public space into a vibrant community area.'
    },
    {
      id: 2,
      title: 'Corporate Campus Landscaping',
        route: 'industrial-estate-revitalization',
      service: 'Landscaping & Softworks',
      image: '/images/case-study-2.jpg',
      summary: 'Designed and implemented sustainable landscaping for a tech campus.'
    },
    {
      id: 3,
      title: 'Emergency Storm Damage Repair',
        route: 'emergency-storm-damage-response',
      service: 'Reactive Property Maintenance',
      image: '/images/case-study-3.jpg',
      summary: 'Rapid response to storm damage at a retail complex.'
    }
  ];

  // Refs for animation targets
  const heroRef = useRef(null);
  const trustStripRef = useRef(null);
  const servicesRef = useRef(null);
  const howItWorksRef = useRef(null);
  const caseStudiesRef = useRef(null);
  const kpiRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Hero animation
    gsap.fromTo(heroRef.current, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        ease: "power3.out"
      }
    );

    // Trust strip animation
    gsap.fromTo(trustStripRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.5,
        scrollTrigger: {
          trigger: trustStripRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Services section animation
    gsap.fromTo(servicesRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Service cards staggered animation
    gsap.fromTo(".service-card",
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.3,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // How It Works section animation
    gsap.fromTo(howItWorksRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: howItWorksRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // How It Works steps staggered animation
    gsap.fromTo(".how-it-works-step",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.3,
        delay: 0.2,
        scrollTrigger: {
          trigger: howItWorksRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Case Studies section animation
    gsap.fromTo(caseStudiesRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: caseStudiesRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Case studies cards staggered animation
    gsap.fromTo(".case-study-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.3,
        scrollTrigger: {
          trigger: caseStudiesRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // KPI section animation
    gsap.fromTo(kpiRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: kpiRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // KPI numbers count up animation
    gsap.fromTo(".kpi-number",
      { innerText: 0 },
      {
        innerText: function(index) {
          const values = [98, 95, 2];
          return values[index];
        },
        duration: 2,
        snap: { innerText: 1 },
        stagger: 0.5,
        scrollTrigger: {
          trigger: kpiRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Footer CTA animation
    gsap.fromTo(ctaRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Clean up function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <div ref={heroRef}>
        <Hero 
          title="Reliable Grounds & Property Services"
          subtitle="Professional, trustworthy commercial property maintenance with over 15 years of experience"
          primaryCta="Get a Quote"
          primaryLink="/get-a-quote"
          secondaryCta="Client Login"
          secondaryLink="/client-bookings"
        />
      </div>

      {/* Trust Strip */}
      <div ref={trustStripRef}>
        <TrustStrip />
      </div>

      {/* Services Section */}
      <section ref={servicesRef} className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-headline mb-4">Our Services</h2>
            <p className="text-lg text-darkSlate max-w-3xl mx-auto">
              Comprehensive property maintenance solutions tailored to commercial clients across multiple sectors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  link={service.link}
                />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/services" className="btn btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksRef} className="py-16 bg-bgLight">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-headline mb-4">How It Works</h2>
            <p className="text-lg text-darkSlate max-w-3xl mx-auto">
              Our straightforward process ensures your property maintenance needs are met efficiently and effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="how-it-works-step text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-headline mb-2">{step.title}</h3>
                <p className="text-darkSlate">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section ref={caseStudiesRef} className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-headline mb-4">Featured Case Studies</h2>
            <p className="text-lg text-darkSlate max-w-3xl mx-auto">
              See how we've helped businesses like yours maintain and enhance their properties.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <div key={study.id} className="case-study-card bg-bgLight rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">Project Image</span>
                </div>
                <div className="p-6">
                  <span className="text-sm text-primary font-medium">{study.service}</span>
                  <h3 className="text-xl font-headline my-2">{study.title}</h3>
                  <p className="text-darkSlate mb-4">{study.summary}</p>
                  <Link href={`/case-studies/${study.route}`} className="btn btn-tertiary">
                    View Case Study
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/case-studies" className="btn btn-primary">
              View All Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* KPI Section */}
      <section ref={kpiRef} className="py-16 bg-primary text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="kpi-number text-4xl font-bold mb-2">98%</div>
              <div className="text-lg">On-time Completion</div>
            </div>
            <div>
              <div className="kpi-number text-4xl font-bold mb-2">95%</div>
              <div className="text-lg">Client Satisfaction</div>
            </div>
            <div>
              <div className="kpi-number text-4xl font-bold mb-2">2hr</div>
              <div className="text-lg">Avg. Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section ref={ctaRef} className="py-12 bg-accent text-white bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="container text-center">
          <h2 className="text-2xl font-headline mb-4">Urgent issue? Call now</h2>
          <a href="tel:+441234567890" className="text-3xl font-bold hover:underline">
            +44 123 456 7890
          </a>
          <p className="mt-2">24/7 emergency response available</p>
        </div>
      </section>
    </Layout>
  );
}