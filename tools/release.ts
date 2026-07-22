import { execa } from 'execa';

// yarn dlx @goatjs/dbz login
await execa('yarn', ['dlx', '@goatjs/dbz', 'publish', '--release'], { stdio: 'inherit' });
