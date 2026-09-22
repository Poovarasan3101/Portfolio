export default function App() {
  return (
    React.createElement(
      'main',
      { className: 'app-shell' },
      React.createElement(
        'div',
        { className: 'card' },
        React.createElement('p', { className: 'eyebrow' }, 'Portfolio'),
        React.createElement('h1', null, 'Poovarasan'),
        React.createElement('p', null, 'Python Full Stack Developer'),
        React.createElement('p', { className: 'status' }, 'Frontend is running successfully.')
      )
    )
  );
}
