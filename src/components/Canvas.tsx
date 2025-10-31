import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, PencilBrush } from "fabric";
import { toast } from "sonner";

interface CanvasProps {
  activeColor: string;
  activeTool: "draw" | "erase";
  brushSize: number;
  onCanvasReady: (canvas: FabricCanvas) => void;
}

export const Canvas = ({ activeColor, activeTool, brushSize, onCanvasReady }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: window.innerWidth - 40,
      height: window.innerHeight - 180,
      backgroundColor: "#ffffff",
      isDrawingMode: true,
    });

    const brush = new PencilBrush(canvas);
    brush.color = activeColor;
    brush.width = brushSize;
    canvas.freeDrawingBrush = brush;

    setFabricCanvas(canvas);
    onCanvasReady(canvas);
    toast.success("Canvas ready!");

    const handleResize = () => {
      canvas.setDimensions({
        width: window.innerWidth - 40,
        height: window.innerHeight - 180,
      });
      canvas.renderAll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas || !fabricCanvas.freeDrawingBrush) return;

    if (activeTool === "erase") {
      fabricCanvas.freeDrawingBrush.color = "#ffffff";
      fabricCanvas.freeDrawingBrush.width = brushSize * 2;
    } else {
      fabricCanvas.freeDrawingBrush.color = activeColor;
      fabricCanvas.freeDrawingBrush.width = brushSize;
    }
  }, [activeTool, activeColor, brushSize, fabricCanvas]);

  return (
    <div className="flex items-center justify-center p-5">
      <div className="border-2 border-border rounded-lg shadow-lg overflow-hidden bg-white">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};