export interface ImageAsset {
  src: string;
  alt: string;
  focalPoint?: string;
  caption?: string;
  orientation?: 'portrait' | 'landscape' | 'square';
}

export interface FamilyMember {
  role: string;
  parents: string;
  familyText: string;
}

export interface InvitationConfig {
  couple: {
    partnerA: string;
    partnerB: string;
    monogram: string;
  };

  families: FamilyMember[];

  event: {
    title: string;
    day: number;
    month: string;
    year: number;
    time: string;
    timeLabel: string;
  };

  copy: {
    gateEyebrow: string;
    gateInviteLine: string;
    gateCta: string;

    heroEyebrow: string;

    introHeadline: string;
    introParagraph: string;

    finalHeadline: string;
    finalSubline: string;
  };

  music: {
    title: string;
    artist: string;
    youtubeId: string;
    youtubeUrl: string;
    src: string | null;
  };

  location: {
    venueName: string;
    address: string;
    city: string;
    mapsUrl: string;
  };

  images: {
    hero: ImageAsset | null;
    intro: ImageAsset | null;
    photoStory: ImageAsset[];
    final: ImageAsset | null;
  };
}

export const invitationConfig: InvitationConfig = {
  couple: {
    partnerA: 'Kishor V',
    partnerB: 'Deepthi V',
    monogram: 'K & D',
  },

  families: [
    {
      role: "Groom's Family",
      parents: 'Venkatesh M & Pushpalatha H',
      familyText: '& Family',
    },
    {
      role: "Bride's Family",
      parents: 'Venkatesh & Gangaas',
      familyText: '& Family',
    },
  ],

  event: {
    title: 'Ring Ceremony',
    day: 6,
    month: 'September',
    year: 2026, // Active target year for live countdown
    time: '10:30 AM',
    timeLabel: 'Sunday • 10:30 AM',
  },

  copy: {
    gateEyebrow: 'A Celebration of Eternal Love',
    gateInviteLine: 'Cordially invite you to celebrate the',
    gateCta: 'Unveil Invitation',

    heroEyebrow: 'The Auspicious Ring Ceremony of',

    introHeadline: 'Two Hearts. One Sacred Promise.',
    introParagraph:
      'With the blessings of our elders and the grace of the Almighty, we embark upon a lifetime of love, shared dreams, and companionship. We request the pleasure of your company as we exchange our rings.',

    finalHeadline: 'We Cherish Your Presence & Blessings',
    finalSubline: 'Join us as we make memories to last a lifetime.',
  },

  music: {
    title: 'Naguva Nayana',
    artist: 'SPB & S. Janaki • Ilaiyaraaja',
    youtubeId: 'AJSeaFthdeE',
    youtubeUrl: 'https://youtu.be/AJSeaFthdeE',
    src: null,
  },

  location: {
    venueName: 'Akshara Banquet & Lawns',
    address: 'No. 5, GD Avenue, Kempapura Rd, Chikkabanavara, Bengaluru, Karnataka 560090',
    city: 'Bengaluru',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent(
        'Akshara Banquet & Lawns, No. 5, GD Avenue, Kempapura Rd, Chikkabanavara, Bengaluru, Karnataka 560090'
      ),
  },

  images: {
    hero: {
      src: '/images/couple.jpg',
      alt: 'Kishor & Deepthi',
      focalPoint: '50% 25%',
    },
    intro: {
      src: '/images/couple.jpg',
      alt: 'Kishor & Deepthi Engagement Portrait',
      focalPoint: '50% 20%',
      caption: 'Kishor & Deepthi',
    },
    photoStory: [],
    final: {
      src: '/images/couple.jpg',
      alt: 'Kishor & Deepthi',
    },
  },
};
