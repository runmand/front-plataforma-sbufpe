import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FieldTrigger, IconTrigger, Menu, MenuOption } from "./styled";

export interface DropdownOption {
    value: string;
    label: string;
}

interface Props {
    value: string;
    options: DropdownOption[];
    onChange: (value: string) => void;
    /** "field" = caixa de campo (cabeçalho da página); "icon" = botão compacto (cabeçalho da tabela) */
    variant?: "field" | "icon";
    /** alinhamento do menu em relação ao gatilho */
    align?: "left" | "right";
    /** destaca o gatilho compacto quando há filtro aplicado */
    active?: boolean;
    id?: string;
    label?: string;
}

const MENU_MAX_HEIGHT = 320;
const MENU_GAP = 6;
const VIEWPORT_MARGIN = 8;

interface MenuPosition {
    left: number;
    width: number;
    top?: number;
    bottom?: number;
    maxHeight: number;
}

const ChevronIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#841a1a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const FilterIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
    </svg>
);

const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6d141a" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export default function Dropdown({ value, options, onChange, variant = "field", align = "left", active = false, id, label }: Props) {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState<MenuPosition>(null);
    const [highlighted, setHighlighted] = useState(0);

    const selectedIndex = options.findIndex((o) => o.value === value);
    const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;

    const place = useCallback(() => {
        const trigger = triggerRef.current;
        if (!trigger) return;

        const rect = trigger.getBoundingClientRect();
        const width = variant === "field" ? rect.width : Math.max(240, rect.width);
        const spaceBelow = window.innerHeight - rect.bottom - MENU_GAP - VIEWPORT_MARGIN;
        const spaceAbove = rect.top - MENU_GAP - VIEWPORT_MARGIN;
        const openUp = spaceBelow < 180 && spaceAbove > spaceBelow;

        let left = align === "right" ? rect.right - width : rect.left;
        left = Math.min(Math.max(VIEWPORT_MARGIN, left), Math.max(VIEWPORT_MARGIN, window.innerWidth - width - VIEWPORT_MARGIN));

        setPosition({
            left,
            width,
            top: openUp ? undefined : rect.bottom + MENU_GAP,
            bottom: openUp ? window.innerHeight - rect.top + MENU_GAP : undefined,
            maxHeight: Math.max(120, Math.min(MENU_MAX_HEIGHT, openUp ? spaceAbove : spaceBelow)),
        });
    }, [align, variant]);

    useLayoutEffect(() => {
        if (open) place();
    }, [open, place]);

    useEffect(() => {
        if (!open) return;

        const onPointerDown = (e: MouseEvent | TouchEvent) => {
            const target = e.target as Node;
            if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
            setOpen(false);
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
                triggerRef.current?.focus();
            }
        };
        /* qualquer rolagem fora do menu invalida a posição calculada */
        const onScroll = (e: Event) => {
            if (menuRef.current?.contains(e.target as Node)) return;
            setOpen(false);
        };

        document.addEventListener("mousedown", onPointerDown);
        document.addEventListener("touchstart", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        window.addEventListener("scroll", onScroll, true);
        window.addEventListener("resize", place);

        return () => {
            document.removeEventListener("mousedown", onPointerDown);
            document.removeEventListener("touchstart", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("scroll", onScroll, true);
            window.removeEventListener("resize", place);
        };
    }, [open, place]);

    useEffect(() => {
        if (!open || !menuRef.current) return;
        const node = menuRef.current.children[highlighted] as HTMLElement;
        node?.scrollIntoView({ block: "nearest" });
    }, [open, highlighted]);

    function toggle() {
        setHighlighted(selectedIndex >= 0 ? selectedIndex : 0);
        setOpen((prev) => !prev);
    }

    function pick(option: DropdownOption) {
        setOpen(false);
        triggerRef.current?.focus();
        if (option.value !== value) onChange(option.value);
    }

    function onTriggerKeyDown(e: React.KeyboardEvent) {
        if (!open) {
            if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle();
            }
            return;
        }

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlighted((prev) => Math.min(options.length - 1, prev + 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlighted((prev) => Math.max(0, prev - 1));
        } else if (e.key === "Home") {
            e.preventDefault();
            setHighlighted(0);
        } else if (e.key === "End") {
            e.preventDefault();
            setHighlighted(options.length - 1);
        } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            const option = options[highlighted];
            if (option) pick(option);
        } else if (e.key === "Tab") {
            setOpen(false);
        }
    }

    const menu =
        open && position
            ? createPortal(
                  <Menu
                      ref={menuRef}
                      role="listbox"
                      aria-label={label}
                      style={{
                          left: position.left,
                          width: position.width,
                          top: position.top,
                          bottom: position.bottom,
                          maxHeight: position.maxHeight,
                      }}
                  >
                      {options.map((option, index) => (
                          <MenuOption
                              key={option.value}
                              role="option"
                              aria-selected={option.value === value}
                              $selected={option.value === value}
                              $highlighted={index === highlighted}
                              onMouseEnter={() => setHighlighted(index)}
                              onClick={() => pick(option)}
                          >
                              <span>{option.label}</span>
                              <CheckIcon />
                          </MenuOption>
                      ))}
                  </Menu>,
                  document.body
              )
            : null;

    if (variant === "icon") {
        return (
            <>
                <IconTrigger
                    ref={triggerRef}
                    id={id}
                    type="button"
                    $active={active}
                    $open={open}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    aria-label={label}
                    title={label}
                    onClick={toggle}
                    onKeyDown={onTriggerKeyDown}
                >
                    <FilterIcon />
                </IconTrigger>
                {menu}
            </>
        );
    }

    return (
        <>
            <FieldTrigger
                ref={triggerRef}
                id={id}
                type="button"
                $open={open}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label={label}
                onClick={toggle}
                onKeyDown={onTriggerKeyDown}
            >
                <span>{selected?.label ?? ""}</span>
                <ChevronIcon />
            </FieldTrigger>
            {menu}
        </>
    );
}
