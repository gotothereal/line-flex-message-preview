import React, { useState } from 'react';
import './App.css';

const renderContent = (content, index, styles) => {
  if (!content) return null;

  switch (content.type) {
    case 'text':
      if (content.contents) {
        return (
          <div 
            key={index} 
            className="text"
            style={{
              fontSize: content.size === 'xxs' ? '0.625em' :
                       content.size === 'xs' ? '0.75em' :
                       content.size === 'sm' ? '0.875em' :
                       content.size === 'md' ? '1em' :
                       content.size === 'lg' ? '1.125em' :
                       content.size === 'xl' ? '1.375em' :
                       content.size === 'xxl' ? '1.75em' :
                       content.size === '3xl' ? '2em' :
                       content.size === '4xl' ? '2.5em' :
                       content.size === '5xl' ? '3em' : '1em',
              fontWeight: content.weight,
              textAlign: content.align,
              color: content.color,
              margin: content.margin === 'xs' ? '5px 0' :
                     content.margin === 'sm' ? '8px 0' :
                     content.margin === 'md' ? '12px 0' :
                     content.margin === 'lg' ? '16px 0' :
                     content.margin === 'xl' ? '20px 0' :
                     content.margin === 'xxl' ? '24px 0' : '0',
              flex: content.flex,
              textDecoration: content.decoration,
              maxLines: content.maxLines,
              wordBreak: 'break-word',
              whiteSpace: content.wrap ? 'pre-wrap' : 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: content.lineSpacing === 'sm' ? '1.25' :
                         content.lineSpacing === 'md' ? '1.4' :
                         content.lineSpacing === 'lg' ? '1.6' : '1.4'
            }}
          >
            {content.contents.map((span, i) => (
              <span
                key={i}
                style={{
                  color: span.color || 'inherit',
                  fontWeight: span.weight,
                  textDecoration: span.decoration,
                  fontSize: span.size === 'xxs' ? '0.625em' :
                           span.size === 'xs' ? '0.75em' :
                           span.size === 'sm' ? '0.875em' :
                           span.size === 'md' ? '1em' :
                           span.size === 'lg' ? '1.125em' :
                           span.size === 'xl' ? '1.375em' :
                           span.size === 'xxl' ? '1.75em' :
                           span.size === '3xl' ? '2em' :
                           span.size === '4xl' ? '2.5em' :
                           span.size === '5xl' ? '3em' : 'inherit'
                }}
              >
                {span.text}
              </span>
            ))}
          </div>
        );
      } else {
        return (
          <div 
            key={index} 
            className="text"
            style={{
              fontSize: content.size === 'xxs' ? '0.625em' :
                       content.size === 'xs' ? '0.75em' :
                       content.size === 'sm' ? '0.875em' :
                       content.size === 'md' ? '1em' :
                       content.size === 'lg' ? '1.125em' :
                       content.size === 'xl' ? '1.375em' :
                       content.size === 'xxl' ? '1.75em' :
                       content.size === '3xl' ? '2em' :
                       content.size === '4xl' ? '2.5em' :
                       content.size === '5xl' ? '3em' : '1em',
              fontWeight: content.weight,
              textAlign: content.align,
              color: content.color,
              margin: content.margin === 'xs' ? '5px 0' :
                     content.margin === 'sm' ? '8px 0' :
                     content.margin === 'md' ? '12px 0' :
                     content.margin === 'lg' ? '16px 0' :
                     content.margin === 'xl' ? '20px 0' :
                     content.margin === 'xxl' ? '24px 0' : '0',
              flex: content.flex,
              textDecoration: content.decoration,
              maxLines: content.maxLines,
              wordBreak: 'break-word',
              whiteSpace: content.wrap ? 'pre-wrap' : 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: content.lineSpacing === 'sm' ? '1.25' :
                         content.lineSpacing === 'md' ? '1.4' :
                         content.lineSpacing === 'lg' ? '1.6' : '1.4'
            }}
          >
            {content.text}
          </div>
        );
      }

    case 'image':
      return (
        <img
          key={index}
          src={content.url}
          alt={content.altText || ''}
          style={{
            width: content.size === 'full' ? '100%' :
                  content.size === 'xl' ? '1024px' :
                  content.size === 'lg' ? '512px' :
                  content.size === 'sm' ? '128px' :
                  content.size === 'xs' ? '64px' : '256px', // mdがデフォルト
            maxWidth: '100%',
            height: 'auto',
            aspectRatio: content.aspectRatio,
            margin: content.margin === 'xs' ? '5px 0' :
                   content.margin === 'sm' ? '8px 0' :
                   content.margin === 'md' ? '12px 0' :
                   content.margin === 'lg' ? '16px 0' :
                   content.margin === 'xl' ? '20px 0' :
                   content.margin === 'xxl' ? '24px 0' : '0',
            flex: content.flex,
            alignSelf: content.align,
            backgroundColor: content.backgroundColor,
            objectFit: 'cover'
          }}
        />
      );

    case 'button':
      return (
        <button
          key={index}
          className={`button ${content.style}`}
          style={{
            margin: content.margin === 'xs' ? '5px 0' :
                   content.margin === 'sm' ? '8px 0' :
                   content.margin === 'md' ? '12px 0' :
                   content.margin === 'lg' ? '16px 0' :
                   content.margin === 'xl' ? '20px 0' :
                   content.margin === 'xxl' ? '24px 0' : '0',
            flex: content.flex,
            height: content.height === 'sm' ? '40px' : '50px',
            color: content.color,
            backgroundColor: content.backgroundColor,
            borderColor: content.borderColor,
            borderWidth: content.borderWidth,
            borderRadius: content.borderRadius,
            gravity: content.gravity
          }}
          onClick={() => {
            if (content.action?.type === 'uri' && content.action.uri) {
              window.open(content.action.uri, '_blank');
            }
          }}
        >
          {content.action?.label}
        </button>
      );

    case 'box':
      return (
        <div
          key={index}
          style={{
            backgroundColor: content.backgroundColor,
            borderColor: content.borderColor,
            borderWidth: content.borderWidth,
            cornerRadius: content.cornerRadius,
            width: content.width,
            height: content.height,
            margin: content.margin === 'xs' ? '5px 0' :
                   content.margin === 'sm' ? '8px 0' :
                   content.margin === 'md' ? '12px 0' :
                   content.margin === 'lg' ? '16px 0' :
                   content.margin === 'xl' ? '20px 0' :
                   content.margin === 'xxl' ? '24px 0' : '0',
            padding: content.padding === 'xs' ? '5px' :
                    content.padding === 'sm' ? '8px' :
                    content.padding === 'md' ? '12px' :
                    content.padding === 'lg' ? '16px' :
                    content.padding === 'xl' ? '20px' :
                    content.padding === 'xxl' ? '24px' : '0',
            flex: content.flex,
            spacing: content.spacing,
            position: content.position
          }}
          className={`box ${content.layout}`}
        >
          {content.contents && content.contents.map((item, i) => 
            renderContent(item, i, styles)
          )}
        </div>
      );

    case 'separator':
      return (
        <hr 
          key={index}
          className="separator"
          style={{
            margin: content.margin === 'xs' ? '5px 0' :
                   content.margin === 'sm' ? '8px 0' :
                   content.margin === 'md' ? '12px 0' :
                   content.margin === 'lg' ? '16px 0' :
                   content.margin === 'xl' ? '20px 0' :
                   content.margin === 'xxl' ? '24px 0' : '1em 0',
            color: content.color
          }}
        />
      );

    case 'spacer':
      return (
        <div
          key={index}
          style={{
            width: content.size === 'xs' ? '5px' :
                  content.size === 'sm' ? '8px' :
                  content.size === 'md' ? '12px' :
                  content.size === 'lg' ? '16px' :
                  content.size === 'xl' ? '20px' :
                  content.size === 'xxl' ? '24px' : '12px'
          }}
        />
      );

    default:
      return null;
  }
};

