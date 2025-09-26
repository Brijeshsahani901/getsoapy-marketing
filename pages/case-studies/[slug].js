// pages/case-studies/[slug].js
import Layout from "../../components/layout";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const caseStudiesData = {
  "commercial-office-park-transformation": {
    id: 1,
    title: "Commercial Office Park Transformation",
    client: "TechHub Business Park",
    category: "Grounds Maintenance",
    duration: "6 Months",
    location: "London, UK",
    year: "2023",
    challenge:
      "TechHub Business Park, a 50-acre commercial property, was struggling with overgrown vegetation, poor drainage, and escalating maintenance costs that were affecting tenant satisfaction and property value. The property had inconsistent maintenance standards across different zones and lacked a cohesive landscape strategy.",
    solution:
      "We implemented a comprehensive grounds maintenance program including regular scheduled maintenance, drainage system improvements, and sustainable planting schemes tailored to the specific needs of a high-traffic commercial environment. Our team conducted a full site assessment and developed a phased approach to transform the property.",
    results: [
      { metric: "40%", label: "Reduction in annual maintenance costs" },
      { metric: "95%", label: "Tenant satisfaction score" },
      { metric: "24/7", label: "Maintenance coverage" },
      { metric: "50%", label: "Water usage reduction" },
    ],
    gallery: [
      "/images/case-study-1-1.jpg",
      "/images/case-study-1-2.jpg",
      "/images/case-study-1-3.jpg",
    ],
    testimonial: {
      text: "The transformation has been remarkable. Our property has never looked better, and the cost savings have exceeded our expectations. The professional approach and attention to detail were outstanding.",
      author: "Sarah Johnson",
      position: "Property Manager, TechHub Business Park",
    },
  },
  "historic-estate-restoration": {
    id: 2,
    title: "Historic Estate Restoration",
    client: "Heritage Trust UK",
    category: "Landscaping & Softworks",
    duration: "12 Months",
    location: "Cotswolds, UK",
    year: "2023",
    challenge:
      "A Grade II listed estate required sensitive restoration while maintaining historical integrity. The project involved delicate ecosystem management, historical preservation compliance, and working within strict conservation guidelines without modernizing the landscape character.",
    solution:
      "We employed specialist historical landscaping techniques, using traditional methods and native plant species. Our team worked closely with conservation officers to ensure all work met heritage requirements while implementing sustainable maintenance practices for long-term preservation.",
    results: [
      { metric: "Award", label: "Heritage Conservation Award 2023" },
      { metric: "60%", label: "Energy efficiency improvement" },
      { metric: "100%", label: "Preservation goals met" },
      { metric: "5,000+", label: "Native plants installed" },
    ],
    gallery: [
      "/images/case-study-2-1.jpg",
      "/images/case-study-2-2.jpg",
      "/images/case-study-2-3.jpg",
    ],
    testimonial: {
      text: "Their expertise in historical landscaping was invaluable. They balanced modern maintenance needs with historical authenticity perfectly, and the estate has never looked more authentic.",
      author: "Dr. James Wilson",
      position: "Conservation Director, Heritage Trust UK",
    },
  },
  "emergency-storm-damage-response": {
    id: 3,
    title: "Emergency Storm Damage Response",
    client: "Retail Chain UK",
    category: "Reactive Maintenance",
    duration: "48 Hours",
    location: "Nationwide",
    year: "2023",
    challenge:
      "Severe nationwide storms caused significant damage across 25 retail locations, requiring immediate response to ensure safety, prevent further damage, and minimize business disruption. Multiple sites needed simultaneous attention with urgent safety concerns.",
    solution:
      "We deployed our emergency response teams across the country within 2 hours of notification. Our centralized coordination system managed resources efficiently, while working closely with insurance assessors to document damage and begin immediate repairs.",
    results: [
      { metric: "2 Hours", label: "Average response time" },
      { metric: "100%", label: "Safety compliance achieved" },
      { metric: "£50K", label: "Insurance claims managed" },
      { metric: "25", label: "Sites secured simultaneously" },
    ],
    gallery: [
      "/images/case-study-3-1.jpg",
      "/images/case-study-3-2.jpg",
      "/images/case-study-3-3.jpg",
    ],
    testimonial: {
      text: "Their emergency response was exceptional. Within hours, teams were on site securing our properties and minimizing disruption. Their coordination with our insurance company made the process seamless.",
      author: "Michael Thompson",
      position: "National Operations Manager, Retail Chain UK",
    },
  },
  "university-campus-tree-management": {
    id: 4,
    title: "University Campus Tree Management",
    client: "University of Cambridge",
    category: "Tree Work",
    duration: "Ongoing",
    location: "Cambridge, UK",
    year: "2022-Present",
    challenge:
      "A historic university campus with 500+ mature trees required comprehensive management balancing safety, preservation, and aesthetic considerations. The project involved managing trees of historical significance while ensuring campus safety during high foot-traffic periods.",
    solution:
      "We implemented a campus-wide tree survey and management plan, using advanced arboricultural techniques. Our approach included seasonal management aligned with academic calendars, proactive risk assessment, and preservation of historically significant specimens.",
    results: [
      { metric: "500+", label: "Trees managed professionally" },
      { metric: "0", label: "Safety incidents recorded" },
      { metric: "5 Years", label: "Comprehensive management plan" },
      { metric: "98%", label: "Tree health improvement" },
    ],
    gallery: [
      "/images/case-study-4-1.jpg",
      "/images/case-study-4-2.jpg",
      "/images/case-study-4-3.jpg",
    ],
    testimonial: {
      text: "The tree management program has transformed our campus safety and aesthetics. Their expertise in preserving historical trees while managing risks has been outstanding.",
      author: "Professor Emma Davis",
      position: "Estate Director, University of Cambridge",
    },
  },
  "shopping-centre-winter-preparedness": {
    id: 5,
    title: "Shopping Centre Winter Preparedness",
    client: "Metro Shopping Centre",
    category: "Seasonal Services",
    duration: "Winter Season",
    location: "Manchester, UK",
    year: "2022-2023",
    challenge:
      "A major shopping centre with 200+ retail units required guaranteed access during severe winter weather. The challenge involved maintaining safe access across multiple entrances, car parks, and pedestrian routes while minimizing disruption to 24/7 operations.",
    solution:
      "We developed a proactive winter service plan with advanced weather monitoring, strategic gritting routes, and dedicated winter teams. The plan included real-time weather response protocols and coordination with centre management for optimal timing of operations.",
    results: [
      { metric: "100%", label: "Access maintained throughout winter" },
      { metric: "0", label: "Weather-related closures" },
      { metric: "30 Min", label: "Gritting response time guarantee" },
      { metric: "200+", label: "Retail units supported" },
    ],
    gallery: [
      "/images/case-study-5-1.jpg",
      "/images/case-study-5-2.jpg",
      "/images/case-study-5-3.jpg",
    ],
    testimonial: {
      text: "Their winter service ensured our centre remained operational during the worst weather conditions. The proactive approach and rapid response times exceeded our expectations.",
      author: "Lisa Chen",
      position: "Centre Manager, Metro Shopping Centre",
    },
  },
  "industrial-estate-revitalization": {
    id: 6,
    title: "Industrial Estate Revitalization",
    client: "Industrial Properties Ltd",
    category: "Complete Solution",
    duration: "9 Months",
    location: "Birmingham, UK",
    year: "2023",
    challenge:
      "A 100-acre industrial estate with diverse tenant needs required a complete maintenance overhaul. The estate suffered from inconsistent service quality, high operational costs, and declining tenant satisfaction across multiple property types and usage patterns.",
    solution:
      "We designed customized service packages for different tenant types, implemented efficient routing systems, and introduced cost-effective maintenance solutions. Our approach included regular tenant consultations and flexible service adjustments based on feedback.",
    results: [
      { metric: "45%", label: "Tenant satisfaction increase" },
      { metric: "20%", label: "Operational efficiency gain" },
      { metric: "98%", label: "Service level compliance" },
      { metric: "100 Acres", label: "Estate successfully managed" },
    ],
    gallery: [
      "/images/case-study-6-1.jpg",
      "/images/case-study-6-2.jpg",
      "/images/case-study-6-3.jpg",
    ],
    testimonial: {
      text: "The revitalization program has transformed our industrial estate. Tenant satisfaction has soared, and the operational efficiencies have significantly reduced our costs while improving service quality.",
      author: "David Roberts",
      position: "Portfolio Manager, Industrial Properties Ltd",
    },
  },
};

