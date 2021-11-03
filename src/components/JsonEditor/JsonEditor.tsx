import React, { useCallback, useRef } from "react";
import { Button } from "react-bootstrap";
import CodeMirror from "react-codemirror";

import classNames from "classnames";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";

import ErrorList, { ValidateError } from "./ErrorList";
import { formatter, validate } from "./json";

import "./JsonEditor.css";

export interface JsonFormat {
  readonly nodes: [string, string][];
  readonly paths: [string, string, number][];
}

interface JsonEditorProps {
  readonly className: string;
  readonly value: JsonFormat;
  readonly errors: ValidateError[];
  readonly preSubmit?: () => void;
  readonly success?: (json: JsonFormat) => void;
  readonly failure?: (messages: ValidateError[]) => void;
}

const errorsDefault: ValidateError[] = [];

const JsonEditor: React.FunctionComponent<JsonEditorProps> = ({
  className,
  value,
  errors,
  preSubmit,
  success,
  failure,
}) => {
  const ref = useRef<ReactCodeMirror.ReactCodeMirror>(null);

  const getText = useCallback(() => {
    const editor = ref.current?.getCodeMirror();
    if (!editor) return "";
    return editor.getValue();
  }, []);

  const format = useCallback(() => {
    const editor = ref.current?.getCodeMirror();
    if (!editor) return;
    const updateText = formatter(JSON.parse(editor.getValue()));
    editor.setValue(updateText);
  }, []);

  const validateJson = useCallback(() => {
    preSubmit?.();

    const { success: successResult, messages } = validate(getText());

    if (successResult) {
      success?.(JSON.parse(getText()) as JsonFormat);
    } else {
      failure?.(
        messages?.map((message, id) => ({ id, message })) ?? errorsDefault
      );
    }
  }, [failure, getText, preSubmit, success]);

  return (
    <div className={classNames("json-editor", className)}>
      <div className="json-editor__toolbar d-flex justify-content-end gap-1">
        <Button
          size="sm"
          variant="outline-warning"
          title="format json"
          onClick={format}
        >
          f()
        </Button>
        <Button
          size="sm"
          variant="outline-primary"
          title="apply graph"
          onClick={validateJson}
        >
          submit
        </Button>
      </div>
      <CodeMirror
        className="json-editor__editor"
        ref={ref}
        value={formatter(value)}
        options={{
          mode: "javascript",
          indentUnit: 2,
          lineNumbers: true,
        }}
      />
      <ErrorList className="json-editor__errors" errors={errors} />
    </div>
  );
};

export default JsonEditor;
