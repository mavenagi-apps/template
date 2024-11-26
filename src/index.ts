import { MavenAGIClient } from 'mavenagi';
import { EntityId } from 'mavenagi/api';

import {
  SAMPLE_ACTION_ID,
  handleSampleTrigger,
  installSampleAction,
  refreshSampleKnowledge,
  runSampleAction,
  upsertSampleKnowledge,
} from './lib';

const HOST = 'http://localhost:3000';

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

    await installSampleAction(client);

    console.info(`Installed sample action`, {
      organizationId,
      agentId,
    });

    const title = 'United States Constitution';
    const slug = 'us-constitution';
    const response = await fetch(`${HOST}/constitution.md`);
    const content = await response.text();

    await upsertSampleKnowledge(client, { title, content, slug });

    console.info(`Created sample knowledge`, {
      organizationId,
      agentId,
    });
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
    const response = await fetch(`${HOST}/constitution.md`);
    const content = await response.text();

    await refreshSampleKnowledge(client, { title, content, slug });

    console.info(`Updated sample knowledge`, {
      organizationId,
      agentId,
    });
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

    console.info(`Handled sample trigger`, {
      organizationId,
      agentId,
    });
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

    console.info(`Executed sample action`);
  },
};
