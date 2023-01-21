import { memo, ReactNode } from 'react'
import {
  Document as PDFDocument,
  Font as PDFFont,
  Page as PDFPage,
  Text as PDFText,
  View as PDFView,
  StyleSheet as PDFStyleSheet,
  PDFViewer,
} from '@react-pdf/renderer'
import { type Plugin } from '../types'

PDFFont.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
})

const styles = PDFStyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  h1: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'Oswald',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  h2: {
    fontSize: 22,
    textAlign: 'center',
    margin: 12,
    fontFamily: 'Oswald',
  },
  h3: {
    fontSize: 15,
    margin: 12,
    fontFamily: 'Oswald',
  },
  /*
  h4: {
    fontSize: 14,
    margin: 12,
    fontFamily: 'Oswald',
  },
  */
  p: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
})

export const Pagination = () => (
  <PDFText
    style={styles.pageNumber}
    render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
    fixed
  />
)

export const name = 'pf'

export const pdf: Plugin = {
  name,
  examples: {
    'a one page book called "The Test" written by an anonymous developer, with two test paragraphs':
      {
        'pf.pdf': [
          { 'pf.h1': 'The Test' },
          { 'pf.author': 'Anonymous Developer' },
          { 'pdfpf.h3': 'Hello' },
          { 'pf.p': 'Hello. This is a test.' },
          { 'pf.h3': 'World' },
          { 'pf.p': 'Hello, World!' },
        ],
      },
  },
  api: {
    pdf: {
      // to avoid flickering we neet to memoize the PDF Viewer,
      // or else on each re-render it will generate a new document ID
      component: memo(({ children }: { children: ReactNode }) =>
        children ? (
          <PDFViewer className="w-full h-screen">
            <PDFDocument>
              <PDFPage size="A4" style={styles.body}>
                {children}
                <Pagination />
              </PDFPage>
            </PDFDocument>
          </PDFViewer>
        ) : null
      ),
      description: 'PDF document (for a book, report, manual etc)',
      allowedChildren: 'pdf',
    },
    /*
  Page: {
    component: ({ children }: { children: ReactNode }) => (
      <PDFPage size="A4" style={styles.body}>
        {children}
      </PDFPage>
    ),
    description: 'a page of a PDF',
  },
  */
    author: {
      component: ({
        children,
        color,
      }: {
        children: ReactNode
        color?: string
      }) => (
        <PDFText style={[styles.author, { color: color || 'black' }]}>
          {typeof children === 'string' ? children : ''}
        </PDFText>
      ),
      description: 'author of the book',
      allowedParents: 'pdf',
      allowedChildren: 'pdf',
      params: {
        color: {},
      },
    },
    h1: {
      component: ({
        children,
        color,
      }: {
        children: ReactNode
        color?: string
      }) => (
        <PDFText style={[styles.h1, { color: color || 'black' }]}>
          {typeof children === 'string' ? children : ''}
        </PDFText>
      ),
      description: 'book title',
      allowedParents: 'pdf',
      allowedChildren: 'pdf',
      params: {
        color: {},
      },
    },
    h2: {
      component: ({
        children,
        color,
      }: {
        children: ReactNode
        color?: string
      }) => (
        <PDFText style={[styles.h2, { color: color || 'black' }]}>
          {typeof children === 'string' ? children : ''}
        </PDFText>
      ),
      description: 'chapter title',
      allowedParents: 'pdf',
      allowedChildren: 'pdf',
      params: {
        color: {},
      },
    },
    h3: {
      component: ({
        children,
        color,
      }: {
        children: ReactNode
        color?: string
      }) => (
        <PDFText style={[styles.h3, { color: color || 'black' }]}>
          {typeof children === 'string' ? children : ''}
        </PDFText>
      ),
      description: 'paragraph title',
      allowedParents: 'pdf',
      allowedChildren: 'pdf',
      params: {
        color: {},
      },
    },
    p: {
      component: ({
        children,
        color,
      }: {
        children: ReactNode
        color?: string
      }) => (
        <PDFText style={[styles.p, { color: color || 'black' }]}>
          {typeof children === 'string' ? children : ''}
        </PDFText>
      ),
      description: 'paragraph written in English',
      allowedParents: 'pdf',
      allowedChildren: 'pdf',
      params: {
        color: {},
      },
    },
  },
}
