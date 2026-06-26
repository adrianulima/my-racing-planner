# Summary

## Detail Page Calendar Rework

The season detail page now has two calendar modes: **Cars view** (grid where each row is a car) and **Tracks view** (variable-column-per-week layout).

### Cars View (`DetailCalendarGrid`)
- Each row = a car, each column = a week
- Uses actual `weekNum` from iRacing data (instead of sequential indices)
- Week headers display real dates with week numbers

### Tracks View (`DetailCalendarTracks`) — New
- First column = series name (with `SeriesBadge`), remaining columns = weeks (varies per week)
- Each cell shows which tracks/cars run that week
- Handles variable-length weeks properly

### Shared Calendar Logic
- **`seasonHideEmptyWeeks`** (default: true) — hides weeks with no entries for the current content. When disabled, fills in missing weeks (uses the gap between the first and last week numbers)
- **`seasonHidePastWeeks`** — filters out weeks before the current Tuesday
- **`seasonShowThisWeek`** — highlights the current week column
- **`seasonShowCheckboxes`** — adds owned/wish checkboxes per cell
- **`seasonUseLocalTimezone`** — converts UTC dates to local time
- **`seasonShowOwned` / `seasonShowWishlist`** — drives color coding
- **Category filter** — filters track listings by car category
- **`seasonShowParticipation`** — shows participation column in series headers

### Settings Popover
- Refactored to use proper Chakra `PopoverRoot`/`PopoverTrigger`/`PopoverContent` with gear icon trigger
- All the above toggles are organized here

### New Components
- **`SeriesBadge`** (`src/components/content/series-badge.tsx`) — colored badge with series short name
- **`DetailCalendarTracks`** — tracks-only calendar layout
- **`ContentCheckbox`** — owned/wish checkbox for calendar cells
- **`SeasonTableHeaderParticipation`** — participation header column

### i18n
- Added `hideEmptyWeeks` / `hideEmptyWeeksTooltip` keys to en.json and es.json

### Store
- Added `seasonHideEmptyWeeks` setting (default `true`) with setter/getter in `ui.ts`
