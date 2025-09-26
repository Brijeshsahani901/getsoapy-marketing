// pages/case-studies.js
import Layout from '../components/layout';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CaseStudies() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const filtersRef = useRef(null);
  const caseStudiesRef = useRef([]);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  // Add to case studies ref array
  const addToCaseStudiesRef = (el) => {
    if (el && !caseStudiesRef.current.includes(el)) {
      caseStudiesRef.current.push(el);
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

      // Filters animation
      gsap.fromTo(filtersRef.current, 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          delay: 0.6,
          scrollTrigger: {
            trigger: filtersRef.current,
            start: 'top 80%',
          }
        }
      );

      // Case studies stagger animation
      caseStudiesRef.current.forEach((card, index) => {
        gsap.fromTo(card, 
          { y: 80, opacity: 0, scale: 0.9 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            }
          }
        );

        // Hover animation
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -8,
            duration: 0.4,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      });

      // Stats counter animation
      const counters = statsRef.current?.querySelectorAll('.counter');
      if (counters) {
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: () => {
              const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                  current = target;
                  clearInterval(timer);
                }
                counter.textContent = Math.floor(current).toLocaleString();
              }, 16);
            }
          });
        });
      }

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
    });

    return () => ctx.revert();
  }, []);

  const caseStudies = [
    {
      id: 1,
      title: 'Commercial Office Park Transformation',
      client: 'TechHub Business Park',
      category: 'Grounds Maintenance',
      duration: '6 Months',
      location: 'London, UK',
      image: '/images/case-study-1.jpg',
      excerpt: 'Complete grounds transformation for a 50-acre business park, improving aesthetics and reducing maintenance costs.',
      challenges: ['Overgrown vegetation', 'Poor drainage systems', 'High maintenance costs'],
      solutions: ['Regular maintenance schedule', 'Drainage improvement', 'Sustainable planting'],
      results: [
        { metric: '40%', label: 'Reduction in maintenance costs' },
        { metric: '95%', label: 'Client satisfaction score' },
        { metric: '24/7', label: 'Maintenance coverage' }
      ],
      slug: 'commercial-office-park-transformation'
    },
    {
      id: 2,
      title: 'Historic Estate Restoration',
      client: 'Heritage Trust UK',
      category: 'Landscaping & Softworks',
      duration: '12 Months',
      location: 'Cotswolds, UK',
      image: '/images/case-study-2.jpg',
      excerpt: 'Sensitive restoration of a Grade II listed estate, preserving historical features while modernizing maintenance.',
      challenges: ['Historical preservation requirements', 'Delicate ecosystem', 'Limited access'],
      solutions: ['Specialist historical landscaping', 'Eco-friendly practices', 'Custom equipment'],
      results: [
        { metric: 'Award', label: 'Heritage Conservation Award' },
        { metric: '60%', label: 'Energy efficiency improvement' },
        { metric: '100%', label: 'Preservation goals met' }
      ],
      slug: 'historic-estate-restoration'
    },
    {
      id: 3,
      title: 'Emergency Storm Damage Response',
      client: 'Retail Chain UK',
      category: 'Reactive Maintenance',
      duration: '48 Hours',
      location: 'Nationwide',
      image: '/images/case-study-3.jpg',
      excerpt: 'Rapid response to nationwide storm damage across 25 retail locations, minimizing business disruption.',
      challenges: ['Multiple locations', 'Urgent safety concerns', 'Insurance coordination'],
      solutions: ['24/7 emergency teams', 'Centralized coordination', 'Insurance partnership'],
      results: [
        { metric: '2 Hours', label: 'Average response time' },
        { metric: '100%', label: 'Safety compliance' },
        { metric: '£50K', label: 'Insurance claims managed' }
      ],
      slug: 'emergency-storm-damage-response'
    },
    {
      id: 4,
      title: 'University Campus Tree Management',
      client: 'University of Cambridge',
      category: 'Tree Work',
      duration: 'Ongoing',
      location: 'Cambridge, UK',
      image: '/images/case-study-4.jpg',
      excerpt: 'Comprehensive tree care program for a historic university campus, ensuring safety and preservation.',
      challenges: ['Mature tree management', 'Campus safety', 'Academic calendar coordination'],
      solutions: ['Campus-wide tree survey', 'Seasonal management plan', 'Safety-first approach'],
      results: [
        { metric: '500+', label: 'Trees managed' },
        { metric: '0', label: 'Safety incidents' },
        { metric: '5 Years', label: 'Management plan' }
      ],
      slug: 'university-campus-tree-management'
    },
    {
      id: 5,
      title: 'Shopping Centre Winter Preparedness',
      client: 'Metro Shopping Centre',
      category: 'Seasonal Services',
      duration: 'Winter Season',
      location: 'Manchester, UK',
      image: '/images/case-study-5.jpg',
      excerpt: 'Proactive winter service plan ensuring uninterrupted access for 200+ retail units during severe weather.',
      challenges: ['High foot traffic', 'Multiple access points', '24/7 operation'],
      solutions: ['Advanced weather monitoring', 'Strategic gritting routes', 'Dedicated winter team'],
      results: [
        { metric: '100%', label: 'Access maintained' },
        { metric: '0', label: 'Weather-related closures' },
        { metric: '30 Min', label: 'Gritting response time' }
      ],
      slug: 'shopping-centre-winter-preparedness'
    },
    {
      id: 6,
      title: 'Industrial Estate Revitalization',
      client: 'Industrial Properties Ltd',
      category: 'Complete Solution',
      duration: '9 Months',
      location: 'Birmingham, UK',
      image: '/images/case-study-6.jpg',
      excerpt: 'Complete property maintenance overhaul for a 100-acre industrial estate, increasing tenant satisfaction.',
      challenges: ['Diverse tenant needs', 'Large area coverage', 'Budget constraints'],
      solutions: ['Customized service packages', 'Efficient routing system', 'Cost-effective solutions'],
      results: [
        { metric: '45%', label: 'Tenant satisfaction increase' },
        { metric: '20%', label: 'Operational efficiency gain' },
        { metric: '98%', label: 'Service level compliance' }
      ],
      slug: 'industrial-estate-revitalization'
    }
  ];

