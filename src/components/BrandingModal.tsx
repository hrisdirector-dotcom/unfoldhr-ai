import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Upload, Palette } from "lucide-react";

export interface BrandConfig {
  logoUrl: string | null;
  primaryColor: string;
  accentColor: string;
}

interface BrandingModalProps {
  open: boolean;
  onClose: () => void;
  onGenerate: (config: BrandConfig) => void;
}

export default function BrandingModal({ open, onClose, onGenerate }: BrandingModalProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState("#3b5eff");
  const [accentColor, setAccentColor] = useState("#10b981");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogoUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Brand Your Executive Deck</DialogTitle>
          <DialogDescription>
            Upload your logo and pick brand colors. These will be applied to every slide.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Logo upload */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-2">
              Company Logo
            </label>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            <button
              onClick={() => fileRef.current?.click()}
              className="w-full h-28 rounded-xl border-2 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center gap-2 hover:border-primary/40 transition-colors cursor-pointer"
            >
              {logoUrl ? (
                <img src={logoUrl} alt="Logo preview" className="max-h-20 max-w-[200px] object-contain" />
              ) : (
                <>
                  <Upload className="w-5 h-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Click to upload (PNG, SVG, JPG)</span>
                </>
              )}
            </button>
          </div>

          {/* Color pickers */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-2">
                <Palette className="w-3 h-3 inline mr-1" />
                Primary Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-10 h-10 rounded-lg border border-border cursor-pointer p-0.5"
                />
                <span className="text-xs font-mono text-muted-foreground">{primaryColor}</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-2">
                <Palette className="w-3 h-3 inline mr-1" />
                Accent Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-10 h-10 rounded-lg border border-border cursor-pointer p-0.5"
                />
                <span className="text-xs font-mono text-muted-foreground">{accentColor}</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onGenerate({ logoUrl, primaryColor, accentColor })}
            className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Generate Deck
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
