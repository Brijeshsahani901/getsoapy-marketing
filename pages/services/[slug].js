// pages/services/[slug].js
import Layout from "../../components/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Service data - expanded with full content
const servicesData = {
  "grounds-maintenance": {
    title: "Grounds Maintenance",
    description:
      "Professional grounds maintenance services to keep your property looking its best year-round.",
    heroDescription:
      "Regular maintenance to keep your grounds in pristine condition year-round.",
    icon: "🌿",
    content: {
      overview:
        "Our grounds maintenance service provides regular, scheduled care to ensure your outdoor spaces remain clean, safe, and visually appealing throughout the year.",
      features: [
        "Lawn mowing and edging",
        "Hedge trimming and pruning",
        "Weed control and management",
        "Seasonal planting and bedding",
        "Litter collection and clearance",
        "Irrigation system maintenance",
        "Turf care and renovation",
      ],
      benefits: [
        "Enhanced property appearance",
        "Increased property value",
        "Preventative care reduces long-term costs",
        "Compliance with safety regulations",
      ],
    },
    serviceHighlights: [
      {
        title: "Response Time",
        description: "Within 2 hours for urgent requests",
      },
      { title: "Availability", description: "24/7 emergency service" },
      { title: "Coverage", description: "Nationwide service available" },
    ],
  },
  "landscaping-softworks": {
    title: "Landscaping & Softworks",
    description:
      "Creative landscaping solutions to enhance your property's appeal.",
    heroDescription:
      "Transform your outdoor spaces with our expert landscaping services.",
    icon: "🏞️",
    content: {
      overview:
        "Our landscaping and softworks service creates beautiful, functional outdoor environments that complement your property and meet your specific needs.",
      features: [
        "Garden design and planning",
        "Planting schemes and implementation",
        "Lawn installation and turfing",
        "Shrub and border creation",
        "Water feature installation",
        "Pathway and patio design",
        "Soil preparation and improvement",
      ],
      benefits: [
        "Custom-designed outdoor spaces",
        "Increased property curb appeal",
        "Sustainable landscaping solutions",
        "Professional project management",
      ],
    },
    serviceHighlights: [
      {
        title: "Design Phase",
        description: "2-4 weeks including consultations",
      },
      {
        title: "Project Timeline",
        description: "4-12 weeks depending on scope",
      },
      { title: "Warranty", description: "12-month guarantee on all plants" },
    ],
  },
  "reactive-property-maintenance": {
    title: "Reactive Property Maintenance",
    description:
      "Quick response to urgent maintenance issues on your property.",
    heroDescription:
      "Immediate solutions for unexpected property maintenance needs.",
    icon: "⚡",
    content: {
      overview:
        "Our reactive maintenance team is ready to respond quickly to unexpected issues, minimizing disruption and preventing small problems from becoming major expenses.",
      features: [
        "Emergency repairs and fixes",
        "24/7 call-out service",
        "Damage assessment and reporting",
        "Temporary safety measures",
        "Coordination with other trades",
        "Follow-up permanent repairs",
        "Documentation and reporting",
      ],
      benefits: [
        "Rapid response times",
        "Minimized business disruption",
        "Preventative problem-solving",
        "Single point of contact",
      ],
    },
    serviceHighlights: [
      {
        title: "Emergency Response",
        description: "Within 1 hour for critical issues",
      },
      { title: "Availability", description: "24/7/365 service coverage" },
      { title: "Technicians", description: "Fully qualified and DBS checked" },
    ],
  },
  "tree-work": {
    title: "Tree Work",
    description: "Professional tree care, pruning, and removal services.",
    heroDescription: "Expert tree care services for healthy, safe landscapes.",
    icon: "🌳",
    content: {
      overview:
        "Our certified arborists provide comprehensive tree care services, from routine maintenance to complex removals, ensuring the health and safety of your trees and property.",
      features: [
        "Tree pruning and shaping",
        "Dangerous tree removal",
        "Stump grinding and removal",
        "Tree health assessments",
        "Emergency storm damage clearance",
        "Hedge reduction and maintenance",
        "Tree planting and establishment",
      ],
      benefits: [
        "Certified arborist services",
        "Fully insured and compliant",
        "Healthier, safer trees",
        "Enhanced property safety",
      ],
    },
    serviceHighlights: [
      { title: "Certification", description: "NPTC certified arborists" },
      { title: "Insurance", description: "£5 million public liability" },
      { title: "Equipment", description: "State-of-the-art climbing gear" },
    ],
  },
  "seasonal-winter-services": {
    title: "Seasonal & Winter Services",
    description:
      "Specialist services for seasonal challenges and winter conditions.",
    heroDescription: "Year-round seasonal care for your property.",
    icon: "❄️",
    content: {
      overview:
        "Our seasonal services ensure your property remains safe, accessible, and well-maintained throughout the changing seasons, with specialized winter services for challenging conditions.",
      features: [
        "Gritting and snow clearance",
        "Winter preparation assessments",
        "Leaf clearance in autumn",
        "Spring clean-up services",
        "Summer bedding plant installation",
        "Drainage system maintenance",
        "Weather damage prevention",
      ],
      benefits: [
        "Proactive seasonal planning",
        "Reduced weather-related risks",
        "Year-round property protection",
        "Customized seasonal schedules",
      ],
    },
    serviceHighlights: [
      {
        title: "Winter Response",
        description: "Gritting within 1 hour of snowfall",
      },
      { title: "Monitoring", description: "24/7 weather monitoring service" },
      { title: "Equipment", description: "Fleet of gritters and snow ploughs" },
    ],
  },
};

