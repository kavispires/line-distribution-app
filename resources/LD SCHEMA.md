# ARTIST

## Deserializer

{
id: Reference(self),
createdBy: Optional(Reference(User)),
genre: String(Enum(Genres)),
modifiedBy: Reference(User),
name: String,
otherNames: Optional(String),
private: Optional(Boolean), // CF Construction: if any unit is private, artist will be private
units: List(Reference(Unit)), // CF Construction
}

## Serializer

{
id: Reference(self),
createdBy: Reference(User),
genre: String(Enum(Genres)),
memberList: List(Member(name)), // CF Construction: alphabetial order
memberIds: List(Reference(Member)) // CF Construction
modifiedBy: Reference(User),
name: String,
otherNames: Optional(String)
private: Optional(Boolean), // CF Construction: if any unit is private, artist will be private
query: String, // CF Construction: Uppercase name, other_names, members.names
units: List(Reference),
}

# COLOR

## Deserializer

{
id: Reference(self),
name: String,
hex: String,
r: Number,
g: Number,
b: Number,
count: Optional(Number), // Avoid! CF Construction
}

## Serializer

{
id: Reference(self),
count: Number, // CF Construction
name: String,
hex: String,
r: Number,
g: Number,
b: Number,
}

# DISTRIBUTION

## Deserializer

{
id: Reference(self),
createdBy: Reference(User),
distribution: JSON(Object),
featuring: List(String) || List(Reference(Member)),
modifiedBy: Reference(User),
songId: Reference(Song),
}

## Serializer

{
id: Reference(self),
createdBy: Reference(User),
distribution: JSON(Object),
featuring: List(String) || List(Reference(Member)),
modifiedBy: Reference(User),
songId: Reference(Song),

}

# MEMBER

## Deserializer

{
id: Reference(self),
altColorId: Reference(Color),
birthdate: Number,
colorId: Reference(Color),
createdBy: Reference(User),
genre: Enum(Genders),
initials: Optional(String),
name: String,
modifiedBy: Reference(User),
nationality: String,
positions: List(Enum(Positions)),
private: Optional(Boolean),
referenceArtist: String,
}

## Serializer

{
id: Reference(self),
altColorId: Reference(Color),
birthdate: Number,
colorId: Reference(Color),
createdBy: Reference(User),
genre: Enum(Genders),
initials: Optional(String),
name: String,

    nationality: String,
    positions: List(Enum(Positions)),
    private: Optional(Boolean),
    referenceArtist: String,

}

# SONG

## Deserializer

{
id: Reference(self),
album: String,
createdBy: Reference(User),
distribution: String,
groupSize: Number,
modifiedBy: Reference(User),
originalArtist: String,
originalArtistId: Optional(Reference(Artist)),
private: Optional(Boolean),
single: Boolean,
title: String,
videoId: String,
}

## Serializer

{
id: Reference(self),
album: String,
createdBy: Reference(User),
distribution: String,
groupSize: Number,
modifiedBy: Reference(User),
originalArtist: String,
originalArtistId: Optional(Reference(Artist)),
private: Optional(Boolean),
query: String, // Construction: `title - originalArtist - album`
single: Boolean,
title: String,
videoId: String,
}

# UNIT

## Deserializer

{
artistId: Reference(Artist),
averages: Object(Strings) // Construction: memberId:avgTotal:avgOfficial:avgCustom
debutYear: Number,
name: String,
official: Boolean,
distributions: Optional(List(Reference(Distribution))),
distributions_legacy: Optional(List(Reference(DistributionLegacy))),
private: Optional(Boolean), // Condition: if any member is private, artist will be private
user: Optional(Reference(User)), // Condition: if private, save user uuid
members: Object(Strings) // Construttion: memberId:memberName:memberPosition
}

## Serializer

{
id: Reference(self),
artistId: Reference(Artist),
createdBy: Reference(User),
debutYear: Number,
distributions: Optional(List(Distribution)),
distributions_legacy: Optional(List(DistributionLegacy)),
members: Object(Reference(Member), List(Enum(Position))),
modifiedBy: Reference(User),
name: String,
official: Boolean,
private: Optional(Boolean),
}

# USER

## Database

{
id: Reference(self),
email: String,
favoriteArtists: Oject(Reference(Artist):Boolean),
favoriteMembers: Oject(Reference(Artist):Boolean),
biases: Object(Reference(Artist):Reference(Member)),
isAdmin: Boolean,
latestunits: Array(Reference(Unit)),
session: Object(String:Boolean),
}

## Serializer

{
id: Reference(self),
email: String,
favoriteArtists: Oject(Reference(Artist):Boolean),
favoriteMembers: Oject(Reference(Artist):Boolean),
biases: Object(Reference(Artist):Reference(Member)),
isAdmin: Boolean,
latestunits: Array(Reference(Unit)),
session: Object(String:Boolean),
displayName: String, // merged from auth
photoUrl: String // merged from auth
}

# ENUMS

{
"GENDERS": {
FEMALE: 'Female',
MALE: 'Male',
UNKOWN: 'Unknown',
},
"GENRES": {
CPOP: 'C-Pop',
JPOP: 'J-Pop',
KPOP: 'K-Pop',
OTHER: 'Other',
POP: 'Pop',
},
NATIONALITIES = {
AMERICAN: 'American',
BRAZILIAN: 'Brazilian',
BRITISH: 'British',
CHINESE: 'Chinese',
JAPANZE: 'Japanese',
KOREAN: 'Korean',
OTHER: 'Other',
THAI: 'Thai',
},
"POSITIONS": {
LEADER: 'Leader',
MAIN_VOCALIST: 'Main Vocalist',
MAIN_RAPPER: 'Main Rapper',
MAIN_DANCER: 'Main Dancer',
LEAD_VOCALIST: 'Lead Vocalist',
LEAD_RAPPER: 'Lead Rapper',
LEAD_DANCER: 'Lead Dancer',
VOCALIST: 'Vocalist',
RAPPER: 'Rapper',
DANCER: 'Dancer',
CENTER: 'Center',
FACE: 'Face of the Group',
VISUAL: 'Visual',
MAKNAE: 'Maknae',
}
}
