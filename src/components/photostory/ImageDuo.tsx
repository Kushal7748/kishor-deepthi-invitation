import type { ImageAsset } from '../../config/invitation';
import { SectionReveal } from '../shared/SectionReveal';
import { ImagePlaceholder } from '../shared/ImagePlaceholder';

interface ImageDuoProps {
  left: ImageAsset | null;
  right: ImageAsset | null;
  leftLabel?: string;
  rightLabel?: string;
}

export function ImageDuo({
  left,
  right,
  leftLabel = 'Portrait Left',
  rightLabel = 'Portrait Right',
}: ImageDuoProps) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
      <SectionReveal className="aspect-[4/5]">
        <ImagePlaceholder image={left} label={leftLabel} />
      </SectionReveal>
      <SectionReveal delay={0.1} className="aspect-[4/5]">
        <ImagePlaceholder image={right} label={rightLabel} />
      </SectionReveal>
    </div>
  );
}
