import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, details) {
    console.error('Admin section crashed:', error, details);
  }

  render() {
    if (this.state.error) {
      return (
        <section className="card border-red-200">
          <h3 className="text-xl font-bold text-red-700">This section could not load</h3>
          <p className="mt-2 text-slate-600">
            {this.state.error.message || 'An unexpected interface error occurred.'}
          </p>
          <button className="btn btn-primary mt-5" onClick={() => window.location.reload()}>
            Reload section
          </button>
        </section>
      );
    }
    return this.props.children;
  }
}
