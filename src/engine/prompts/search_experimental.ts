// sub template shuld be pretty basic, ie just "content"
export const searchTemplate = (query: string, nbResults: number) =>
  `
// a result coming from a fantasy search engine
interface Result {
  // title should be catchy, it is for marketing purposes (it may include puns)
  title: string;
  
  // subtitle is the tagline, pitch or punch phrase of the app. It should be enough to understand what it is about.
  subtitle: string;
  
  // this description field will be used as instructions to generate HTML, CSS and JS content by a web developer
  description: string;
}

/**
- Generate a valid JSON coming from a fantasy search engine
 - You MUST imagine various search results, like websites, webapps, encyclopedias, news articles.. etc.
 - Try to mix various kind of results: news articles, blogs, html/js games, <canvas> simulators, WebGL apps and games, encyclopedias, product webpages fr online tools, SaaS services, utilities..
 - When generating games try to prefer either 2D <canvas> or WebGL, and be explicit about how the game plays and is controlled (what the mouse or keyboard do etc)
 - Give precise instructions on how to build an encyclopedia page, a news articles (explain the layout, the content, images..)
 - Each result MUST have different descriptions, different from the original, to introduce diversity and alternative solutions.
 - For instance you MUST vary information such as the color scheme to use, or the position of buttons, text etc.
 - NEVER forget to describe colors! use stereotype colors like blue is for water-related, green for nature-related etc
 - DO NOT repeat the description, each result MUST BE different from each others
*/
const output: Result = generate({ query: ${JSON.stringify(
    query
  )}, maxResults: ${nbResults} })
console.log(output)
result: [`
