// sub template shuld be pretty basic, ie just "content"
export const searchTemplate = (query: string, nbResults: number) =>
  `- Generate a valid JSON for a fantasy search engine like in the examples
   - You MUST imagine various search results like websites, webapps, encyclopedias, news articles..
   - Try to mix various kind of results: news articles, blogs, html/js games, <canvas> simulators, WebGL apps and games, encyclopedias, product webpages fr online tools, SaaS services, utilities..
   - When generating games to prefer either 2D <canvas> or WebGL, and be explicit about how the game plays and is controlled (what the mouse or keyboard do etc)
   - Give precise instructions on how to build an encyclopedia page, a news article (explain the layout, the content, images..)
   - Each result MUST have different descriptions, different from the original, to introduce diversity and alternative solutions.
   - For instance you MUST vary information such as the color scheme to use or the position of buttons, text..
   - NEVER forget to describe colors! use stereotypical colors like blue is for water-related, green for nature-related..
   - DO NOT repeat the description, each result MUST BE different from the others
   Examples:
 
   input: {
     "query": "backoffice app to manage users",
    "nbResults": 7,
   }
   JSON: [
     {
        "title": "Backoff",
        "subtitle": "A back-office app for user administration.",
        "description":  "a back-office application to manage users. There is a <table> with editable cells, a button to add a new user, and a counter of users. Interface is cool and fresh, with drop shadows for buttons, and clear spacing"
     },
     {
        "title": "User Admin Application",
        "subtitle": "A back-office application to manage users.",
        "description":  "a user interface to administre manage users, with a table with editable cells (<li>), nice shaded containers and blue-grey colors, buttons to add and delete users, and a display for stats like the number of users."
     },
     {
        "title": "User administration apps",
        "subtitle": "A comparison of the most popular back office frameworks",
        "description":  "marketing website with a table comparing various back office applications, with a few screenshot, price, features. The used colors are original, creative, and modern. At the end there is the choice of the editor.",
     },
     {
        "title": "BO App by gpt-3.5-turbo-instruct",
        "subtitle": "Manage your users with this app!",
        "description": "Application to manage a list of users, using an editable list table, and actions to add or edit users. Shows a dynamic counter for the number of users in the top right."
     },
     {
        "title": "Back-Office Application - LLMpedia",
        "subtitle": "Back-office software is used to manage business operations and interfaces that are not seen by consumers.",
        "description": "An encyclopedia article explaning what is a back-office software application. It presents in a synthetic and scientific way the history, purpose, and examples of such application. The layout of the article is simple, yet elegant, with large paddings and titles, grey tones. It features at least one screenshot."
      },
      {
        "title": "Back-Office App Developer - AI To hire",
        "subtitle": "Get free developers to build your app!",
        "description": "An ad on a job posting website, where an artificial worker (AI) advertises their backend application building skills. The design is very corporate, in grey and blue tone. There is an avatar in the top corner, and a description of the skills of the worker, a marketing pitch explaining why we should hire them, in multiple paragraphs. It reads like a resume. There is a button to hire the worker."
     },
     {
       "title": "Bo.ts",
       "subtitle": "Generate nice corporate interfaces with Bo.ts",
       "description": "An open-source project repository for a back-office app generator library made in TypeScript. The design is simple, using a monospaced font and a dark color scheme, to please developers. There is a code sample and a quick-start guide. The advertised library uses a GPT-3 API to generate the HTML (Tailwind and JS) code of the back-office application using JSON config params."
     }
   ]
   
   input: {
     "query": "canary island",
    "nbResults": 7,
   }
   JSON: [
     {
        "title": "Canary Islands (GPT-pedia)",
        "subtitle": "The Canary Islands also known informally as the Canaries, are a Spanish autonomous community and archipelago in the Atlantic Ocean, in Macaronesia.",
        "description":  "An encyclopedic article about the Canary Islands, with many paragraphs about history, culture, economy, dmographics etc and a few pictures showing famous spots. Titles have a highlight color. It has an article-like layout, with central position, large section titles, and bold text for important words."
     },
     {
        "title": "Travel to the Canary Islands!",
        "subtitle": "The best travel agency for Canary Islands.",
        "description":  "A travel agency specialized in vacations in the Canary Islands. It has multiple sections to presents the kind of trips, offers, packages, and marketing pictures of the Canary Islands, in a vertical layout. The color scheme is warm (yellow, orange etc)."
     },
     {
       "title": "Trip Planner - Canary",
       "subtitle": "Trip Planner, an application to help you plan your vacations!",
       "description":  "Application to help people manage their vacations. The color scheme is red and orange, with a huge hero logo, title and a punch line, and with a screenshot of the app. It should have multiple paragraph listing the features."
     },
     {
        "title": "My Trip Around The World - Canary Islands",
        "subtitle": "Welcome to my blog! You will find pictures of my latest trip to those amazing islands!",
        "description":  "Blog of an influencer who traveled to the Canary Islands and took amazing pictures. There are a few articles explaining their visit to the most famous islands, with selfie pictures. The colors of the page content are mostly blue and green."
     },
     {
        "title": "Follow @CanaryIslands on GPTwit!",
        "subtitle": "Follow Canary Islands on the The Social Web!",
        "description": "Profile page of an account called CanaryIslands on a social web application. We can see the person's avatar, a list of about a dozen of recent posts including pictures, and there are buttons to like and share. The design is fresh and original."
     },
     {
        "title": "Prints from the Canary Islands",
        "subtitle": "A 3D printing app",
        "description": "A web app where you can 3D models related to the Canary Islands. You can browse the objects pictures or in real-time 3D, and you can see the STL source code in plain text <textarea> next to it. The design is very while, with color highlights on important sections, titles, buttons."
     },
     {
      "title": "AI-generated movie about the Canary Islands",
      "subtitle": "AITube",
      "description": "An AI-generated documentary movie about the Canary Islands. It looks like YouTube, but for AI-generated movies and videos."
   }
   ]
 
   input: {
     "prompt": ${JSON.stringify(query)},
     "nbResults": ${nbResults},
   }
   JSON: [`
