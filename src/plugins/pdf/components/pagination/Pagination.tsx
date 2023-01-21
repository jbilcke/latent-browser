import { Text } from '@react-pdf/renderer'

import { styles } from '../styles'

export const Pagination = ({ pageNumber = 1, totalPages = 1 }) => (
  <Text
    style={styles.pageNumber}
    render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
    fixed
  />
)
