import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
async function uploadToS3(fileBuffer, fileName) {
  // Your bucket is in ap-south-1 region according to the error message
  const bucketName = 'my-astro-bucket';
  const region = 'ap-south-1'; // Ensure this is ap-south-1

  try {
    // Configure S3 client with the correct region
    const s3Client = new S3Client({
      region: region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      // Set forcePathStyle to true which can help with certain region issues
      forcePathStyle: true
    });

    // Upload command
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: `generated/${fileName}`,
      Body: fileBuffer,
      ContentType: 'application/pdf'
    });

    // Send the command
    await s3Client.send(command);

    // Return the URL to the uploaded file - use the correct endpoint from error
    return `https://${bucketName}.s3.${region}.amazonaws.com/generated/${fileName}`;

  } catch (error) {
    console.error('Error uploading to S3:', error);

    // Fall back to returning a local path or handle differently
    // Since we can't write to the local file system, let's try to provide a useful response
    return null; // Or some fallback mechanism
  }
}

function detectLanguage(text) {
  // Kannada Unicode range: 0C80-0CFF
  const kannadaRegex = /[\u0C80-\u0CFF]/;

  // Hindi Unicode range: 0900-097F
  const hindiRegex = /[\u0900-\u097F]/;

  if (kannadaRegex.test(text)) {
    return 'kannada';
  } else if (hindiRegex.test(text)) {
    return 'hindi';
  } else {
    return 'english';
  }
}

// Function to get box positions based on chart style and box number
function getBoxPosition(chartType, boxNumber, style = 'north') {
  // Base positions for each chart type and style
  const basePositions = {
    // North Indian Style
    'north': {
      // D-1 Chart (Rashi) box positions - North Indian format
      'd1': {
        1: [135, 517],  // Center/Lagna (Y increased by 280)
        2: [70, 486],    // House 2 (top-left) (Y increased by 280)
        3: [20, 517],     // House 3 (left-top) (Y increased by 280)
        4: [70, 577],    // House 4 (left-bottom) (Y increased by 280)
        5: [20, 637],     // House 5 (bottom-left) (Y increased by 280)
        6: [70, 697],    // House 6 (bottom) (Y increased by 280)
        7: [135, 637],    // House 7 (bottom-right) (Y increased by 280)
        8: [200, 697],    // House 8 (right-bottom) (Y increased by 280)
        9: [250, 637],    // House 9 (right) (Y increased by 280)
        10: [195, 577],   // House 10 (right-top) (Y increased by 280)
        11: [250, 517],   // House 11 (top-right) (Y increased by 280)
        12: [200, 486]    // House 12 (top) (Y increased by 280)
      },
      // D-2 Chart (Navamsha) box positions - same pattern
      'd2': {
        1: [405, 517],  // Center/Lagna (Y increased by 280)
        2: [350, 486],    // House 2 (top-left) (Y increased by 280)
        3: [295, 517],    // House 3 (left-top) (Y increased by 280)
        4: [350, 577],    // House 4 (left-bottom) (Y increased by 280)
        5: [295, 637],    // House 5 (bottom-left) (Y increased by 280)
        6: [350, 697],    // House 6 (bottom) (Y increased by 280)
        7: [405, 637],    // House 7 (bottom-right) (Y increased by 280)
        8: [475, 697],    // House 8 (right-bottom) (Y increased by 280)
        9: [525, 637],    // House 9 (right) (Y increased by 280)
        10: [475, 577],   // House 10 (right-top) (Y increased by 280)
        11: [525, 517],   // House 11 (top-right) (Y increased by 280)
        12: [475, 486]    // House 12 (top) (Y increased by 280)
      }
    },
    'south': {
      // D-1 Chart positions - 4×4 grid WITH INCREASED Y VALUES (+40)
      'd1': {
        12: [25, 495],  // 430 + 40
        1: [85, 495],  // 430 + 40
        2: [155, 495],  // 430 + 40
        3: [225, 495],  // 430 + 40
        11: [25, 560],  // 510 + 40
        4: [225, 560],  // 510 + 40
        10: [25, 625],  // 580 + 40
        5: [225, 625],  // 580 + 40
        9: [25, 680],   // 640 + 40
        8: [85, 680],  // 640 + 40
        7: [155, 680],  // 640 + 40
        6: [225, 680]   // 640 + 40
      },
      // D-2 Chart positions - 4×4 grid WITH INCREASED Y VALUES (+40)
      'd2': {
        12: [315, 495],  // 450 + 40
        1: [380, 495],   // 450 + 40
        2: [445, 495],   // 450 + 40
        3: [505, 495],   // 450 + 40
        11: [315, 560],  // 520 + 40
        4: [505, 560],   // 520 + 40
        10: [315, 625],  // 580 + 40
        5: [505, 625],   // 580 + 40
        9: [315, 680],   // 640 + 40
        8: [380, 680],   // 640 + 40
        7: [445, 680],   // 640 + 40
        6: [505, 680]    // 640 + 40
      }
    }



  };

  // Return the appropriate position
  if (basePositions[style] &&
    basePositions[style][chartType] &&
    basePositions[style][chartType][boxNumber]) {
    return basePositions[style][chartType][boxNumber];
  }

  // Default fallback position
  return [0, 0];
}
class PDFGenerator {
  constructor() {
    
    this.doc = new PDFDocument({ autoFirstPage: false });
    this.doc.on('pageAdded', () => {
      const fullBgPath = path.join(process.cwd(), 'public', 'Copy of Page_20250410_212301_0000.png');
      
      if (fs.existsSync(fullBgPath)) {
        this.doc.image(fullBgPath, 0, 0, {
          width: this.doc.page.width,
          height: this.doc.page.height,
        });
      }
    });
    // Track box occupancy for proper placement of multiple planets
    this.boxOccupancy = {
      'd1': {},
      'd2': {}
    };
  }

  

