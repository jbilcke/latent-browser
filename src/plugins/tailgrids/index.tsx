import {
  Button,
  Blog,
  BlogCard,
  BlogSectionTitle,
  Navbar,
  NavbarListItem,
  Table,
  TableHead,
  TableBody,
  TdStyle,
} from 'tailgrids-react'
import { type Plugin } from '../types'

// doc: https://tailgrids.com/docs/react

export const name = 'tl'

export const tailgrids: Plugin = {
  name,
  examples: {},
  api: {
    button: {
      component: Button,
      description: 'button',
      params: {
        label: {
          description: 'button label',
        },
        color: {
          description: 'button color',
          values: ['primary', 'secondary', 'dark'],
        },
        roundedLg: {
          description: 'add large rounded corners or not',
          values: [true, false],
        },
      },
    },
    /*
  blog: {
    component: Blog,
    description: 'a blog container',
    params: {},
  },
  'blog.section.title': {
    component: BlogSectionTitle,
    description: 'a blog container',
    params: {
      title: {
        description: 'blog title',
      },
      subtitle: {
        description: 'blog subtitle',
      },
      description: {
        description: 'blog description',
      },
    },
  },
  'blog.card': {
    component: BlogCard,
    description: 'a blog container',
    params: {
      date: {
        description: 'blog article publication date',
      },
      title: {
        description: 'blog article title',
      },
      subtitle: {
        description: 'blog article - subtitle',
      },
      blogDescription: {
        description: 'blog article summary',
      },
    },
  },
  */
    navbar: {
      component: Button,
      description: 'button',
      params: {
        button1: {
          description: 'button 1',
        },
        button2: {
          description: 'button 2',
        },
      },
    },
    'navbar.item': {
      component: NavbarListItem,
      description: 'navbar item',
      params: {
        href: {
          description: 'link',
        },
        children: {
          description: 'item label',
        },
      },
    },

    /*
  TODO need a write a simplifier wrapper for the Table,
  // because the data structure used by TailGrids is not based on nesting
  table: {
    component: Table,
    description: 'table',
    params: { 
    }
  }
  */
  },
}
