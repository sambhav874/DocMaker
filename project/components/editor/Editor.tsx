'use client';

import Theme from './plugins/Theme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin  } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import TreeViewPlugin from './plugins/TreeViewPlugin';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
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
import {FloatingComposer, FloatingThreads, liveblocksConfig, LiveblocksPlugin, useEditorStatus} from '@liveblocks/react-lexical'
import React from 'react';
import Loader from '../Loader';
import FloatingToolbarPlugin from './plugins/FloatingToolbarPlugin';
import { useThreads } from '@liveblocks/react/suspense';

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export function Editor({roomId , currentUserType} : {roomId : string , currentUserType: UserType}) {

  const status = useEditorStatus();
  const {threads} = useThreads();


  const initialConfig = liveblocksConfig({
    namespace: 'Editor',
    nodes: [HeadingNode , ListNode, ListItemNode,QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode],
    onError: (error: Error) => {
      console.error(error);
      throw error;
    },
    theme: Theme,
    editable: currentUserType === 'editor',
  });

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container bg-dark-100 size-full">
        <div className='toolbar-wrapper flex min-w-full justify-between'></div>
        <ToolbarPlugin />
        {/*{currentUserType === 'editor' && <DeleteModal roomId={roomId}></DeleteModal>}*/}

        <div className='editor-wrapper flex flex-col items-center justify-start'>
          {status === 'not-loaded' || status === 'loading' ? <Loader /> : (
            
              <div className="editor-inner min-h-[1100px] mb-5 h-fit w-full max-w-[1000px] shadow-md lg:mb-10 relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="editor-input h-full" />
            }
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          {currentUserType === 'editor' && <FloatingToolbarPlugin />}
          <HistoryPlugin />
          
          <ListPlugin />
          <AutoFocusPlugin />
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
            
          )}

          <LiveblocksPlugin>
          <FloatingComposer className='w-[350px]' />
          <FloatingThreads threads={threads} />
          </LiveblocksPlugin>
        </div>

        
      </div>
    </LexicalComposer>
  );
}

