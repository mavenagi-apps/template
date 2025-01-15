import { SetupServerApi, setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import hooks from '../../index';
import { SAMPLE_ACTION_MOCK, SAMPLE_GET_KNOWLEDGE_MOCK } from './fixtures/fixtures';

const { preInstall, postInstall } = hooks;

describe('Maven hooks', async () => {
  let server: SetupServerApi;

  beforeAll(async () => {
    console.log('beforeAll');
    server = setupServer();
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
    vi.restoreAllMocks();
  });

  describe('preInstall', () => {
    it('should run without error', async () => {
      await expect(
        preInstall({
          agentId: 'sample-agent-id',
          organizationId: 'sample-org-id',
          settings: {
            clientId: 'foo',
            clientSecret: 'bar',
            username: 'baz',
            password: 'password'
          },
        })
      ).resolves.not.toThrow();
    });
  });

  describe('postInstall', () => {
    it('should install the sample action', async () => {
      server.use(SAMPLE_GET_KNOWLEDGE_MOCK, SAMPLE_ACTION_MOCK);
      vi.mock('mavenagi/api/resources/actions/client/Client', () => {
        const Actions = vi.fn();
        Actions.prototype.createOrUpdate = vi.fn().mockImplementation(() => {});

        return { Actions };
      });

      vi.mock('mavenagi/api/resources/knowledge/client/Client', () => {
        const Knowledge = vi.fn();

        return { Knowledge };
      });
      await postInstall({
        agentId: 'sample-agent-id',
        organizationId: 'sample-org-id',
        settings: {
          clientId: 'foo',
          clientSecret: 'bar',
          username: 'baz',
          password: 'password'
        },
      });
    });
  });
});
