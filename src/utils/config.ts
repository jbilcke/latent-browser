import dotenv from 'dotenv'

dotenv.config()

export enum LogLevel {
  error = 0,
  warn = 1,
  info = 2,
  debug = 3,
}

export const getString = (name: TemplateStringsArray) =>
  process.env[name.join('')]?.trim?.() || ''

export const getBoolean = (name: TemplateStringsArray) =>
  ['true', 'ok', 'yes', 'on'].includes(getString(name).toLowerCase())

export const getNumber = (name: TemplateStringsArray) => {
  const value = Number(getString(name))

  return isNaN(value) || !isFinite(value) ? 0 : value
}

export const getJSON = (name: TemplateStringsArray) =>
  JSON.parse(getString(name))
