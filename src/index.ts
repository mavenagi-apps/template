import { MavenAGIClient } from 'mavenagi';
import { EntityId } from 'mavenagi/api';

import {
  SAMPLE_ACTION_ID,
  handleSampleTrigger,
  refreshSampleKnowledge,
  runSampleAction,
  upsertSampleKnowledge,
} from './lib';

export default {
  /**
   * Use for any required validation steps, eg. credentials etc.
   */
  async preInstall({
    organizationId,
    agentId,
  }: {
    organizationId: string;
    agentId: string;
    settings: AppSettings;
  }) {
    console.info('preInstall', { organizationId, agentId });
  },

  /**
   * For installing actions, knowledge, etc
   */
  async postInstall({
    organizationId,
    agentId,
  }: {
    organizationId: string;
    agentId: string;
    settings: AppSettings;
  }) {
    console.info('postInstall', { organizationId, agentId });

    const client = new MavenAGIClient({
      organizationId: organizationId,
      agentId: agentId,
    });

    console.info(`Installed '${SAMPLE_ACTION_ID}' action`, {
      organizationId,
      agentId,
    });

    const title = 'United States Constitution';
    const slug = 'us-constitution';
    const response = await fetch('/constitution.md');
    const content = await response.text();

    await upsertSampleKnowledge(client, { title, content, slug });
  },

  /**
   * Handler for refresh of knowledge base
   */
  async knowledgeBaseRefreshed({
    organizationId,
    agentId,
  }: {
    organizationId: string;
    agentId: string;
    knowledgeBaseId: { referenceId: string };
    settings: AppSettings;
  }) {
    console.info('knowledgeBaseRefreshed', { organizationId, agentId });

    const client = new MavenAGIClient({
      organizationId: organizationId,
      agentId: agentId,
    });

    const title = 'United States Constitution';
    const slug = 'us-constitution';
    const response = await fetch('/constitution.md');
    const content = await response.text();

    await refreshSampleKnowledge(client, { title, content, slug });
  },

  /**
   * Trigger on conversation creation and update
   */
  async conversationCreatedOrUpdated({
    agentId,
    organizationId,
    conversations,
  }: {
    agentId: string;
    organizationId: string;
    conversations: EntityId[];
    settings: AppSettings;
  }) {
    console.info('conversationCreatedOrUpdated', { organizationId, agentId });

    const client = new MavenAGIClient({
      organizationId: organizationId,
      agentId: agentId,
    });

    await handleSampleTrigger(client, { conversations });
  },

  /**
   * Handler for any installed action(s)
   */
  async executeAction({
    actionId,
    parameters,
  }: {
    actionId: string;
    parameters: Record<string, string>;
  }) {
    console.info('executeAction', { actionId });

    if (0 === SAMPLE_ACTION_ID.localeCompare(actionId)) {
      const content = await runSampleAction({ parameters });
      return content;
    }
  },
};
