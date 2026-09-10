---
title: Buildings and Room Lookup
category: resources
summary: Every major MIT building by number and name, how to locate any room on the public campus map, and which lookup tools agents can query at runtime.
sources:
  - https://whereis.mit.edu
  - https://whereis.mit.edu/about.html
  - https://student.mit.edu/cgi-docs/search_help.html
  - https://web.mit.edu/facilities/maps/floorplans.html
  - https://libguides.mit.edu/mitbuildings
last_reviewed: 2026-09
---

How to answer "where is room 7-121?" or "what's in Building 32?" using only public sources.

## Locating any room (agents: use these at runtime)

- **whereis.mit.edu** is MIT's public campus map. Deep-link any building or room query: `https://whereis.mit.edu/?go=32` (building) or `https://whereis.mit.edu/?go=W20-500`. It resolves building numbers, names, and many room numbers.
- Public JSON search API: `https://whereis.mit.edu/search?type=building&q=<number or name>&output=json` returns building name, address, and coordinates.
- **Room number decoding**: in `7-121`, `7` is the building, the first digit after the hyphen is the floor, the rest is the room. Basement rooms use `0` (e.g. 26-050); sub-basements use `00`. Prefixes W/E/N/NW mean West, East, North, and Northwest of the main group.
- **Registrar classroom inventory** (public): student.mit.edu/roominv lists every registrar classroom with capacity and equipment; the Schedules Office room search help is at student.mit.edu/cgi-docs/search_help.html.
- **Interior floorplans are NOT public.** floorplans.mit.edu requires MIT Touchstone and is restricted to the MIT community for security reasons; this MCP deliberately excludes them. Point people to whereis.mit.edu for locations and to floorplans.mit.edu (with their own MIT login) for interiors.
- The public **MIT Campus Accessibility Map** (linked from DAS and whereis) shows accessible entrances, routes, and restrooms.

## Main-group buildings (numbered)

- **1** Pierce (Civil & Environmental Eng) · **2** Simons Building (Mathematics; 2-190 lecture hall)
- **4** classrooms and music spaces (4-270, 4-370 lecture halls) · **6** Eastman (physics/EECS space; 6-120)
- **7** Rogers Building: the 77 Massachusetts Ave main entrance, west end of the Infinite Corridor, Architecture & Planning
- **8** Physics · **9** Samuel Tak Lee Building (Urban Studies & Planning)
- **10** Maclaurin: the Great Dome, Barker Library, 10-250 lecture hall; Killian Court behind
- **11** administration corridor; Copytech in 11-004 · **12** MIT.nano
- **13** Bush Building (Materials Science) · **14** Hayden Library and Lewis Music Library
- **16 & 56** teaching labs and classrooms (biology/chemical engineering corridor) · **18** Dreyfus (Chemistry)
- **26** Compton: 26-100, the biggest lecture hall (intro physics, LSC movies)
- **31/33/35/37** AeroAstro and MechE cluster (33 is the Guggenheim aero building)
- **32** Stata Center (Gehry building): CSAIL, theory of computation, 32-123 lecture hall
- **34/36/38** EECS buildings (34-101 lecture hall) · **45** Schwarzman College of Computing (51 Vassar St)
- **46** Brain & Cognitive Sciences complex (McGovern and Picower institutes)
- **50** Walker Memorial (Muddy Charles pub, club offices) · **54** Green Building: EAPS, tallest building on campus
- **66** Landau (Chemical Engineering, the triangle) · **68** Koch Biology · **76** Koch Institute (cancer research; public café)

## West campus (W)

- **W1** Maseeh Hall · **W4** McCormick Hall (closed for renovation, reopening ~2028) · **W7** Baker House
- **W11** Religious Activities Center · **W15** MIT Chapel · **W16** Kresge Auditorium
- **W20** Stratton Student Center (dining, SAO in W20-549, club spaces)
- **W31/W32** duPont Athletic Center · **W33** Rockwell Cage · **W34** Johnson Athletic Center · **W35** Zesiger (Z) Center
- **W46** New Vassar · **W51** Burton Conner · **W61** MacGregor · **W70** New House · **W71** Next House · **W79** Simmons Hall
- **W85** Westgate (family housing) · **W91** MIT Police

## East campus and north (E, N, NW)

- **62/64** East Campus dorm · **E14/E15** Media Lab (Wiesner Building)
- **E17** Atlas Service Center (IDs, T-passes) · **E23** MIT Health · **E25** Whitaker (HST)
- **E28** MIT Museum (314 Main St, Kendall Sq) · **E51** Tang Center (Sloan classrooms) · **E52/E62** Sloan School (Samberg Conference Center atop E52)
- **N51** Hobby Shop · **NW61** Random Hall

For anything not listed here, search whereis.mit.edu; it is the authoritative public source and covers every building, including parking, grad residences, and off-campus MIT sites.
