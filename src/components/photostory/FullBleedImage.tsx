import type { ImageAsset } from '../../config/invitation';
import { SectionReveal } from '../shared/SectionReveal';
import { ImagePlaceholder } from '../shared/ImagePlaceholder';

export function FullBleedImage({
  image,
  label = 'Editorial',
}: {
  image: ImageAsset | null;
  label?: string;
}) {
  return (
    <SectionReveal as="div" distance={0} className="h-[70svh] w-full sm:h-[85svh]">
      <div className="relative h-full w-full overflow-hidden">
        <ImagePlaceholder image={image} label={label} />
        {image?.caption && (
          <p className="absolute bottom-4 left-0 right-0 text-center font-sans text-xs uppercase tracking-[0.2em] text-ivory/90 sm:bottom-6">
            {image.caption}
          </p>
        )}
      </div>
    </SectionReveal>
  );
}
