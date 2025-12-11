import React from 'react';
import ReactDOM from 'react-dom/client';

console.log('index.tsx loaded');

let index_css_loaded = false;
try {
  require('./src/index.css');
  index_css_loaded = true;
  console.log('CSS loaded');
} catch (e) {
  console.error('Failed to load CSS:', e);
}

let App_loaded = false;
let App: any = null;
try {
  App = require('./App').default;
  App_loaded = true;
  console.log('App loaded');
} catch (e) {
  console.error('Failed to load App:', e);
}

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
          <h2>⚠️ Erro na aplicação</h2>
          <p><strong>Mensagem:</strong> {this.state.error?.message}</p>
          <p><strong>Stack:</strong></p>
          <code>{this.state.error?.stack}</code>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Could not find root element to mount to");
  throw new Error("Could not find root element to mount to");
}

console.log('Mounting React app...');

const root = ReactDOM.createRoot(rootElement);

if (!App) {
  root.render(
    <div style={{ padding: '20px', color: 'red', fontFamily: 'monospace' }}>
      <h2>Failed to load App component</h2>
      <p>Check console for details</p>
    </div>
  );
} else {
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

console.log('React render complete');