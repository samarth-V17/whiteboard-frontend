import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Eraser, Paintbrush, Trash2, Download, Save, FolderOpen } from "lucide-react";

interface ToolbarProps {
  activeTool: "draw" | "erase";
  onToolClick: (tool: "draw" | "erase") => void;
  onClear: () => void;
  onSave: () => void;
  onLoad: () => void;
  onDownload: () => void;
  activeColor: string;
  onColorChange: (color: string) => void;
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
}

const PRESET_COLORS = [
  "#000000",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FFA500",
];

export const Toolbar = ({
  activeTool,
  onToolClick,
  onClear,
  onSave,
  onLoad,
  onDownload,
  activeColor,
  onColorChange,
  brushSize,
  onBrushSizeChange,
}: ToolbarProps) => {
  return (
    <div className="bg-card border-b border-border px-4 py-3">
      <div className="flex flex-wrap items-center gap-4">
        {/* Drawing Tools */}
        <div className="flex gap-2">
          <Button
            variant={activeTool === "draw" ? "default" : "outline"}
            size="sm"
            onClick={() => onToolClick("draw")}
            className="gap-2"
          >
            <Paintbrush className="h-4 w-4" />
            Draw
          </Button>
          <Button
            variant={activeTool === "erase" ? "default" : "outline"}
            size="sm"
            onClick={() => onToolClick("erase")}
            className="gap-2"
          >
            <Eraser className="h-4 w-4" />
            Erase
          </Button>
        </div>

        {/* Color Picker */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Color:</span>
          <div className="flex gap-1">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => onColorChange(color)}
                className={`w-6 h-6 rounded border-2 transition-all ${
                  activeColor === color ? "border-primary scale-110" : "border-border"
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              />
            ))}
            <input
              type="color"
              value={activeColor}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-6 h-6 rounded border-2 border-border cursor-pointer"
              aria-label="Custom color picker"
            />
          </div>
        </div>

        {/* Brush Size */}
        <div className="flex items-center gap-2 min-w-[150px]">
          <span className="text-sm text-muted-foreground">Size:</span>
          <Slider
            value={[brushSize]}
            onValueChange={(values) => onBrushSizeChange(values[0])}
            min={1}
            max={50}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground w-8 text-right">{brushSize}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 ml-auto">
          <Button variant="outline" size="sm" onClick={onClear} className="gap-2">
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
          <Button variant="outline" size="sm" onClick={onLoad} className="gap-2">
            <FolderOpen className="h-4 w-4" />
            Load
          </Button>
          <Button variant="outline" size="sm" onClick={onSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button variant="default" size="sm" onClick={onDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};