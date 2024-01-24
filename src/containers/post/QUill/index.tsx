import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  // register: UseFormRegister<FieldValues>;
  // name: string;
  value: string;
  onChange: (value: string) => void;
}

// const QuillEditor = (props: QuillEditorProps) => {
const QuillEditor = ({ value, onChange }: QuillEditorProps) => {
  const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  });

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
        value={value}
        onChange={(content) => onChange(content)}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder="내용을 입력하세요."
      />
    </>
  );
};

export default QuillEditor;
