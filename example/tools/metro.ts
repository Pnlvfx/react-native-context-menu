import { execa } from 'execa';

await execa('node_modules/.bin/react-native', ['start'], { stdio: 'inherit' });
