import { NeveRecorder } from '@mavenagi/neve-recorder';
import { type SetupServerApi, setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, beforeEach, expect } from 'vitest';

declare global {
  // eslint-disable-next-line no-var
  var mockServer: SetupServerApi;
}

global.mockServer = setupServer();
const neveRecorder = new NeveRecorder({
  expect: expect,
  server: mockServer,
});

beforeAll(() => {
  // Note: in some cases, a third-party client library may grab a reference to the global fetch before
  // msw does, resulting in no captures occurring. When this happens, move the listen call below to the
  // global scope.
  mockServer.listen({
    // always throw errors for unmocked requests when running in a CI environment
    onUnhandledRequest: process.env.CI === 'true' ? 'error' : 'bypass',
  });
});

beforeEach(() => {
  neveRecorder.start();
});

afterEach(() => {
  mockServer.resetHandlers();
});

afterAll(() => {
  global.mockServer.close();
  neveRecorder.stop();
});
