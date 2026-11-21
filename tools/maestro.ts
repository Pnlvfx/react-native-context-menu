import { execa } from 'execa';

await execa('maestro', ['test', '.maestro'], {
  stdio: 'inherit',
});
