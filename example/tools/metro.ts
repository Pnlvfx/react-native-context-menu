import { execa } from 'execa';

const rootDir = '/Users/simonegauli/Desktop/packages/react-native-context-menu';
const exampleDir = `${rootDir}/example`;

// Reset watchman for root
// eslint-disable-next-line parallelize/no-sequential-await
await execa('watchman', ['watch-del', rootDir], { stdio: 'inherit' });
await execa('watchman', ['watch-project', rootDir], { stdio: 'inherit' });

// Reset watchman for example
await execa('watchman', ['watch-del', exampleDir], { stdio: 'inherit' });
await execa('watchman', ['watch-project', exampleDir], { stdio: 'inherit' });

await execa('node_modules/.bin/react-native', ['start'], { stdio: 'inherit' });
