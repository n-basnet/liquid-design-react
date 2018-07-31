export const getOrCreateDOMNode = id => {
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
