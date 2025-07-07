import * as bizSdk from 'facebook-nodejs-business-sdk';
import crypto from 'crypto';

const accessToken = process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN;
const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

// Initialize Facebook Ads API
bizSdk.FacebookAdsApi.init(accessToken);

const ServerEvent = bizSdk.ServerEvent;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const CustomData = bizSdk.CustomData;

// Helper function to hash data for CAPI requirements
const hashData = (data) => {
  if (!data) return null;
  return crypto.createHash('sha256').update(data.toString().trim().toLowerCase()).digest('hex');
};

export default async function sendEvent(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { eventName, userData, customData, eventId } = req.body;
  console.log(`Processing ${eventName} event with ID: ${eventId}`,userData);

  try {
    const currentTimestamp = Math.floor(new Date() / 1000);

    // Create an instance of CustomData with all available properties
    const customDataInstance = new CustomData();
    
    // Add all available custom data
    if (customData) {
      if (customData.currency) customDataInstance.setCurrency(customData.currency);
      if (customData.value) customDataInstance.setValue(customData.value);
      if (customData.content_name) customDataInstance.setContentName(customData.content_name);
      if (customData.content_category) customDataInstance.setContentCategory(customData.content_category);
      if (customData.content_ids) customDataInstance.setContentIds(customData.content_ids);
      if (customData.content_type) customDataInstance.setContentType(customData.content_type);
      if (customData.order_id) customDataInstance.setOrderId(customData.order_id);
      if (customData.predicted_ltv) customDataInstance.setPredictedLtv(customData.predicted_ltv);
      if (customData.num_items) customDataInstance.setNumItems(customData.num_items);
      if (customData.search_string) customDataInstance.setSearchString(customData.search_string);
      if (customData.status) customDataInstance.setStatus(customData.status);
    }

    // Create UserData with hashed PII data
    const userDataInstance = new UserData();
    
    if (userData) {
      // Add all identifiers with proper hashing
      if (userData.email) userDataInstance.setEmail(hashData(userData.email));
      if (userData.phone) userDataInstance.setPhone(hashData(userData.phone));
      if (userData.firstName) userDataInstance.setFirstName(hashData(userData.firstName));
      if (userData.lastName) userDataInstance.setLastName(hashData(userData.lastName));
      if (userData.gender) userDataInstance.setGender(userData.gender);
      if (userData.dateOfBirth) userDataInstance.setDateOfBirth(userData.dateOfBirth);
      if (userData.city) userDataInstance.setCity(hashData(userData.city));
      if (userData.state) userDataInstance.setState(hashData(userData.state));
      if (userData.zip) userDataInstance.setZip(hashData(userData.zip));
      if (userData.country) userDataInstance.setCountry(hashData(userData.country));
      if (userData.externalId) userDataInstance.setExternalId(userData.externalId);
      
      // Add browser data
      if (userData.ip) userDataInstance.setClientIpAddress(userData.ip);
      if (userData.userAgent) userDataInstance.setClientUserAgent(userData.userAgent);
      
      // Add Facebook click ID and browser ID (critical for matching)
      if (userData.fbp) userDataInstance.setFbp(userData.fbp);
      if (userData.fbc) userDataInstance.setFbc(userData.fbc);
    }
    
    // Create the server event with all data
    const serverEvent = new ServerEvent()
      .setEventName(eventName)
      .setEventTime(currentTimestamp)
      .setUserData(userDataInstance)
      .setCustomData(customDataInstance)
      .setActionSource('website');
      
    // Add optional fields if available
    if (userData?.sourceUrl) serverEvent.setEventSourceUrl(userData.sourceUrl);
    
    // Add event_id for deduplication if available
    if (eventId) serverEvent.setEventId(eventId);

    const eventsData = [serverEvent];
    const request = new EventRequest(accessToken, pixelId).setEvents(eventsData);

    // Add test_event_code if in development
    if (process.env.NODE_ENV === 'development' && process.env.FACEBOOK_TEST_EVENT_CODE) {
      request.setTestEventCode(process.env.FACEBOOK_TEST_EVENT_CODE);
    }

    // Execute the request
    const response = await request.execute();
    console.log('Facebook CAPI Response:', response);
    
    res.status(200).json({ 
      success: true, 
      message: 'Event sent to Facebook',
      fbResponse: response 
    });
  } catch (error) {
    console.error('Facebook CAPI Error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send event',
      message: error.message
    });
  }
}