import Layout from '../components/layout';

export default function Contact() {
  return (
    <Layout>
      <section className="bg-primary text-white py-16">
        <div className="container">
          <h1 className="text-4xl font-headline font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl">
            Get in touch with our team for any inquiries or support needs.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-headline mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-headline mb-2">Phone</h3>
                  <a href="tel:+441234567890" className="text-primary text-lg">+44 123 456 7890</a>
                </div>
                <div>
                  <h3 className="text-xl font-headline mb-2">Email</h3>
                  <a href="mailto:info@greenways.com" className="text-primary text-lg">info@greenways.com</a>
                </div>
                <div>
                  <h3 className="text-xl font-headline mb-2">Address</h3>
                  <p className="text-lg">123 Business Park<br />City, PO Box 12345</p>
                </div>
              </div>
            </div>
            <div className="bg-bgLight p-8 rounded-lg">
              <h3 className="text-2xl font-headline mb-4">Emergency Contact</h3>
              <p className="mb-4">For urgent maintenance issues, call our 24/7 emergency line:</p>
              <a href="tel:+441234567890" className="btn btn-primary text-lg">Emergency: +44 123 456 7890</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}