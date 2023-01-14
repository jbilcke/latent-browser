import { ReactNode } from 'react'
import {
  Document as PDFDocument,
  Font as PDFFont,
  Page as PDFPage,
  Text as PDFText,
  View as PDFView,
  StyleSheet as PDFStyleSheet,
  PDFViewer,
} from '@react-pdf/renderer'
import { toggle } from '../common'
import { type Plugin, type PluginAPI, type PluginExamples } from '../types'
import { prefix } from '../build'

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

export const name = 'pdf'

export const pdf: Plugin = {
  name,
  examples: {
    'a one page book called "The Test" written by an anonymous developer, with two test paragraphs':
      {
        'pdf.file': [
          { 'pdf.h1': 'The Test' },
          { 'pdf.author': 'Anonymous Developer' },
          { 'pdf.h3': 'Hello' },
          { 'pdf.p': 'Hello. This is a test.' },
          { 'pdf.h3': 'World' },
          { 'pdf.p': 'Hello, World!' },
        ],
      },
  },
  api: {
    file: {
      component: ({ children }: { children: ReactNode }) => (
        <PDFViewer className="w-full h-screen">
          <PDFDocument>
            <PDFPage size="A4" style={styles.body}>
              {children}
              <Pagination />
            </PDFPage>
          </PDFDocument>
        </PDFViewer>
      ),
      description: 'PDF document (for a book, report, manual etc)',
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
      component: ({ children }: { children: ReactNode }) => (
        <PDFText style={styles.author}>
          {typeof children === 'string' ? children : ''}
        </PDFText>
      ),
      description: 'author of the book',
    },
    h1: {
      component: ({ children }: { children: ReactNode }) => (
        <PDFText style={styles.h1}>
          {typeof children === 'string' ? children : ''}
        </PDFText>
      ),
      description: 'book title',
    },
    h2: {
      component: ({ children }: { children: ReactNode }) => (
        <PDFText style={styles.h2}>
          {typeof children === 'string' ? children : ''}
        </PDFText>
      ),
      description: 'chapter title',
    },
    h3: {
      component: ({ children }: { children: ReactNode }) => (
        <PDFText style={styles.h3}>
          {typeof children === 'string' ? children : ''}
        </PDFText>
      ),
      description: 'paragraph title',
    },
    p: {
      component: ({ children }: { children: ReactNode }) => (
        <PDFText style={styles.p}>
          {typeof children === 'string' ? children : ''}
        </PDFText>
      ),
      description: 'paragraph written in English',
    },
  },
}
