import { useState, useRef } from "react";
import { X, Upload, Palette } from "lucide-react";

interface BrandingModalProps {
  open: boolean;
  onClose: () => void;
  onGenerate: (branding: { logoUrl: string | null; primaryColor: string; accentColor: string }) => void;
}

const PRESET_COLORS = [
  "#2B5CE6", "#1c2330", "#0ea5e9", "#7c3aed", "#059669",
  "#dc2626", "#ea580c", "#d97706", "#db2777", "#6366f1",
];

export default function BrandingModal({ open, onClose, onGenerate }: BrandingModalProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState("#2B5CE6");
  const [accentColor, setAccentColor] = useState("#1c2330");
  const fileRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogoUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg text-foreground">Brand Your Deck</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted transition-colors cursor-pointer">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Logo upload */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-2">Company Logo (optional)</label>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
            {logoUrl ? (
              <div className="flex items-center gap-3">
                <img src={logoUrl} alt="Logo" className="h-12 max-w-[160px] object-contain rounded-lg border border-border p-1 bg-white" />
                <button onClick={() => { setLogoUrl(null); if (fileRef.current) fileRef.current.value = ""; }} className="text-xs text-destructive hover:underline cursor-pointer">Remove</button>
              </div>
            ) : (
              <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-border hover:border-primary/40 bg-background text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer w-full justify-center">
                <Upload className="w-4 h-4" /> Upload logo
              </button>
            )}
          </div>

          {/* Primary color */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-2">Primary Color</label>
            <div className="flex items-center gap-2 flex-wrap">
              {PRESET_COLORS.map(c => (
                <button key={c} onClick={() => setPrimaryColor(c)} className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${primaryColor === c ? "border-foreground scale-110" : "border-transparent"}`} style={{ backgroundColor: c }} />
              ))}
              <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-8 h-8 rounded-full cursor-pointer border-none" />
            </div>
          </div>

          {/* Accent color */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-2">Accent Color</label>
            <div className="flex items-center gap-2 flex-wrap">
              {PRESET_COLORS.map(c => (
                <button key={c} onClick={() => setAccentColor(c)} className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${accentColor === c ? "border-foreground scale-110" : "border-transparent"}`} style={{ backgroundColor: c }} />
              ))}
              <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="w-8 h-8 rounded-full cursor-pointer border-none" />
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-border flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors cursor-pointer">Cancel</button>
          <button onClick={() => onGenerate({ logoUrl, primaryColor, accentColor })} className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors cursor-pointer">Generate Deck</button>
        </div>
      </div>
    </div>
  );
}
