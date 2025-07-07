import {
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode } from "@lexical/rich-text";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";

import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdLooksOne,
  MdLooksTwo,
  MdOutlineShortText,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdCancel,
  MdUndo,
  MdRedo,
} from "react-icons/md";

function Toolbar() {
  const [editor] = useLexicalComposerContext();

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setIsBold(selection.hasFormat("bold"));
          setIsItalic(selection.hasFormat("italic"));
          setIsUnderline(selection.hasFormat("underline"));

          const node = selection.anchor.getNode();
          const parent = node.getParent();
          const type = parent?.getType?.() || node?.getType?.();
          setBlockType(type);
        }
      });
    });
  }, [editor]);

  const applyHeading = (level) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(level));
      }
    });
  };

  const applyParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const getButtonStyle = (isActive) =>
    `p-2 rounded-md border border-gray-300 dark:border-gray-700 
     text-gray-800 dark:text-gray-100 
     hover:bg-gray-200 dark:hover:bg-gray-700 
     transition duration-150 ease-in-out
     ${isActive ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""}`;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 p-3 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md">
      {/* Inline formatting */}
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        className={getButtonStyle(isBold)}
        title="Bold"
      >
        <MdFormatBold size={20} />
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        className={getButtonStyle(isItalic)}
        title="Italic"
      >
        <MdFormatItalic size={20} />
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        className={getButtonStyle(isUnderline)}
        title="Underline"
      >
        <MdFormatUnderlined size={20} />
      </button>

      {/* Headings */}
      <button
        type="button"
        onClick={() => applyHeading("h1")}
        className={getButtonStyle(blockType === "heading" && "h1")}
        title="Heading 1"
      >
        <MdLooksOne size={20} />
      </button>
      <button
        type="button"
        onClick={() => applyHeading("h2")}
        className={getButtonStyle(blockType === "heading" && "h2")}
        title="Heading 2"
      >
        <MdLooksTwo size={20} />
      </button>
      <button
        type="button"
        onClick={applyParagraph}
        className={getButtonStyle(blockType === "paragraph")}
        title="Paragraph"
      >
        <MdOutlineShortText size={20} />
      </button>

      {/* Lists */}
      <button
        type="button"
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND)}
        className={getButtonStyle(blockType === "ul")}
        title="Unordered List"
      >
        <MdFormatListBulleted size={20} />
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND)}
        className={getButtonStyle(blockType === "ol")}
        title="Ordered List"
      >
        <MdFormatListNumbered size={20} />
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(REMOVE_LIST_COMMAND)}
        className={getButtonStyle(false)}
        title="Remove List"
      >
        <MdCancel size={20} />
      </button>

      {/* History */}
      <button
        type="button"
        onClick={() => editor.dispatchCommand(UNDO_COMMAND)}
        className={getButtonStyle(false)}
        title="Undo"
      >
        <MdUndo size={20} />
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(REDO_COMMAND)}
        className={getButtonStyle(false)}
        title="Redo"
      >
        <MdRedo size={20} />
      </button>
    </div>
  );
}

export default Toolbar;
