import Layout from '../../components/layout';

export default function Documents() {
  const documents = [
    { name: 'Insurance Certificate', type: 'PDF', size: '2.1 MB' },
    { name: 'Sample SLA', type: 'PDF', size: '1.5 MB' },
    { name: 'Terms & Conditions', type: 'PDF', size: '0.8 MB' },
  ];

  return (
    <Layout>
      <section className="bg-primary text-white py-16">
        <div className="container">
          <h1 className="text-4xl font-headline font-bold mb-4">Documents</h1>
          <p className="text-xl max-w-3xl">
            Access our public documents and certificates.
          </p>
        </div>
      </section>

      <section className="py-16 bg-bgLight">
        <div className="container">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-headline mb-6">Public Documents</h2>
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{doc.name}</h3>
                    <p className="text-sm text-gray-600">{doc.type} • {doc.size}</p>
                  </div>
                  <button className="btn btn-primary">Download</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}