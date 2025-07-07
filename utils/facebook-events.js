// Facebook Events utility for sending conversion events
// This handles Facebook Pixel events for tracking user actions

/**
 * Send event to Facebook Pixel (server-side)
 * @param {string} eventName - Facebook event name (e.g., 'Lead', 'Purchase', 'CompleteRegistration')
 * @param {Object} eventData - Event data object
 * @param {Object} userData - User data for enhanced matching
 */
export const sendEvent = async (eventName, eventData = {}, userData = {}) => {
  try {
    // Only send events if Facebook Pixel ID is configured
    const pixelId = process.env.FACEBOOK_PIXEL_ID;
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

    if (!pixelId || !accessToken) {
      console.log('Facebook Pixel not configured, skipping event:', eventName);
      return { success: false, message: 'Facebook Pixel not configured' };
    }

    // Prepare the event data
    const event = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: eventData.source_url || process.env.NEXTAUTH_URL,
      user_data: {
        em: userData.email ? hashEmail(userData.email) : undefined,
        ph: userData.phone ? hashPhone(userData.phone) : undefined,
        client_ip_address: userData.ip,
        client_user_agent: userData.userAgent,
        fbc: userData.fbc, // Facebook click ID
        fbp: userData.fbp, // Facebook browser ID
      },
      custom_data: {
        currency: eventData.currency || 'INR',
        value: eventData.value || 0,
        content_name: eventData.content_name,
        content_category: eventData.content_category,
        ...eventData.custom_data,
      },
    };

    // Remove undefined values
    Object.keys(event.user_data).forEach(key => {
      if (event.user_data[key] === undefined) {
        delete event.user_data[key];
      }
    });

    // Send event to Facebook Conversions API
    const response = await fetch(`https://graph.facebook.com/v18.0/${pixelId}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [event],
        access_token: accessToken,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Facebook event sent successfully:', eventName, result);
      return { success: true, data: result };
    } else {
      console.error('Facebook event failed:', result);
      return { success: false, error: result };
    }
  } catch (error) {
    console.error('Error sending Facebook event:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send lead event for form submissions
 */
export const sendLeadEvent = async (userData, eventData = {}) => {
  return sendEvent('Lead', {
    content_name: 'Free Report Submission',
    content_category: 'astrology',
    value: 0,
    currency: 'INR',
    ...eventData,
  }, userData);
};

/**
 * Send purchase event for paid orders
 */
export const sendPurchaseEvent = async (userData, orderData = {}) => {
  return sendEvent('Purchase', {
    content_name: orderData.productName || 'Astrology Report',
    content_category: 'astrology',
    value: orderData.amount || 0,
    currency: orderData.currency || 'INR',
    ...orderData,
  }, userData);
};

/**
 * Send registration event for new users
 */
export const sendRegistrationEvent = async (userData, eventData = {}) => {
  return sendEvent('CompleteRegistration', {
    content_name: 'User Registration',
    content_category: 'user_account',
    value: 0,
    currency: 'INR',
    ...eventData,
  }, userData);
};

/**
 * Hash email for privacy (SHA-256)
 */
function hashEmail(email) {
  // In a production environment, you should use a proper crypto library
  // This is a simplified version for demo purposes
  if (typeof window !== 'undefined') {
    // Client-side hashing not implemented for security
    return email.toLowerCase().trim();
  }
  
  // Server-side hashing
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(email.toLowerCase().trim()).digest('hex');
}

/**
 * Hash phone number for privacy (SHA-256)
 */
function hashPhone(phone) {
  // Remove all non-digit characters and add country code if missing
  const cleanPhone = phone.replace(/\D/g, '');
  const phoneWithCountryCode = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
  
  if (typeof window !== 'undefined') {
    // Client-side hashing not implemented for security
    return phoneWithCountryCode;
  }
  
  // Server-side hashing
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(phoneWithCountryCode).digest('hex');
}

/**
 * Extract user data from request for event tracking
 */
export const extractUserDataFromRequest = (req, additionalData = {}) => {
  return {
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    userAgent: req.headers['user-agent'],
    fbc: req.headers['fbc'] || req.query.fbclid,
    fbp: req.headers['fbp'] || req.cookies?._fbp,
    ...additionalData,
  };
};

export default {
  sendEvent,
  sendLeadEvent,
  sendPurchaseEvent,
  sendRegistrationEvent,
  extractUserDataFromRequest,
};
