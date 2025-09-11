import { createClient } from 'contentful';

export const client = createClient({
  space: 'qpbo5573cm0y',
  accessToken: 'W3Yzxr97aiBwRMEuCErc8ni33JAn8--lkvNeicCwI5U',
});

export async function fetchEntries() {
  try {
    const entries = await client.getEntries({
      content_type: 'astroanswerBlog',
      order: '-sys.createdAt', // Sort by creation date, newest first
      limit: 70, // Increase this number to fetch more posts
      include: 10, // Include linked assets and entries
    });
    //console.log('Fetched entries:', entries.items.length);
    // entries.items.forEach((entry, index) => {
    //   // console.log(`Entry ${index + 1}:`, JSON.stringify({
    //   //   id: entry.sys.id,
    //   //   createdAt: entry.sys.createdAt,
    //   //   updatedAt: entry.sys.updatedAt,
    //   //   fields: Object.keys(entry.fields),
    //   // }, null, 2));

    // });
    return entries.items;
  } catch (error) {
    console.error('Error fetching entries:', error);
    return [];
  }
}
