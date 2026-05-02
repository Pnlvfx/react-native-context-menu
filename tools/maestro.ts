import { execa } from 'execa';
import path from 'node:path';

await execa('maestro', ['test', path.join('.maestro', 'context_menu.yaml')], {
  stdio: 'inherit',
});
