export type Animal = {
  id: number;
  taxon: {
    name: string;
    preferred_common_name: string;
    default_photo: {
      medium_url: string;
    };
  };
};

export type DefaultAnimals = {
  [key: string]: Animal;
};

export const defaultAnimals: DefaultAnimals = {
  animal: {
    id: 1,
    taxon: {
      name: 'Red Fox',
      preferred_common_name: 'Red Fox',
      default_photo: {
        medium_url: 'https://static.inaturalist.org/photos/265916780/medium.jpg'
      }
    }
  },
  aves: {
    id: 2,
    taxon: {
      name: 'Killdeer',
      preferred_common_name: 'Killdeer',
      default_photo: {
        medium_url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/15053771/medium.jpg'
      }
    }
  },
  mamalia: {
    id: 3,
    taxon: {
      name: 'Vulpes vulpes',
      preferred_common_name: 'Red Fox',
      default_photo: {
        medium_url: 'https://static.inaturalist.org/photos/265916780/medium.jpg'
      }
    }
  },
  reptilia: {
    id: 4,
    taxon: {
      name: 'Anoles',
      preferred_common_name: 'Anoles',
      default_photo: {
        medium_url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/16465753/medium.jpg'
      }
    }
  },
  amphibia: {
    id: 5,
    taxon: {
      name: 'Coronated Tree Frog',
      preferred_common_name: 'Coronated Tree Frog',
      default_photo: {
        medium_url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/271414171/medium.jpg'
      }
    }
  },
  actinopterygii: {
    id: 6,
    taxon: {
      name: 'Striped Burrfish',
      preferred_common_name: 'Striped Burrfish',
      default_photo: {
        medium_url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/59037834/medium.jpeg'
      }
    }
  },
  arachnida: {
    id: 7,
    taxon: {
      name: 'Eastern Parson Spider',
      preferred_common_name: 'Eastern Parson Spider',
      default_photo: {
        medium_url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/248724154/medium.jpg'
      }
    }
  },
  insecta: {
    id: 8,
    taxon: {
      name: 'Jasmine Moth',
      preferred_common_name: 'Jasmine Moth',
      default_photo: {
        medium_url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/47374485/medium.jpeg'
      }
    }
  },
  mollusca: {
    id: 9,
    taxon: {
      name: 'Nucella',
      preferred_common_name: 'Nucella',
      default_photo: {
        medium_url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/1557245/medium.jpg'
      }
    }
  }
}; 