import axios from 'axios';
import jsforce, { Connection } from 'jsforce';
import { MavenAGI, MavenAGIClient } from 'mavenagi';

const apiVersion = '52.0';

interface KnowledgeArticles {
  articles: KnowledgeArticle[];
  nextRecordsUrl: string;
}

interface KnowledgeArticle {
  id: string;
  title: string;
  summary: string;
  body: string;
  urlName: string;
}

export async function fetchPages(conn: Connection) {
  let endpoint = `/services/data/${apiVersion}/support/knowledgeArticles`;
  let allArticles: KnowledgeArticle[] = [];
  while (endpoint) {
    const response: KnowledgeArticles = await conn.request(endpoint);
    allArticles = allArticles.concat(response.articles);
    endpoint = response.nextRecordsUrl;
  }

  return allArticles;
}

export async function fetchArticle(conn: Connection, articleId: string) {
  const endpoint = `/services/data/${apiVersion}/support/knowledgeArticles/${articleId}`;
  return conn.request(endpoint);
}

export async function getAccessToken(clientId: string, clientSecret: string): Promise<string> {
  const response = await axios.post('https://login.salesforce.com/services/oauth2/token', null, {
    params: {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    },
  });
  return response.data.access_token;
}

export async function syncData(settings: AppSettings, organizationId: string, agentId: string) {
  const client = new MavenAGIClient({
    organizationId: organizationId,
    agentId: agentId,
  });

  const oAuth2 = new jsforce.OAuth2({
    loginUrl: 'https://login.salesforce.com',
    clientId: settings.clientId,
    clientSecret: settings.clientSecret,
  });

  const conn = new jsforce.Connection({ oauth2: oAuth2 });

  await conn.login(settings.username, settings.password);

  const articles = await fetchPages(conn);

  await Promise.all(
    articles.map(async (article) => {
      const articleData: KnowledgeArticle = (await fetchArticle(
        conn,
        article.id
      )) as KnowledgeArticle;
      await client.knowledge.createKnowledgeDocument('salesforce', {
        knowledgeDocumentId: { referenceId: articleData.id },
        title: articleData.title,
        content: article.body,
        contentType: MavenAGI.KnowledgeDocumentContentType.Html,
        url: articleData.urlName,
      });
    })
  );
}
