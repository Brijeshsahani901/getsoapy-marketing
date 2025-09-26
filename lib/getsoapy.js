// // lib/getsoapy.js

// class GetSoapyAPI {
//   constructor() {
//     this.baseURL = process.env.GETSOAPY_API_BASE_URL;
//     this.tenantId = process.env.GETSOAPY_TENANT_ID;
//     this.apiKey = process.env.GETSOAPY_API_KEY;
//   }

//   getHeaders() {
//     return {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${this.apiKey}`,
//       'X-Tenant-ID': this.tenantId,
//     };
//   }

//   async makeRequest(endpoint, options = {}) {
//     try {
//       const url = `${this.baseURL}${endpoint}`;
//       const response = await fetch(url, {
//         headers: this.getHeaders(),
//         ...options,
//       });

//       if (!response.ok) {
//         throw new Error(`GetSoapy API error: ${response.status} ${response.statusText}`);
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('GetSoapy API request failed:', error);
//       throw error;
//     }
//   }

//   // Lead Management
//   async createLead(leadData) {
//     return this.makeRequest('/leads', {
//       method: 'POST',
//       body: JSON.stringify(leadData),
//     });
//   }

//   // Job Management
//   async getJobs(params = {}) {
//     const queryString = new URLSearchParams(params).toString();
//     return this.makeRequest(`/jobs?${queryString}`);
//   }

//   async getJobById(jobId) {
//     return this.makeRequest(`/jobs/${jobId}`);
//   }

//   // Photo Management
//   async getJobPhotos(jobId, params = {}) {
//     const queryString = new URLSearchParams(params).toString();
//     return this.makeRequest(`/jobs/${jobId}/photos?${queryString}`);
//   }

//   async uploadJobPhoto(jobId, photoData) {
//     return this.makeRequest(`/jobs/${jobId}/photos`, {
//       method: 'POST',
//       body: JSON.stringify(photoData),
//     });
//   }

//   // Booking Management
//   async getBookings(params = {}) {
//     const queryString = new URLSearchParams(params).toString();
//     return this.makeRequest(`/bookings?${queryString}`);
//   }

//   async createBooking(bookingData) {
//     return this.makeRequest('/bookings', {
//       method: 'POST',
//       body: JSON.stringify(bookingData),
//     });
//   }

//   // Client Portal Integration
//   getClientPortalURL(clientId = null) {
//     const baseURL = `https://${this.tenantId}.getsoapy.com`;
//     return clientId ? `${baseURL}/clients/${clientId}` : baseURL;
//   }

//   generateSSOLink(clientEmail, redirectPath = '/') {
//     // This would typically involve generating a JWT token for SSO
//     const ssoToken = this.generateSSOToken(clientEmail);
//     return `${this.getClientPortalURL()}?sso_token=${ssoToken}&redirect=${encodeURIComponent(redirectPath)}`;
//   }

//   generateSSOToken(clientEmail) {
//     // In a real implementation, this would create a secure JWT token
//     // For demo purposes, we'll return a simple string
//     return Buffer.from(JSON.stringify({
//       email: clientEmail,
//       tenant: this.tenantId,
//       timestamp: Date.now(),
//       exp: Date.now() + (15 * 60 * 1000) // 15 minutes
//     })).toString('base64');
//   }
// }

// // Singleton instance
// const getSoapyAPI = new GetSoapyAPI();
// export default getSoapyAPI;


class GetSoapyAPI {
  constructor() {
    this.baseURL = process.env.GETSOAPY_API_BASE_URL;
    this.tenantId = process.env.GETSOAPY_TENANT_ID;
    this.apiKey = process.env.GETSOAPY_API_KEY;
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      'X-Tenant-ID': this.tenantId,
    };
  }

  async makeRequest(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const response = await fetch(url, {
        headers: this.getHeaders(),
        ...options,
      });

      if (!response.ok) {
        throw new Error(`GetSoapy API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('GetSoapy API request failed:', error);
      throw error;
    }
  }

  async createLead(leadData) {
    return this.makeRequest('/leads', {
      method: 'POST',
      body: JSON.stringify(leadData),
    });
  }

  async getJobs(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.makeRequest(`/jobs?${queryString}`);
  }

  async getJobById(jobId) {
    return this.makeRequest(`/jobs/${jobId}`);
  }

  async getJobPhotos(jobId) {
    return this.makeRequest(`/jobs/${jobId}/photos`);
  }

  getClientPortalURL() {
    return `https://${this.tenantId}.getsoapy.com`;
  }

  generateSSOToken(clientEmail) {
    return Buffer.from(JSON.stringify({
      email: clientEmail,
      tenant: this.tenantId,
      timestamp: Date.now(),
    })).toString('base64');
  }
}

const getSoapyAPI = new GetSoapyAPI();
export default getSoapyAPI;