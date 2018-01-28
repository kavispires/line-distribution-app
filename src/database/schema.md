# SCHEMA

## Relationships
Artist.hasMany(Unit)
Unit.hasMany(Member)
Member.hasOne(Color)
Member.hasMany(Position)
Unit.hasMany(Song)
Song.hasOne(Unit)

### Artist
  * id: id (required)
  * name: String (required)
  * otherNames: String
  * genre: String
  * units: Array[Unit(id)]

### Unit
  * id: Id (required)
  * bandId: Band(id) (required)
  * name: String (required)
  * debutYeat: Integer
  * official: Boolean (required)
  * members: Array[Member(id)] (required)
  * songs: Array[Song(id)]

### Song
  * id: id (required)
  * unitId: Unit(Id)
  * title: String (required)
  * official: Boolean (required)
  * lyrics: String
  * distribution: Array[Object]

### Member
  * id: id (required)
  * name: String (required)
  * colorId: Color(id) (required)
  * altColorId: Color(id) (required)
  * birthdate: Integer
  * positions: Array[Position(id)]

### Color
  * id: id (required)
  * name: String (required)
  * hex: String (required)

### Position
  * id: id (required)
  * name: String (required)
