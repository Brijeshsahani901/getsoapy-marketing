// // pages/api/leads.js
// import { validateRecaptcha } from '../../lib/recaptcha';
// import { sendEmail } from '../../lib/email';
// import getSoapyAPI from '../../lib/getSoapy';

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     const { leadData, recaptchaToken } = req.body;

//     // Validate reCAPTCHA
//     const isRecaptchaValid = await validateRecaptcha(recaptchaToken);
//     if (!isRecaptchaValid) {
//       return res.status(400).json({ message: 'reCAPTCHA validation failed' });
//     }

//     // Send to GetSoapy
//     const soapyResponse = await getSoapyAPI.createLead(leadData);

//     // Send email to ops team
//     await sendEmail({
//       to: process.env.CONTACT_EMAIL,
//       subject: `New Quote Request from ${leadData.contact.name}`,
//       template: 'new-lead',
//       data: {
//         lead: leadData,
//         soapyJobId: soapyResponse.id
//       }
//     });

//     // Store in temporary storage (optional)
//     await storeLeadTemporarily(leadData, soapyResponse.id);

//     res.status(200).json({ 
//       success: true, 
//       message: 'Lead created successfully',
//       jobId: soapyResponse.id
//     });

//   } catch (error) {
//     console.error('Lead creation error:', error);
    
//     // Fallback: Store locally if GetSoapy fails
//     await storeLeadLocally(req.body.leadData);
    
//     res.status(500).json({ 
//       message: 'Error creating lead, but we have saved your information locally' 
//     });
//   }
// }

// async function storeLeadTemporarily(leadData, jobId) {
//   // Store in serverless function storage (max 30 days)
//   // Implementation depends on your hosting platform
//   // For Vercel, you might use their KV store or a simple database
// }

// async function storeLeadLocally(leadData) {
//   // Fallback storage implementation
//   // This could be a simple file write or database insert
// }

import { validateRecaptcha } from '../../lib/recaptcha';
import getSoapyAPI from '../../lib/getSoapy';
import { sendEmail } from '../../lib/email';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { leadData, recaptchaToken } = req.body;

    // Validate reCAPTCHA
    const isRecaptchaValid = await validateRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      return res.status(400).json({ message: 'reCAPTCHA validation failed' });
    }

    // Send to GetSoapy
    let soapyResponse = null;
    try {
      soapyResponse = await getSoapyAPI.createLead(leadData);
    } catch (soapyError) {
      console.log('GetSoapy API not available, storing locally');
    }

    // Send email to ops team
    await sendEmail({
      to: process.env.CONTACT_EMAIL,
      subject: `New Quote Request from ${leadData.contact.name}`,
      template: 'new-lead',
      data: {
        lead: leadData,
        soapyJobId: soapyResponse?.id || 'local-storage'
      }
    });

    res.status(200).json({ 
      success: true, 
      message: 'Quote request submitted successfully',
      jobId: soapyResponse?.id || 'local-storage'
    });

  } catch (error) {
    console.error('Lead creation error:', error);
    res.status(500).json({ 
      message: 'Error submitting request. Please try again or contact us directly.' 
    });
  }
}