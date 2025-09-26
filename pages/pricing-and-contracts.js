// pages/pricing.js
import Layout from '../components/layout';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Pricing() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const faqRef = useRef(null);

  // Add to cards ref array
  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Only run animations on client side
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          }
        }
      );

      // Cards stagger animation
      gsap.fromTo(cardsRef.current, 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );

      // FAQ section animation
      gsap.fromTo(faqRef.current, 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: faqRef.current,
            start: 'top 80%',
          }
        }
      );

      // Hover animations for cards
      cardsRef.current.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { 
            y: -10, 
            duration: 0.3,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, { 
            y: 0, 
            duration: 0.3,
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          });
        });
      });
    });

    return () => ctx.revert(); // Cleanup
  }, []);

  const pricingPlans = [
    {
      name: 'Starter',
      description: 'Perfect for small commercial properties',
      price: '£299',
      period: 'per month',
      popular: false,
      features: [
        'Basic lawn maintenance',
        'Hedge trimming (quarterly)',
        'Weed control',
        'Litter collection',
        'Monthly site inspection',
        'Email support'
      ],
      cta: 'Get Started',
      color: 'bg-white'
    },
    {
      name: 'Professional',
      description: 'Ideal for medium-sized businesses',
      price: '£599',
      period: 'per month',
      popular: true,
      features: [
        'All Starter features',
        'Weekly lawn maintenance',
        'Monthly hedge trimming',
        'Seasonal planting',
        'Irrigation system checks',
        'Priority phone support',
        '24/7 emergency call-out',
        'Detailed monthly reports'
      ],
      cta: 'Most Popular',
      color: 'bg-primary bg-opacity-5 border-2 border-primary'
    },
    {
      name: 'Enterprise',
      description: 'Complete solution for large properties',
      price: '£999',
      period: 'per month',
      popular: false,
      features: [
        'All Professional features',
        'Daily maintenance visits',
        'Dedicated site manager',
        'Advanced tree care',
        'Landscaping services',
        'Snow clearance included',
        '24/7 dedicated support',
        'Custom reporting dashboard',
        'Quarterly strategy meetings'
      ],
      cta: 'Contact Sales',
      color: 'bg-white'
    }
  ];

  const faqItems = [
    {
      question: 'Are there any hidden costs?',
      answer: 'No, our pricing is completely transparent. The monthly fee includes all labor, equipment, and basic materials. Any additional services would be quoted separately with your approval.'
    },
    {
      question: 'Can I change plans later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated and take effect from your next billing cycle.'
    },
    {
      question: 'Do you offer discounts for annual contracts?',
      answer: 'Yes, we offer a 10% discount for annual pre-payment. Contact our sales team for more information.'
    },
    {
      question: 'What areas do you cover?',
      answer: 'We cover the entire UK with our nationwide network of qualified teams. Remote locations may have additional travel costs which we\'ll discuss upfront.'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-headline font-bold mb-6">Transparent Pricing</h1>
            <p className="text-xl opacity-90 mb-8">
              Competitive pricing plans designed for commercial properties of all sizes. 
              No hidden fees, no surprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#pricing" className="btn btn-white btn-lg">
                View Plans
              </Link>
              <Link href="/contact" className="btn btn-outline-white btn-lg">
                Get Custom Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section id="pricing" ref={sectionRef} className="py-20 bg-bgLight">
        <div className="container">
          <div ref={titleRef} className="text-center mb-16">
            <h2 className="text-4xl font-headline font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-darkSlate max-w-2xl mx-auto">
              Choose the plan that best fits your property maintenance needs. All plans include our quality guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.name}
                ref={addToCardsRef}
                className={`${plan.color} rounded-xl p-8 shadow-lg relative transition-all duration-300 ${
                  plan.popular ? 'transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-headline font-bold mb-2">{plan.name}</h3>
                  <p className="text-darkSlate mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-primary">{plan.price}</span>
                    <span className="text-darkSlate ml-2">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href={plan.popular ? "/get-a-quote" : "/contact"} 
                  className={`btn w-full text-center ${
                    plan.popular ? 'btn-primary' : 'btn-outline'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-darkSlate">
              Need a custom solution?{' '}
              <Link href="/contact" className="text-primary font-semibold hover:underline">
                Contact us for a tailored quote
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-20 bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-4xl font-headline font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-bgLight rounded-lg p-6">
                <h3 className="text-xl font-headline font-semibold mb-3">{item.question}</h3>
                <p className="text-darkSlate">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-headline font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of commercial property owners who trust us with their maintenance needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-a-quote" className="btn btn-white btn-lg">
              Get Instant Quote
            </Link>
            <Link href="/contact" className="btn btn-outline-white btn-lg">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}