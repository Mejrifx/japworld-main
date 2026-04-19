import { useEffect } from "react";
import { X, Download, ExternalLink } from "lucide-react";

interface PDFViewerProps {
  pdfUrl: string;
  fileName: string;
  onClose: () => void;
}

export function PDFViewer({ pdfUrl, fileName, onClose }: PDFViewerProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
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
    <div className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-sm animate-fade-in">
      {/* Header - Allows pointer events through gradient but buttons are clickable */}
      <div className="absolute top-0 left-0 right-0 z-[100] pointer-events-none">
        <div className="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/90 to-transparent">
          <div className="text-white pointer-events-auto">
            <h3 className="font-semibold text-base sm:text-lg">{fileName}</h3>
            <p className="text-xs sm:text-sm text-white/60 mt-0.5">Invoice Document</p>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Download */}
            <button
              onClick={handleDownload}
              className="p-2 sm:p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Download PDF"
              type="button"
            >
              <Download className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Open in new tab */}
            <button
              onClick={handleOpenInNewTab}
              className="p-2 sm:p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Open in new tab"
              type="button"
            >
              <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Close (Esc)"
              type="button"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="absolute inset-0 flex items-center justify-center p-4 pt-20 sm:pt-24">
        <div className="w-full h-full max-w-6xl">
          <iframe
            src={pdfUrl}
            className="w-full h-full bg-white rounded-lg shadow-2xl"
            title={fileName}
            style={{
              border: "none",
            }}
          />
        </div>
      </div>

      {/* Mobile fallback message */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none sm:hidden">
        <div className="bg-gradient-to-t from-black/90 to-transparent p-6">
          <p className="text-white text-xs text-center pointer-events-auto">
            Can't see the PDF? Tap the download button or open in new tab.
          </p>
        </div>
      </div>
    </div>
  );
}
