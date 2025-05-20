import $ from "jquery";
import { GetGroup, pergola } from "../3d-configurator";
import { raycastItem } from "../raycast";
import { state } from "../settings";
import { lastHeatersForRemove, spansHeaters } from "./subSystemHeaters";
import { lastScreenForRemove, spansScreen } from "./subSystemScreen";

export function initSubSystem() {
  state.subSystemUrl.forEach((system) => {
    pergola.span.objects.forEach((span) => {
      if (span.side === system.side && span.number === system.spanNumber) {
        const activeSystem = span.systems.find(
          (systemSpan) => systemSpan.type === system.type
        );
        console.log(span, activeSystem, "active system");

        activeSystem.active = true;
        span.active = true;
        span.isSystemSet = true;
        pergola.changeObjectVisibility(true, activeSystem.object);
      }
    });
  });

  pergola.update();
}

export function removeFromUrlSystemByType(systemType) {
  for (const system of state.subSystemUrl) {
    if (system.type === systemType) {
      state.subSystemUrl.delete(system);
    }
  }
}

export function removeFromUrlSystemBySide(side) {
  for (const system of state.subSystemUrl) {
    if (system.side === side) {
      state.subSystemUrl.delete(system);
    }
  }
}

export function removeFromUrlSystemBySideAndtype(side, systemType, spanNumber) {
  for (const system of state.subSystemUrl) {
    if (
      system.side === side &&
      system.type === systemType &&
      system.spanNumber === spanNumber
    ) {
      state.subSystemUrl.delete(system);
    }
  }
}
