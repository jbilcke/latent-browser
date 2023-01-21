import { ReactNode } from 'react'
import {
  Accordion,
  Badge,
  Card,
  Button,
  Navbar,
  Table,
  Footer,
  Sidebar,
  Carousel,
} from 'flowbite-react'
import { type Plugin } from '../types'
import {
  xs,
  sm,
  md,
  lg,
  info,
  success,
  error,
  warning,
  primary,
  secondary,
  accent,
  ghost,
  toggle,
} from '../common'
import { getIcon } from '../../components/icon/getIcon'
import { Icon } from '../../components/icon'

// note: for theming see:
// https://flowbite-react.com/theme
// https://flowbite-react.com/

export const name = 'fl'

export const flowbite: Plugin = {
  name,
  examples: {},
  api: {
    accordion: {
      component: Accordion,
      description: 'accordion component',
      params: {},
    },
    'accordion.section': {
      component: ({
        title,
        children,
      }: {
        title: string
        children: ReactNode
      }) => (
        <Accordion.Panel>
          <Accordion.Title>{title}</Accordion.Title>
          <Accordion.Content>{children}</Accordion.Content>
        </Accordion.Panel>
      ),
      description: 'accordion title',
      params: {},
    },
    badge: {
      component: Badge,
      description: 'a badge component',
      params: {
        color: {
          description: 'badge color',
          values: [
            'info',
            'gray',
            'failure',
            'success',
            'warning',
            'indigo',
            'purple',
            'pink',
          ],
        },
        children: {
          description: 'badge label',
          values: ['some label'],
        },
      },
    },
    button: {
      component: Button,
      description: 'an action button',
      params: {
        color: {
          description:
            "button color. In the majority of case we don't want to use a color (it will use the default primary color)",
          values: [
            'gray',
            'dark',
            'light',
            'success',
            'failure',
            'warning',
            'purple',
          ],
        },
        label: {
          description: 'button label',
          values: ['some label'],
        },
      },
    },
    card: {
      component: Card,
      description: 'a card component, with sub-items for the content',
      params: {
        horizontal: {
          description: 'use horizontal layout or not',
          values: toggle,
        },
        /*
        label: {
          description: 'button label',
          values: ['some label'],
        },
        */
      },
    },
    navbar: {
      component: Navbar,
      description: 'a top navigation bar, it as children of type "button"',
      params: {
        fluid: {
          description: 'fluid layout',
          values: toggle,
        },
        rounded: {
          description: 'rounded corners',
          values: toggle,
        },
        /*
        children: {
          description: 'nav buttons',
          values: ['Button'],
        },
        */
      },
    },
    sidebar: {
      component: ({ children }: { children: ReactNode }) => (
        <Sidebar>
          <Sidebar.Items>
            <Sidebar.ItemGroup>{children}</Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      ),
      description: 'a left sidebar',
      params: {},
    },
    'sidebar.item': {
      component: ({
        children,
        icon,
      }: {
        children?: ReactNode
        icon?: string
      }) => (
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={getIcon(icon)}>
            {children}
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      ),
      description: 'link or action button inside the sidebar',
      params: {
        icon: {
          description: 'icon name',
        },
        children: {
          description: 'link label',
        },
      },
    },
    /*
  'flowbite.Table': {
    component: Table,
    props: {
      children: 'table.cell'
    }
  }
  */
    footer: {
      component: Footer,
      description: 'footer',
      params: {},
    },
    'footer.copyright': {
      component: Footer.Copyright,
      description: 'copyright',
      params: {
        by: {
          description: 'author (eg. company)',
        },
        year: {
          description: 'copyright year',
        },
      },
    },
    'footer.links': {
      component: Footer.LinkGroup,
      description: 'list of footer links',
      params: {},
    },
    'footer.link': {
      component: Footer.Link,
      description: 'a link to another page',
      params: {
        href: {
          description: 'http link',
        },
        label: {},
      },
    },
    feats: {
      component: ({
        title,
        subtitle,
        children,
      }: {
        title?: ReactNode
        subtitle?: ReactNode
        children?: ReactNode
      }) => (
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="max-w-screen-md mb-8 lg:mb-16">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                {title}
              </h2>
              <p className="text-gray-500 sm:text-xl dark:text-gray-400">
                {subtitle}
              </p>
            </div>
            <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
              {children}
            </div>
          </div>
        </section>
      ),
      description:
        'a showcase and feature list section, containing a list of features cards',
      params: {
        title: {},
        subtitle: {},
      },
    },
    feat: {
      component: ({
        children,
        title,
        icon,
      }: {
        children?: ReactNode
        title?: ReactNode
        icon?: string
      }) => (
        <div>
          <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
            <Icon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300">
              {icon}
            </Icon>
          </div>
          <h3 className="mb-2 text-xl font-bold dark:text-white">{title}</h3>
          <p className="text-gray-500 dark:text-gray-400">{children}</p>
        </div>
      ),
      description:
        'a feature description card with an icon, a title and a body',
      params: {
        icon: { description: 'icon name' },
        title: {},
      },
    },
    cta: {
      component: ({
        children,
        aria,
      }: {
        children?: ReactNode
        aria?: string
      }) => (
        <a
          href="#"
          className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          role="alert"
        >
          <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">
            New
          </span>{' '}
          <span className="text-sm font-medium">{children}</span>
          <svg
            className="ml-2 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      ),
      description: 'call to action',
      params: {
        badge: {
          description: 'badge (eg. "new!", "exclusive" etc)',
        },
        label: {
          description: 'label of the CTA',
        },
      },
    },
    hero: {
      component: ({ children }: { children: ReactNode }) => (
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            {children}
          </div>
        </section>
      ),
      description:
        'a hero section, generally contains a hero.cta, hero.title, hero.p, hero.buttons etc',
    },
    'hero.title': {
      component: ({ children }: { children?: ReactNode }) => (
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          {children}
        </h1>
      ),
      description:
        'big catchy title used on marketing sites (startups, landing pages etc)',
    },
    'hero.p': {
      component: ({ children }: { children?: ReactNode }) => (
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          {children}
        </p>
      ),
      description: 'text paragraph containing some marketing pitch',
    },
    'hero.buttons': {
      component: ({ children }: { children?: ReactNode }) => (
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          {children}
        </div>
      ),
      description:
        'container for hero section CTA buttons. Has sub items of type fl.button',
    },
  },
}
