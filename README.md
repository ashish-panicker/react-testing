# React Testing

Necessary dependencies

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @testing-library/user-event
```

Additional Scripts

```js
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

Setting up Tests

```js
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Runs a cleanup after each test case (e.g., clearing jsdom)
afterEach(() => {
  cleanup();
});
```

Additional Vite config

```js
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true, // Allows using 'describe', 'it', 'expect' without importing
    setupFiles: './src/setupTests.js',
  },
});
```