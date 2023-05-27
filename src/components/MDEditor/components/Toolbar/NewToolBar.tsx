import { useContext } from "react";
import { ICommand } from "../../commands";
import { EditorContext, PreviewType, ContextStore } from "../../Context";

interface NewToolBarProps {
  commands?: ICommand<string>[];
}

const NewToolBar = (props: NewToolBarProps) => {
  const { commands = [] } = props;

  const [testCommand] = commands;

  const { commandOrchestrator } = useContext(EditorContext);

  const handlePress = () => {
    if (!commandOrchestrator) return;

    commandOrchestrator.executeCommand(testCommand);
  };

  return (
    <>
      <button onClick={handlePress}>h1</button>
    </>
  );
};

export default NewToolBar;
