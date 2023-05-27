import { useContext } from "react";
import { EditorContext } from "../../Context";
import * as commands from "../../commands";
import ToolBarBtn from "./ToolBarBtn";

const NewToolBar = () => {
  const { commandOrchestrator } = useContext(EditorContext);

  const handleExecuteCommand = (command: commands.ICommand) => {
    if (!commandOrchestrator)
      return console.error("commandOrchestrator is not defiend");

    commandOrchestrator.executeCommand(command);
  };

  return (
    <div className="md-toolbar-wrapper flex flex-wrap gap-4 border-b border-gray-200 px-3 py-2.5">
      <div className="flex items-center divide-x divide-gray-200 [&>:first-child]:rounded-l-sm [&>:first-child]:border-l [&>:last-child]:rounded-r-sm [&>:last-child]:!border-r">
        <ToolBarBtn
          icon="format_bold"
          command={commands.bold}
          onClick={handleExecuteCommand}
        />
        <ToolBarBtn
          icon="format_italic"
          command={commands.italic}
          onClick={handleExecuteCommand}
        />
        <ToolBarBtn
          icon="format_strikethrough"
          command={commands.strikethrough}
          onClick={handleExecuteCommand}
        />
        <ToolBarBtn
          icon="vertical_distribute"
          command={commands.hr}
          onClick={handleExecuteCommand}
        />

        <ToolBarBtn
          icon="code"
          command={commands.code}
          onClick={handleExecuteCommand}
        />
        <ToolBarBtn
          icon="image"
          command={commands.image}
          onClick={handleExecuteCommand}
        />
      </div>
      <div className="flex items-center divide-x divide-gray-200 [&>:first-child]:rounded-l-sm [&>:first-child]:border-l [&>:last-child]:rounded-r-sm [&>:last-child]:!border-r">
        <ToolBarBtn
          icon="format_h1"
          command={commands.title1}
          onClick={handleExecuteCommand}
        />
        <ToolBarBtn
          icon="format_h2"
          command={commands.title2}
          onClick={handleExecuteCommand}
        />
        <ToolBarBtn
          icon="format_h3"
          command={commands.title3}
          onClick={handleExecuteCommand}
        />
        <ToolBarBtn
          icon="format_h4"
          command={commands.title4}
          onClick={handleExecuteCommand}
        />
      </div>
      <div className="flex items-center divide-x divide-gray-200 [&>:first-child]:rounded-l-sm [&>:first-child]:border-l [&>:last-child]:rounded-r-sm [&>:last-child]:!border-r">
        <ToolBarBtn
          icon="format_quote"
          command={commands.quote}
          onClick={handleExecuteCommand}
        />
        <ToolBarBtn
          icon="frame_source"
          command={commands.codeBlock}
          onClick={handleExecuteCommand}
        />
      </div>
      <div className="flex items-center divide-x divide-gray-200 [&>:first-child]:rounded-l-sm [&>:first-child]:border-l [&>:last-child]:rounded-r-sm [&>:last-child]:!border-r">
        <ToolBarBtn
          icon="add_link"
          command={commands.link}
          onClick={handleExecuteCommand}
        />
      </div>
      <div className="flex items-center divide-x divide-gray-200 [&>:first-child]:rounded-l-sm [&>:first-child]:border-l [&>:last-child]:rounded-r-sm [&>:last-child]:!border-r">
        <ToolBarBtn
          icon="list"
          command={commands.unorderedListCommand}
          onClick={handleExecuteCommand}
        />
        <ToolBarBtn
          icon="format_list_numbered"
          command={commands.orderedListCommand}
          onClick={handleExecuteCommand}
        />
        <ToolBarBtn
          icon="checklist"
          command={commands.checkedListCommand}
          onClick={handleExecuteCommand}
        />
      </div>
    </div>
  );
};

export default NewToolBar;
