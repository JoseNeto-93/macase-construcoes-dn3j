import React from 'react';
import ReactDOM from 'react-dom/client';
import './src/index.css';
import App from './App';

console.log('✓ All imports loaded successfully');

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

console.log('✓ Mounting React app...');

const root = ReactDOM.createRoot(rootElement);

try {
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
  console.log('✓ React render complete');
} catch (error) {
  console.error('Failed to render:', error);
  root.render(
    <div style={{ padding: '20px', color: 'red', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
      <h2>⚠️ Erro ao renderizar</h2>
      <p>{String(error)}</p>
    </div>
  );
}