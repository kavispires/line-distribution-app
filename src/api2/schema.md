# ARTISTS

- createdBy: Uuid
- genre: Enum(GENRE)
- id: Uid
- members: Array[Urn(MemberBirthdate:MemberId:MemberName:MemberColorNumber)]
- modifiedBy: Uuid
- name: String
- otherNames: Optional(String)
- private: Boolean
- unitIds: Relationship(Unit)
- agency: String

# COLORS

- id: Number
- rbg: Urn(R:G:B)
- count: Number
- hex: String
- name: String

# DISTRIBUTIONS

- category: Enum(CATEGORY)
- createdBy: Uuid
- features: Urn(id:name:colorId)
- id: Uid
- legend: Object({ relationshipMemberKey: memberId })
- modifiedBy: Uuid
- rates: Object({ memberId: Number })
- relationships: StringifiedObject
- songId: Reference(Song)
- songInfo: Object(title, originalArtist)
- unitId: Reference(Unit)

# MEMBERS

- birthdate: Number
- color: Id(Color)
- createdBy: Uuid
- gender: Enum(GENDER)
- id: Uid
- initials: String
- modifiedBy: Uid
- name: String
- ethinicity: Enum(ETHINICITY)
- positions: Array(Enum(Positions))
- primaryGenre: Enum(GENRE)
- private: Boolean
- referenceArtist: Array(Artist(name))
- tags: Array(String)

# RELATIONSHIPS

- Position: POSITION -> MEMBER
- Gender: GENDER -> MEMBER

# SONGS

- album: String
- createdBy: Uuid
- distribution: String
- gender: Enum(GENDER)
- groupSize: Number
- id: Uid
- modifiedBy: Uuid
- originalArtist: Object(artistId, artistName)
- private: Boolean
- single: Boolean
- title: videoId
- musicVideo: Boolean

# UNITS

- artistId: Reference(Artist)
- createBy: Uuid
- debutYear: Number
- distributionIds: Relationships(Distribution)
- id: Uid
- members: Object({ Urn(memberId:memberName:Position) })
- modifiedBy: Uuid
- name: String
- official: Boolean
- private: Boolean
