const WebRing = () => {
  return (
    <div className="z-50 bg-transparent fixed bottom-0 left-0 w-full flex items-center justify-center gap-4 p-4 backdrop-blur-xs">
        <a
        href="https://WebRing.skule.ca/#https://virpatel.dev?nav=prev"
        className="text-foregroun no-underline text-2xl"
        >
        ←
        </a>
        <a
        href="https://WebRing.skule.ca/#https://virpatel.dev"
        target="_blank"
        rel="noopener noreferrer"
        >
        <img
            src="https://WebRing.skule.ca/img/icon.svg"
            alt="SKULE WebRing"
            className="w-8 h-8"
        />
        </a>
        <a
        href="https://WebRing.skule.ca/#https://virpatel.dev?nav=next"
        className="text-foreground no-underline text-2xl"
        >
        →
        </a>
    </div>
  );
}

export default WebRing;