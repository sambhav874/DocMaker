'use client';

import Theme from './plugins/Theme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { ListNode, ListItemNode } from '@lexical/list';
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";

import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import { FloatingComposer, FloatingThreads, liveblocksConfig, LiveblocksPlugin, useEditorStatus } from '@liveblocks/react-lexical';
import React, { useCallback } from 'react';
import Loader from '../Loader';
import FloatingToolbarPlugin from './plugins/FloatingToolbarPlugin';
import { useThreads, useStorageRoot } from '@liveblocks/react/suspense';
import Comments from '../Comments';
import DeleteModal from '../DeleteModal';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export function Editor({ roomId, currentUserType }: { roomId: string, currentUserType: UserType }) {
  const content = useStorageRoot();  // Tracks the editor content via Liveblocks
  const status = useEditorStatus();  // Checks if the editor is loading or not
  const { threads } = useThreads();  // Fetches threads for comments

  // Callback to handle content changes and update Liveblocks storage
  const onChange = useCallback((editorState : any) => {
    editorState.read(() => {
      const textContent = editorState.getTextContent();
      content.set("text", textContent);  // Update the Liveblocks storage
    });
  }, [content]);

  
  const exportToPDF = async () => {
    const element = document.querySelector('.editor-inner');
    if (element) {
     
      const elementWidth = element.offsetWidth;
      const elementHeight = element.offsetHeight;
  
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
  
      const pdf = new jsPDF('p', 'mm', [elementWidth * 0.264583, elementHeight * 0.264583]); 
  
      const imgWidth = elementWidth * 0.264583; 
      const imgHeight = elementHeight * 0.264583; 
  
      //*0.264583 to convert px to mm
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
  
      pdf.save('editor-content.pdf');
    }
  };

  const initialConfig = liveblocksConfig({
    namespace: 'Editor',
    nodes: [
      HeadingNode, ListNode, ListItemNode, QuoteNode,
      CodeNode, CodeHighlightNode, TableNode,
      TableCellNode, TableRowNode, AutoLinkNode, LinkNode
    ],
    onError: (error: Error) => {
      console.error(error);
      throw error;
    },
    theme: Theme,
    editable: currentUserType === 'editor', 
  });

  return (
    <LexicalComposer initialConfig={initialConfig} >
      <div className="editor-container bg-dark-100 p-4">
        <div className="flex justify-between items-center mb-4">
          <ToolbarPlugin />
          {currentUserType === 'editor' && (
            <button
              onClick={exportToPDF}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Export as PDF
            </button>
          )}
        </div>
        <div className='editor-wrapper flex flex-col lg:flex-row items-start justify-start'>
          {status === 'not-loaded' || status === 'loading' ? (
            <Loader />  // Shows a loader if the editor is loading
          ) : (
            <div className="editor-inner min-h-[1100px] mb-5 h-fit w-full px-4 shadow-md lg:mb-10 relative flex-grow">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable
  className="editor-input h-full overflow-auto"
  style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
/>
                }
                placeholder={<Placeholder />}
                ErrorBoundary={LexicalErrorBoundary}
                onChange={onChange}  
              />
              {currentUserType === 'editor' && <FloatingToolbarPlugin />}
              <HistoryPlugin />
              <ListPlugin />
              <AutoFocusPlugin />
              <CodeHighlightPlugin />
              <LinkPlugin />
              <AutoLinkPlugin />
              <ListMaxIndentLevelPlugin maxDepth={7} />
              <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            </div>
          )}

          <LiveblocksPlugin>
            <div className='comments-container'>
              {currentUserType === 'editor' && (
                <div className='flex justify-center items-center p-4 mt-4'>
                  <DeleteModal roomId={roomId} />  
                </div>
              )}
              <FloatingComposer className='comment-composer' />
              <FloatingThreads threads={threads} />
              <Comments />
            </div>
          </LiveblocksPlugin>
        </div>
      </div>
    </LexicalComposer>
  );
}