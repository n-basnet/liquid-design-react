export const getOrCreateDOMNode = id => {
  if (typeof document === 'undefined') return
  const foundDOMNode = document.getElementById(id)
  if (foundDOMNode) {
    return foundDOMNode
  } else {
    const node = document.createElement('div')
    node.id = id
    document.body.appendChild(node)
    return node
  }
}

export const handleClickIfNotSelectingText = handler => {
  if (typeof document === 'undefined') return
  const selection = window.getSelection && window.getSelection()
  if (!selection || selection.type !== 'Range') {
    handler()
  }
}
