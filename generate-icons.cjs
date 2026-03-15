// Generate PNG icons using pure Node.js (no external deps)
// Creates a simple PNG with raw bytes
const fs = require('fs');
const zlib = require('zlib');

function createPNG(size) {
  // Draw the icon pixels
  const pixels = new Uint8Array(size * size * 4);

  const cx = size / 2;
  const cy = size / 2;
  const padding = size * 0.08;
  const innerSize = size - padding * 2;
  const radius = size * 0.22;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      // Background: dark
      pixels[idx] = 13; pixels[idx+1] = 17; pixels[idx+2] = 23; pixels[idx+3] = 255;

      // Inner rounded rect
      const rx = x - padding;
      const ry = y - padding;
      if (rx >= 0 && ry >= 0 && rx <= innerSize && ry <= innerSize) {
        // Corner rounding
        const corners = [
          [radius, radius], [innerSize - radius, radius],
          [radius, innerSize - radius], [innerSize - radius, innerSize - radius]
        ];
        let inRect = true;
        for (const [cx2, cy2] of corners) {
          const dx = rx - cx2, dy = ry - cy2;
          if (dx < 0 && dy < 0 && dx * dx + dy * dy > radius * radius) {
            inRect = false; break;
          }
          if (dx > 0 && dy < 0 && (rx - (innerSize - radius)) > 0 && (rx - (innerSize - radius)) ** 2 + dy * dy > radius * radius) {
            inRect = false; break;
          }
        }

        if (inRect) {
          pixels[idx] = 22; pixels[idx+1] = 27; pixels[idx+2] = 34; pixels[idx+3] = 255;

          // Gold border
          const borderW = size * 0.04;
          if (rx < borderW || ry < borderW || rx > innerSize - borderW || ry > innerSize - borderW) {
            pixels[idx] = 232; pixels[idx+1] = 197; pixels[idx+2] = 71; pixels[idx+3] = 255;
          }

          // Draw "W" shape
          const wx = (rx / innerSize);
          const wy = (ry / innerSize);
          // Simple W shape using geometric primitives
          const inW = (
            // Left leg
            (wx > 0.15 && wx < 0.28 && wy > 0.2 && wy < 0.75) ||
            // Second leg (angled inward)
            (wx > 0.28 && wx < 0.42 && wy > 0.35 + (wx - 0.28) * 1.5 && wy < 0.75) ||
            // Third leg (angled outward)
            (wx > 0.42 && wx < 0.56 && wy > 0.75 - (wx - 0.42) * 1.5 && wy < 0.75) ||
            // Fourth leg
            (wx > 0.56 && wx < 0.7 && wy > 0.2 && wy < 0.75) ||
            // Top bar
            (wy > 0.2 && wy < 0.33 && wx > 0.15 && wx < 0.72)
          );

          if (inW) {
            pixels[idx] = 232; pixels[idx+1] = 197; pixels[idx+2] = 71; pixels[idx+3] = 255;
          }

          // Green bar at bottom
          if (wy > 0.78 && wy < 0.88 && wx > 0.15 && wx < 0.85) {
            pixels[idx] = 57; pixels[idx+1] = 211; pixels[idx+2] = 83; pixels[idx+3] = 255;
          }
        }
      }
    }
  }

  return encodePNG(pixels, size, size);
}

function encodePNG(pixels, width, height) {
  // PNG signature
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type RGB (we'll use RGBA → 6)
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  // Raw image data with filter bytes
  const raw = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    raw[y * (1 + width * 4)] = 0; // None filter
    for (let x = 0; x < width; x++) {
      const si = (y * width + x) * 4;
      const di = y * (1 + width * 4) + 1 + x * 4;
      raw[di] = pixels[si];
      raw[di+1] = pixels[si+1];
      raw[di+2] = pixels[si+2];
      raw[di+3] = pixels[si+3];
    }
  }

  const compressed = zlib.deflateSync(raw);

  const makeChunk = (type, data) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeB = Buffer.from(type);
    const crcData = Buffer.concat([typeB, data]);
    const crc = crc32(crcData);
    const crcB = Buffer.alloc(4);
    crcB.writeUInt32BE(crc >>> 0, 0);
    return Buffer.concat([len, typeB, data, crcB]);
  };

  return Buffer.concat([
    sig,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0)),
  ]);
}

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc & 1) ? (0xEDB88320 ^ (crc >>> 1)) : (crc >>> 1);
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

fs.writeFileSync('public/icons/icon-192.png', createPNG(192));
fs.writeFileSync('public/icons/icon-512.png', createPNG(512));
console.log('Icons generated: public/icons/icon-192.png, public/icons/icon-512.png');
