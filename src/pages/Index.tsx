import { useState, useCallback } from "react";
import { Canvas as FabricCanvas } from "fabric";
import { Canvas } from "@/components/Canvas";
import { Toolbar } from "@/components/Toolbar";
import { toast } from "sonner";


const Index = () => {
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState("#000000");
  const [activeTool, setActiveTool] = useState<"draw" | "erase">("draw");
  const [brushSize, setBrushSize] = useState(2);

  const handleCanvasReady = useCallback((canvas: FabricCanvas) => {
    setFabricCanvas(canvas);
  }, []);

  const handleClear = useCallback(() => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
    toast.success("Canvas cleared!");
  }, [fabricCanvas]);

  const handleSave = useCallback(async () => {
  if (!fabricCanvas) return;

  try {
    const canvasData = fabricCanvas.toJSON();

    const response = await fetch("https://whiteboard-backend-4ygb.onrender.com/api/whiteboard/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Main Whiteboard",
        data: canvasData,
      }),
    });

    if (!response.ok) throw new Error("Failed to save whiteboard");

    toast.success("Whiteboard saved successfully!");
  } catch (error) {
    console.error("Error saving whiteboard:", error);
    toast.error("Failed to save whiteboard");
  }
}, [fabricCanvas]);

const handleLoad = useCallback(async () => {
  if (!fabricCanvas) return;

  try {
    const response = await fetch("https://whiteboard-backend-4ygb.onrender.com/api/whiteboard/load");
    if (!response.ok) throw new Error("Failed to load whiteboard");

    const data = await response.json();

    if (data && data.data) {
      fabricCanvas.loadFromJSON(data.data, () => {
        fabricCanvas.renderAll();               
        fabricCanvas.requestRenderAll();        
        toast.success("Whiteboard loaded successfully!");
      });
    }
  } catch (error) {
    console.error("Error loading whiteboard:", error);
    toast.error("Failed to load whiteboard");
  }
}, [fabricCanvas]);



  const handleDownload = useCallback(() => {
    if (!fabricCanvas) return;

    try {
      const dataURL = fabricCanvas.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 2,
      });

      const link = document.createElement('a');
      link.download = `whiteboard-${new Date().getTime()}.png`;
      link.href = dataURL;
      link.click();

      toast.success("Whiteboard downloaded!");
    } catch (error) {
      console.error('Error downloading whiteboard:', error);
      toast.error("Failed to download whiteboard");
    }
  }, [fabricCanvas]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Toolbar
        activeTool={activeTool}
        onToolClick={setActiveTool}
        onClear={handleClear}
        onSave={handleSave}
        onLoad={handleLoad}
        onDownload={handleDownload}
        activeColor={activeColor}
        onColorChange={setActiveColor}
        brushSize={brushSize}
        onBrushSizeChange={setBrushSize}
      />
      <Canvas
        activeColor={activeColor}
        activeTool={activeTool}
        brushSize={brushSize}
        onCanvasReady={handleCanvasReady}
      />
    </div>
  );
};

export default Index;