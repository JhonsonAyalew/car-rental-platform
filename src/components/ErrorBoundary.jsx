import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] px-4 text-center">
        <div className="w-14 h-14 flex items-center justify-center rounded-2xl mb-4"
          style={{ background: 'var(--danger-bg)' }}>
          <AlertTriangle className="w-7 h-7" style={{ color: 'var(--danger)' }} />
        </div>
        <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Something went wrong
        </h2>
        <p className="text-sm mb-5 max-w-sm" style={{ color: 'var(--text-muted)' }}>
          {this.state.error?.message ?? 'An unexpected error occurred.'}
        </p>
        <button
          onClick={() => this.setState({ hasError: false, error: null })}
          className="px-4 py-2 text-sm font-semibold rounded border transition-colors"
          style={{
            background:   'var(--brand)',
            borderColor:  'var(--brand)',
            color:        '#fff',
            borderRadius: 'var(--r-md)',
          }}
        >
          Try again
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;
