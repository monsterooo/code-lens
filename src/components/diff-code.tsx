import { createPatch } from "diff";
import { Diff2HtmlUI } from "diff2html/lib/ui/js/diff2html-ui";
import "diff2html/bundles/css/diff2html.min.css";
import { useEffect, useMemo } from "react";

interface IProps {
  oldString: string;
  newString: string;
}

export default function DiffCode({ oldString, newString }: IProps) {
  const diffString = useMemo(() => {
    return createPatch("", oldString, newString, "", "");
  }, [oldString, newString]);

  useEffect(() => {
    const targetElement = document.getElementById("code");
    if (!targetElement) {
      return;
    }
    const diff2htmlUi = new Diff2HtmlUI(targetElement, diffString, {
      drawFileList: false,
      fileListToggle: false,
      fileListStartVisible: false,
      fileContentToggle: false,
      matching: "lines",
      outputFormat: "side-by-side",
      synchronisedScroll: true,
      highlight: true,
      renderNothingWhenEmpty: false,
    });

    diff2htmlUi.draw();
    diff2htmlUi.highlightCode();
  }, [diffString]);

  return <div className="w-full" id="code"></div>;
}
