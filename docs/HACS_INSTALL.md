# Install — RHI Multimedia Premium UX

1. In Home Assistant HACS → Custom repositories, add `https://github.com/npinguin/rhi-multimedia-ux` as **Dashboard**.
2. Install the intended GitHub TEST CANDIDATE version and confirm resource **JavaScript Module** `/hacsfiles/rhi-multimedia-ux/rhi-multimedia-ux.js` exists under Settings → Dashboards → Resources.
3. Separately install/update **RHI Foundation** and **RHI Multimedia backend v0.1.3 or later**, select the eligible Multimedia integrations/devices in Foundation and configure at least one real room/activity inside Multimedia. Backend publishes `RHI_MULTIMEDIA_EXPERIENCE_V1` only after valid configuration.
4. Add a dashboard of any URL/path. Use a panel view and one card:

```yaml
views:
  - title: Multimedia
    path: overview
    icon: mdi:television
    type: panel
    cards:
      - type: custom:homebrain-multimedia-card
```

Optional if a renamed/duplicate Experience sensor is present:

```yaml
type: custom:homebrain-multimedia-card
experience_entity: sensor.your_renamed_rhi_multimedia_experience
```

Only put the single `type: custom:...` card in an existing dashboard view. The UX retains the host dashboard URL and adds `?multimedia_view=...` for navigation.

5. Restart HA after installing/updating the **backend**, hard refresh the browser after a **frontend** HACS update. Confirm Overview → Rooms → Activities → Devices → Diagnostics, internal Back, browser refresh, live data, and real activity switching/readback.
6. Verify desktop, iPad and phone; inspect Diagnostics if a device is unavailable. Keep Basic Multimedia and the LG remote available until actual full media-control parity is confirmed.

## Rollback
HACS → RHI Multimedia UX → Redownload → previous immutable UX release; remove only the UX card resource if required. This does not modify native AV devices, Foundation selection or the existing Basic dashboard. Backend rollback requires its own controlled HACS version selection and room-state/readback reconciliation.
