import { useState, useEffect, useRef } from 'react';
import Layout from '../components/layout';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GetAQuote() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    service: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Refs for animation
  const heroSectionRef = useRef(null);
  const formSectionRef = useRef(null);
  const formRef = useRef(null);
  const successRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getRecaptchaToken = async () => {
    if (typeof window.grecaptcha !== 'undefined') {
      return await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
        action: 'quote_submit'
      });
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const recaptchaToken = await getRecaptchaToken();
      
      const leadData = {
        source: 'website-quote-form',
        contact: {
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone
        },
        property: {
          address: formData.address
        },
        service_request: {
          service_type: formData.service,
          description: formData.description,
          urgency: 'standard'
        }
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leadData,
          recaptchaToken
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Submission failed');
      }

      // Animate success transition
      if (formRef.current) {
        gsap.to(formRef.current, {
          opacity: 0,
          y: -50,
          duration: 0.5,
          onComplete: () => {
            setIsSubmitted(true);
          }
        });
      } else {
        setIsSubmitted(true);
      }
    } catch (err) {
      setError(err.message);
      // Error animation
      if (formRef.current) {
        gsap.fromTo(formRef.current, 
          { x: -10 },
          { x: 0, duration: 0.3, ease: "elastic.out(1, 0.5)" }
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation on component mount
  useEffect(() => {
    if (isSubmitted && successRef.current) {
      // Animate success message
      gsap.fromTo(successRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      
      // Animate success icon
      const icon = successRef.current.querySelector('svg');
      if (icon) {
        gsap.fromTo(icon,
          { scale: 0, rotation: -180 },
          { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)", delay: 0.3 }
        );
      }
    }
  }, [isSubmitted]);

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

  // Form section animation
  useEffect(() => {
    if (formSectionRef.current && !isSubmitted) {
      gsap.fromTo(formSectionRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formSectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stagger animation for form elements
      const formElements = formSectionRef.current.querySelectorAll('input, select, textarea, button');
      gsap.fromTo(formElements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formSectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [isSubmitted]);

  if (isSubmitted) {
    return (
      <Layout>
        <section className="py-16 bg-bgLight" ref={successRef}>
          <div className="container max-w-2xl text-center">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-headline mb-4">Thank You!</h1>
              <p className="text-lg text-darkSlate mb-6">
                We've received your quote request and will contact you within 2 hours.
              </p>
              <p className="text-darkSlate">
                You may also receive a follow-up from GetSoapy to collect additional details.
              </p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-primary text-white py-16" ref={heroSectionRef}>
        <div className="container">
          <h1 className="text-4xl font-headline font-bold mb-4">Get a Quote</h1>
          <p className="text-xl max-w-3xl">
            Tell us about your project for a detailed, no-obligation quote within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-16 bg-bgLight" ref={formSectionRef}>
        <div className="container max-w-2xl">
          <div className="bg-white p-8 rounded-lg shadow-sm" ref={formRef}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-darkSlate mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-darkSlate mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-darkSlate mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-darkSlate mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="address" className="block text-sm font-medium text-darkSlate mb-2">
                  Site Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="service" className="block text-sm font-medium text-darkSlate mb-2">
                  Service Required *
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select a service</option>
                  <option value="grounds-maintenance">Grounds Maintenance</option>
                  <option value="landscaping-softworks">Landscaping & Softworks</option>
                  <option value="reactive-property-maintenance">Reactive Property Maintenance</option>
                  <option value="tree-work">Tree Work</option>
                  <option value="seasonal-winter-services">Seasonal & Winter Services</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-darkSlate mb-2">
                  Project Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn btn-primary text-lg py-3 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}