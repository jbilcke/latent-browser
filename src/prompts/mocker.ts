/**
 * Prompts used to mock files
 */

export const mockImage = (name: string) =>
  `photo realistic picture of ${name}, intricate details, beautiful quality`

export const mockJSON = (name: string) =>
  `a typical JSON file representative of ${name}: `

export const mockText = (name: string) =>
  `content of a typical plain text file representative of ${name}: `

export const mockSTL = (name: string) =>
  `content of a typical ASCII STL (stereolithography) file representative of ${name}: `

export const mockSVG = (name: string) =>
  `content of a typical SVG file representative of ${name}: `

// TODO: it would be nice if someone create a prompt for more mimetypes
// https://github.com/jshttp/mime-db/blob/master/db.json
export const mockAny = (name: string, extension: string, mimetype: string) =>
  `content of a typical .${extension} file (the content MUST be valid ${mimetype}) representative of ${name}: `
