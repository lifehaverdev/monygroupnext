export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-tartan-blur">
      <div className="flex flex-col items-center gap-4">
        <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 overflow-hidden rounded">
          <div className="h-full bg-[#B71E34] animate-loader" />
        </div>
        <p className="font-remilia text-sm tracking-wide">Warming up…</p>
      </div>
    </div>
  );
}