  addPage(pageData) {
    this.doc.addPage({ size: 'A4' });

    // Reset box occupancy for new page
    this.boxOccupancy = {
      'd1': {},
      'd2': {}
    };

    // Add background if provided
    const fullBgPath = path.join(process.cwd(), 'public', pageData.background);

    if (fullBgPath && fs.existsSync(fullBgPath)) {
      this.doc.image(fullBgPath, 0, 0, {
        width: this.doc.page.width,
        height: this.doc.page.height,
      });
    }

    let yPosition = 50; // Starting position
    const style = pageData.style || 'north'; // Default to North Indian style

    // Process each element
    (pageData.elements || []).forEach((item) => {
      // Set font based on bold property
      const notoSansKannadaPath = path.join(process.cwd(), 'public', 'fonts', 'NotoSansKannada-Regular.ttf');
      const notoSansKannadaPath1 = path.join(process.cwd(), 'public', 'fonts', 'NotoSansKannada-Bold.ttf');
      const notoSansHindiPath1 = path.join(process.cwd(), 'public', 'fonts', 'NotoSansDevanagari-Bold.ttf');

      const notoSansHindiPath = path.join(process.cwd(), 'public', 'fonts', 'NotoSansDevanagari-Regular.ttf');
      const poppinsRegularPath = path.join(process.cwd(), 'public', 'fonts', 'Poppins-Regular.ttf');
      const poppinsBoldPath = path.join(process.cwd(), 'public', 'fonts', 'Poppins-Bold.ttf');
      const DejaVuSans=path.join(process.cwd(), 'public', 'fonts', 'DejaVuSans.ttf');
      this.doc.registerFont('DejaVu',DejaVuSans);
      this.doc.registerFont('Kannada1', notoSansKannadaPath1);
      this.doc.registerFont('Kannada', notoSansKannadaPath);
      this.doc.registerFont('Hindi', notoSansHindiPath);
      this.doc.registerFont('Hindi1', notoSansHindiPath1);

      this.doc.registerFont('Poppins', poppinsRegularPath);
      this.doc.registerFont('Poppins-Bold', poppinsBoldPath);

      
      
      switch (item.type) {
        case 'heading':
          this.doc.fontSize(item.size || 36)
            .font('Poppins-Bold')
            // .font('Poppins') // Reset to regular Poppins font

            .fillColor(item.color || 'black')
            .text(item.text, 50, item.position ? item.position[1]-10 : 50, yPosition + 20, { align: item.align || 'left' })
            .moveDown(1);

          yPosition = this.doc.y;
          break;

        case 'heading1':
          const language = detectLanguage(item.text);

          // Set font based on detected language
          switch (language) {
            case 'kannada':
              this.doc.font('Kannada');
              break;
            case 'hindi':
              this.doc.font('Hindi');
              break;
            default:
              this.doc.font('Poppins-Bold')
          }
          this.doc.fontSize(item.size || 30)

            .font('Poppins-Bold')
            .text(item.text, item.type === 'heading1' ? 60 : 50, yPosition,
              { align: item.align || 'left' }).moveDown(0.5);
          yPosition = this.doc.y;
          break;
        case 'heading2':
          this.doc.fontSize(item.size || 30)
            .font('Poppins')
            .text(item.text, item.type === 'heading2' ? 60 : 50, yPosition,
              { align: item.align || 'left' }).moveDown(0);
          yPosition = this.doc.y;
          break;
        case 'paragraph':
          this.doc.fontSize(item.size || 14)
          if (item.link) {
            const language = detectLanguage(item.text);
            // console.log(language, item.text)

            // Set font based on detected language
            switch (language) {
              case 'kannada':
                this.doc.font(item.bold?'Kannada1':'Kannada');
                break;
              case 'hindi':
                this.doc.font('Hindi');
                break;
              default:
                this.doc.font(item.bold?"Poppins-Bold":'Poppins')
            }
            this.doc.fillColor(item.color)
              .text(item.text, 70, yPosition, {
                align: item.align || 'justify',
                link: item.link,
                underline: true
              });
            this.doc.fillColor('black'); // Reset color
          } else {
            const language = detectLanguage(item.text);
            // Set font based on detected language
            // console.log(language,item.text)

            switch (language) {
              case 'kannada':
                this.doc.font(item.bold?'Kannada1':'Kannada');
                break;
              case 'hindi':
                this.doc.font('Hindi');
                break;
              default:
                this.doc.font(item.bold?"Poppins-Bold":'Poppins')
                // console.log(item.bold)

            }
            this.doc.fillColor(item.color)
            this.doc.text(item.text, 70, yPosition, { align: item.align || 'justify' });
            yPosition = this.doc.y + 5;

          }
          break;

        case 'line':
          if (item.position && item.position.length === 4) {
            const [x1, y1, x2, y2] = item.position;
            this.doc.moveTo(x1, y1).lineTo(x2, y2).font('Poppins')
              .strokeColor(item.color || 'black')
              .lineWidth(item.width || 0.5)
              .stroke();
          }
          break;

        case 'list':
          if (item.items) {
            let currentY = item.y || yPosition;
            item.items.forEach((listItem) => {
              // console.log(listItem)
              this.doc.fontSize(item.size || 14)
                .text(`• ${listItem}`, item.x || 50, currentY);
              currentY = this.doc.y + 2;
            });
            yPosition = currentY;
          }
          break;
        case 'coloredText':
          this.doc.fillColor(item.color || 'black')
            .fontSize(item.size || 14).font('Poppins')
            .text(item.text, 50, yPosition);
          this.doc.fillColor('black');
          yPosition = this.doc.y + 5;
          break;
        case 'que':
          switch (item.type1) {
            case 'mog':
              // Use emoji font for rendering
              // console.log(item.text)
              this.doc.font('DejaVu')
                .fontSize(item.size || 14)
                .fillColor(item.color || '#000000')
                .text(item.text, 60, this.doc.y,   {
                  continued: true,
                  align: item.align || 'left'
                });

              // Switch back to default font
              break;
            case 'heading':
              this.doc.fontSize(item.size || 24).font('Poppins-Bold')
                .fillColor(item.color || '#FFFFFF')
                .text(item.text, item.position ? item.position[0] : 50, item.position[1]-10,
                  { align: item.align || 'left' })
                .moveDown(0);
              return this.doc.y;

            case 'heading1':
              const language1 = detectLanguage(item.text);

              // Set font based on detected language
              // console.log(language1, item.text)

              switch (language1) {
                case 'kannada':
                  this.doc.font(item.bold?'Kannada1':'Kannada');
                  break;
                case 'hindi':
                  this.doc.font(item.bold?'Hindi1':'Hindi');
                  break;
                default:
                  this.doc.font('Poppins-Bold')
              }
              this.doc.fontSize(item.size-1 || 18)
                .fillColor(item.color || '#0D1B2A')
                .text(item.text, item.position ? item.position[0] : 45, item.position[1]-5,
                  { align: item.align || 'left' })
                .moveDown(1);
              return this.doc.y;
              case 'paragraph': {
                const language = detectLanguage(item.text);
              
                switch (language) {
                  case 'kannada':
                    this.doc.font('Kannada');
                    break;
                  case 'hindi':
                    this.doc.font(item.bold ? 'Hindi1' : 'Hindi');
                    break;
                  default:
                    this.doc.font('Poppins');
                }
              
                this.doc.fontSize(item.size || 11).fillColor(item.color || '#0D1B2A');
              
                const x = item.position ? item.position[0] : 70;
                let y = item.position ? item.position[1] : this.doc.y + 20;
              console.log(y)
                const options = {
                  width: this.doc.page.width - x - 70,
                  align: item.align || 'justify',
                  lineGap: item.lineGap || 5,
                };
              
                if (item.link) {
                  options.link = item.link;
                  options.underline = item.underline || false;
                  this.doc.fontSize(item.size || 18);
                }
              
                // ✅ Let PDFKit handle page break and flow
                this.doc.text(item.text, x, this.doc.y, options);
                yPosition = this.doc.y;
                return yPosition;
              }
            // Add new case for 'text' type1
            case 'text':
              this.doc.fontSize(item.size || 10).font(item.bold ? 'Poppins-Bold' : 'Poppins')
                .fillColor(item.color || '#000000');

              let textOptions = { align: item.align || 'left' };

              // Add link if specified
              if (item.link) {
                textOptions.link = item.link;
                textOptions.underline = true;
              }

              // Add strikethrough if specified
              if (item.decoration === 'strikethrough') {
                // Draw a line through the text - this is approximate
                let textWidth = this.doc.widthOfString(item.text);
                let yPos = item.position[1] + (item.size / 2) - 1;
                this.doc.text(item.text, item.position[0], item.position[1]-3, textOptions);
                this.doc.moveTo(item.position[0]-3, yPos-4)
                  .lineTo(item.position[0] + textWidth+3, yPos+4)
                  .stroke(item.color || '#FF0000');
              } else {
                this.doc.text(item.text, item.position[0], item.position[1], textOptions);
              }

              return this.doc.y;

            default:
              // console.warn(`Unknown type1 in que element: ${item.type1}`);
              return yPosition;
          }
          break;


        case 'text':
          if (item.boxNumber) {
            // Use box number to determine position
            const chartType = item.chartType || 'd1'; // Default to d1 if not specified
            const boxNumber = item.boxNumber;
            // Initialize box occupancy counter if not already set
            if (!this.boxOccupancy[chartType][boxNumber]) {
              this.boxOccupancy[chartType][boxNumber] = 0;
            }

            // Get base position for this box using the appropriate style
            const position = getBoxPosition(chartType, boxNumber, style);
            // Calculate offset based on how many planets are already in this box
            const yOffset = this.boxOccupancy[chartType][boxNumber] * 10;
            // console.log(yOffset)
            // console.log(yOffset )
            const language = detectLanguage(item.text);
            // Set font based on detected language
            // console.log(language,item.text)

            switch (language) {
              case 'kannada':
                this.doc.font(item.bold?'Kannada1':'Kannada');
                break;
              case 'hindi':
                this.doc.font(item.bold?'Hindi1':'Hindi');
                break;
              default:
                this.doc.font(item.bold?"Poppins-Bold":'Poppins')
            }
            // Draw the text at the adjusted position
            this.doc.fontSize(item.size || 14)
              .fillColor(item.color || 'black')
              .text(item.text, position[0], position[1] + yOffset, {
                align: item.align || 'center',

                width: 50
              });
            // Increment the occupancy counter for this box
            this.boxOccupancy[chartType][boxNumber]++;
          }
          else if (item.position && item.position.length === 2 && !item.type1) {
            const [x, y] = item.position;
            const xPos = x > 20 ? x : x * 10;
            const yPos = y > 20 ? y : y * 10;
            const language = detectLanguage(item.text);
            // Set font based on detected language
            // console.log(language, item.text)

            switch (language) {
              case 'kannada':
                this.doc.font(item.bold?'Kannada1':'Kannada');
                break;
              case 'hindi':
                this.doc.font(item.bold?'Hindi1':'Hindi');
                break;
              default:
                this.doc.font(item.bold?"Poppins-Bold":'Poppins')
            }
            this.doc.fontSize(item.size || 16)
              .fillColor(item.color || 'black')
              .text(item.text, xPos, yPos, {
                align: item.align || 'left',
                width: 150
              });
          }
          else if (item.type1 === 'logo') {
            // console.log(item.text)

            const language = detectLanguage(item.text);
            // Set font based on detected language
            // console.log(language, item.text)

            switch (language) {
              case 'kannada':
                this.doc.font('Kannada1');
                break;
              case 'hindi':
                this.doc.font('Hindi1');
                break;
              default:
                this.doc.font('Poppins-Bold')
            }
            this.doc.fontSize(item.size || 16)
              .fillColor(item.color || 'black')
            this.doc.text(item.text, item.position[0] - 180, item.position[1], {
              align: 'center',
              link: item.link,
              underline: true
            })
          }
          break;
      }
    });
  }

