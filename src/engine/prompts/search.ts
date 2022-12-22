// sub template shuld be pretty basic, ie just "content"
export const searchTemplate = (query: string, nbResults: number) =>
  `- Generate a valid JSON for a fantasy search engine, like in the examples. 
  - The title should be catchy, it is for marketing purposes (it may include puns).
  - The subtitle is the tagline, pitch or punch phrase of the app. It should be enough to understand what it is about.
  - You must imagine various search results, like websites, webapps, encyclopedias, news articles.. etc
  - For links, the "description" field will be used as instructions to generate HTML, CSS and JS content using GPT-3, so be descriptive. Each result must have different descriptions.
  - Each result should be slightly different from the original, to introduce diversity and alternative solutions.
  - For instance you can vary information such as the color scheme to use, or the position of buttons, text etc.
  - don't forget to describe colors! use stereotype colors like blue is for water-related, green for nature-related etc
  - important: DO NOT repeat the same description for each result: YOU MUST add diversity to the results

  Examples:

  input: {
    "query": "backoffice app to manage users",
   "nbResults": 5,
  }
  JSON: [
    {
       "title": "Bakoff",
       "subtitle": "A back-office app for user administration.",
       "description":  "a back-office application to manage users. There is a <table> with editable cells, a button to add a new user, and a counter of users. Interface is cool and fresh, with drop shadows for buttons, and clear spacing"
    },
    {
       "title": "User Admin Application",
       "subtitle": "A back-office application to manage users.",
       "description":  "a user interface to administre manage users, with a table with editable cells (<li>), nice shaded containers and blue-grey colors, buttons to add and delete users, and a display for stats like the number of users."
    },
    {
      "title": "User administrations apps",
      "subtitle": "A comparison of the most popular back office frameworks",
      "description":  "marketing website with a table comparing various back office applications, with a few screenshot, price, features. The used colors are original, creative, and modern. At the end there is the choice of the editor.",
   },
    {
       "title": "BO App by GPT-3",
       "subtitle": "Manage your users with this app!",
       "description": "Application to manage a list of users, using an editable list table, and actions to add or edit users. Shows a dynamic counter for the number of users in the top right."
    },
    {
      "title": "Back-Office Application - LLMpedia",
      "subtitle": "Back-office software is used to manage business operations and interfaces that are not seen by consumers.",
      "description": "An encyclopedia article explaning what is a back-office software application. It presents in a synthetic and scientific way the history, purpose, and examples of such application. The layout of the article is simple, yet elegant, with large paddings and titles, grey tones. It features at least one screenshot."
   }
  ]
  
  input: {
    "query": "canary island",
   "nbResults": 4,
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
       "description":  "A travel agency specialized in vacations in the Canary Islands. It has mulitple sections to presents the kind of trips, offers, packages, and marketing pictures of the Canary Islands, in a vertical layout. The color scheme is warm (yellow, orange etc)."
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
    }
  ]

  input: {
    "prompt": ${JSON.stringify(query)},
    "nbResults": ${nbResults},
  }
  JSON: [`
