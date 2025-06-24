// let nestedArr =[
//     {
//     id: 1,
//     age: 10,
//     marks: 20,
//     subjects: [{
//         name: "English",
//         type: "A"
//     }, {
//         name: "Franc",
//         type: "c"
//     }
//     ]
// },
// {
//     id: 2,
//     age: 50,
//     marks: 60,
//     subjects: [{
//         name: "English",
//         type: "A"
//     }, {
//         name: "Franc",
//         type: "c"
//     }
//     ]
// }
// ]

// let output = [{}];

// let outputs={}
// nestedArr.map((value)=>{
//     // console.log(value.subjects.map((subect)=>subect))
//     outputs[value.id]=[value.age,value.marks,value.subjects.map((subect)=> {return [subect.name,subect.type]})]

// })
// output.push(outputs)
// console.log(JSON.stringify(output))

// /* [
// {
//     1: [10, 20, ["English", "A", "Franc", "c"]],
//     2: [50, 60, ["English", "A", "Franc", "c"]]
// }
// ] */
//  const fs =require('fs');
// let path = require('path')
// const https =require('https');

//  async function handler(req, res) {
// //   if (req.method === 'POST') {
//     // const { googleDriveUrl } = req.body;
//     // file.close(googleDriveUrl);
    
//     // if (!googleDriveUrl) {
//     //   return res.status(400).json({ error: 'Google Drive URL is required' });
//     // }

//     // Extract the file ID from the Google Drive URL
//     // const fileIdMatch = googleDriveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
//     // if (!fileIdMatch) {
//     //   return res.status(400).json({ error: 'Invalid Google Drive URL' });
//     // }
//     // const fileId = fileIdMatch[1];

//     // Construct the Google Drive direct download URL
//     const directDownloadUrl = `https://drive.google.com/uc?export=download&id=13GueVkTB0ppKVHosJ9EkIIgpa79x3d8D`;
// const fileName = `file.pdf`;
// const filePath = path.join(process.cwd(), 'public', fileName);

// try {
//   const file = fs.createWriteStream(filePath);
//   https.get(directDownloadUrl, (response) => {
//     response.pipe(file);
//     file.on('finish', () => {
//       file.close();
//       console.log('File downloaded successfully:', filePath);
//     });
//   }).on('error', (err) => {
//     fs.unlink(filePath, () => {});
//     console.error('Error downloading the file:', err);
//   });
// } catch (err) {
//   console.error('Error processing the file:', err);
// }

// //   } else {
// //     return res.status(405).json({ error: 'Method not allowed' });
//   }
// // }
// // handler()
// import { find } from "geo-tz";

// /**
//  * Get the timezone offset for a given latitude and longitude
//  * @param {number} latitude - Latitude of the location
//  * @param {number} longitude - Longitude of the location
//  * @returns {number} - Timezone offset in hours
//  */
// function getTimezoneOffset(latitude, longitude) {
//     const timezones = find(latitude, longitude);
//     const timezone = timezones[0]; // Take the first timezone if multiple exist

//     // Create a date in the target timezone
//     const date = new Date();
//     const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
//     const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));

//     // Calculate offset in hours
//     const offset = (tzDate - utcDate) / (1000 * 60 * 60);
//     return offset;
// }

// module.exports = getTimezoneOffset;
function firstNonRepeatingChar(str) {
    const charCount = {};
    for (let char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    console.log(charCount)
    var ar=[]
    for (let char of str) {
        if (charCount[char] === 1) {
            ar.push(char) ;
        }
    }
    console.log(ar)
    return null;
}

// Test cases
console.log(firstNonRepeatingChar("swiss")); // "w"
console.log(firstNonRepeatingChar("aabbcc")); // null
