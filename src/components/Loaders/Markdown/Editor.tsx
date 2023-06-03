import { Skeleton, clsx } from "@mantine/core";
import Icon from "@components/Icon";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import type { IconsName } from "types/material-symbols";

interface ToolBarBtnProps
  extends Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "onClick"
  > {
  icon: IconsName;
}

const ToolBarBtn = (props: ToolBarBtnProps) => {
  const { icon, className, ...others } = props;

  return (
    <button
      className={clsx(
        "grid h-6 w-6 place-items-center border-y border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-40",
        className
      )}
      {...others}
    >
      <Icon name={icon} size={16} />
    </button>
  );
};

const MdEditorLoader = () => {
  return (
    <div className="wmde-markdown w-md-editor w-md-editor-show-edit">
      <div
        className={
          "md-toolbar-wrapper flex flex-wrap gap-4 bg-white px-3 py-2.5 dark:bg-neutral-800"
        }
      >
        <div className="flex items-center divide-x divide-gray-200 [&>:first-child]:rounded-l-sm [&>:first-child]:border-l [&>:last-child]:rounded-r-sm [&>:last-child]:!border-r">
          <ToolBarBtn icon="format_bold" disabled />
          <ToolBarBtn icon="format_italic" disabled />
          <ToolBarBtn icon="format_strikethrough" disabled />
          <ToolBarBtn icon="vertical_distribute" disabled />

          <ToolBarBtn icon="code" disabled />
          <ToolBarBtn icon="add_link" disabled />
        </div>
        <div className="flex items-center divide-x divide-gray-200 [&>:first-child]:rounded-l-sm [&>:first-child]:border-l [&>:last-child]:rounded-r-sm [&>:last-child]:!border-r">
          <ToolBarBtn icon="format_h1" disabled />
          <ToolBarBtn icon="format_h2" disabled />
          <ToolBarBtn icon="format_h3" disabled />
          <ToolBarBtn icon="format_h4" disabled />
        </div>
        <div className="flex items-center divide-x divide-gray-200 [&>:first-child]:rounded-l-sm [&>:first-child]:border-l [&>:last-child]:rounded-r-sm [&>:last-child]:!border-r">
          <ToolBarBtn icon="format_quote" disabled />
          <ToolBarBtn icon="frame_source" disabled />
          <ToolBarBtn icon="image" disabled />
        </div>
        <div className="flex items-center divide-x divide-gray-200 [&>:first-child]:rounded-l-sm [&>:first-child]:border-l [&>:last-child]:rounded-r-sm [&>:last-child]:!border-r">
          <ToolBarBtn icon="list" disabled />
          <ToolBarBtn icon="format_list_numbered" disabled />
          <ToolBarBtn icon="checklist" disabled />
        </div>
        <div className="mx-auto inline-flex items-center gap-4 sm:ml-auto sm:mr-0">
          <div
            className="mantine-font flex select-none items-center rounded bg-[#e9ecef] px-3.5 text-xs font-semibold text-[#adb5bd]"
            style={{
              height: 30,
            }}
          >
            <span>Ai</span>
          </div>
          <div className="mantine-font flex select-none items-center rounded bg-[#f1f3f5] p-1 text-[#adb5bd]">
            <div className="flex items-center px-1.5 py-[3px]">
              <Icon name="edit_square" size={16} />
              <span className="mx-[5px] text-xs font-medium">Edit</span>
            </div>
            <div className="flex items-center border-l border-[#dee2e6] px-1.5 py-[3px]">
              <Icon name="preview" size={16} />
              <span className="mx-[5px] text-xs font-medium leading-[18px]">
                Preview
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-md-editor-content p-2.5">
        <Skeleton height={14} width={"60%"} />
        <Skeleton height={14} width={"78%"} mt={10} />
        <Skeleton height={14} width={"90%"} mt={10} />
        <Skeleton height={14} width={"49%"} mt={10} />
        <Skeleton height={14} width={"91%"} mt={24} />
        <Skeleton height={14} width={"20%"} mt={10} />
        <Skeleton height={14} width={"34%"} mt={24} />
        <Skeleton height={14} width={"43%"} mt={10} />
      </div>
    </div>
  );
};

export default MdEditorLoader;
