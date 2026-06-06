import { execa } from 'execa';
import path from 'node:path';
import fs from 'node:fs';

const flowFile = path.join('.maestro', 'context_menu.yaml');
const mediaDir = path.join('media');
const outputFile = path.join(mediaDir, 'showcase.mp4');
const gifFile = path.join(mediaDir, 'showcase.gif');

fs.mkdirSync(mediaDir, { recursive: true });

await execa('maestro', ['record', '--local', flowFile, outputFile], {
  stdio: 'inherit',
});

console.log(`Showcase saved to ${outputFile}`);

await execa(
  'ffmpeg',
  ['-y', '-i', outputFile, '-vf', 'fps=20,scale=480:-1:flags=lanczos', gifFile],
  { stdio: 'inherit' }
);

console.log(`GIF saved to ${gifFile}`);
