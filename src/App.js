import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import ComponentList from './components/ComponentList';
import PropertyEditor from './components/PropertyEditor';
import ComponentBuilder from './components/ComponentBuilder';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [username, setUsername] = useState('山田花子');

  const handleJsonInputChange = (e) => {
    const input = e.target.value;
    setJsonInput(input);
    try {
      const parsed = JSON.parse(input);
      setPreview(parsed);
      setError('');
    } catch (err) {
      setError('Invalid JSON format');
    }
  };

  const handleAddComponent = (component) => {
    if (!preview) {
      const initialJson = {
        type: 'bubble',
        body: {
          type: 'box',
          layout: 'vertical',
          contents: []
        }
      };
      setPreview(initialJson);
      setJsonInput(JSON.stringify(initialJson, null, 2));
    }

    try {
      const currentContent = preview ? JSON.parse(JSON.stringify(preview)) : {
        type: 'bubble',
        body: {
          type: 'box',
          layout: 'vertical',
          contents: []
        }
      };
      currentContent.body.contents.push(component);
      setPreview(currentContent);
      setJsonInput(JSON.stringify(currentContent, null, 2));
    } catch (err) {
      setError('Failed to add component');
    }
  };

  const handleDeleteComponent = (index) => {
    try {
      const currentContent = JSON.parse(JSON.stringify(preview));
      currentContent.body.contents.splice(index, 1);
      setPreview(currentContent);
      setJsonInput(JSON.stringify(currentContent, null, 2));
      if (selectedComponent === preview.body.contents[index]) {
        setSelectedComponent(null);
      }
    } catch (err) {
      setError('Failed to delete component');
    }
  };

  const handleComponentChange = (updatedComponent) => {
    if (!selectedComponent || !preview) return;

    try {
      const currentContent = JSON.parse(JSON.stringify(preview));
      const index = currentContent.body.contents.findIndex(
        c => JSON.stringify(c) === JSON.stringify(selectedComponent)
      );
      
      if (index !== -1) {
        currentContent.body.contents[index] = updatedComponent;
        setPreview(currentContent);
        setJsonInput(JSON.stringify(currentContent, null, 2));
        setSelectedComponent(updatedComponent);
      }
    } catch (err) {
      setError('Failed to update component');
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination || !preview) return;

    try {
      const currentContent = JSON.parse(JSON.stringify(preview));
      const [removed] = currentContent.body.contents.splice(result.source.index, 1);
      currentContent.body.contents.splice(result.destination.index, 0, removed);
      setPreview(currentContent);
      setJsonInput(JSON.stringify(currentContent, null, 2));
    } catch (err) {
      setError('Failed to reorder components');
    }
  };

  const renderFlexComponent = (content) => {
    if (!content?.body?.contents) return null;

    const replaceVariables = (text) => {
      return text.replace(/\{username\}/g, username);
    };

    return (
      <div className="bubble">
        {content.body.contents.map((component, index) => {
          switch (component.type) {
            case 'text':
              if (component.contents) {
                return (
                  <div 
                    key={index} 
                    className="flex-component"
                    style={{
                      fontSize: component.size === 'sm' ? '13px' : 
                               component.size === 'xs' ? '11px' :
                               component.size === 'lg' ? '16px' : '14px',
                      marginTop: component.margin === 'xl' ? '16px' :
                               component.margin === 'xxl' ? '24px' :
                               component.margin === 'md' ? '8px' : '0'
                    }}
                  >
                    {component.contents.map((span, spanIndex) => (
                      <span
                        key={spanIndex}
                        style={{
                          color: span.color || '#111111',
                          fontWeight: span.weight === 'bold' ? 'bold' : 'normal',
                          textDecoration: span.decoration || 'none'
                        }}
                      >
                        {replaceVariables(span.text)}
                      </span>
                    ))}
                  </div>
                );
              }
              return (
                <div 
                  key={index} 
                  className="flex-component"
                  style={{
                    color: component.color || '#111111',
                    fontWeight: component.weight === 'bold' ? 'bold' : 'normal',
                    fontSize: component.size === 'sm' ? '13px' : 
                             component.size === 'xs' ? '11px' :
                             component.size === 'lg' ? '16px' : '14px'
                  }}
                >
                  {replaceVariables(component.text)}
                </div>
              );
            case 'separator':
              return (
                <hr 
                  key={index} 
                  className="flex-separator"
                  style={{
                    margin: component.margin === 'xl' ? '16px 0' :
                            component.margin === 'xxl' ? '24px 0' :
                            component.margin === 'md' ? '8px 0' : '4px 0',
                    borderColor: component.color || '#EEEEEE',
                    borderTopWidth: component.height === 'xs' ? '1px' :
                                 component.height === 'sm' ? '2px' :
                                 component.height === 'md' ? '3px' :
                                 component.height === 'lg' ? '4px' :
                                 component.height === 'xl' ? '5px' :
                                 component.height === 'xxl' ? '6px' : '1px'
                  }}
                />
              );
            case 'button':
              return (
                <button
                  key={index}
                  className={`flex-button ${component.style || 'primary'}`}
                >
                  {component.action?.label}
                </button>
              );
            case 'image':
              return (
                <img
                  key={index}
                  src={component.url}
                  alt=""
                  className="flex-image"
                  style={{
                    width: '100%',
                    height: 'auto'
                  }}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    );
  };

  const ResizeHandle = () => {
    return (
      <PanelResizeHandle className="resize-handle">
        <div className="resize-handle-bar" />
      </PanelResizeHandle>
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="app">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={30} minSize={20} maxSize={40}>
            <div className="editor-panel">
              <PanelGroup direction="horizontal">
                <Panel defaultSize={40} minSize={30} maxSize={70}>
                  <div className="panel-header">
                    <h2 className="panel-title">コンポーネント</h2>
                  </div>
                  <div className="panel-content">
                    <ComponentBuilder onAddComponent={handleAddComponent} />
                    <div className="username-editor">
                      <label>プレビューの名前：</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="名前を入力"
                      />
                    </div>
                    {preview && (
                      <ComponentList
                        components={preview.body.contents}
                        selectedComponent={selectedComponent}
                        onSelect={setSelectedComponent}
                        onDelete={handleDeleteComponent}
                      />
                    )}
                  </div>
                </Panel>
                
                <ResizeHandle />
                
                <Panel defaultSize={60}>
                  <div className="panel-header">
                    <h2 className="panel-title">プロパティ</h2>
                  </div>
                  <div className="panel-content">
                    {selectedComponent && (
                      <PropertyEditor
                        selectedComponent={selectedComponent}
                        onChange={handleComponentChange}
                      />
                    )}
                  </div>
                </Panel>
              </PanelGroup>
            </div>
          </Panel>

          <ResizeHandle />

          <Panel defaultSize={40}>
            <div className="preview-panel">
              <div className="panel-header">
                <h2 className="panel-title">プレビュー</h2>
              </div>
              <div className="panel-content">
                <div className="preview-panel-content">
                  {preview && renderFlexComponent(preview)}
                </div>
              </div>
            </div>
          </Panel>

          <ResizeHandle />

          <Panel defaultSize={30} minSize={20}>
            <div className="json-panel">
              <div className="panel-header">
                <h2 className="panel-title">JSONエディタ</h2>
              </div>
              <div className="panel-content">
                <div className="json-editor">
                  <textarea
                    value={jsonInput}
                    onChange={handleJsonInputChange}
                    placeholder="Flex Message JSONを入力..."
                  />
                  {error && <div className="error">{error}</div>}
                </div>
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </DragDropContext>
  );
}

export default App;
