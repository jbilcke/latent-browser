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
      doc: 'button',
      params: {
        label: {
          doc: 'button label',
        },
        color: {
          doc: 'button color',
          values: ['primary', 'secondary', 'dark'],
        },
        roundedLg: {
          doc: 'add large rounded corners or not',
          values: [true, false],
        },
      },
    },
    /*
  blog: {
    component: Blog,
    doc: 'a blog container',
    params: {},
  },
  'blog.section.title': {
    component: BlogSectionTitle,
    doc: 'a blog container',
    params: {
      title: {
        doc: 'blog title',
      },
      subtitle: {
        doc: 'blog subtitle',
      },
      doc: {
        doc: 'blog description',
      },
    },
  },
  'blog.card': {
    component: BlogCard,
    doc: 'a blog container',
    params: {
      date: {
        doc: 'blog article publication date',
      },
      title: {
        doc: 'blog article title',
      },
      subtitle: {
        doc: 'blog article - subtitle',
      },
      blogDescription: {
        doc: 'blog article summary',
      },
    },
  },
  */
    navbar: {
      component: Button,
      doc: 'button',
      params: {
        button1: {
          doc: 'button 1',
        },
        button2: {
          doc: 'button 2',
        },
      },
    },
    'navbar.item': {
      component: NavbarListItem,
      doc: 'navbar item',
      params: {
        href: {
          doc: 'link',
        },
        children: {
          doc: 'item label',
        },
      },
    },

    /*
  TODO need a write a simplifier wrapper for the Table,
  // because the data structure used by TailGrids is not based on nesting
  table: {
    component: Table,
    doc: 'table',
    params: { 
    }
  }
  */
  },
}
