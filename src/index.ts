import { MavenAGIClient } from 'mavenagi';

export default {
  async preInstall({}: { organizationId: string; agentId: string; settings: AppSettings }) {
    // Pre-install logic here
  },

  async postInstall({
    organizationId,
    agentId,
  }: {
    organizationId: string;
    agentId: string;
    settings: AppSettings;
  }) {
    new MavenAGIClient({
      organizationId: organizationId,
      agentId: agentId,
    });

    // Setup actions, users, knowledge, etc
  },

  async executeAction({}: { actionId: string; parameters: Record<string, string> }) {
    // Execute action logic here
  },

  async knowledgeBaseRefreshed({
    organizationId,
    agentId,
  }: {
    organizationId: string;
    agentId: string;
    knowledgeBaseId: { referenceId: string };
    settings: AppSettings;
  }) {
    new MavenAGIClient({
      organizationId: organizationId,
      agentId: agentId,
    });

    // Setup actions, users, knowledge, etc
  },
};