  // Modified PDF generation and S3 upload approach
  // Use this code to replace your existing savePDF method in the PDFGenerator class

  async savePDF(outputFileName, phone, details) {
    console.log(details)
    // Create a promise to wait for the PDF to be generated
    return new Promise((resolve, reject) => {
      try {
        // Create a buffer to hold the PDF data instead of writing to file
        const buffers = [];

        // Pipe the PDF to a stream that collects data in memory
        const memoryStream = new require('stream').Writable({
          write(chunk, encoding, callback) {
            buffers.push(chunk);
            callback();
          }
        });

        this.doc.pipe(memoryStream);

        // End the document to finalize it
        this.doc.end();

        // When the stream finishes, upload the buffer directly to S3
        memoryStream.on('finish', async () => {
          try {
            // console.log(`PDF generated in memory`);

            // Combine all chunks into a single buffer
            const fileBuffer = Buffer.concat(buffers);
            // Upload to S3 directly
            const s3Url = await uploadToS3(fileBuffer, path.basename(outputFileName));
            console.log(`PDF uploaded to S3: ${s3Url}`);
            // const language = detectLanguage(details['Day']);
            // // Set font based on detected language
            // switch (language) {
            //   case 'kannada':
            //     languageto='delivery_report_kn'
            //     break;
            //   case 'hindi':
            //     languageto='delivery_report_hn'

            //     break;
            //   default:
            //     languageto='delivery_report_en'

            // }

            // // Send WhatsApp message with the S3 URL
            // const payload = {
            //   apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NmY5YmY3Mzg2ZjRjN2Q2Mjc3NmQ4NyIsIm5hbWUiOiJBc3Ryb2Fuc3dlciIsImFwcE5hbWUiOiJBaVNlbnN5IiwiY2xpZW50SWQiOiI2NzUxNzdjZWQ1ZWUyNTBjMGFiYzVjZmQiLCJhY3RpdmVQbGFuIjoiRlJFRV9GT1JFVkVSIiwiaWF0IjoxNzM1MzY3NjcxfQ.3A-UGOowPvyoMJO8Xems7PTBDsAFDrcqjifEO3rAlV0",
            //   campaignName: languageto,
            //   destination: phone,
            //   userName: 'Astroanswer',
            //   templateParams: [],
            //   source: 'new-landing-page form',
            //   media: {
            //     "url": s3Url,
            //     "filename": `${details['Name']}_${phone}`,
            //     "type": "application/pdf",
            //     "provider": "google-drive"
            //   },
            //   buttons: [],
            //   carouselCards: [],
            //   location: {},
            //   paramsFallbackValue: {}
            // };

            try {
              // Add timeout and make WhatsApp sending non-blocking
              const sendWhatsAppMessage = async () => {
                try {
                  const controller = new AbortController();
                  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
                  
                  const response = await fetch(
                    'https://dash.botbiz.io/api/v1/whatsapp/send/template',
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                      },
                      body: new URLSearchParams({
                        apiToken: '10347|B7GIZc0EUGvaaeFH9sxRA2GEmjXjm97LCyWmmyNl2bbf16db',
                        phone_number_id: '631982036668820',
                        template_id: '185432',
                        template_header_media_url: s3Url,
                        phone_number: `91${phone}`, // add country code
                      }),
                      signal: controller.signal
                    }
                  );
                  
                  clearTimeout(timeoutId);
                  
                  if (response.ok) {
                    console.log('WhatsApp message sent successfully with PDF attachment');
                  } else {
                    console.error('Error sending WhatsApp message:', await response.text());
                  }
                } catch (error) {
                  if (error.name === 'AbortError') {
                    console.error('WhatsApp API call timed out');
                  } else {
                    console.error('Error sending WhatsApp message:', error);
                  }
                }
              };

              // Send WhatsApp message in background without waiting
              sendWhatsAppMessage().catch(err => {
                console.error('Background WhatsApp send failed:', err);
              });

              // Return immediately without waiting for WhatsApp
              resolve(s3Url);
            } catch (error) {
              console.error('Error uploading to S3:', error);
              reject(error);
            }
          } catch (error) {
            console.error('Error uploading to S3:', error);
            reject(error);
          }
        });

        // Handle stream errors
        memoryStream.on('error', (err) => {
          console.error(`Error generating PDF: ${err.message}`);
          reject(err);
        });

      } catch (error) {
        console.error(`Failed to generate PDF: ${error.message}`);
        reject(error);
      }
    });
  }
}
// Example usage with both North and South Indian Kundli charts
const kundliExamples = [
  // North Indian Style Kundli - First page
  {
    "background": "WhatsApp Image 2025-03-12 at 12.13.12 PM (1).png",
    "style": "north",
    "elements": []
  },
  {
    "background": "WhatsApp Image 2025-03-12 at 12.13.12 PM.jpeg",
    "style": "north",
    "elements": [
      { "type": "heading", "text": "ಜನ್ಮ ಕುಂಡಲಿ (North Indian Style)", "size": 22, "align": "center" },

      // Left side subtitle - Y increased by 250 from original
      { "type": "text", "text": "ಜನ್ಮ ಕುಂಡಲಿ (D-1)", "position": [105, 370], "size": 18 },

      // Right side subtitle - Y increased by 250 from original
      { "type": "text", "text": "ನವಾಂಶ ಕುಂಡಲಿ (D-2)", "position": [385, 370], "size": 18 },

      // Chart structure (outer square) - Left chart - Y VALUES INCREASED BY 250 from original
      { "type": "line", "position": [35, 482, 285, 482], "width": 2.5 },  // Top horizontal
      { "type": "line", "position": [285, 482, 285, 757], "width": 2.5 }, // Right vertical
      { "type": "line", "position": [285, 757, 35, 757], "width": 2.5 },  // Bottom horizontal
      { "type": "line", "position": [35, 757, 35, 482], "width": 2.5 },   // Left vertical

      // Diagonal lines - Left chart
      { "type": "line", "position": [35, 482, 285, 757], "width": 2 },  // Top-left to bottom-right
      { "type": "line", "position": [285, 482, 35, 757], "width": 2 },  // Top-right to bottom-left

      // Diamond shape in center
      { "type": "line", "position": [160, 482, 35, 619.5], "width": 1.5 },  // Top to left
      { "type": "line", "position": [35, 619.5, 160, 757], "width": 1.5 },  // Left to bottom
      { "type": "line", "position": [160, 757, 285, 619.5], "width": 1.5 }, // Bottom to right
      { "type": "line", "position": [285, 619.5, 160, 482], "width": 1.5 },  // Right to top

      // Right (D2) Chart
      { "type": "line", "position": [310, 482, 560, 482], "width": 2.5 },  // Top horizontal
      { "type": "line", "position": [560, 482, 560, 757], "width": 2.5 }, // Right vertical
      { "type": "line", "position": [560, 757, 310, 757], "width": 2.5 },  // Bottom horizontal
      { "type": "line", "position": [310, 757, 310, 482], "width": 2.5 },   // Left vertical

      // Diagonal lines - Right chart
      { "type": "line", "position": [310, 482, 560, 757], "width": 2 },  // Top-left to bottom-right
      { "type": "line", "position": [560, 482, 310, 757], "width": 2 },  // Top-right to bottom-left

      // Diamond shape in center - Right chart
      { "type": "line", "position": [435, 482, 310, 619.5], "width": 1.5 },  // Top to left
      { "type": "line", "position": [310, 619.5, 435, 757], "width": 1.5 },  // Left to bottom
      { "type": "line", "position": [435, 757, 560, 619.5], "width": 1.5 }, // Bottom to right
      { "type": "line", "position": [560, 619.5, 435, 482], "width": 1.5 }  // Right to top
      ,       // First render all house numbers for D1 chart - positions come from getBoxPosition function

      // Then render all planets for D2 chart
      // Footer link positioned at the bottom

    ]

  },

  // South Indian Style Kundli - Second page
  {
    "background": "WhatsApp Image 2025-03-12 at 12.13.12 PM.jpeg",
    "style": "south",
    "elements": [
      { "type": "heading", "text": "ಜನ್ಮ ಕುಂಡಲಿ (South Indian Style)", "size": 22, "align": "center" },

      // Left side subtitle - Y increased by 250 from original
      { "type": "text", "text": "ಜನ್ಮ ಕುಂಡಲಿ (D-1)", "position": [125, 350], "size": 14 },

      // Right side subtitle - Y increased by 250 from original
      { "type": "text", "text": "ನವಾಂಶ ಕುಂಡಲಿ (D-2)", "position": [380, 350], "size": 14 },

      // D-1 Chart structure - South Indian Style - Y VALUES INCREASED BY 250 from original
      { "type": "line", "position": [25, 490, 300, 490], "width": 1, "color": "red" },
      { "type": "line", "position": [25, 750, 300, 750], "width": 1, "color": "red" },
      { "type": "line", "position": [25, 490, 25, 750], "width": 1, "color": "red" },
      { "type": "line", "position": [300, 490, 300, 750], "width": 1, "color": "red" },
      // Inner horizontal lines
      { "type": "line", "position": [25, 550, 300, 550], "width": 1, "color": "red" },
      { "type": "line", "position": [25, 620, 90, 620], "width": 1, "color": "red" },
      { "type": "line", "position": [230, 620, 300, 620], "width": 1, "color": "red" },
      { "type": "line", "position": [25, 680, 300, 680], "width": 1, "color": "red" },
      // Vertical lines
      { "type": "line", "position": [90, 490, 90, 750], "width": 1, "color": "red" },
      { "type": "line", "position": [160, 490, 160, 550], "width": 1, "color": "red" },
      { "type": "line", "position": [160, 680, 160, 750], "width": 1, "color": "red" },
      { "type": "line", "position": [230, 490, 230, 750], "width": 1, "color": "red" },

      // D-2 Chart structure
      { "type": "line", "position": [305, 490, 570, 490], "width": 1, "color": "red" },
      { "type": "line", "position": [305, 750, 570, 750], "width": 1, "color": "red" },
      { "type": "line", "position": [305, 490, 305, 750], "width": 1, "color": "red" },
      { "type": "line", "position": [570, 490, 570, 750], "width": 1, "color": "red" },
      // Inner horizontal lines for D-2
      { "type": "line", "position": [305, 550, 570, 550], "width": 1, "color": "red" },
      { "type": "line", "position": [305, 620, 370, 620], "width": 1, "color": "red" },
      { "type": "line", "position": [500, 620, 570, 620], "width": 1, "color": "red" },
      { "type": "line", "position": [305, 680, 570, 680], "width": 1, "color": "red" },
      // Vertical lines for D-2
      { "type": "line", "position": [370, 490, 370, 750], "width": 1, "color": "red" },
      { "type": "line", "position": [435, 490, 435, 550], "width": 1, "color": "red" },
      { "type": "line", "position": [435, 680, 435, 750], "width": 1, "color": "red" },
      { "type": "line", "position": [500, 490, 500, 750], "width": 1, "color": "red" },
      // Text elements with updated vertical positioning,


      // Footer link positioned at the bottom

    ]
  },
  {
    "background": "WhatsApp Image 2025-03-21 at 5.02.44 PM.jpeg",
    "style": "north",
    "elements": [
      // Header line
      { "type": "line", "width": 2, "color": "#000000" },

      // Title
      { "type": "heading", "text": "Disclaimer", "size": 24, "align": "left", "color": "white", "position": [75, 88] },

      // Section 1: Personality
      { "type": "paragraph", "text": "\n \nThis report is prepared using Vedic astrology principles based on the information you provide. While we strive for accuracy, please be aware that predictions are interpretations and may be subject to human or technical errors. AstroAnswer does not guarantee specific outcomes or success, and the insights provided should not be considered a substitute for professional advice from licensed practitioners, such as medical doctors, lawyers, or financial advisors. For health-related concerns, we strongly recommend consulting a qualified medical professional.\n \n You acknowledge that the accuracy of the insights depends on the correctness of the data you provide, and any decisions made based on this report are solely your responsibility. Emotional intent can influence the effectiveness of suggested remedies, so it is essential to approach them with a positive mindset. AstroAnswer disclaims all liability for any outcomes arising from the use of this report. By proceeding, you agree to use this guidance as a supplementary tool rather than a sole basis for decision-making.", "size": 12, "align": "left", "width": 485, "lineGap": 5, "color": "#000000" },

      // Section 2: Strengths
      {
        "type": "text",
        'type1': 'logo',
        "text": "astroanswer.co",
        "position": [230, 750], // Position at bottom of page
        "size": 10,
        "align": "center",
        "color": "black",
        "link": "https://wa.link/lilays"  // Optional: add link to website
      },
      // Bottom decoration - website or logo
      // { "type": "paragraph", "text": "astroanswer.co ", "size": 12, "align": "center","link": "https://wa.link/lilays", "color": "#000000" }
    ]
  }
];

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the JSON data from the request body
    const jsondata = req.body;

    // Validate required data
    if (!jsondata) {
      return res.status(400).json({ error: 'Missing horoscope data in request body' });
    }

    // Create a new PDF generator
    const generator = new PDFGenerator();

    // Find the fourth page (index 3) in kundliExamples
    const fourthPage = kundliExamples[3];
    const para = jsondata['page2']?.paragraphs;
    // kundliExamples[0].elements.push(  { "type": "text", "text":jsondata["page_3"]['details']['Name'], "position": [225, 710], "color":"white" ,"size": 20 },
    // )
    // console.log(kundliExamples[0])
    // console.log(jsondata["page_3"]['details']['Name'])
    // Find the paragraphs to update
    const paragraphsToUpdate = fourthPage.elements.filter(
      el => el.type === 'paragraph' && el.size === 12 && el.width === 485
    );

    // Update the paragraphs
    if (paragraphsToUpdate.length >= 3 && para) {
      paragraphsToUpdate[0].text = para.personality;
      paragraphsToUpdate[1].text = para.strengths;
      paragraphsToUpdate[2].text = para.challenges;
    }

    // Determine which pages to include based on chart type
    const filteredPages = [];
    if (jsondata.chart === 'south' || jsondata.chart === 'north') {
      filteredPages.push(kundliExamples[0]);
      filteredPages.push(kundliExamples[3]);
    }

    // Create additional pages
    const additionalPages = [];

    // Page 4 - Basic Details Page
    if (jsondata["page_3"] && jsondata["page_3"]["charts"]) {
      additionalPages.push(
        createBasicDetailsPage(
          jsondata,
          jsondata["page_3"],
          jsondata["page_3"]["charts"].north_indian_navamsa_chart || {},
          jsondata["page_3"]["charts"].north_indian_chart || {},
          "WhatsApp Image 2025-03-12 at 12.13.12 PM.jpeg",
          jsondata["page_3"]["charts"].navamsa_chart || {},
          jsondata["page_3"]["charts"].horoscope_chart || {}
        )
      );
    }

    // Page 5 - Panchanga Page
    if (jsondata["page_5"]) {
      additionalPages.push(
        createPanchangaPage(
          jsondata["page_5"],
          "WhatsApp Image 2025-03-12 at 12.13.12 PM.jpeg"
        )
      );
    }

    // Page 6 - Sign Descriptions Page
    if (jsondata["page_6"]) {
      additionalPages.push(
        createSignDescriptionsPage(
          jsondata["page_6"],
          "WhatsApp Image 2025-03-12 at 12.13.12 PM.jpeg"
        )
      );
    }

    // Page 7 - Lucky Things Page
    if (jsondata["page_7"]) {
      additionalPages.push(
        createLuckyThingsPage(
          jsondata["page_7"],
          "WhatsApp Image 2025-03-12 at 12.13.12 PM.jpeg"
        )
      );
    }

    // Page 8 - Mulank Bhagyank Page
    if (jsondata["page_8"]) {
      additionalPages.push(
        createMulankBhagyankPage(
          jsondata["page_8"],
          "WhatsApp Image 2025-03-12 at 12.13.12 PM.jpeg"
        )
      );
    }

    // Page 9 - Styled Question Answer Page
    if (jsondata["page_4"]) {
      additionalPages.push(
        createStyledQuestionAnswerPage(
          jsondata["page_4"]
        )
      );
    }

    // Page 10 - Question Answer Page
    if (jsondata["page_10"]) {
      additionalPages.push(
        createQuestionAnswerPage(
          jsondata["page_10"],
          "WhatsApp Image 2025-03-12 at 12.13.12 PM.jpeg"
        )
      );
    }
    additionalPages.push(
      {
      "background": "Page1.png",
      "style": "north",
      "elements": [
        {
          'type': 'que',
          "type1": "text",
          "text": "Click Here -->https://rzp.io/rzp/destinyreport",
          "position": [50, 700],
          "size": 17,
          "color": "#0000FF",
          "link": "https://rzp.io/rzp/destinyreport",
          "underline":false
        },
  
        // Static content - UPI
        {
          'type': 'que',
          "type1": "text",
          "text": "or Pay Through UPI - 8660128377",
          "position": [50, 735],
          "size": 11,
          "color": "#000000",
          "bold": true
  
        }
      ]
    })
    // Add all pages to the PDF
    const allPages = [...filteredPages, ...additionalPages];
    allPages.forEach(pageData => generator.addPage(pageData));

    // Generate a unique filename
    const timestamp = Date.now();
    const filename = `kundli_${timestamp}.pdf`;
    const filePath = `./public/generated/${filename}`;

    // Save PDF
    await generator.savePDF(filePath, jsondata['phone'],jsondata["page_3"]['details']);

    // const pdfUrl = `astroanswer.co/generated/${filename}`;
    // console.log(jsondata['phone'])
    // console.log(pdfUrl)

    // The key changes I made:



    // Return the URL to download the generated PDF
    return res.status(200).json({
      success: true,
      message: 'PDF generated successfully',
      pdfUrl: `/generated/${filename}` // Path relative to your public directory
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return res.status(500).json({
      error: 'Failed to generate PDF',
      message: error.message
    });
  }
}




