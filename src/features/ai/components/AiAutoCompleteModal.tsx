import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { type SubmitHandler, useForm, Controller } from "react-hook-form";

import MDPreviewLoader from "@components/Loaders/Markdown/Preview";
import {
  Modal,
  type ModalProps,
  Textarea,
  Button,
  Select,
  Skeleton,
} from "@mantine/core";

import { zodResolver } from "@hookform/resolvers/zod";
import useGetAiPrompts from "@hooks/query/ai/useGetAiPrompts";
import useGetModifyPrompts from "@hooks/query/ai/useGetModifyPrompts";
import useAiAutoComplete from "@hooks/query/ai/useAiAutoComplete";

const MarkdownPreview = lazy(() => import("@uiw/react-markdown-preview"));

const FormSchema = z.object({
  state: z.string().min(3).max(1000).optional(),
  command: z.string().optional(),
  prompt: z.string().min(3).max(200),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export interface AiAutoCompleteModalProps
  extends Omit<ModalProps, "title" | "children" | "onSubmit"> {
  state?: string;
  onSubmit?: (data: string) => void;
}

const AiAutoCompleteModal = (props: AiAutoCompleteModalProps) => {
  const { state, onClose, opened, onSubmit, ...others } = props;
  const isEdit = !!state;

  const { data: aiPrompts, isSuccess: isAiPromptsSuccess } = useGetAiPrompts();
  const { data: modifyPrompts, isSuccess: isModifyPromptsSuccess } =
    useGetModifyPrompts();

  const isSelectLoaded = isEdit ? !isModifyPromptsSuccess : !isAiPromptsSuccess;

  const commandDataParsed = useMemo(() => {
    if (isEdit) {
      if (!modifyPrompts) return [];

      return modifyPrompts.map((el) => ({
        label: el.title,
        value: el.command,
      }));
    }

    if (!aiPrompts) return [];

    return aiPrompts.map((el) => ({
      label: el.title,
      value: el.command,
    }));
  }, [aiPrompts, modifyPrompts]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setValue,
    control,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      command: "",
      state,
    },
  });

  useEffect(() => {
    if (!opened) return;

    reset({
      command: "",
      state,
    });
  }, [opened]);

  const [isCustomPrompt, setIsCustomPromt] = useState(true);

  const [responseData, setResponseData] = useState("");

  const { isLoading, isError, mutate } = useAiAutoComplete();

  const submit: SubmitHandler<FormSchemaType> = () => {
    mutate();
  };

  const handleSubmitModal = () => {
    onSubmit?.(responseData);
    onClose();
  };

  return (
    <Modal
      {...others}
      opened={opened}
      onClose={onClose}
      size={"lg"}
      title={isEdit ? "Edit text" : "Generate text"}
    >
      <form onSubmit={handleSubmit(submit)} className="space-y-3">
        {state ? (
          <Textarea
            label="Selected text"
            {...register("state")}
            error={errors.state?.message}
            autosize
            minRows={2}
            maxRows={20}
          />
        ) : null}

        <div className="">
          <label className="mantine-font text-sm font-medium text-[#212529] dark:text-[#C1C2C5]">
            Select command
          </label>
          <Controller
            control={control}
            name="command"
            render={({ field: { value, onChange, ...others } }) => (
              <Skeleton visible={isSelectLoaded} className="z-10">
                <Select
                  value={value}
                  onChange={(value) => {
                    onChange(value);
                    if (!value) {
                      setIsCustomPromt(true);
                      setValue("prompt", "");
                      return;
                    }
                    setIsCustomPromt(false);
                    setValue("prompt", value);
                  }}
                  data={[
                    {
                      value: "",
                      label: "Custom prompt",
                    },
                    ...commandDataParsed,
                  ]}
                  {...others}
                  error={errors.command?.message}
                />
              </Skeleton>
            )}
          />
        </div>

        <Textarea
          label="Prompt"
          {...register("prompt")}
          error={errors.prompt?.message}
          disabled={!isCustomPrompt}
          autosize
          minRows={2}
          maxRows={10}
        />

        <div className="">
          {isSubmitSuccessful ? (
            <div className="">
              <p className="mantine-font text-sm font-medium text-[#212529] dark:text-[#C1C2C5]">
                Response
              </p>
              {isLoading ? (
                <MDPreviewLoader />
              ) : isError ? (
                <div className="w-full rounded bg-red-500 bg-opacity-10 py-3 text-center">
                  <p className=" font-medium text-red-500">Error: on api</p>
                </div>
              ) : (
                <Suspense fallback={<MDPreviewLoader />}>
                  <MarkdownPreview source={responseData} />
                </Suspense>
              )}
            </div>
          ) : null}

          <div className="mt-2 text-center">
            <Button
              type="submit"
              gradient={{ from: "teal", to: "blue", deg: 60 }}
              variant="gradient"
              loading={isLoading}
            >
              {isSubmitSuccessful ? "Regerate" : "Generate"}
            </Button>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <Button type="button" variant="subtle" color="red" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmitModal}
            disabled={!isSubmitSuccessful || isLoading}
          >
            {isEdit ? "Update" : "Insert"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AiAutoCompleteModal;
