export async function onRequest(context) {
  const { MOVIEDB } = context.env;
  
  const movies = await MOVIEDB.prepare("SELECT * FROM movies").all();
  
  return new Response(JSON.stringify(movies.results), {
    headers: { "Content-Type": "application/json" },
  });
}
