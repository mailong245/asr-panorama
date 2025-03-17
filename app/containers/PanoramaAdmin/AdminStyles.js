// app/components/PanoramaAdmin/AdminStyles.js
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  
  h1 {
    margin-bottom: 20px;
  }
  
  button {
    padding: 8px 16px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      background-color: #3a70b2;
    }
  }
`;

export const EditorContainer = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
  
  h3 {
    margin-top: 0;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      padding: 10px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      &.selected {
        background-color: #f0f7ff;
        font-weight: bold;
      }
      
      &:hover {
        background-color: #f5f5f5;
      }
      
      button {
        background-color: #e74c3c;
        padding: 4px 8px;
        font-size: 12px;
        
        &:hover {
          background-color: #c0392b;
        }
      }
    }
  }
  
  input, textarea, select {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  label {
    display: block;
    margin-bottom: 15px;
  }
`;

export const PreviewContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 20px;
  
  h2 {
    margin-top: 0;
  }
  
  .instructions {
    margin-top: 10px;
    font-style: italic;
    color: #666;
  }
  
  .highlighted {
    border: 2px solid red !important;
  }
`;