function createBasicDetailsPage(chartPositionsConfig, pageData, nchartData2, nchartData, backgroundPath, schartData2, schartData) {
  const page = {
    "background": "WhatsApp Image 2025-03-21 at 5.02.44 PM.jpeg",
    "style": "south",
    "elements": [
      // Page Title
      { "type": "heading", "text": pageData.title, "position": [75, 88], "size": 24, "align": "center", "color": "white" },
      // Decorative line
    ]
  };
  // Function to add charts based on configuration
  const addCharts = (chartStyle) => {
    try {
      // Add charts based on configuration
      if (chartStyle === 'south') {
        // Add South Indian style charts
        page["style"] = "south"
        // console.log(schartData2)
        const hedingd1 = detectLanguage(pageData.details.Day) === 'english' ? "Horoscope D1" : detectLanguage(pageData.details.Day) === 'kannada' ? 'ಜಾತಕ - ಕುಂಡಲಿ' : 'जन्म कुंडली';
        const hedingd2 = detectLanguage(pageData.details.Day) === 'english' ? "Horoscope D9" : detectLanguage(pageData.details.Day) === 'kannada' ? 'ನವಾಂಶ' : 'नवांश';

        page.elements.push(
          { "type": "line", "position": [300, 150, 300, 450], "width": 1, "color": "red" },

          { "type": "text", "text": hedingd1, "position": [130, 600], "size": 14 },
          { "type": "text", "text": hedingd2, "position": [400, 600], "size": 14 }
        );
        Object.entries(schartData.signs).forEach((signEntry, index) => {
          const [signName, planets] = signEntry;
          console.log(signName)

          // Only process houses with planets
          if (planets!=undefined ) {
            // Calculate the house number based on the index
            const houseNumber = index + 1;
            console.log(planets.planet)
            // Place each planet in the corresponding house
            planets.forEach((planet, planetIndex) => {
              // console.log(planet.planet)
              page.elements.push({
                "type": "text",
                "text": planet.planet === "Ascendant" || planet.planet === "ಲಗ್ನ" ? "ASC" :
                  (detectLanguage(planet.planet) === 'english' ?
                    (planet.retrograde ? planet.planet.slice(0, 2) + " R" : planet.planet.slice(0, 2)) :
                    (planet.retrograde ? planet.planet + " R" : planet.planet)),
                "boxNumber": houseNumber,
                "chartType": "d1", // or whatever chart type is appropriate
                "size": 10,
                // Optional: you might want to add an offset for multiple planets
                "yOffset": planetIndex * 10
              });
            });
          }
        });
        Object.entries(schartData2.signs).forEach((signEntry, index) => {
          const [ signename,planets] = signEntry;
console.log(signename)
          // Only process houses with planets
          if (planets.planets!= undefined) {
            // Calculate the house number based on the index
            const houseNumber = index + 1;
            // console.log(planets.planets,houseNumber)
            // Place each planet in the corresponding house
            planets.planets.forEach((planet, planetIndex) => {
              // console.log(planet)

              page.elements.push({
                "type": "text",
                "text": planet.planet || detectLanguage(planet) === 'english' ?
                  planet.slice(0, 2) : planet
                , // Handle different data structures
                "boxNumber": houseNumber,
                "chartType": "d2", // or whatever chart type is appropriate
                "size": 10,
                // Optional: you might want to add an offset for multiple planets
                "yOffset": planetIndex * 10
              });
            });
          }

        });
        // Add chart lines and planets from kundliExamples[2]
        const southChartElements = kundliExamples[2].elements.filter(
          el => el.type === 'line' ||
            (el.type === 'text' && (el.chartType === 'd1' || el.chartType === 'd2'))

        );


        page.elements.push(...southChartElements);

      } else {
        // Add North Indian style charts
        page["style"] = "north"
        // console.log(nchartData.houses, nchartData2.houses)
        const hedingd1 = detectLanguage(pageData.details.Day) === 'english' ? "Horoscope D1" : detectLanguage(pageData.details.Day) === 'kannada' ? 'ಜಾತಕ - ಕುಂಡಲಿ' : 'जन्म कुंडली';
        const hedingd2 = detectLanguage(pageData.details.Day) === 'english' ? "Horoscope D9" : detectLanguage(pageData.details.Day) === 'kannada' ? 'ನವಾಂಶ' : 'नवांश';

        page.elements.push(
          { "type": "line", "position": [300, 150, 300, 450], "width": 1, "color": "red" },

          { "type": "text", "text": hedingd1, "position": [125, 460], "size": 14 },
          { "type": "text", "text": hedingd2, "position": [400, 460], "size": 14 }
        );
        Object.keys(nchartData.houses).forEach(key => {
          // console.log(key)
          const planet = nchartData.houses[key]
          page.elements.push({
            "type": "text",
            "text": planet.sign_num || planet, // Handle different data structures
            "boxNumber": key,
            "chartType": "d1", // or whatever chart type is appropriate
            "size": 9,
            // Optional: you might want to add an offset for multiple planets
            // "yOffset": planetIndex * 10 
          });

          planet.planets.forEach((planet, planetIndex) => {
            // console.log(planet.planet.slice(0, 2))
            page.elements.push({
              "type": "text",
              "text": detectLanguage(planet.planet) === 'english' ?
                planet.planet.slice(0, 2) : planet.planet,
              "boxNumber": key,
              "chartType": "d1", // or whatever chart type is appropriate
              "size": 9,
              // Optional: you might want to add an offset for multiple planets
              "yOffset": planetIndex * 10
            });
          });
        })
        Object.keys(nchartData2.houses).forEach(key => {
          // console.log(key)
          const planet = nchartData2.houses[key]
          page.elements.push({
            "type": "text",
            "text": planet.sign_num || planet, // Handle different data structures
            "boxNumber": key,
            "chartType": "d2", // or whatever chart type is appropriate
            "size": 9,
            // Optional: you might want to add an offset for multiple planets
            // "yOffset": planetIndex * 10 
          });
          planet.planets.forEach((planet, planetIndex) => {
            // console.log(planet.planet.slice(0, 3))
            page.elements.push({
              "type": "text",
              "text": detectLanguage(planet.planet) === 'english' ?
                planet.planet.slice(0, 2) : planet.planet,
              "boxNumber": key,
              "chartType": "d2", // or whatever chart type is appropriate
              "size": 9,
              // Optional: you might want to add an offset for multiple planets
              "yOffset": planetIndex * 10
            });
          });

        })
        // planets.planets.forEach((planet, planetIndex) => {
        //     page.elements.push({
        //         "type": "text",
        //         "text": planet.planet || planet, // Handle different data structures
        //         "boxNumber": houseNumber,
        //         "chartType": "d2", // or whatever chart type is appropriate
        //         "size": 10,
        //         // Optional: you might want to add an offset for multiple planets
        //         "yOffset": planetIndex * 10 
        //     });
        // });
        // if (chartPositionsConfig && chartPositionsConfig.page1) {
        //     // If we have position data in chartPositionsConfig, use it to populate the charts
        //     Object.keys(chartPositionsConfig.page1).forEach(chartType => {
        //       if (chartType === 'd1' || chartType === 'd2') {
        //         const planets = chartPositionsConfig.page1[chartType];

        //         // Add planets to elements based on the configuration
        //         planets.forEach(ele => {
        //           page.elements.push({
        //             "type": "text",
        //             "text": ele.text,
        //             "boxNumber": ele.boxNumber,
        //             "chartType": chartType,
        //             "size": 10
        //           });
        //         });
        //       } })}
        // Add chart lines and planets from kundliExamples[1]
        const northChartElements = kundliExamples[1].elements.filter(
          el => el.type === 'line' ||
            (el.type === 'text' && (el.chartType === 'd1' || el.chartType === 'd2'))
        );

        page.elements.push(...northChartElements);
      }


    } catch (error) {
      console.error('Error adding charts:', error);
    }
  };

  // Add charts based on configuration
  if (chartPositionsConfig.chart === 'south') {
    addCharts('south');
  } else {
    addCharts('north');
  }

  // Add details in a table-like format
  let yPosition = 200;

  Object.entries(pageData.details).forEach(([key, value], index) => {
    // Add label
    let leftColumnX = 50;  // X position for left column
    let rightColumnX = 320; // X position for right column
    let leftYPosition = yPosition;  // Starting Y position for left column
    let rightYPosition = yPosition; // Starting Y position for right column
    
    const isLeftColumn = index < 9;
    const xPosition = isLeftColumn ? leftColumnX : rightColumnX;
    const currentYPosition = isLeftColumn ? leftYPosition : leftYPosition - 180;

    // Add label
    page.elements.push({
      "type": "text",
      "text": `${key}`,
      "position": [xPosition, currentYPosition],
      "size": 10,
      "bold": false,
      "color": "black"
    });

    // Add value
    page.elements.push({
      "type": "text",
      "text": `: ${value.toString()}`,
      "position": [xPosition + 110, currentYPosition],
      "size": 10,
      "color": "black",
      "bold": true,

    });

    // Update the Y position for the appropriate column
    if (isLeftColumn) {
      leftYPosition += 20; // Move down for next item in left column
    } else {
      rightYPosition += 20;
      console.log(rightYPosition) // Move down for next item in right column
    }

    yPosition += 20; // Move down for next item
  });
  // if (chartPositionsConfig.chart === 'south') {

  page.elements.push({
    "type": "text",
    'type1': 'logo',
    "text": "astroanswer.co",
    "position": [230, 754.8], // Position at bottom of page
    "size": 10,
    "align": "center",
    "color": "black",
    "link": "https://wa.link/lilays"  // Optional: add link to website
  });
  // }
  return page;
}


