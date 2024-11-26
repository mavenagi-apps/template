import { promises as fs } from 'fs';
import { MavenAGIClient } from 'mavenagi';
import path from 'path';

export const SAMPLE_ACTION_NAME = 'Sample Action';
export const SAMPLE_ACTION_ID = 'sample-action';
export const SAMPLE_ACTION_DESCRIPTION =
  'This is a json file consisting of the details of each amendment to the United States Constitution. Use it when questions about the amendments are asked.';

export const installSampleAction = async (client: MavenAGIClient) => {
  await client.actions.createOrUpdate({
    actionId: {
      referenceId: SAMPLE_ACTION_ID,
    },
    name: SAMPLE_ACTION_NAME,
    description: SAMPLE_ACTION_DESCRIPTION,
    userInteractionRequired: false,
    userFormParameters: [],
  });
};

export const runSampleAction = async ({}: { parameters: Record<string, string> }) => {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'amendments.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading amendments file:', error);
    throw error;
  }
};
