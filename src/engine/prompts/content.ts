import { Tasks } from './types'

export const contentPrompt = (html: string, tasks: Tasks) =>
  `const template = ${html};
const guidelines = ${JSON.stringify(tasks)};

/**
 * This function converts a Tailwind template into a webpage
 * - it will generate caption (alt) for images, with full description, complete enough to allow someone else to take the exact same picture (camera scene, exposure, textures, backgrounds etc)
 * - it can make some changes in the Tailwind classes to use colors more aligned with the guidelines, such as background colors and text colors
 * - the colors to use should be those frequently associated with the theme, stereotype, object or material (warm colors for festive, vacation, spain, blue for water or cold, green for nature etc)
 * - it writes in English, not Latin
 * - only add javascript if it makes sense, for instance it doesn't make sense to add javascript to static landing pages about sites, products, movies, games
 * - but it makes sense to add javascript if the page itself is an application, a game or a simulator
 *
 * @param {string} HTML template with {{semantic blocks}} to replace by AI-generated text
 * @param {Object} Rules used to define how to write the content, and make small changes to the HTML (eg. design change using Tailwind, or number of items etc)
 * @returns a text where all the {{semantic blocks}} have been replaced with a plain text equivalent
 */
const out = generateWebpageWithAI(template, guidelines);

console.log(out)
Output:`
