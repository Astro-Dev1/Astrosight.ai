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
      'upper_d1': {
        1: [135, 185],
        2: [70, 155],
        3: [20, 185],
        4: [70, 245],
        5: [20, 305],
        6: [70, 365],
        7: [135, 305],
        8: [200, 365],
        9: [250, 305],
        10: [195, 245],
        11: [250, 185],
        12: [200, 155]
      }



      ,
      'upper_d2': {
        1: [405, 185],
        2: [350, 155],
        3: [295, 185],
        4: [350, 245],
        5: [295, 305],
        6: [350, 365],
        7: [405, 305],
        8: [475, 365],
        9: [525, 305],
        10: [475, 245],
        11: [525, 185],
        12: [475, 155]
      }


      ,
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
      'upper_d1': {
        12: [25, 175],
        1: [85, 175],
        2: [155, 175],
        3: [225, 175],
        11: [25, 240],
        4: [225, 240],
        10: [25, 305],
        5: [225, 305],
        9: [25, 370],
        8: [85, 370],
        7: [155, 370],
        6: [225, 370]
      }


      ,
      'upper_d2': {
        12: [315, 175],
        1: [380, 175],
        2: [445, 175],
        3: [505, 175],
        11: [315, 240],
        4: [505, 240],
        10: [315, 305],
        5: [505, 305],
        9: [315, 370],
        8: [380, 370],
        7: [445, 370],
        6: [505, 370]
      }


      ,
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



  }
  console.log(boxNumber, chartType, style)
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
      'd2': {},
      'upper_d1': {},
      'upper_d2': {},
    };
  }



  addPage(pageData) {
    this.doc.addPage({ size: 'A4' });

    // Reset box occupancy for new page
    this.boxOccupancy = {
      'd1': {},
      'd2': {},
      'upper_d1': {},
      'upper_d2': {},
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
      const DejaVuSans = path.join(process.cwd(), 'public', 'fonts', 'DejaVuSans.ttf');
      this.doc.registerFont('DejaVu', DejaVuSans);
      this.doc.registerFont('Kannada1', notoSansKannadaPath1);
      this.doc.registerFont('Kannada', notoSansKannadaPath);
      this.doc.registerFont('Hindi', notoSansHindiPath);
      this.doc.registerFont('Hindi1', notoSansHindiPath1);

      this.doc.registerFont('Poppins', poppinsRegularPath);
      this.doc.registerFont('Poppins-Bold', poppinsBoldPath);



      switch (item.type) {
        case 'image':
          try {
            const imagePath = path.join(process.cwd(), 'public', item.src);

            if (fs.existsSync(imagePath)) {
              const [x, y] = item.position || [50, 50];
              const [width, height] = item.size || [50, 50];
              this.doc.image(imagePath, x, y, {
                width,
                height
              });
            } else {
              console.warn(`Image not found: ${imagePath}`);
            }
          } catch (err) {
            console.error('Error adding image:', err);
          }
          break;

        case 'table':
          if (item.headers && item.rows && item.position) {
            const startX = item.position[0];
            const startY = item.position[1];
            const colWidths = item.columnWidths || [];
            const rowHeight = item.rowHeight || 20;
            const fontSize = item.fontSize || 12;
            const borderColor = item.borderColor || '#000000';

            let y = startY;

            // Draw headers
            item.headers.forEach((header, colIndex) => {
              const x = startX + colWidths.slice(0, colIndex).reduce((a, b) => a + b, 0);
              const width = colWidths[colIndex];

              this.doc
                .fontSize(fontSize)
                .fillColor(header.color || '#FFFFFF')
                .font('Poppins-Bold')
                .rect(x, y, width, rowHeight)
                .fill(header.fillColor || '#000000');

              this.doc
                .fillColor(header.color || '#FFFFFF')
                .text(header.text, x + 5, y + 5, {
                  width: width - 10,
                  align: 'center'
                });
            });

            y += rowHeight;

            // Draw each row
            item.rows.forEach((row, rowIndex) => {
              const isEven = rowIndex % 2 === 0;
              const fillColor = item.zebra?.evenColor && isEven
                ? item.zebra.evenColor
                : (item.zebra?.alternateColor || '#FFFFFF');

              row.forEach((cell, colIndex) => {
                const x = startX + colWidths.slice(0, colIndex).reduce((a, b) => a + b, 0);
                const width = colWidths[colIndex];
                const text = typeof cell === 'object' ? cell.text : cell;
                const textColor = typeof cell === 'object' && cell.color ? cell.color : '#000000';

                // Detect language for font selection
                const language = detectLanguage(text);
                switch (language) {
                  case 'kannada':
                    this.doc.font('Kannada');
                    break;
                  case 'hindi':
                    this.doc.font('Hindi');
                    break;
                  default:
                    this.doc.font('Poppins');
                }

                // Cell background
                this.doc
                  .fillColor(fillColor)
                  .rect(x, y, width, rowHeight)
                  .fill();

                // Cell text
                this.doc
                  .fillColor(textColor)
                  .fontSize(fontSize)
                  .text(text, x + 5, y + 5, {
                    width: width - 10,
                    align: 'center'
                  });
              });

              y += rowHeight;
            });

            // Draw outer border
            this.doc
              .strokeColor(borderColor)
              .lineWidth(1);

            for (let i = 0; i <= item.rows.length + 1; i++) {
              const yLine = startY + i * rowHeight;
              this.doc.moveTo(startX, yLine).lineTo(startX + colWidths.reduce((a, b) => a + b, 0), yLine).stroke();
            }

            let xCursor = startX;
            for (let i = 0; i < colWidths.length + 1; i++) {
              this.doc.moveTo(xCursor, startY).lineTo(xCursor, y).stroke();
              xCursor += colWidths[i] || 0;
            }

            yPosition = y;
          }
          break;

        case 'heading':
          this.doc.fontSize(item.size || 36)
            .font('Poppins-Bold')
            // .font('Poppins') // Reset to regular Poppins font

            .fillColor(item.color || 'black')
            .text(item.text, 50, item.position ? item.position[1] - 10 : 50, yPosition + 20, { align: item.align || 'left' })
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
                this.doc.font(item.bold ? 'Kannada1' : 'Kannada');
                break;
              case 'hindi':
                this.doc.font('Hindi');
                break;
              default:
                this.doc.font(item.bold ? "Poppins-Bold" : 'Poppins')
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
                this.doc.font(item.bold ? 'Kannada1' : 'Kannada');
                break;
              case 'hindi':
                this.doc.font('Hindi');
                break;
              default:
                this.doc.font(item.bold ? "Poppins-Bold" : 'Poppins')
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
                .text(item.text, 60, this.doc.y, {
                  continued: true,
                  align: item.align || 'left'
                });

              // Switch back to default font
              break;
            case 'heading':
              this.doc.fontSize(item.size || 24).font('Poppins-Bold')
                .fillColor(item.color || '#FFFFFF')
                .text(item.text, item.position ? item.position[0] : 50, item.position[1] - 10,
                  { align: item.align || 'left' })
                .moveDown(0);
              return this.doc.y;

            case 'heading1':
              const language1 = detectLanguage(item.text);

              // Set font based on detected language
              // console.log(language1, item.text)

              switch (language1) {
                case 'kannada':
                  this.doc.font(item.bold ? 'Kannada1' : 'Kannada');
                  break;
                case 'hindi':
                  this.doc.font(item.bold ? 'Hindi1' : 'Hindi');
                  break;
                default:
                  this.doc.font('Poppins-Bold')
              }
              this.doc.fontSize(item.size - 1 || 18)
                .fillColor(item.color || '#0D1B2A')
                .text(item.text, item.position ? item.position[0] : 45, item.position[1] - 5,
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

              const beforePage = this.doc.page;

              // 💡 Render the text normally
              this.doc.text(item.text, x, this.doc.y, options);
              const afterPage = this.doc.page;

              // ✅ If text caused a page break, push the y position down on the new page
              if (beforePage !== afterPage && this.doc.y < 150) {
                const remainingText = item.text;
                this.doc.text(remainingText, x, this.doc.y, options);
              }

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
                this.doc.text(item.text, item.position[0], item.position[1] - 3, textOptions);
                this.doc.moveTo(item.position[0] - 3, yPos - 4)
                  .lineTo(item.position[0] + textWidth + 3, yPos + 4)
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
            console.log(chartType)
            // Get base position for this box using the appropriate style
            const position = getBoxPosition(chartType, boxNumber, style);
            // console.log(position,"hh",chartType)
            // Calculate offset based on how many planets are already in this box
            const yOffset = this.boxOccupancy[chartType][boxNumber] * 10;
            // console.log(yOffset)
            // console.log(yOffset )
            const language = detectLanguage(item.text);
            // Set font based on detected language
            // console.log(language,item.text)

            switch (language) {
              case 'kannada':
                this.doc.font(item.bold ? 'Kannada1' : 'Kannada');
                break;
              case 'hindi':
                this.doc.font(item.bold ? 'Hindi1' : 'Hindi');
                break;
              default:
                this.doc.font(item.bold ? "Poppins-Bold" : 'Poppins')
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
                this.doc.font(item.bold ? 'Kannada1' : 'Kannada');
                break;
              case 'hindi':
                this.doc.font(item.bold ? 'Hindi1' : 'Hindi');
                break;
              default:
                this.doc.font(item.bold ? "Poppins-Bold" : 'Poppins')
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
            // console.log(`PDF uploaded to S3: ${s3Url}`);
            const language = detectLanguage(details);
            // Set font based on detected language
            let languageto = ''
            switch (language) {
              case 'kannada':
                languageto = 'delivery_report_kn'
                break;
              case 'hindi':
                languageto = 'delivery_report_hn'

                break;
              default:
                languageto = 'delivery_report_en'

            }

            // Send WhatsApp message with the S3 URL
            const payload = {
              apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NmY5YmY3Mzg2ZjRjN2Q2Mjc3NmQ4NyIsIm5hbWUiOiJBc3Ryb2Fuc3dlciIsImFwcE5hbWUiOiJBaVNlbnN5IiwiY2xpZW50SWQiOiI2NzUxNzdjZWQ1ZWUyNTBjMGFiYzVjZmQiLCJhY3RpdmVQbGFuIjoiRlJFRV9GT1JFVkVSIiwiaWF0IjoxNzM1MzY3NjcxfQ.3A-UGOowPvyoMJO8Xems7PTBDsAFDrcqjifEO3rAlV0",
              campaignName: languageto,
              destination: phone,
              userName: 'Astroanswer',
              templateParams: [],
              source: 'new-landing-page form',
              media: {
                "url": s3Url,
                "filename": `${details['Name']}_${phone}`,
                "type": "application/pdf",
                "provider": "google-drive"
              },
              buttons: [],
              carouselCards: [],
              location: {},
              paramsFallbackValue: {}
            };

            try {
              const response = await fetch(
                'https://backend.aisensy.com/campaign/t1/api/v2',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(payload),
                }
              );

              if (response.ok) {
                console.log('WhatsApp message sent successfully with PDF attachment');
              } else {
                console.error('Error sending WhatsApp message:', await response.text());
              }
            } catch (error) {
              console.error('Error sending WhatsApp message:', error);
            }

            // Return the S3 URL
            resolve(s3Url);
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
    "background": "WhatsApp Image 2025-03-21 at 5.02.44 PM.jpeg",
    "style": "north",
    "elements": [
      { "type": "heading", "text": "ಜನ್ಮ ಕುಂಡಲಿ (North Indian Style)", "size": 22, "align": "center" },
      // Duplicate top chart (North Girl) with Y-shifted lines
      { type: "line", position: [35, 152, 285, 152], width: 2.5 },
      { type: "line", position: [285, 152, 285, 427], width: 2.5 },
      { type: "line", position: [285, 427, 35, 427], width: 2.5 },
      { type: "line", position: [35, 427, 35, 152], width: 2.5 },
      { type: "line", position: [35, 152, 285, 427], width: 2 },
      { type: "line", position: [285, 152, 35, 427], width: 2 },
      { type: "line", position: [160, 152, 35, 289.5], width: 1.5 },
      { type: "line", position: [35, 289.5, 160, 427], width: 1.5 },
      { type: "line", position: [160, 427, 285, 289.5], width: 1.5 },
      { type: "line", position: [285, 289.5, 160, 152], width: 1.5 },


      { type: "line", position: [310, 152, 560, 152], width: 2.5 },
      { type: "line", position: [560, 152, 560, 427], width: 2.5 },
      { type: "line", position: [560, 427, 310, 427], width: 2.5 },
      { type: "line", position: [310, 427, 310, 152], width: 2.5 },
      { type: "line", position: [310, 152, 560, 427], width: 2 },
      { type: "line", position: [560, 152, 310, 427], width: 2 },
      { type: "line", position: [435, 152, 310, 289.5], width: 1.5 },
      { type: "line", position: [310, 289.5, 435, 427], width: 1.5 },
      { type: "line", position: [435, 427, 560, 289.5], width: 1.5 },
      { type: "line", position: [560, 289.5, 435, 152], width: 1.5 }
      ,
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
    "background": "WhatsApp Image 2025-03-21 at 5.02.44 PM.jpeg",
    "style": "south",
    "elements": [
      { "type": "heading", "text": "ಜನ್ಮ ಕುಂಡಲಿ (South Indian Style)", "size": 22, "align": "center" },
      { type: "line", position: [25, 170, 300, 170], width: 1 },
      { type: "line", position: [25, 430, 300, 430], width: 1 },
      { type: "line", position: [25, 170, 25, 430], width: 1 },
      { type: "line", position: [300, 170, 300, 430], width: 1 },
      { type: "line", position: [25, 230, 300, 230], width: 1 },
      { type: "line", position: [25, 300, 90, 300], width: 1 },
      { type: "line", position: [230, 300, 300, 300], width: 1 },
      { type: "line", position: [25, 360, 300, 360], width: 1 },
      { type: "line", position: [90, 170, 90, 430], width: 1 },
      { type: "line", position: [160, 170, 160, 230], width: 1 },
      { type: "line", position: [160, 360, 160, 430], width: 1 },
      { type: "line", position: [230, 170, 230, 430], width: 1 },

      // D2 chart lines
      { type: "line", position: [305, 170, 570, 170], width: 1 },
      { type: "line", position: [305, 430, 570, 430], width: 1 },
      { type: "line", position: [305, 170, 305, 430], width: 1 },
      { type: "line", position: [570, 170, 570, 430], width: 1 },
      { type: "line", position: [305, 230, 570, 230], width: 1 },
      { type: "line", position: [305, 300, 370, 300], width: 1 },
      { type: "line", position: [500, 300, 570, 300], width: 1 },
      { type: "line", position: [305, 360, 570, 360], width: 1 },
      { type: "line", position: [370, 170, 370, 430], width: 1 },
      { type: "line", position: [435, 170, 435, 230], width: 1 },
      { type: "line", position: [435, 360, 435, 430], width: 1 },
      { type: "line", position: [500, 170, 500, 430], width: 1 }
      ,
      // Left side subtitle - Y increased by 250 from original
      { "type": "text", "text": "ಜನ್ಮ ಕುಂಡಲಿ (D-1)", "position": [125, 350], "size": 14 },

      // Right side subtitle - Y increased by 250 from original
      { "type": "text", "text": "ನವಾಂಶ ಕುಂಡಲಿ (D-2)", "position": [380, 350], "size": 14 },

      // D-1 Chart structure - South Indian Style - Y VALUES INCREASED BY 250 from original
      { "type": "line", "position": [25, 490, 300, 490], "width": 1, },
      { "type": "line", "position": [25, 750, 300, 750], "width": 1, },
      { "type": "line", "position": [25, 490, 25, 750], "width": 1, },
      { "type": "line", "position": [300, 490, 300, 750], "width": 1, },
      // Inner horizontal lines
      { "type": "line", "position": [25, 550, 300, 550], "width": 1, },
      { "type": "line", "position": [25, 620, 90, 620], "width": 1, },
      { "type": "line", "position": [230, 620, 300, 620], "width": 1, },
      { "type": "line", "position": [25, 680, 300, 680], "width": 1, },
      // Vertical lines
      { "type": "line", "position": [90, 490, 90, 750], "width": 1, },
      { "type": "line", "position": [160, 490, 160, 550], "width": 1, },
      { "type": "line", "position": [160, 680, 160, 750], "width": 1, },
      { "type": "line", "position": [230, 490, 230, 750], "width": 1, },

      // D-2 Chart structure
      { "type": "line", "position": [305, 490, 570, 490], "width": 1, },
      { "type": "line", "position": [305, 750, 570, 750], "width": 1, },
      { "type": "line", "position": [305, 490, 305, 750], "width": 1, },
      { "type": "line", "position": [570, 490, 570, 750], "width": 1, },
      // Inner horizontal lines for D-2
      { "type": "line", "position": [305, 550, 570, 550], "width": 1, },
      { "type": "line", "position": [305, 620, 370, 620], "width": 1, },
      { "type": "line", "position": [500, 620, 570, 620], "width": 1, },
      { "type": "line", "position": [305, 680, 570, 680], "width": 1, },
      // Vertical lines for D-2
      { "type": "line", "position": [370, 490, 370, 750], "width": 1, },
      { "type": "line", "position": [435, 490, 435, 550], "width": 1, },
      { "type": "line", "position": [435, 680, 435, 750], "width": 1, },
      { "type": "line", "position": [500, 490, 500, 750], "width": 1, },
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
    
    
    if (jsondata["page_1"] && jsondata["page_1"]["detailed_analysis"]) {
      additionalPages.push(createBasicDetailsPage1(jsondata['page_1']))
    }
    if (jsondata["page_2"]) {
      const comparisonPage = createBirthDetailsComparisonPage({
        varaDetails: jsondata["page_1"]['varaDetails'],
        kanyaDetails: jsondata["page_1"]['kanyaDetails']
      });
      additionalPages.push(comparisonPage);

      
    }
    if (jsondata["page_3"] && jsondata["page_3"]["girlcharts"]) {
      if (jsondata['chart'] === 'south') {
        additionalPages.push(
          createBasicDetailsPage(
            jsondata,
            jsondata["page_3"],
            jsondata["page_3"]["girlcharts"].navamsa_chart || {},
            jsondata["page_3"]["girlcharts"].horoscope_chart || {},
            "WhatsApp Image 2025-03-21 at 5.02.44 PM.jpeg",
            jsondata["page_3"]["boycharts"].navamsa_chart || {},
            jsondata["page_3"]["boycharts"].horoscope_chart || {}
          )
        );
      }
      else {
        additionalPages.push(
          createBasicDetailsPage(
            jsondata,
            jsondata["page_3"],
            jsondata["page_3"]["girlcharts"].north_indian_navamsa_chart || {},
            jsondata["page_3"]["girlcharts"].north_indian_chart || {},
            "WhatsApp Image 2025-03-21 at 5.02.44 PM.jpeg",
            jsondata["page_3"]["boycharts"].north_indian_navamsa_chart || {},
            jsondata["page_3"]["boycharts"].north_indian_chart || {}
          )
        );
      }
    }
    if (jsondata["page_2"]["matchingPoints"]) {
      additionalPages.push(
        createMatchingPointsPageFromImage(jsondata["page_2"]["matchingPoints"])
      );
    }
    // Add all pages to the PDF
    const allPages = [...filteredPages, ...additionalPages];
    allPages.forEach(pageData => generator.addPage(pageData));

    // Generate a unique filename
    const timestamp = Date.now();
    const filename = `kundli_${timestamp}.pdf`;
    const filePath = `./public/generated/${filename}`;

    // Save PDF
    await generator.savePDF(filePath, jsondata['phone'], jsondata["page_4"]['answer']);

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




function createBasicDetailsPage(chartPositionsConfig, pageData, gchartData2, gchartData, backgroundPath, bchartData2, bchartData) {
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
        const lang = detectLanguage(pageData.title);
        const hedingd1 = lang === 'english' ? "Horoscope D1" : lang === 'kannada' ? 'ಜಾತಕ - ಕುಂಡಲಿ' : 'जन्म कुंडली';
        const hedingd2 = lang === 'english' ? "Horoscope D9" : lang === 'kannada' ? 'ನವಾಂಶ' : 'नवांश';
       // Label for Vara (Boy) charts - upper
page.elements.push({
  type: "text",
  text: lang === "kannada" ? "ವರ" : lang === "hindi" ? "वर" : "Boy",
  position: [280, 130], // near upper_d1 center
  size: 14,
  bold: true,
  color: "#000000"
});

// Label for Kanya (Girl) charts - lower
page.elements.push({
  type: "text",
  text: lang === "kannada" ? "ವಧು" : lang === "hindi" ? "वधु" : "Girl",
  position: [280, 455], // near d1 chart center
  size: 14,
  bold: true,
  color: "#000000"
});

        page.elements.push(

          { "type": "text", "text": hedingd1, "position": [130, 300], "size": 12 },
          { "type": "text", "text": hedingd2, "position": [400, 300], "size": 12 },
          { "type": "text", "text": hedingd1, "position": [130, 600], "size": 14 },
          { "type": "text", "text": hedingd2, "position": [400, 600], "size": 14 }
        );
        Object.entries(gchartData.signs).forEach((signEntry, index) => {
          const [signName, planets] = signEntry;
          console.log(signName)

          // Only process houses with planets
          if (planets != undefined) {
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
        Object.entries(gchartData2.signs).forEach((signEntry, index) => {
          const [signename, planets] = signEntry;
          console.log(signename)
          // Only process houses with planets
          if (planets.planets != undefined) {
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
        Object.entries(bchartData.signs).forEach((signEntry, index) => {
          const [signName, planets] = signEntry;
          console.log(signName)

          // Only process houses with planets
          if (planets != undefined) {
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
                "chartType": "upper_d1", // or whatever chart type is appropriate
                "size": 10,
                // Optional: you might want to add an offset for multiple planets
                "yOffset": planetIndex * 10
              });
            });
          }
        });
        Object.entries(bchartData2.signs).forEach((signEntry, index) => {
          const [signename, planets] = signEntry;
          console.log(signename)
          // Only process houses with planets
          if (planets.planets != undefined) {
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
                "chartType": "upper_d2", // or whatever chart type is appropriate
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
        const hedingd1 = detectLanguage(pageData.title) === 'english' ? "Horoscope D1" : detectLanguage(pageData.title) === 'kannada' ? 'ಜಾತಕ - ಕುಂಡಲಿ' : 'जन्म कुंडली';
        const hedingd2 = detectLanguage(pageData.title) === 'english' ? "Horoscope D9" : detectLanguage(pageData.title) === 'kannada' ? 'ನವಾಂಶ' : 'नवांश';

        page.elements.push(

          { "type": "text", "text": hedingd1, "position": [125, 460], "size": 14 },
          { "type": "text", "text": hedingd2, "position": [400, 460], "size": 14 }
        );
        Object.keys(gchartData.houses).forEach(key => {
          // console.log(key)
          const planet = gchartData.houses[key]
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
        Object.keys(gchartData2.houses).forEach(key => {
          // console.log(key)
          const planet = gchartData2.houses[key]
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
        Object.keys(bchartData.houses).forEach(key => {
          // console.log(key)
          const planet = bchartData.houses[key]
          page.elements.push({
            "type": "text",
            "text": planet.sign_num || planet, // Handle different data structures
            "boxNumber": key,
            "chartType": "upper_d1", // or whatever chart type is appropriate
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
              "chartType": "upper_d1", // or whatever chart type is appropriate
              "size": 9,
              // Optional: you might want to add an offset for multiple planets
              "yOffset": planetIndex * 10
            });
          });
        })
        Object.keys(bchartData2.houses).forEach(key => {
          // console.log(key)
          const planet = bchartData2.houses[key]
          page.elements.push({
            "type": "text",
            "text": planet.sign_num || planet, // Handle different data structures
            "boxNumber": key,
            "chartType": "upper_d2", // or whatever chart type is appropriate
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
              "chartType": "upper_d2", // or whatever chart type is appropriate
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


  // }
  return page;
}

function createBasicDetailsPage1(pageData, backgroundPath = "Copy of Page_20250410_212301_0000.png") {
  const elements = [];

  let yPosition = 80; // Starting vertical position for elements

  const addHeading = (text, size = 16, color = "#000080") => {
    elements.push({
      type: "heading1",
      text,
      size,
      color,
      position: [70, yPosition],
    });
    yPosition += 25; // spacing after heading
  };

  const addParagraph = (text, size = 12, color = "#000000") => {
    elements.push({
      type: "paragraph",
      text,
      size,
      color,
      position: [70, yPosition],
      width: 470,
      lineGap: 4,
      align: "justify",
    });
    yPosition += (Math.ceil(text.length / 100) * 15) + 15; // Rough calculation for height
  };

  const analysis = pageData.detailed_analysis;

  for (const [key, value] of Object.entries(analysis)) {
    if (key === "Horoscope Analysis" || key === "Navamsha Analysis") {
      // Add main section heading
      addHeading(key, 18, "#4B0082");

      // Handle nested subsections
      for (const [subKey, subValue] of Object.entries(value)) {
        addHeading(subKey, 14, "#800080"); // smaller heading for subsections
        addParagraph(subValue);
      }
    } else {
      // Simple heading and paragraph
      addHeading(key, 16, "#000080");
      addParagraph(value);
    }

    // Adjust if nearing page end
    if (yPosition > 750) {
      // Handle overflow by creating new page logic here if necessary
      yPosition = 80; // reset position for new page if you split into multiple pages
    }
  }

  // Add footer logo

  return {
    background: backgroundPath,
    style: "north",
    elements,
  };
}

function createExactMatchingPointsTable(matchingPointsData) {
  if (!Array.isArray(matchingPointsData)) {
    console.error("Invalid or missing matchingPointsData:", matchingPointsData);
    return []; // return empty element array so PDF doesn't crash
  }

  const gunaAreaMap = {
    Varna: "Obedience",
    Vashya: "Mutual Control",
    Tara: "Luck",
    Yoni: "Sexual Aspects",
    Maitri: "Affection",
    Gana: "Nature",
    Bhakuta: "Love",
    Nadi: "Health"
  };

  return [
    {
      type: "table",
      position: [80, 340],
      headers: [
        { text: "Guna", color: "#FFFFFF", fillColor: "#7B8F36" },
        { text: "Max", color: "#FFFFFF", fillColor: "#7B8F36" },
        { text: "Obt", color: "#FFFFFF", fillColor: "#7B8F36" },
        { text: "Boy", color: "#FFFFFF", fillColor: "#7B8F36" },
        { text: "Girl", color: "#FFFFFF", fillColor: "#7B8F36" },
        { text: "Area of Life", color: "#FFFFFF", fillColor: "#7B8F36" }
      ],
      rows: matchingPointsData.map(item => [
        { text: item.guna, color: "red" },
        item.max?.toString() || "0",
        item.obt?.toString() || "0",
        item.boy || "",
        item.girl || "",
        gunaAreaMap[item.guna] || "—"
      ]),
      columnWidths: [70, 40, 40, 90, 90, 110],
      rowHeight: 28,
      fontSize: 12,
      borderColor: "#888",
      zebra: {
        alternateColor: "#F9C57B",
        evenColor: "#F9C57B"
      }
    }
  ];
}

function createMatchingPointsPageFromImage(matchingData) {
  console.log(matchingData.details)
  return {
    background: "WhatsApp Image 2025-03-21 at 5.02.44 PM.jpeg",
    style: "north",
    elements: [
      { "type": "heading", "text": "Matching Points", "position": [75, 88], "size": 24, "align": "center", "color": "white" },

      { type: "image", src: "images.jpg", position: [75, 130], size: [60, 60] },
      { type: "image", src: "images.jpg", position: [470, 130], size: [60, 60] },
      { type: "text", text: matchingData.boyName || "Boy", position: [60, 200], size: 12 },
      { type: "text", text: matchingData.girlName || "Girl", position: [455, 200], size: 12 },
      { type: "text", text: "Total Guna Milan", position: [220, 210], size: 14, color: "darkred" },
      {
        type: "text",
        text: matchingData.recommendation || "Union Status Unknown",
        position: [220, 230],
        size: 10,
        color: "darkred"
      },
      {
        type: "text",
        text: `${matchingData.totalPoints?.toString()}/` || '0',
        position: [260, 270],
        size: 40,
        color: "darkred"
      },
      {
        type: "text",
        text: "36",
        position: [320, 285],
        size: 20,
        color: "darkred"
      },
      {
        type: "image",
        src: matchingData.duckImage || "images.jpg",
        position: [250, 130],
        size: [30, 30]
      },
      ...createExactMatchingPointsTable(matchingData.details)
    ]
  };
}

function createBirthDetailsComparisonPage(mergedData, backgroundPath = "WhatsApp Image 2025-03-21 at 5.02.44 PM.jpeg") {
  const varaDetails = mergedData.varaDetails;
  const kanyaDetails = mergedData.kanyaDetails;

  const BIRTH_DETAIL_LABELS = Object.keys(varaDetails); // Assuming both have same keys

  return {
    background: backgroundPath,
    style: "north",
    elements: [
      {
        type: "heading",
        text: mergedData.title || "Birth Details Comparison",
       "position": [75, 88], "size": 24, "align": "center", "color": "white"},
      {
        type: "table",
        position: [50, 190],
        headers: [
          { text: "Label", color: "#FFFFFF", fillColor: "#7B8F36" },
          { text: "Vara", color: "#FFFFFF", fillColor: "#7B8F36" },
          { text: "Kanya", color: "#FFFFFF", fillColor: "#7B8F36" }
        ],
        rows: BIRTH_DETAIL_LABELS.map((label) => [
          { text: label, color: "#000000" },
          varaDetails[label] || "",
          kanyaDetails[label] || ""
        ]),
        columnWidths: [150, 180, 180],
        rowHeight: 26,
        fontSize: 12,
        borderColor: "#444444",
        zebra: {
          alternateColor: "#F9C57B",
          evenColor: "#FFF5E1"
        }
      },
      {
        type: "text",
        type1: "logo",
        text: "astroanswer.co",
        position: [230, 754],
        size: 10,
        align: "center",
        color: "black",
        link: "https://wa.link/lilays"
      }
    ]
  };
}

