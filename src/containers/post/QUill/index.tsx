import dynamic from "next/dynamic";
import {
  ComponentType,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export interface QuillEditorProps {
  value: string;
  onSubmit: (value: string) => void;
}

const QuillEditor = ({ value, onSubmit }: QuillEditorProps) => {
  // const ref = useRef<ReactQuill>(null);

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        [
          {
            color: [
              "red",
              "orange",
              "yellow",
              "green",
              "blue",
              "navy",
              "purple",
              "gray",
              "black",
            ],
          },
        ],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
      ],
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const formats = [
    "header",
    "color",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];
  return (
    <>
      <ReactQuill
        // ref={forwardedRef}
        defaultValue={value || ""}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder="내용을 입력하세요."
      />
    </>
  );
};

export default QuillEditor;