export default function ServiceDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const service = servicesData[slug];

  // Refs for animations
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const contentRef = useRef(null);
  const featuresRef = useRef([]);
  const benefitsRef = useRef(null);
  const highlightsRef = useRef(null);
  const whyChooseRef = useRef(null);
  const ctaRef = useRef(null);

  // Add to features ref array
  const addToFeaturesRef = (el) => {
    if (el && !featuresRef.current.includes(el)) {
      featuresRef.current.push(el);
    }
  };

  useEffect(() => {
    if (!router.isReady || !service) return;

    // Prevent running animation logic on SSR
    if (typeof window === "undefined") return;

    // Clear previous features refs to avoid duplicates
    featuresRef.current = [];

    const ctx = gsap.context(() => {
      // Hero section animations
      if (titleRef.current && subtitleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
        );

        gsap.fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: "power3.out" }
        );
      }

      // Scroll-triggered sections
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
            },
          }
        );
      }

      if (featuresRef.current.length > 0) {
        gsap.fromTo(
          featuresRef.current,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 70%",
            },
          }
        );
      }

      if (benefitsRef.current) {
        gsap.fromTo(
          benefitsRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: benefitsRef.current,
              start: "top 80%",
            },
          }
        );
      }

      if (highlightsRef.current) {
        gsap.fromTo(
          highlightsRef.current,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: highlightsRef.current,
              start: "top 80%",
            },
          }
        );
      }

      if (whyChooseRef.current) {
        gsap.fromTo(
          whyChooseRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: whyChooseRef.current,
              start: "top 80%",
            },
          }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: 0.5,
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
            },
          }
        );
      }

      // Background pattern animation
      const bgPattern = heroRef.current?.querySelector(".bg-pattern");
      if (bgPattern) {
        gsap.to(bgPattern, {
          rotation: 5,
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Hover effect for highlights
      const highlightItems =
        highlightsRef.current?.querySelectorAll(".highlight-item");
      highlightItems?.forEach((item) => {
        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            x: 5,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            x: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    });

    return () => ctx.revert();
  }, [router.isReady, slug]);

  // Show loading state while router is ready
//   if (isLoading) {
//     return (
//       <Layout>
//         <div className="min-h-screen flex items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
//             <p className="mt-4 text-darkSlate">Loading service details...</p>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

  // Handle unknown service slugs
  if (!service) {
    return (
      <Layout>
        <section className="bg-primary text-white py-16">
          <div className="container">
            <h1 className="text-4xl font-headline font-bold mb-4">
              Service Not Found
            </h1>
            <p className="text-xl">The requested service could not be found.</p>
            <Link href="/services" className="btn btn-white mt-4">
              Back to Services
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section with Animated Background */}
      <section
        ref={heroRef}
        className="bg-primary text-white py-20 relative overflow-hidden"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="bg-pattern absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1
              ref={titleRef}
              className="text-5xl md:text-6xl font-headline font-bold mb-6"
            >
              {service.title}
            </h1>
            <p
              ref={subtitleRef}
              className="text-xl md:text-2xl opacity-90 leading-relaxed"
            >
              {service.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2" ref={contentRef}>
              <h2 className="text-4xl font-headline font-bold mb-6">
                Comprehensive {service.title}
              </h2>
              <p className="text-lg text-darkSlate mb-8 leading-relaxed">
                {service.content.overview}
              </p>

              <h3 className="text-2xl font-headline font-bold mb-6">
                Service Includes:
              </h3>
              <ul className="space-y-4 mb-8">
                {service.content.features.map((feature, index) => (
                  <li
                    key={index}
                    ref={addToFeaturesRef}
                    className="flex items-start bg-bgLight p-4 rounded-lg transition-all duration-300 hover:bg-primary hover:bg-opacity-5 hover:translate-x-2"
                  >
                    <svg
                      className="w-6 h-6 text-primary mr-4 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
              <div ref={(el) => (benefitsRef.current = el)}>
                <h3 className="text-2xl font-headline font-bold mb-6">
                  Key Benefits:
                </h3>
                <ul className="space-y-3 mb-8">
                  {service.content.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="text-darkSlate text-lg flex items-start"
                    >
                      <span className="text-primary mr-3 text-xl">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                ref={ctaRef}
                href="/get-a-quote"
                className="btn btn-primary btn-lg group relative overflow-hidden inline-block"
              >
                <span className="relative z-10">Request a Free Survey</span>
                <div className="absolute inset-0 bg-primary-dark transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div
                ref={highlightsRef}
                className="bg-bgLight p-8 rounded-xl shadow-lg"
              >
                <h3 className="text-2xl font-headline font-bold mb-6">
                  Service Highlights
                </h3>
                <div className="space-y-6">
                  {service.serviceHighlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="highlight-item p-4 bg-white rounded-lg transition-all duration-300"
                    >
                      <h4 className="font-headline font-semibold text-lg mb-2">
                        {highlight.title}
                      </h4>
                      <p className="text-darkSlate">{highlight.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary text-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-headline font-bold mb-4">
                  Ready to Get Started?
                </h3>
                <p className="mb-6 opacity-90">
                  Contact us today for a free consultation and personalized
                  quote.
                </p>
                <Link
                  href="/contact"
                  className="btn btn-white btn-outline-white w-full text-center group"
                >
                  <span className="group-hover:text-primary transition-colors duration-300">
                    Contact Our Team
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section ref={whyChooseRef} className="py-20 bg-bgLight">
        <div className="container">
          <h2 className="text-4xl font-headline font-bold text-center mb-12">
            Why Choose Our {service.title}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-headline font-bold mb-3">
                Expert Team
              </h3>
              <p className="text-darkSlate">
                Highly trained professionals with years of experience in
                commercial property maintenance.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-headline font-bold mb-3">
                Rapid Response
              </h3>
              <p className="text-darkSlate">
                Quick turnaround times to minimize disruption to your business
                operations.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-headline font-bold mb-3">
                Fully Insured
              </h3>
              <p className="text-darkSlate">
                Comprehensive insurance coverage for your peace of mind and
                protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional CTA Section */}
      <section className="py-16 bg-white border-t">
        <div className="container text-center">
          <h2 className="text-3xl font-headline font-bold mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-xl text-darkSlate mb-8 max-w-2xl mx-auto">
            Every property is unique. Let us create a tailored maintenance plan
            that fits your specific requirements and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-a-quote" className="btn btn-primary btn-lg">
              Get Custom Quote
            </Link>
            <Link href="/contact" className="btn btn-outline btn-lg">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// This function gets called at build time to generate static pages
export async function getStaticPaths() {
  const paths = Object.keys(servicesData).map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

// This function gets called at build time to generate static props
export async function getStaticProps({ params }) {
  return {
    props: {},
  };
}