// Function to create Panchanga Explanation page (page_5)
function createPanchangaPage(pageData, backgroundPath) {
  // Create the basic page structure
  const page = {
    "background": backgroundPath,
    "style": "north",
    "elements": [
      // Page Title
      { "type": "heading", "text": pageData.title, "size": 24, "align": "center", "color": " white " },
      // Decorative line
      { "type": "line", "position": [50, 100, 530, 100], "width": 1, "color": "#4B0082" }
    ]
  };

  // Add attribution at the top
  page.elements.push({
    "type": "text",
    "text": "Vetted by Dr. Ananthapadmanabha",
    "position": [390, 60],
    "size": 10,
    "color": "#FFFFFF",
    "align": "right"
  });

  // Starting Y position
  let yPosition = 120;

  // Process each panchanga element with proper spacing
  if (pageData.panchanga) {
    Object.entries(pageData.panchanga).forEach(([key, data]) => {
      // Key (e.g., "Thithi:") - using explicit text element
      page.elements.push({
        "type": "heading1",
        "text": key + "\t:",
        "position": [50, yPosition],
        "size": 12,
        "bold": true,
        "color": "#000000"
      });

      // Value (e.g., "Amavasya") - placed on the same line
      if (data && data.value) {
        page.elements.push({
          "type": "heading2",
          "text": data.value,
          "position": [150, yPosition],
          "size": 12,
          "bold": true,
          "color": "#000000"
        });
      }

      // Add description below
      if (data && data.description) {

        page.elements.push({
          "type": "paragraph",
          "text": data.description,
          "position": [60, yPosition],
          "size": 12,
          "width": 470,
          "lineGap": 5,
          "color": "#000000"
        });
      }

      // Add space after description and before next item


      // Add separator line
      // page.elements.push({
      //   "type": "line",
      //   "position": [50, yPosition, 530, yPosition],
      //   "width": 1,
      //   "color": "#800080"
      // });

      // Add space after separator

    });

  }

  // Add website link at bottom


  return page;
}

