import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode; fallback: ReactNode }
type State = { error: boolean }
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: false }
  static getDerivedStateFromError() { return { error: true } }
  componentDidCatch(error: Error, info: ErrorInfo) { console.warn('Interactive component fallback:', error, info.componentStack) }
  render() { return this.state.error ? this.props.fallback : this.props.children }
}