export default function CaseStudyDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !slug) return;

    const ctx = gsap.context(() => {
      // Content animations
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        }
      );

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

      // Image parallax effect
      gsap.to(imageRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Stats counter
      const counters = statsRef.current?.querySelectorAll(".counter");
      counters?.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        ScrollTrigger.create({
          trigger: counter,
          start: "top 80%",
          onEnter: () => {
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              counter.textContent = Math.floor(current).toLocaleString();
            }, 16);
          },
        });
      });
    });

    return () => ctx.revert();
  }, [slug]);

    if (!slug || !caseStudiesData[slug]) {
      return  <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-darkSlate">Loading Case Study...</p>
          </div>
        </div>
      </Layout>;
    }

  const study = caseStudiesData[slug];

  return (
    <Layout>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-96 bg-gradient-to-r from-primary to-primary-dark text-white overflow-hidden"
      >
        <div
          ref={imageRef}
          className="absolute inset-0 bg-gray-800 opacity-20"
        ></div>
        <div className="container relative z-10 h-full flex items-center">
          <div>
            <span className="bg-white text-primary px-4 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
              {study.category}
            </span>
            <h1 className="text-5xl font-headline font-bold mb-4">
              {study.title}
            </h1>
            <p className="text-xl opacity-90">
              {study.client} • {study.location} • {study.year}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2" ref={contentRef}>
              <h2 className="text-3xl font-headline font-bold mb-6">
                The Challenge
              </h2>
              <p className="text-lg text-darkSlate mb-8">{study.challenge}</p>

              <h2 className="text-3xl font-headline font-bold mb-6">
                Our Solution
              </h2>
              <p className="text-lg text-darkSlate mb-8">{study.solution}</p>

              {/* Gallery Placeholder */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="aspect-square bg-gray-200 rounded-lg"
                  ></div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-bgLight p-6 rounded-lg">
                <h3 className="text-xl font-headline font-bold mb-4">
                  Project Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold">Duration:</span>
                    <p>{study.duration}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Location:</span>
                    <p>{study.location}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Category:</span>
                    <p>{study.category}</p>
                  </div>
                </div>
              </div>

              {/* Results Stats */}
              <div
                ref={statsRef}
                className="bg-primary text-white p-6 rounded-lg"
              >
                <h3 className="text-xl font-headline font-bold mb-4">
                  Key Results
                </h3>
                <div className="space-y-4">
                  {study.results.map((result, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="text-3xl font-bold counter"
                        data-target={parseInt(result.metric)}
                      >
                        0
                      </div>
                      <p className="text-sm opacity-90">{result.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-bgLight">
        <div className="container max-w-4xl text-center">
          <blockquote className="text-2xl italic text-darkSlate mb-6">
            "{study.testimonial.text}"
          </blockquote>
          <div>
            <p className="font-semibold">{study.testimonial.author}</p>
            <p className="text-darkSlate">{study.testimonial.position}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
