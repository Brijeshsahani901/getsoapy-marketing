// // lib/email.js
// export async function sendEmail({ to, subject, template, data }) {
//   // Implementation using your email service (SendGrid, Resend, etc.)
//   try {
//     const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${process.env.EMAIL_SERVICE_API_KEY}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         personalizations: [{ to: [{ email: to }] }],
//         from: { email: 'noreply@greenways-property.com', name: 'Greenways Property Services' },
//         subject: subject,
//         content: [{
//           type: 'text/html',
//           value: generateEmailTemplate(template, data)
//         }]
//       }),
//     });

//     return response.ok;
//   } catch (error) {
//     console.error('Email sending error:', error);
//     return false;
//   }
// }

// function generateEmailTemplate(template, data) {
//   // Generate HTML email template based on template name and data
//   switch (template) {
//     case 'new-lead':
//       return `
//         <h2>New Quote Request</h2>
//         <p><strong>Name:</strong> ${data.lead.contact.name}</p>
//         <p><strong>Company:</strong> ${data.lead.contact.company}</p>
//         <p><strong>Service:</strong> ${data.lead.service_request.service_type}</p>
//         <p><strong>GetSoapy Job ID:</strong> ${data.soapyJobId}</p>
//       `;
//     default:
//       return '<p>New notification</p>';
//   }
// }


export async function sendEmail({ to, subject, template, data }) {
  try {
    console.log('Sending email to:', to);
    console.log('Subject:', subject);
    
    // In production, integrate with your email service
    // For demo, we'll just log the email
    const emailContent = `
      New Lead Notification
      Name: ${data.lead.contact.name}
      Company: ${data.lead.contact.company}
      Email: ${data.lead.contact.email}
      Phone: ${data.lead.contact.phone}
      Service: ${data.lead.service_request.service_type}
      Description: ${data.lead.service_request.description}
    `;
    
    console.log(emailContent);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}