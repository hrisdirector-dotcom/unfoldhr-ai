type Props = { url?: string; title: string };

export default function ModuleVideoEmbed({ url, title }: Props) {
  if (!url) return null;
  return (
    <div className="px-6 pt-4">
      <div className="relative w-full rounded-lg overflow-hidden" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={url}
          title={title}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    </div>
  );
}
