# RHI Multimedia UX v0.1.0 — HACS TEST CANDIDATE

First standalone Premium Multimedia Dashboard following the **same RHI UX Core 1.6.4** design system as Energy and Mobility.

## Functionality
- One-panel, single-card Home Assistant dashboard: `custom:homebrain-multimedia-card`.
- Brand-correct two-level RHI navigation: Multimedia / Activities / Insights; every tab is implemented.
- Multimedia Overview with domain hero, **backend-owned** Rooms, Active, Playback and Attention metrics.
- Active-first room cards with configured activities, source readback, progress, stop/recover commands and verified state transitions.
- Room details: now playing, audio volume readback, selected devices and configured physical input routes.
- Activities workspace, device inventory and runtime diagnostics.
- Back/forward/reload-safe internal navigation under any Home Assistant dashboard URL; responsive desktop/iPad/phone presentation.

## Compatibility
- Requires the RHI Multimedia backend publishing `RHI_MULTIMEDIA_EXPERIENCE_V1` (backend HACS TEST v0.1.3 or later) and a configured Foundation-first Multimedia room.
- Uses actual Home Assistant source integrations. No AV Scenes, Harmonium or new external cards required.
- Does not attempt direct device discovery, invent media actions or treat service acceptance as readback.
- The prior Basic Multimedia dashboard and LG remote card remain available and unchanged.

**TEST ONLY**: static/build/HACS checks are not target Home Assistant acceptance. Real media devices, switching, browser rendering and rollback have not yet been physically verified on Wessels. No stable approval.