// Function to create Sign Descriptions page (page_6)
function createSignDescriptionsPage(pageData, backgroundPath) {
  const page = {
    "background": backgroundPath,
    "style": "north",
    "elements": [
      // Page Title
      {
        "type": "heading",
        "text": pageData.title,
        "size": 22,
        "align": "center",
        "color": "#000080"
      },
      // Decorative line
      {
        "type": "line",
        "position": [50, 100, 530, 100],
        "width": 1,
        "color": "#4B0082"
      }
    ]
  };

  // Add sign descriptions
  let yPosition = 120;

  Object.entries(pageData.signs).forEach(([signType, signData]) => {
    // Add sign type heading
    page.elements.push({
      "type": "heading1",
      "text": `${signType}:`,
      "position": [50, yPosition],
      "size": 16,
      "bold": true,
      "color": "#000080",
      "continued": true  // This allows the next text to be on the same line
    });

    // Add sign value (bolded) on the same line
    page.elements.push({
      "type": "heading1",
      "text": signData.sign,
      "position": [200, yPosition],
      "size": 14,
      "bold": true,
      "color": "#4B0082"
    });

    yPosition += 30;

    // Add description
    page.elements.push({
      "type": "paragraph",
      "text": signData.description,
      "position": [50, yPosition],
      "size": 12,
      "width": 485,
      "lineGap": 5,
      "color": "#000000"
    });

    yPosition += 60;

    // Add key traits as a list
    if (signData.key_traits && signData.key_traits.length > 0) {
      page.elements.push({
        "type": "paragraph",
        "items": signData.key_traits,
        "x": 70,
        "y": yPosition,
        "size": 12 // Slightly smaller font for list items
      });

      yPosition += 20 * signData.key_traits.length + 10;
    }

    // Add separator line between signs


    yPosition += 0;
  });

  // Add permanent footer
  page.elements.push({
    "type": "paragraph",
    "text": "astroanswer.co",
    "size": 12,
    "align": "center",
    "color": "#000000",
    "link": "https://wa.link/lilays"
  });

  return page;
}

