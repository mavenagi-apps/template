import hooks from '@/index';
import { SAMPLE_ACTION_ID } from '@lib/actions';
import { SAMPLE_KNOWLEDGEBASE_NAME, SAMPLE_KNOWLEDGE_ID } from '@lib/knowledge';
import { Actions } from 'mavenagi/api/resources/actions/client/Client';
import { Knowledge } from 'mavenagi/api/resources/knowledge/client/Client';
import { describe, expect, it, vi } from 'vitest';

vi.mock('mavenagi/api/resources/actions/client/Client', () => {
  const Actions = vi.fn();
  Actions.prototype.createOrUpdate = vi.fn();

  return { Actions };
});

vi.mock('mavenagi/api/resources/knowledge/client/Client', () => {
  const Knowledge = vi.fn();
  Knowledge.prototype.createOrUpdateKnowledgeBase = vi.fn();
  Knowledge.prototype.createKnowledgeBaseVersion = vi.fn();
  Knowledge.prototype.createKnowledgeDocument = vi.fn();
  Knowledge.prototype.finalizeKnowledgeBaseVersion = vi.fn();

  return { Knowledge };
});

const { postInstall } = hooks;

const AGENT_ID = 'test-agent-id';
const ORGANIZATION_ID = 'test-org-id';
const APP_SETTINGS = {};

describe('app-template', () => {
  describe('postInstall', () => {
    it('should install the sample action', async () => {
      await postInstall({
        agentId: AGENT_ID,
        organizationId: ORGANIZATION_ID,
        settings: APP_SETTINGS,
      });
      expect(Actions.prototype.createOrUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          actionId: {
            referenceId: SAMPLE_ACTION_ID,
          },
          name: expect.any(String),
          description: expect.any(String),
          userInteractionRequired: false,
        })
      );
      expect(Knowledge.prototype.createOrUpdateKnowledgeBase).toHaveBeenCalledWith(
        expect.objectContaining({
          name: SAMPLE_KNOWLEDGEBASE_NAME,
          type: 'API',
          knowledgeBaseId: {
            referenceId: SAMPLE_KNOWLEDGE_ID,
          },
        })
      );
    });
  });
});
