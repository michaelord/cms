// Vanilla JavaScript UUID Widget for Decap CMS
(function() {
  'use strict';
  
  // Generate UUID v4
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // UUID Control Component
  const UUIDControl = (props) => {
    const { onChange, value, forID, classNameWrapper } = props;
    
    // Auto-generate UUID if no value
    if (!value && !props._initialized) {
      props._initialized = true;
      setTimeout(() => onChange(generateUUID()), 50);
    }
    
    // Create elements using CMS's React
    const h = CMS.h || window.h;
    
    if (!h) {
      // Fallback to vanilla DOM creation
      const container = document.createElement('div');
      container.className = classNameWrapper || '';
      
      const input = document.createElement('input');
      input.id = forID;
      input.type = 'text';
      input.value = value || '';
      input.readOnly = true;
      input.style.cssText = `
        background-color: #f5f5f5;
        border: 1px solid #ddd;
        padding: 8px;
        border-radius: 4px;
        font-family: monospace;
        width: 100%;
        margin-bottom: 8px;
      `;
      
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = 'Generate New UUID';
      button.style.cssText = `
        padding: 4px 8px;
        background-color: #007cba;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
      `;
      button.onclick = () => onChange(generateUUID());
      
      container.appendChild(input);
      container.appendChild(button);
      
      return container;
    }
    
    // Use CMS's hyperscript function
    return h('div', { className: classNameWrapper }, [
      h('input', {
        id: forID,
        type: 'text',
        value: value || '',
        readOnly: true,
        style: {
          backgroundColor: '#f5f5f5',
          border: '1px solid #ddd',
          padding: '8px',
          borderRadius: '4px',
          fontFamily: 'monospace',
          width: '100%',
          marginBottom: '8px'
        }
      }),
      h('button', {
        type: 'button',
        onClick: () => onChange(generateUUID()),
        style: {
          padding: '4px 8px',
          backgroundColor: '#007cba',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px'
        }
      }, 'Generate New UUID')
    ]);
  };

  const UUIDPreview = (props) => {
    const { value } = props;
    const h = CMS.h || window.h;
    
    if (!h) {
      const div = document.createElement('div');
      div.style.cssText = 'font-family: monospace; font-size: 12px; color: #666;';
      div.textContent = value || 'No UUID generated';
      return div;
    }
    
    return h('div', {
      style: { 
        fontFamily: 'monospace', 
        fontSize: '12px', 
        color: '#666' 
      }
    }, value || 'No UUID generated');
  };

  // Wait for CMS to be ready and register widget
  function registerWidget() {
    if (typeof CMS !== 'undefined' && CMS.registerWidget) {
      CMS.registerWidget('uuid', UUIDControl, UUIDPreview);
      console.log('UUID widget registered successfully');
    } else {
      // Retry after a short delay
      setTimeout(registerWidget, 100);
    }
  }

  // Start registration process
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', registerWidget);
  } else {
    registerWidget();
  }
})();