import { ReactNode } from 'react'
import { renderToString } from 'react-dom/server'
import { onlyText } from 'react-children-utilities'
import Fuse from 'fuse.js'
/**
 * AI Design System
 *
 */

export interface JSXTemplate {
  description: string
  layout: JSX.Element
}

export interface Template {
  description: string
  layout: string
}

type CommonProps = {
  children?: ReactNode
  className?: string
}

type AIElement = (props: CommonProps) => JSX.Element

export const t = (label: string | ReactNode): string =>
  `{{${typeof label === 'string' ? label.trim() : onlyText(label).trim()}}}`

export const T: AIElement = ({ children }) => <>{t(children)}</>

export const Span: AIElement = ({ children, ...props }) => (
  <span {...props}>
    <T>{children}</T>
  </span>
)

export const Div: AIElement = ({ children, ...props }) => (
  <div {...props}>
    <T>{children}</T>
  </div>
)

export const H1: AIElement = ({ children, ...props }) => (
  <h1 {...props}>
    <T>{children}</T>
  </h1>
)

export const H2: AIElement = ({ children, ...props }) => (
  <h2 {...props}>
    <T>{children}</T>
  </h2>
)

export const H3: AIElement = ({ children, ...props }) => (
  <h3 {...props}>
    <T>{children}</T>
  </h3>
)

export const H4: AIElement = ({ children, ...props }) => (
  <h4 {...props}>
    <T>{children}</T>
  </h4>
)

export const H5: AIElement = ({ children, ...props }) => (
  <h5 {...props}>
    <T>{children}</T>
  </h5>
)

export const P: AIElement = ({ children, ...props }) => (
  <p {...props}>
    <T>{children}</T>
  </p>
)

export const Title = () => <T>some section title</T>
export const Title1 = () => <T>first half of the title</T>
export const Title2 = () => <T>second half of the title</T>

export const Icon = () => <T>some emoji icon</T>

export const Link = ({
  children,
  className,
  href, // we extract and forget the href
  ...props
}: {
  href?: string
  className?: string
  children?: ReactNode
}) => (
  <a
    {...props}
    className={`cursor-pointer ${className}`}
    title="{{description of the linked page}}"
  >
    {children}
  </a>
)

export const Paragraph: AIElement = (props) => (
  <P {...props}>some paragraph of text</P>
)

export const Pitch = () => <T>marketing pitch title</T>
export const Pitch1 = () => <T>first half of a marketing pitch title</T>
export const Pitch2 = () => <T>second half of a marketing pitch title</T>

export const Description = () => (
  <T>description of the main subject of the page</T>
)
export const LearnMore = () => <T>label of a 'learn more' link or button</T>
export const Primary = () => (
  <T>
    label of a primary link or button (ex. buy, download, contact, join, sign-up
    etc)
  </T>
)
export const Secondary = () => (
  <T>
    label of a secondary link or button (ex. cancel, more, later, skip, options
    etc)
  </T>
)

export const customImage = (label: TemplateStringsArray) =>
  `{{image, photo, screenshot or illustration of ${label.join('')}}}`

export const image = t`one of the various images, photos, screenshots or illustration of the page`
export const Image = ({
  children,
  height,
  width,
  ...props
}: CommonProps & { height?: number; width?: number }) => (
  <img alt={t(children) || image} height={height} width={width} {...props} />
)

export const parseTemplates = (layouts: JSXTemplate[]): Template[] =>
  layouts.map(({ description, layout }) => {
    try {
      return {
        description,

        // TODO we should also minify, but there aren't many browser-side minification libraries
        layout: renderToString(layout),
      }
    } catch (err) {
      console.log('failed to parse template:', err)
      return {
        description,
        layout: '',
      }
    }
  })
export const createIndex = (layouts: Template[]) =>
  // creates an index of templates
  new Fuse(layouts, {
    keys: ['description'],
    findAllMatches: true,
    isCaseSensitive: false,
    threshold: 1.0,
  })

export const getTemplateList = (templates: Template[]): string[] =>
  templates.map((template) => template.description)

export const getTemplateValue = (
  index: Fuse<Template>,
  description: string,
  defaultTemplate: string
): string => {
  const result = index.search(description)
  const best = result[0]
  console.log('description to search:', description)
  console.log('best:', best)

  // TODO we should minify those layouts using a library
  return best?.item.layout || defaultTemplate
}

export const build = (jsxTemplates: JSXTemplate[]) => {
  const templates = parseTemplates(jsxTemplates)

  const defaultLayout = templates[0].layout

  // creates an index of templates
  const index = createIndex(templates)

  return {
    templates: () => getTemplateList(templates),
    template: (description: string) =>
      getTemplateValue(index, description, defaultLayout),
  }
}
