# Line Distribution

For a live version of this project, click [here](http://www.kavispires.com/line-distribution-app/#/)<sup>*</sup>

<sup>*</sup> You will need to login with a google account to view the complete app.

## Bugs

- Favorite Member button does not update

## Sitemap

- Home
  - Learn More
- Artists<sup>1</sup>
  - Artist
- Idols<sup>1</sup>
- Distribute<sup>2</sup>
- Lyrics<sup>2</sup>
- Songs<sup>1</sup>
- Lab<sup>1</sup>
- Admin Tools<sup>3</sup>
  - Actions
  - UI Reference
    - Color Sheet
    - Icon Sheet
    - Components
  - Manage
  - Sync
  - Test
- User <sup>1</sup>

<sup>1</sup> Only available if user is logged in
<sup>2</sup> Only available if user has activated an unit to work with
<sup>3</sup> Only available if user is an administrator

## Features

### Artists

- Table of Artists with name, genre, # of units, members
- Filterable Input Field that accepts name or member
- 5 Last used units (name, genra, unit): selecting a unit to use updates this automatically.
- 5 Favorite units: on a unit page, a favorite can be toggled.

### Artist

- Header: name, genre, list of members across units
- Tabs with units:
  - Debut year
  - Select Unit Button (go to songs?)
  - Member cards:
    - Picture
    - Color and alternative color
    - Name
    - DOB
    - Nationality
    - Distribution stats: per official song, per custom song, total
    - Positions within the unit
- List of Distributions for that unit inclusing video synced and unsynced distributions with icons explaining types

### Idols

- Individual page for each idol/members TBD

### Distribute

- Video Synced Distribution: only if a song has been synced by the admininistrator (preferred)
  - Design TBD
  - User clicks on artists and lyrics connectors to distribute lyrics.
  - User can play video and see syncronized distribution
  - User can toggle results of the distribution
  - Users may extra ghost members as 'Featured Artists', name will be prompt on save
- Unsynced Distribution: three panels like codepen for distribution, lyrics viewer and lyrics editor
  - Basic Distribution via Buttons
  - Basic Distribution via Keyboard Keys
  - Reset Distribution
  - History/Undo Functionality
  - Log Functionality (Show and Delete Option)
  - User can toggle results of the distribution
  - Users may extra ghost members as 'Featured Artists', name will be prompt on save

### Results

- Options to see results like a pie chart or bar graph
- Switch Button (Percentual vs Time)
- Save button which opens save modal

### Songs

- List of synced songs available for video distribution

### Extra

- Fantasy Group: Select gender, group size and the app randomly chooses members for the fantasy group
- More: TBD

### Admin Tools: UI Reference

- Color sheet
  - List of available colors and its possible alternatives
- Icon sheet
- List of available icons
- Input sheet
- List of button styles, sizes and other ui elements (tabs, switches, inputs)

### Admin Tools: Manage

- Create/Update database by modifying json or with UX

### Admin Tools: Sync

- Main service to sync music/video with lyrics and distribution

### Admin Tools: Test

- Component to visually test elements