// Function to create Lucky Things page (page_7)
function createLuckyThingsPage(pageData, backgroundPath) {
  const page = {
    "background": backgroundPath,
    "style": "north",
    "elements": [
      // Page Title
      { "type": "heading", "text": pageData.title, "size": 22, "align": "center", "color": "#000080" },
      // Decorative line
      { "type": "line", "position": [50, 100, 530, 100], "width": 1, "color": "#4B0082" }
    ]
  };

  // Add lucky things
  let yPosition = 100;

  Object.entries(pageData.items).forEach(([key, value]) => {
    // Add label
    page.elements.push({
      "type": "heading1",
      "text": `${key}:`,
      "position": [50, yPosition],
      "size": 14,
      "bold": true,
      "color": "#000080"
    });


    // Add value (as paragraph for longer values, text for shorter ones)
    if (value.length > 30) {
      page.elements.push({
        "type": "paragraph",
        "text": value,
        "position": [70, yPosition],
        "size": 12,
        "width": 485,
        "lineGap": 5,
        "color": "#000000"
      });
      yPosition += 60;
    } else {
      page.elements.push({
        "type": "paragraph",
        "text": value,
        "position": [70, yPosition],
        "size": 12,
        "color": "#000000"
      });
      yPosition += 30;
    }

    // Add separator
    //   page.elements.push({
    //     "type": "line",
    //     "position": [50, yPosition - 10, 530, yPosition - 10],
    //     "width": 0.5,
    //     "color": "#4B0082"
    //   });

    yPosition += 10;
  });

  // Add website link at bottom
  page.elements.push({
    "type": "paragraph",
    "text": "astroanswer.co",
    "size": 12,
    "align": "center",
    "link": "https://wa.link/lilays",
    "color": "#000000"
  });

  return page;
}

// Function to create Mulank and Bhagyank page (page_8)
function createMulankBhagyankPage(pageData, backgroundPath) {
  const page = {
    "background": backgroundPath,
    "style": "north",
    "elements": [
      // Page Title
      { "type": "heading", "text": pageData.title, "size": 22, "align": "center", "color": "#000080" },
      // Decorative line
      { "type": "line", "position": [50, 100, 530, 100], "width": 1, "color": "#4B0082" }
    ]
  };

  // Add Mulank and Bhagyank items
  let yPosition = 100;

  Object.entries(pageData.items).forEach(([key, value]) => {
    // Add label
    page.elements.push({
      "type": "heading1",
      "text": key,
      "position": [50, yPosition],
      "size": 14,
      "bold": true,
      "color": "#000080"
    });

    yPosition += 25;

    // Add value (as paragraph for longer values, text for shorter ones)
    if (value.length > 30) {
      page.elements.push({
        "type": "paragraph",
        "text": value,
        "position": [70, yPosition],
        "size": 12,
        "width": 485,
        "lineGap": 5,
        "color": "#000000"
      });
      yPosition += 70;
    } else {
      page.elements.push({
        "type": "heading1",
        "text": value,
        "position": [70, yPosition],
        "size": 12,
        "color": "#000000"
      });
      yPosition += 30;
    }

    // Add separator
    //   page.elements.push({
    //     "type": "line",
    //     "position": [50, yPosition - 10, 530, yPosition - 10],
    //     "width": 0.5,
    //     "color": "#4B0082"
    //   });

    yPosition += 10;
  });

  // Add website link at bottom
  page.elements.push({
    "type": "paragraph",
    "text": "astroanswer.co",
    "size": 12,
    "align": "center",
    "link": "https://wa.link/lilays",
    "color": "#000000"
  });

  return page;
}