const renderBox = (box, styles) => {
  if (!box || !box.contents) return null;

  return (
    <div className={`box ${box.layout}`}>
      {box.contents.map((content, index) => renderContent(content, index, styles))}
    </div>
  );
};

const renderFlexComponent = (content) => {
  if (!content) return null;

  switch (content.type) {
    case 'bubble':
      return (
        <div className="bubble">
          {content.header && renderBox(content.header, content.styles?.body)}
          {content.hero && renderBox(content.hero, content.styles?.body)}
          {content.body && renderBox(content.body, content.styles?.body)}
          {content.footer && renderBox(content.footer, content.styles?.body)}
        </div>
      );
    default:
      return null;
  }
};

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');
  const [username, setUsername] = useState('テストユーザー');

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      const replacedJson = JSON.parse(
        JSON.stringify(parsed).replace(/\{username\}/g, username)
      );
      setPreview(replacedJson);
      setError('');
      setDebugInfo('');
    } catch (err) {
      setError('JSONの形式が正しくありません');
      setDebugInfo(err.message);
      setPreview(null);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (jsonInput) {
      try {
        const parsed = JSON.parse(jsonInput);
        const replacedJson = JSON.parse(
          JSON.stringify(parsed).replace(/\{username\}/g, e.target.value)
        );
        setPreview(replacedJson);
      } catch (err) {
        // JSONが無効な場合は何もしない
      }
    }
  };

  return (
    <div className="App">
      <h1>Flex Message Previewer</h1>
      <div className="username-input">
        <label>
          テストユーザー名：
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="ユーザー名を入力"
          />
        </label>
      </div>
      <div className="container">
        <div className="input-section">
          <textarea
            value={jsonInput}
            onChange={handleJsonChange}
            placeholder="Flex Message JSONを入力してください"
          />
          {error && (
            <div className="error">
              <p>{error}</p>
              <p className="debug-info">エラー詳細: {debugInfo}</p>
            </div>
          )}
        </div>
        <div className="preview-section">
          <div className="preview-container">
            {preview && renderFlexComponent(preview)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
