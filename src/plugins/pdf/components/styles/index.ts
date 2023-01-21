import { Font, StyleSheet } from '@react-pdf/renderer'

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
})

export const styles = StyleSheet.create({
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
