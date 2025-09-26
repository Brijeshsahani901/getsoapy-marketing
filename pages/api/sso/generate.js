import getSoapyAPI from "../../../lib/getSoapy";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const ssoToken = getSoapyAPI.generateSSOToken(email);
    const ssoUrl = `${getSoapyAPI.getClientPortalURL()}?sso_token=${ssoToken}`;

    res.status(200).json({
      success: true,
      ssoUrl: ssoUrl
    });

  } catch (error) {
    console.error('SSO generation error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error generating SSO link' 
    });
  }
}