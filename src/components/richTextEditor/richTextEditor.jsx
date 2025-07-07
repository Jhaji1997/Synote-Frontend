import { useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ListNode, ListItemNode } from "@lexical/list";
import { HeadingNode } from "@lexical/rich-text";

import Toolbar from "./toolbar.jsx";
import theme from "../../constants/lexicalTheme.js";

function SetEditorStatePlugin({ initialContent }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (initialContent) {
      const jsonString =
        typeof initialContent === "string"
          ? initialContent
          : JSON.stringify(initialContent);
      const editorState = editor.parseEditorState(jsonString);
      editor.setEditorState(editorState);
    }
  }, [editor, initialContent]);

  return null;
}

function RichTextEditor({
  initialContent,
  onChange,
  placeholder = "Start typing",
}) {
  const initialConfiguration = {
    namespace: "SynoteEditor",
    theme,
    onError: (error) => console.error("Lexical Error", error),
    nodes: [ListNode, ListItemNode, HeadingNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfiguration}>
      <div className="border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-sm p-4">
        <Toolbar />

        <RichTextPlugin
          contentEditable={
            <ContentEditable className="min-h-[150px] px-3 py-2 text-base text-gray-900 dark:text-gray-100 outline-none bg-white dark:bg-gray-800 transition-colors" />
          }
          placeholder={
            <div className="text-gray-400 px-3 py-2 select-none">
              {placeholder}
            </div>
          }
          ErrorBoundary={({ error }) => (
            <p className="text-red-500">Editor Error: {error.message}</p>
          )}
        />

        {/* Plugins */}
        <SetEditorStatePlugin initialContent={initialContent} />
        <HistoryPlugin />
        <ListPlugin />
        <OnChangePlugin onChange={onChange} />
      </div>
    </LexicalComposer>
  );
}

export default RichTextEditor;
