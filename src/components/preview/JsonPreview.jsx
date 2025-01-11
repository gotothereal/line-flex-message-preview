import React from 'react';
import '../../styles/preview/JsonPreview.css';
import { buildFlexMessage } from '../../utils/flexMessageBuilder';

const JsonPreview = ({ sections }) => {
  const flexMessage = buildFlexMessage(sections);
  const jsonString = JSON.stringify(flexMessage, null, 2);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(jsonString);
  };

  return (
    <div className="json-preview">
      <div className="json-preview-header">
        <h2>JSONプレビュー</h2>
        <button className="copy-button" onClick={handleCopyClick}>
          コピー
        </button>
      </div>
      <pre className="json-content">
        <code>{jsonString}</code>
      </pre>
    </div>
  );
};

export default JsonPreview; 