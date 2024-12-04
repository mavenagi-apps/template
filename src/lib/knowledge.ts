import { MavenAGI, MavenAGIClient } from 'mavenagi';

export const SAMPLE_KNOWLEDGEBASE_NAME = 'sample-knowledge';
export const SAMPLE_KNOWLEDGE_ID = 'sample-knowledge';

export const upsertSampleKnowledge = async (
  client: MavenAGIClient,
  {
    title,
    content,
    slug,
  }: {
    title: string;
    content: string;
    slug: string;
  }
) => {
  try {
    await client.knowledge.createOrUpdateKnowledgeBase({
      name: SAMPLE_KNOWLEDGEBASE_NAME,
      type: MavenAGI.KnowledgeBaseType.Api,
      knowledgeBaseId: { referenceId: SAMPLE_KNOWLEDGE_ID },
    });

    await client.knowledge.createKnowledgeBaseVersion(SAMPLE_KNOWLEDGE_ID, {
      type: 'FULL',
    });

    await client.knowledge.createKnowledgeDocument(SAMPLE_KNOWLEDGE_ID, {
      title,
      content,
      contentType: 'MARKDOWN',
      knowledgeDocumentId: { referenceId: slug },
    });

    await client.knowledge.finalizeKnowledgeBaseVersion(SAMPLE_KNOWLEDGE_ID);
  } catch (error) {
    console.error('Error creating knowledge base', error);
    throw error;
  }
};

export const refreshSampleKnowledge = async (
  client: MavenAGIClient,
  {
    title,
    content,
    slug,
  }: {
    title: string;
    content: string;
    slug: string;
  }
) => {
  await client.knowledge.createKnowledgeBaseVersion(SAMPLE_KNOWLEDGE_ID, {
    type: 'FULL',
  });

  await client.knowledge.createKnowledgeDocument(SAMPLE_KNOWLEDGE_ID, {
    title,
    content,
    contentType: 'MARKDOWN',
    knowledgeDocumentId: { referenceId: slug },
  });

  await client.knowledge.finalizeKnowledgeBaseVersion(SAMPLE_KNOWLEDGE_ID);
};