//   const categories = ['All', 'Grounds Maintenance', 'Landscaping & Softworks', 'Reactive Maintenance', 'Tree Work', 'Seasonal Services'];

  return (
    <Layout>
      {/* Hero Section */}
      <section ref={heroRef} className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-95"></div>
        <div className="container relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 ref={titleRef} className="text-6xl font-headline font-bold mb-6">Case Studies</h1>
            <p ref={subtitleRef} className="text-xl opacity-90 mb-8">
              Discover how we've helped commercial properties across the UK achieve exceptional results through our tailored maintenance solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#case-studies" className="btn btn-white btn-lg">
                View Projects
              </Link>
              <Link href="/contact" className="btn btn-outline-white btn-lg">
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-white border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2 counter" data-target="250">0</div>
              <p className="text-darkSlate">Projects Completed</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2 counter" data-target="98">0</div>
              <p className="text-darkSlate">Client Satisfaction</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2 counter" data-target="50">0</div>
              <p className="text-darkSlate">Awards Won</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2 counter" data-target="24">0</div>
              <p className="text-darkSlate">UK Regions Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section id="case-studies" className="py-20 bg-bgLight">
        <div className="container">
          {/* Filters */}
          {/* <div ref={filtersRef} className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-3 rounded-full border border-gray-300 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                {category}
              </button>
            ))}
          </div> */}

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <article
                key={study.id}
                ref={addToCaseStudiesRef}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 bg-gradient-to-br from-primary to-primary-dark">
                  {/* Placeholder for image - replace with actual Image component */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white text-primary px-3 py-1 rounded-full text-sm font-semibold">
                      {study.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-sm opacity-90">{study.duration}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-headline font-bold mb-2">{study.title}</h3>
                  <p className="text-darkSlate mb-4">{study.excerpt}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-sm text-gray-600">Client:</span>
                      <p className="font-semibold">{study.client}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-600">Location:</span>
                      <p className="font-semibold">{study.location}</p>
                    </div>
                  </div>

                  {/* Results Preview */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {study.results.slice(0, 3).map((result, idx) => (
                      <div key={idx} className="text-center p-2 bg-bgLight rounded">
                        <div className="font-bold text-primary text-sm">{result.metric}</div>
                        <div className="text-xs text-darkSlate">{result.label}</div>
                      </div>
                    ))}
                  </div>

                  <Link 
                    href={`/case-studies/${study.slug}`}
                    className="btn btn-outline w-full text-center btn-secondary"
                  >
                    View Case Study
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-white">
        <div className="container text-center">
          <h2 className="text-4xl font-headline font-bold mb-4">Ready to Start Your Success Story?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how we can transform your property maintenance challenges into success stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-a-quote" className="btn btn-primary btn-lg">
              Get Free Consultation
            </Link>
            <Link href="/contact" className="btn btn-outline btn-lg">
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}