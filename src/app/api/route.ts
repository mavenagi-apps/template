export const POST = () => {
  return new Response(JSON.stringify({ text: 'hello world' }), { status: 200 });
};
