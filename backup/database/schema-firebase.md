# SCHEMA

## Relationships

User.hasMany(Artist as FavoriteArtists)
User.hasMany(Song)

Artist.hasMany(Unit)

Unit.hasOne(Artist)
Unit.hasMany(Member)
Unit.hasMany(Song)

Member.hasOne(Color as colorId)
Member.hasOne(Color as altColorId)
Member.hasMany(Position)

Song.hasOne(Unit)
Song.hasOne(User)

### Users

- username: username (required)
- favoriteArtists: Collection(Artist(id))
- songs: Collection[Song(id)]
- admin: Boolean

### Artist

- id: id (required)
- name: String (required)
- otherNames: String
- genre: String
- units: Collection[Unit(id)]
- query: String // computed name, otherNames, and unique members in unit upon save

### Unit

- id: id (required)
- artistId: Artist(id) (required)
- name: String (required)
- debutYeat: Integer
- official: Boolean (required)
- members: Collection[Member(id)](required)
- songs: Collection[Song(id)]

### Member

- id: id (required)
- name: String (required)
- colorId: Color(id) (required)
- altColorId: Color(id) (required)
- birthdate: Integer
- positions: Collection[Position(id)]

### Color

- id: id (required)
- name: String (required)
- hex: String (required)

### Position

- id: id (required)
- name: String (required)

### Song

- id: id (required)
- unitId: Unit(Id)
- userId: User(Id)
- title: String (required)
- type: String (required) // Official, Should, Would (Sing)
- lyrics: String
- distribution: String (StringifiedObject)
- originalArtist: String
- query: String // computed original artist and title
