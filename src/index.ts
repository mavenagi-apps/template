export default {
  /**
   * Use for any required validation steps, eg. credentials etc.
   */
  async preInstall({
    organizationId,
    agentId,
    settings,
  }: {
    organizationId: string;
    agentId: string;
    settings: AppSettings;
  }) {
    console.info('preInstall', { organizationId, agentId, settings });
  },

  /**
   * For installing actions, knowledge, etc
   */
  async postInstall({
    organizationId,
    agentId,
    settings,
  }: {
    organizationId: string;
    agentId: string;
    settings: AppSettings;
  }) {
    console.log('postInstall', { organizationId, agentId, settings });
    // TODO(igor): Uncomment this once function is tested
    // await syncData(settings, organizationId, agentId);
  },

  /**
   * Handler for refresh of knowledge base
   */
  async knowledgeBaseRefreshed({
    organizationId,
    agentId,
    settings,
  }: {
    organizationId: string;
    agentId: string;
    settings: AppSettings;
  }) {
    console.log('knowledgeBaseRefreshed', { organizationId, agentId, settings });
    // TODO(igor): Uncomment this once function is tested
    // await syncData(settings, organizationId, agentId);
  },
};
