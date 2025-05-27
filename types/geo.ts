export type County = {
  id: string;
  county: string;
};

export type City = {
  id: string;
  city: string;
  counties: County[];
};

export type Region = {
  id: string;
  region: string;
  cities: City[];
};

export type Country = {
  id: string;
  country: string;
  regions: Region[];
};
