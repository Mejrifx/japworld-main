import { useEffect } from "react";
import { X, Download, ExternalLink } from "lucide-react";

interface PDFViewerProps {
  pdfUrl: string;
  fileName: string;
  onClose: () => void;
}

export function PDFViewer({ pdfUrl, fileName, onClose }: PDFViewerProps) {
  // Prevent body scroll AND disable pointer events on body when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";
    
    return () => {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleOpenInNewTab = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <div 
      className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-sm animate-fade-in" 
      style={{ pointerEvents: "auto" }}
    >
      {/* Full overlay to close modal when clicking outside */}
      <div 
        className="absolute inset-0 z-0" 
        onClick={onClose}
        style={{ pointerEvents: "auto" }}
      />
      
      {/* Header - Fully interactive */}
      <div className="absolute top-0 left-0 right-0 z-[200]" style={{ pointerEvents: "auto" }}>
        <div className="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/90 to-transparent">
          <div className="text-white">
            <h3 className="font-semibold text-base sm:text-lg">{fileName}</h3>
            <p className="text-xs sm:text-sm text-white/60 mt-0.5">Invoice Document</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Download */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("Download clicked!");
                handleDownload();
              }}
              className="p-3 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer hover:scale-110 active:scale-95 border-2 border-white/30"
              title="Download PDF"
              type="button"
            >
              <Download className="h-5 w-5" />
            </button>

            {/* Open in new tab */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("Open in new tab clicked!");
                handleOpenInNewTab();
              }}
              className="p-3 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer hover:scale-110 active:scale-95 border-2 border-white/30"
              title="Open in new tab"
              type="button"
            >
              <ExternalLink className="h-5 w-5" />
            </button>

            {/* Close */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("Close clicked!");
                onClose();
              }}
              className="p-3 rounded-lg bg-red-500/30 hover:bg-red-500/50 text-white transition-all cursor-pointer hover:scale-110 active:scale-95 border-2 border-red-500/50"
              title="Close (Esc)"
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 pt-20 sm:pt-24" style={{ pointerEvents: "auto" }}>
        <div className="w-full h-full max-w-6xl">
          <iframe
            src={pdfUrl}
            className="w-full h-full bg-white rounded-lg shadow-2xl"
            title={fileName}
            style={{
              border: "none",
              pointerEvents: "auto",
            }}
          />
        </div>
      </div>

      {/* Mobile fallback message */}
      <div className="absolute bottom-0 left-0 right-0 z-[200] sm:hidden" style={{ pointerEvents: "auto" }}>
        <div className="bg-gradient-to-t from-black/90 to-transparent p-6">
          <p className="text-white text-xs text-center">
            Can't see the PDF? Tap the download button or open in new tab.
          </p>
        </div>
      </div>
    </div>
  );
}