// Function to create Question and Answer page (page_9 and page_10)
function createQuestionAnswerPage(pageData, backgroundPath) {
  const page = {
    "background": backgroundPath,
    "style": "north",
    "elements": [
      // Page Title
      // Decorative line
      { "type": "heading1", "text": pageData.question || pageData.title, "align": "center", "size": 16, "bold": true, "color": "#4B0082" },

      // { "type": "line", "position": [50, 80, 530, 80], "width": 1, "color": "#4B0082" },

      // Question

      // Decorative line

      // Answer
      { "type": "paragraph", "text": pageData.answer, "size": 12, "width": 485, "lineGap": 5, "color": "#000000" },
      { "type": "paragraph", "text": pageData.content, "size": 12, "width": 485, "lineGap": 1, "color": "#000000" },

      // Footer
      { "type": "paragraph", "text": "astroanswer.co", "size": 12, "align": "center", "link": "https://wa.link/lilays", "color": "#000000" }
    ]
  };

  return page;
}
function createStyledQuestionAnswerPage(pageData) {

  const parts = pageData.answer;
let ststicpage
const kannadaMessageArray = [
  "ನಿಮ್ಮ ಸಮಸ್ಯೆಗಳಿಗೆ ಉತ್ತಮ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ, ನಾನು ಸಂಪೂರ್ಣ ಮಾರ್ಗದರ್ಶನ ವರದಿಯನ್ನು ಪಡೆಯಲು ಶಿಫಾರಸು ಮಾಡುತ್ತೇನೆ. ಇದರಲ್ಲಿ ನಿಮಗೆ ಹೆಚ್ಚು ಸ್ಪಷ್ಟತೆ, ನಿಖರ ಸಮಯಗಳು ಮತ್ತು ನಿಮ್ಮ ಸಮಸ್ಯೆಗಳಿಗೆ ಸರಳ ಪರಿಹಾರಗಳನ್ನು ನೀಡಲಾಗುತ್ತದೆ.",
  "✔️"," ನೀವು ಮೂರು ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಬಹುದು, ನಿಮಗೆ ವಿಸ್ತೃತವಾದ ಉತ್ತರ ದೊರೆಯುತ್ತದೆ.",
  "✔️","ಸುಲಭ ಹಾಗೂ ಮನೆಯಲ್ಲಿಯೇ ಮಾಡಿಕೊಳ್ಳಬಹುದಾದ ಸರಳ ಪರಿಹಾರಗಳನ್ನು ತಿಳಿಸುತ್ತೇವೆ.",
  "✔️"," ಮುಂದೆ ಬರುವ ಅವಕಾಶಗಳ ಬಗ್ಗೆ ಸ್ಪಷ್ಟ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತೇವೆ.",
  "ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ ಈಗಲೇ ಆರ್ಡರ್ ಮಾಡಿ!! https://rzp.io/rzp/destinyreport",
  "ಅಥವಾ upi ಮೂಲಕ 8660128377 ಗೆ ಪಾವತಿ ಮಾಡಿ!!",
  "ನೀವು ನಿಮ್ಮ ಭವಿಷ್ಯದ ಬಗ್ಗೆ ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಇರಬಹುದು. ನಾನು ನಿಮ್ಮೊಂದಿಗೆ ಇದ್ದೇನೆ!"
];
const hindiMessageArray = [
  "यदि आप और अधिक जानकारी और स्पष्ट दिशा-निर्देश चाहते हैं, तो हमारी विस्तृत गाइडेंस रिपोर्ट आपकी मदद कर सकती है। इसमें आपको:",
  "✔️ ","3 और प्रश्न पूछने का मौका मिलेगा",
  "✔️ ","सरल और व्यावहारिक उपाय",
  "✔️ ","आगे के अवसरों पर स्पष्ट मार्गदर्शन",
  "क्लिक करके ऑर्डर करें: https://rzp.io/rzp/destinyreport",
  "या UPI के माध्यम से 8660128377 पर भुगतान करें।",
  "आपका भविष्य उज्ज्वल हो, यही मेरी शुभकामना है।",
  
];
const englishMessageArray = [
  "For just 299, you can order your detailed Guidance Report which includes:",
  "✔️ ","Personalized horoscope analysis",
  "✔️ ","Answers to three specific questions",
  "✔️ ","Simple, practical remedies",
  "Clear guidance on upcoming opportunities",
  "Order your report here: https://rzp.io/rzp/destinyreport",
  "or pay via UPI to 8660128377."
];

const link='https://rzp.io/rzp/destinyreport'
const language=detectLanguage(parts)
switch (language) {
  case 'kannada':
    ststicpage=kannadaMessageArray
    console.log(ststicpage)
    
  break;
  case 'hindi':
    ststicpage=hindiMessageArray
  break;
  default:
    ststicpage=englishMessageArray
}


  return {

    "background": 'WhatsApp Image 2025-03-21 at 4.36.29 PM.jpeg' || "images/white-background.jpg",
    "style": "north",
    "elements": [
      // Header banner (dark navy background)
      ,

      // Header text
      {
        'type': 'que',
        "type1": "heading",
        "text": "Questions & Answers",
        "position": [50,  90],
        "size": 24,
        "color": "#FFFFFF"
      },

      // Question banner (dark navy background)
      ,

      // Question text
      {
        'type': 'que',
        "type1": "heading1",
        "text": `${pageData.question || pageData.title}`,
        "position": [55, 150],
        "size": 12,
        "color": "#0D1B2A",

      },

      // Answer section
      {
        'type': 'que',
        "type1": "paragraph",
        "position": [55, 200],
        "text":`\n ${parts}`,
        "size": 13,
        "align": "justify",
        "lineGap": 5,
        "color": "#0D1B2A"
        
      },

      // Footer link
      
      {
        'type': 'que',
        "type1": "paragraph",
        "text":`\n\n ${ststicpage[0]}`,
        "size": 11,
        "color": "#222222",
      },
      {
        'type': 'que',
        "type1": "mog",
        "text":ststicpage[1],
        "size": 14,
        "color": "#8B4513",
        "underline": true,
        "italic": false,
        "bold": true
      },
      {
        'type': 'que',
        "type1": "paragraph",
        "text": ststicpage[2],
        "size": 11,
        "color": "#8B4513",
      },
      {
        'type': 'que',
        "type1": "mog",
        "text":ststicpage[3],
        "size": 14,
        "color": "#8B4513",
        "underline": true,
        "italic": false,
        "bold": true
      },
      {
        'type': 'que',
        "type1": "paragraph",
        "text": ststicpage[4],
        "size": 11,
        "color": "#8B4513",
      },
    
    {
      'type': 'que',
      "type1": "mog",
      "text":ststicpage[5],
      "size": 14,
      "color": "#8B4513",
      "underline": true,
      "italic": false,
      "bold": true
    },
    {
      'type': 'que',
      "type1": "paragraph",
      "text": ststicpage[6],
      "size": 11,
      "color": "#8B4513",
    },

    {
      'type': 'que',
      "type1": "paragraph",
      "text": ststicpage[7],
      "size": 11,
      "color": "#222222",
      'link':link
    } ,
    {
      'type': 'que',
      "type1": "paragraph",
      "text": ststicpage[8],
      "size": 11,
      "color": "#222222",
      
    } ,
    {
      'type': 'que',
      "type1": "paragraph",
      "text": ststicpage[9],
      "size": 11,
      "color": "#222222",
    } ,
    
    //   {
    //     'type': 'que',
    //     "type1": "text",
    //     "text": "  Practical remedies to overcome challenges based on your questions",
    //     "position": [75, 555],
    //     "size": 11,
    //     "color": "#222222",
    //   }
    //   ,
    
    // {
    //   'type': 'que',
    //   "type1": "mog",
    //   "text": "✔",
    //   "position": [70, 535],
    //   "size": 13,
    //   "color": "#222222",
    // },
    // {
    //   'type': 'que',
    //   "type1": "mog",
    //   "text": "✔ ",
    //   "position": [70, 555],
    //   "size": 13,
    //   "color": "#222222",
    // },

    //   // Static content - Offer
    //   {
    //     'type': 'que',
    //     "type1": "text",
    //     "text": "Get your Destiny Report at just Rs",
    //     "position": [70, 590],
    //     "size": 14,
    //     "color": "#000000",
    //     "bold": true
    //   },

    //   // Static content - Original price (strikethrough)
    //   {
    //     'type': 'que',
    //     "type1": "text",
    //     "text": "1999",
    //     "position": [310, 592.7],
    //     "size": 14,
    //     "color": "red",
    //     "decoration": "strikethrough",
    //     "bold": true
    //   },

    //   // Static content - Discounted price
    //   {
    //     'type': 'que',
    //     "type1": "text",
    //     "text": "499/-",
    //     "position": [345, 590],
    //     "size": 14,
    //     "color": "#000000",
    //     "bold": true
    //   },

    //   // Static content - Payment link
    //   {
    //     'type': 'que',
    //     "type1": "text",
    //     "text": "Click Here -->https://rzp.io/rzp/qRzaLT7",
    //     "position": [70, 620],
    //     "size": 12,
    //     "color": "#0000FF",
    //     "link": "https://rzp.io/rzp/qRzaLT7",
    //     "underline":false
    //   },

    //   // Static content - UPI
    //   {
    //     'type': 'que',
    //     "type1": "text",
    //     "text": "or Pay Through UPI - 8660128377",
    //     "position": [70, 655],
    //     "size": 11,
    //     "color": "#000000",
    //     "bold": true

    //   },



      // // Static content - Benefits header
      // {
      //   'type': 'que',
      //   "type1": "mog",
      //   "text": "🤩",
      //   "position": [70, 670],
      //   "size": 11,
      //   "color": "#000000",
      //   "font": "Emoji", // Explicitly set the font to Emoji
      //   "bold": true
      // },
      // {
      //   'type': 'que',
      //   "type1": "text",
      //   "text": " What will you get:",
      //   "position": [80, 670],
      //   "size": 11,
      //   "color": "#000000",
      //   "bold": true
      // },

      // // Static content - Bullet 1
      // {
      //   'type': 'que',
      //   "type1": "text",
      //   "text": "• Aspects that bring Luck to your life, Mulank, Bhagyank and many more...",
      //   "position": [70, 685],
      //   "size": 10,
      //   "color": "#000000"
      // },

      // // Static content - Bullet 2
      // {
      //   'type': 'que',
      //   "type1": "text",
      //   "text": "• Practical solutions to overcome challenges",
      //   "position": [70, 700],
      //   "size": 10,
      //   "color": "#000000"
      // },

      // // Static content - Bullet 3
      // {
      //   'type': 'que',
      //   "type1": "text",
      //   "text": "• Ask 3 life changing questions and get their detailed answers",
      //   "position": [70, 715],
      //   "size": 10,
      //   "color": "#000000"
      // },

      // // Footer link
      // {
      //   "type": "text",
      //   'type1': 'logo',
      //   'type': 'que',
      //   "text": "astroanswer.co",
      //   "position": [230, 754], // Position at bottom of page
      //   "size": 10,
      //   "align": "center",
      //   "color": "black",
      //   "link": "https://wa.link/lilays"  // Optional: add link to website
      // }
    ]

  }


}