# Multimedia Premium UX — contract and execution ownership

Backend authority is `sensor.rhi_multimedia_experience` (user-renamable; the card may be configured with `experience_entity`) carrying `attributes.contract = RHI_MULTIMEDIA_EXPERIENCE_V1`. The UX may discover the single published contract sensor by **contract marker only**, never by scanning or guessing vendor device identities. More than one candidate fails closed.

Required V1: `schema_version`, `revision`, `backend_version`, `summary` (four integer fields), and `rooms` with `id`, `name`, `phase`, `activities`, `devices`, `commands`. All room/device/route/availability semantics come from the Multimedia backend, itself bounded by Foundation-selected sources.

The only commands exposed by this UX are **backend-owned** `rhi_multimedia.start_activity`, `rhi_multimedia.stop_activity` and `rhi_multimedia.recover_activity`, scoped by room/activity and gated by published capability. Any service response is **not** success. UI waits for new backend states `active`/`idle` or shows error/timeout. No direct vendor writes from UX and no raw entity names in the main views.

The native Home Assistant more-info popup may be opened for a bound source; this is read-only UI navigation.

Missing contract is **Unavailable**, never 0. A valid published empty list (after real setup) is 0 rooms. No simulated devices in release runtime.

RHI UX Core and company SVG are vendored from pinned 1.6.4, without runtime dependency. Domain SVG is separately owned artwork. Multiroom sharing is a backend/physical conflict concern, not frontend-derived logic.
