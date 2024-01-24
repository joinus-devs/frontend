import dynamic from "next/dynamic";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
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
};

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

interface QuillEditorProps {
  value: string;
}

const QuillEditor = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    const Quill = (
      props: QuillEditorProps & {
        forwardedRef: React.ForwardedRef<ReactQuill>;
      }
    ) => {
      const { forwardedRef, value } = props;

      return (
        <RQ
          ref={forwardedRef}
          defaultValue={value || ""}
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder="내용을 입력하세요."
        />
      );
    };

    return Quill;
  },
  {
    ssr: false,
  }
);

export default QuillEditor;
