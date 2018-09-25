import { keys, each } from 'lodash/fp'

const expandObject = (object, heading) => {
  const entries = []
  const words = keys(object)
  each(word => {
    const entry = {
      label: `${heading} - ${word}`,
      value: object[word]
    }

    entries.push(entry)
  }, words)
  return entries
}

export default expandObject
