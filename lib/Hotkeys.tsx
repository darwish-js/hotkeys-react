import HotKeys, { type HotkeysEvent } from "hotkeys-js";
import { useEffect, createElement, useMemo, useRef, useCallback } from "react";

export type OnKeyFunc = (
  shortcut: string,
  evn: KeyboardEvent,
  handler: HotkeysEvent
) => void;

export interface HotkeysProps<T extends React.ElementType>
  extends Omit<React.AnchorHTMLAttributes<T>, "onKeyDown" | "onKeyUp"> {
  keyName: string;
  filter?: (event: KeyboardEvent) => boolean;
  onKeyUp?: OnKeyFunc;
  onKeyDown?: OnKeyFunc;
  allowRepeat?: boolean;
  disabled?: boolean;
  splitKey?: string;
  as?: T;
}

export function Hotkeys<T extends React.ElementType>(props: HotkeysProps<T>) {
  const {
    as = "div",
    children,
    allowRepeat = false,
    splitKey,
    onKeyDown: onKeyDownFunc,
    onKeyUp: onKeyUpFunc,
    disabled,
    keyName,
    filter = (e: KeyboardEvent) => {
      const target = (e.target as HTMLElement) || e.srcElement;
      const tagName = target.tagName;
      return !(
        target.isContentEditable ||
        tagName === "INPUT" ||
        tagName === "SELECT" ||
        tagName === "TEXTAREA"
      );
    },
    ...rest
  } = props;

  const isKeyDown = useRef(false);
  const handle = useRef<HotkeysEvent>({} as HotkeysEvent);

  const onKeyUp = useCallback(
    (e: KeyboardEvent, handler: HotkeysEvent) => {
      if (!disabled && onKeyUpFunc) {
        onKeyUpFunc(handle.current.shortcut, e, handler);
      }
    },
    [disabled, onKeyUpFunc]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent, handler: HotkeysEvent) => {
      if (isKeyDown.current && !allowRepeat) return;
      isKeyDown.current = true;
      handle.current = handler;
      if (!disabled && onKeyDownFunc) {
        onKeyDownFunc(handle.current.shortcut, e, handler);
      }
    },
    [allowRepeat, disabled, onKeyDownFunc]
  );

  const Component = useMemo(
    () =>
      createElement(
        as,
        {
          onKeyUp,
          onKeyDown,
          ...rest,
        },
        children
      ),
    [as, children, onKeyDown, onKeyUp, rest]
  );

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (!isKeyDown.current) return;
      isKeyDown.current = false;
      if (
        (keyName && keyName.indexOf(handle.current.shortcut ?? "") < 0) ||
        Object.keys(handle.current).length <= 0
      )
        return;
      onKeyUp(e, handle.current);
    };

    if (filter) {
      HotKeys.filter = filter;
    }
    HotKeys.unbind(keyName);
    HotKeys(keyName, { splitKey }, onKeyDown);
    document?.body.addEventListener("keyup", handleKeyUp);

    return () => {
      HotKeys.unbind(keyName);
      isKeyDown.current = true;
      handle.current = {} as HotkeysEvent;
      document?.body.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return Component;
}
