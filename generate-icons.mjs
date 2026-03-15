// Generate PNG icons from SVG using canvas
import { createCanvas } from 'canvas';
import { writeFileSync } from 'fs';

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, size, size);

  // Rounded background square
  const padding = size * 0.08;
  const radius = size * 0.22;
  ctx.beginPath();
  ctx.roundRect(padding, padding, size - padding * 2, size - padding * 2, radius);
  ctx.fillStyle = '#161b22';
  ctx.fill();

  // Gold border
  ctx.strokeStyle = '#e8c547';
  ctx.lineWidth = size * 0.04;
  ctx.stroke();

  // Draw "W" letter in Oswald style
  const cx = size / 2;
  const cy = size / 2;
  const fs = size * 0.52;
  ctx.fillStyle = '#e8c547';
  ctx.font = `bold ${fs}px Impact, Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('W', cx, cy + size * 0.03);

  // Small subtitle
  const smallFs = size * 0.1;
  ctx.fillStyle = '#39d353';
  ctx.font = `bold ${smallFs}px Arial`;
  ctx.fillText('WARFIT', cx, cy + fs * 0.52);

  return canvas.toBuffer('image/png');
}

try {
  const buf192 = drawIcon(192);
  const buf512 = drawIcon(512);
  writeFileSync('public/icons/icon-192.png', buf192);
  writeFileSync('public/icons/icon-512.png', buf512);
  console.log('Icons generated successfully');
} catch (e) {
  console.log('canvas not available, using SVG fallback');
}
