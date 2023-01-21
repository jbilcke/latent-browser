import { memo, Children, ReactNode } from 'react'
import { Document, Page, PDFViewer } from '@react-pdf/renderer'

import { type Component } from '../../../types'
import { styles } from '../styles'
import { Pagination } from '../pagination/Pagination'

export const pdf: Component = {
  // to avoid flickering we neet to memoize the PDF Viewer,
  // or else on each re-render it will generate a new document ID
  component: memo(({ children }: { children?: ReactNode }) =>
    children ? (
      <PDFViewer className="w-full h-screen">
        <Document>
          <Page size="A4" style={styles.body}>
            {children}
            <Pagination pageNumber={1} totalPages={1} />
          </Page>
        </Document>
      </PDFViewer>
    ) : null
  ),
  description: 'PDF document (for a book, report, manual etc)',
  allowedChildren: 'pf',
}
