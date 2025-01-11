import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import ComponentList from './components/ComponentList';
import PropertyEditor from './components/PropertyEditor';
import ComponentBuilder from './components/ComponentBuilder';
import './App.css';

const parseJsonToComponents = (json) => {
  const components = [];
  if (json.header) components.push(json.header);
  if (json.hero) components.push(json.hero);
  if (json.body) components.push(json.body);
  if (json.footer) components.push(json.footer);
  return components;
};

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [username, setUsername] = useState('山田花子');
  const [components, setComponents] = useState([]);

  useEffect(() => {
    if (preview) {
      setComponents(parseJsonToComponents(preview));
    } else {
      setComponents(['header', 'hero', 'body', 'footer'].map(type => ({ type, contents: [] })));
    }
  }, [preview]);

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
        header: null,
        hero: null,
        body: null,
        footer: null
      };
      setPreview(initialJson);
      setJsonInput(JSON.stringify(initialJson, null, 2));
    }

    try {
      const currentContent = preview ? JSON.parse(JSON.stringify(preview)) : {
        type: 'bubble',
        header: null,
        hero: null,
        body: null,
        footer: null
      };

      if (component.type === 'header' || component.type === 'hero' || component.type === 'body' || component.type === 'footer') {
        currentContent[component.type] = component;
      } else {
        currentContent.body.contents.push(component);
      }

      setPreview(currentContent);
      setComponents(parseJsonToComponents(currentContent));
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
      const updateComponentInContents = (contents) => {
        for (let i = 0; i < contents.length; i++) {
          if (contents[i].type === selectedComponent.type && 
              contents[i].action?.label === selectedComponent.action?.label) {
            contents[i] = updatedComponent;
            return true;
          }
          if (contents[i].contents) {
            if (updateComponentInContents(contents[i].contents)) {
              return true;
            }
          }
        }
        return false;
      };

      // セクション内のコンポーネントを更新
      if (currentContent.body && currentContent.body.contents) {
        if (updateComponentInContents(currentContent.body.contents)) {
          setPreview(currentContent);
          setJsonInput(JSON.stringify(currentContent, null, 2));
          setSelectedComponent(updatedComponent);
          return;
        }
      }

      // セクション自体を更新
      if (selectedComponent.type === 'header') currentContent.header = updatedComponent;
      if (selectedComponent.type === 'hero') currentContent.hero = updatedComponent;
      if (selectedComponent.type === 'body') currentContent.body = updatedComponent;
      if (selectedComponent.type === 'footer') currentContent.footer = updatedComponent;

      setPreview(currentContent);
      setJsonInput(JSON.stringify(currentContent, null, 2));
      setSelectedComponent(updatedComponent);
    } catch (err) {
      console.error('Failed to update component:', err);
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
    if (!content) return null;

    const replaceVariables = (text) => {
      return text.replace(/\{username\}/g, username);
    };

    const renderComponent = (component, index) => {
      if (!component) return null;
      switch (component.type) {
        case 'text':
          if (!component.contents && component.text) {
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
                <span
                  style={{
                    color: component.color || '#111111',
                    fontWeight: component.weight === 'bold' ? 'bold' : 'normal',
                    textDecoration: component.decoration || 'none'
                  }}
                >
                  {replaceVariables(component.text)}
                </span>
              </div>
            );
          }
          if (!component.contents) return null;
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
        case 'button':
          return (
            <button
              key={index}
              className="flex-button"
              style={{
                backgroundColor: component.style === 'primary' ? '#007bff' :
                               component.style === 'secondary' ? '#6c757d' : '#ffffff',
                color: component.style === 'link' ? '#007bff' : '#ffffff',
                border: component.style === 'link' ? 'none' : '1px solid #007bff',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                margin: component.margin === 'xl' ? '16px 0' :
                        component.margin === 'xxl' ? '24px 0' :
                        component.margin === 'md' ? '8px 0' : '4px 0',
              }}
              onClick={() => window.open(component.action.uri, '_blank')}
            >
              {component.action.label}
            </button>
          );
        case 'box':
          return (
            <div key={index} className="flex-box">
              {component.contents.map((subComponent, subIndex) =>
                renderComponent(subComponent, `${index}-${subIndex}`)
              )}
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
        default:
          return null;
      }
    };

    return (
      <div className="bubble">
        {content.body && content.body.contents && content.body.contents.map((component, index) => (
          renderComponent(component, index)
        ))}
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

  const handleAddComponentToSection = (component, section) => {
    if (!section || !preview) return;

    try {
      const currentContent = JSON.parse(JSON.stringify(preview));
      if (!currentContent[section.type].contents) {
        currentContent[section.type].contents = [];
      }
      currentContent[section.type].contents.push(component);
      setPreview(currentContent);
      setComponents(parseJsonToComponents(currentContent));
      setJsonInput(JSON.stringify(currentContent, null, 2));
    } catch (err) {
      setError('Failed to add component to section');
    }
  };

  const toggleSection = (sectionType) => {
    const updatedPreview = { ...preview };
    if (updatedPreview[sectionType]) {
      delete updatedPreview[sectionType];
    } else {
      updatedPreview[sectionType] = { type: sectionType, contents: [] };
    }
    const orderedSections = ['header', 'hero', 'body', 'footer'];
    const newPreview = {};
    orderedSections.forEach(type => {
      if (updatedPreview[type]) {
        newPreview[type] = updatedPreview[type];
      }
    });
    setPreview(newPreview);
    setComponents(parseJsonToComponents(newPreview));
    setJsonInput(JSON.stringify(newPreview, null, 2));
  };

  const onAddComponentToBody = (component) => {
    handleAddComponentToSection(component, { type: 'body' });
  };

  console.log('Components:', components);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="app">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={20} minSize={10}>
            <div className="editor-panel">
              <div className="panel-header">
                <h2 className="panel-title">セクション</h2>
              </div>
              <div className="panel-content">
                {components.length > 0 && (
                  <ComponentList
                    components={components}
                    selectedComponent={selectedComponent}
                    onSelect={(component) => {
                      if (component.type === 'body') {
                        setSelectedComponent({ ...component, contents: component.contents || [] });
                      } else {
                        setSelectedComponent({ 
                          ...component, 
                          contents: component.contents || [],
                          parent: preview && preview.body && preview.body.contents && 
                                  preview.body.contents.some(c => JSON.stringify(c) === JSON.stringify(component)) ? 'body' : null
                        });
                      }
                    }}
                    toggleSection={toggleSection}
                    preview={preview}
                    onAddComponentToBody={onAddComponentToBody}
                    onDelete={(index) => handleDeleteComponent(index)}
                  />
                )}
              </div>
            </div>
          </Panel>

          <ResizeHandle />

          <Panel defaultSize={20} minSize={10}>
            <div className="panel-header">
              <h2 className="panel-title">プロパティ</h2>
            </div>
            <div className="panel-content">
              {selectedComponent && (
                <>
                  <PropertyEditor
                    selectedComponent={selectedComponent}
                    onChange={handleComponentChange}
                  />
                </>
              )}
            </div>
          </Panel>

          <ResizeHandle />

          <Panel defaultSize={30} minSize={15}>
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

          <Panel defaultSize={30} minSize={15}>
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
