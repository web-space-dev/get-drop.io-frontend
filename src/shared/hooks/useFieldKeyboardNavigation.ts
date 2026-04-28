import { type KeyboardEvent, useCallback } from "react";

type UseFieldKeyboardNavigationParams<TField extends string> = {
  fieldOrder: readonly TField[];
  fieldIds: Record<TField, string>;
  fieldsWithNativeArrowKeys?: readonly TField[];
};

export function useFieldKeyboardNavigation<TField extends string>({
  fieldOrder,
  fieldIds,
  fieldsWithNativeArrowKeys = [],
}: UseFieldKeyboardNavigationParams<TField>) {
  const focusField = useCallback(
    (field: TField) => {
      const target = document.getElementById(fieldIds[field]);
      if (target instanceof HTMLElement) {
        target.focus();
      }
    },
    [fieldIds],
  );

  const getFieldKeyDownHandler = useCallback(
    (field: TField) => (event: KeyboardEvent<HTMLDivElement>) => {
      const currentIndex = fieldOrder.indexOf(field);
      if (currentIndex < 0) {
        return;
      }

      const usesNativeArrows = fieldsWithNativeArrowKeys.includes(field);
      if (
        usesNativeArrows &&
        (event.key === "ArrowDown" || event.key === "ArrowUp")
      ) {
        return;
      }

      if (event.key === "Enter" || event.key === "ArrowDown") {
        const nextField = fieldOrder[currentIndex + 1];
        if (!nextField) {
          return;
        }

        event.preventDefault();
        focusField(nextField);
        return;
      }

      if (event.key === "ArrowUp") {
        const previousField = fieldOrder[currentIndex - 1];
        if (!previousField) {
          return;
        }

        event.preventDefault();
        focusField(previousField);
      }
    },
    [fieldOrder, fieldsWithNativeArrowKeys, focusField],
  );

  return {
    getFieldKeyDownHandler,
    focusField,
  };
}
