import { MavenAGIClient } from 'mavenagi';
import { EntityId } from 'mavenagi/api';

export const SAMPLE_TRIGGER = '';

export const handleSampleTrigger = async (
  client: MavenAGIClient,
  {
    conversations,
  }: {
    conversations: EntityId[]; //TODO: proper types
  }
) => {
  for (const conversation of conversations) {
    const response = await client.conversation.get(conversation.referenceId, {
      appId: conversation.appId,
    });
    console.log('conversation updated:', JSON.stringify(response));
  }
};
