import { find } from "geo-tz";

export default function handler(req, res) {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and Longitude are required" });
  }

  try {
    const timezones = find(parseFloat(latitude), parseFloat(longitude));
    const timezone = timezones[0]; 
    const date = new Date();
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
    const offset = (tzDate - utcDate) / (1000 * 60 * 60);

    res.status(200).json({ timezone: offset });
  } catch (error) {
    res.status(500).json({ error: "Failed to calculate timezone" });
  }
}
