import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Define sizes for PWA icons
const sizes = [48, 72, 96, 128, 144, 152, 192, 384, 512];
const splashSizes = [640, 750, 1125, 1242, 1536, 2048, 2732];  // Apple splash screen sizes
const inputFile = 'public/icons/logo.png';
const outputDir = 'public/icons/';
const splashDir = 'public/splash/';

// Ensure output directories exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
if (!fs.existsSync(splashDir)) {
  fs.mkdirSync(splashDir, { recursive: true });
}

// Resize the input image to a maximum size
sharp(inputFile)
  .resize(2048, 2048, { fit: 'inside' })  // Resize to largest allowed size
  .toBuffer()
  .then((resizedImage) => {
    // Generate PWA icons
    sizes.forEach(size => {
      const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
      sharp(resizedImage)
        .resize(size, size)
        .toFile(outputPath, (err) => {
          if (err) console.error(`Error generating ${outputPath}:`, err);
          else console.log(`✅ Generated: ${outputPath}`);
        });
    });

    // Generate splash screen images for Apple devices
    splashSizes.forEach(size => {
      const splashOutputPath = path.join(splashDir, `splash-${size}x${size}.png`);
      sharp(resizedImage)
        .resize(size, size)
        .toFile(splashOutputPath, (err) => {
          if (err) console.error(`Error generating ${splashOutputPath}:`, err);
          else console.log(`✅ Generated: ${splashOutputPath}`);
        });
    });

    // Generate maskable icon (needs to be square)
    const maskableIconSize = 512;
    const maskableIconPath = path.join(outputDir, `maskable-icon-${maskableIconSize}x${maskableIconSize}.png`);
    sharp(resizedImage)
      .resize(maskableIconSize, maskableIconSize)
      .composite([{
        input: resizedImage,
        gravity: 'center',
      }])
      .toFile(maskableIconPath, (err) => {
        if (err) console.error(`Error generating ${maskableIconPath}:`, err);
        else console.log(`✅ Generated: ${maskableIconPath}`);
      });

  })
  .catch(err => {
    console.error('Error processing image:', err);
  });
