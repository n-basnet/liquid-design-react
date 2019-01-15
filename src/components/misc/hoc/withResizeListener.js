import React from 'react'

export default WrappedComponent => {
  return class WithResizeListener extends React.Component {
    componentDidMount() {
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize)
    }
    handleResize = () => {
      if (!this.wrappedComponentRef.handleResize) {
        throw new Error('please provide a handleResize handler')
      }
      this.wrappedComponentRef.handleResize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    render() {
      return <WrappedComponent ref={v => (this.wrappedComponentRef = v)} {...this.props} />
    }
  }
}
