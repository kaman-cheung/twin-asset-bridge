
import * as React from "react";
import { X, Check, ChevronsUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type Option = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  values: string[];
  setValues: (values: string[]) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  values,
  setValues,
  options,
  placeholder = "Select items",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  // Ensure values is always defined
  const safeValues = values || [];

  const handleUnselect = (value: string) => {
    setValues((safeValues).filter((v) => v !== value));
  };

  const handleSelect = (value: string) => {
    if (safeValues.includes(value)) {
      setValues(safeValues.filter((v) => v !== value));
    } else {
      setValues([...safeValues, value]);
    }
  };

  const handleClear = () => {
    setValues([]);
  };

  // Ensure options are always defined
  const safeOptions = options || [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("min-h-10 h-auto", className)}
        >
          <div className="flex flex-wrap gap-1 mr-1">
            {safeValues.length === 0 && placeholder}
            {safeValues.map((value) => (
              <Badge
                key={value}
                variant="secondary"
                className="mr-1 px-1 py-0"
              >
                {safeOptions.find((option) => option.value === value)?.label || value}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(value);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(value)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            ))}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {safeOptions.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => handleSelect(option.value)}
              >
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    safeValues.includes(option.value)
                      ? "bg-primary text-primary-foreground"
                      : "opacity-50 [&_svg]:invisible"
                  )}
                >
                  <Check className="h-3 w-3" />
                </div>
                <span>{option.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          {safeValues.length > 0 && (
            <div className="border-t p-1">
              <Button
                variant="ghost"
                className="w-full justify-center text-sm"
                onClick={handleClear}
              >
                Clear selection
              </Button>
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
