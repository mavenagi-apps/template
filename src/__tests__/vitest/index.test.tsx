import { MavenAGI } from 'mavenagi';
import { Actions } from 'mavenagi/api/resources/actions/client/Client';
import { Knowledge } from 'mavenagi/api/resources/knowledge/client/Client';
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
          settings: {},
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
        Knowledge.prototype.createOrUpdateKnowledgeBase = vi.fn().mockImplementation(() => {});
        Knowledge.prototype.createKnowledgeBaseVersion = vi.fn().mockImplementation(() => {});
        Knowledge.prototype.createKnowledgeDocument = vi.fn().mockImplementation(() => {});
        Knowledge.prototype.finalizeKnowledgeBaseVersion = vi.fn().mockImplementation(() => {});

        return { Knowledge };
      });
      await postInstall({
        agentId: 'sample-agent-id',
        organizationId: 'sample-org-id',
        settings: {},
      });
      expect(Actions.prototype.createOrUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          actionId: {
            referenceId: 'sample-action',
          },
          name: expect.any(String),
          description: expect.any(String),
          userInteractionRequired: false,
        })
      );
      expect(Knowledge.prototype.createOrUpdateKnowledgeBase).toHaveBeenCalledWith(
        expect.objectContaining({
          knowledgeBaseId: {
            referenceId: 'sample-knowledge',
          },
          name: 'sample-knowledge',
          type: MavenAGI.KnowledgeBaseType.Api,
        })
      );
      expect(Knowledge.prototype.createKnowledgeBaseVersion).toHaveBeenCalledWith(
        expect.stringMatching('sample-knowledge'),
        expect.objectContaining({ type: 'FULL' })
      );
      expect(Knowledge.prototype.createKnowledgeDocument).toHaveBeenCalledWith(
        expect.stringMatching('sample-knowledge'),
        expect.objectContaining({
          knowledgeDocumentId: {
            referenceId: expect.any(String),
          },
          title: expect.any(String),
          content: expect.any(String),
          contentType: 'MARKDOWN',
        })
      );
      expect(Knowledge.prototype.finalizeKnowledgeBaseVersion).toHaveBeenCalledWith(
        expect.stringMatching('sample-knowledge')
      );
    });
  });
});
