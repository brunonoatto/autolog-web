/* eslint-disable @typescript-eslint/no-explicit-any */
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

import { BrowserContext } from '@playwright/test';

const istanbulCLIOutput = path.join(process.cwd(), '.nyc_output');

export function generateUUID(): string {
  return crypto.randomBytes(16).toString('hex');
}

const contextCoverage = async (
  context: BrowserContext,
  use: (r: BrowserContext) => Promise<void>,
) => {
  await context.addInitScript(() => {
    window.addEventListener('beforeunload', () => {
      const result = (window as any).collectIstanbulCoverage(
        JSON.stringify((window as any).__coverage__),
      );
      return result;
    });
  });
  await fs.promises.mkdir(istanbulCLIOutput, { recursive: true });

  await context.exposeFunction('collectIstanbulCoverage', (coverageJSON: string) => {
    if (coverageJSON)
      fs.writeFileSync(
        path.join(istanbulCLIOutput, `playwright_coverage_${generateUUID()}.json`),
        coverageJSON,
      );
  });

  await use(context);

  const pages = context.pages();
  for (const page of pages) {
    await page.evaluate(() =>
      (window as any).collectIstanbulCoverage(JSON.stringify((window as any).__coverage__)),
    );
  }
};

export default contextCoverage;
