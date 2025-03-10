/*
 * Copyright 2021 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import { Dropdown, DropdownPosition, DropdownToggle } from "@patternfly/react-core/dist/js/components/Dropdown";
import { useCallback, useMemo } from "react";
import { Tooltip } from "@patternfly/react-core/dist/js/components/Tooltip";
import { ExclamationTriangleIcon } from "@patternfly/react-icons/dist/js/icons/exclamation-triangle-icon";
import { KieSandboxExtendedServicesStatus } from "./KieSandboxExtendedServicesStatus";
import { ConnectedIcon } from "@patternfly/react-icons/dist/js/icons/connected-icon";
import { DisconnectedIcon } from "@patternfly/react-icons/dist/js/icons/disconnected-icon";
import { useKieSandboxExtendedServices } from "./KieSandboxExtendedServicesContext";
import { useSettingsDispatch } from "../settings/SettingsContext";
import { SettingsTabs } from "../settings/SettingsModalBody";
import { useAppI18n } from "../i18n";

export function KieSandboxExtendedServicesIcon() {
  const kieSandboxExtendedServices = useKieSandboxExtendedServices();
  const { i18n } = useAppI18n();
  const settingsDispatch = useSettingsDispatch();

  const toggleKieSandboxExtendedServices = useCallback(() => {
    if (kieSandboxExtendedServices.status === KieSandboxExtendedServicesStatus.RUNNING) {
      settingsDispatch.open(SettingsTabs.KIE_SANDBOX_EXTENDED_SERVICES);
    }

    if (!kieSandboxExtendedServices.outdated) {
      return;
    }
    kieSandboxExtendedServices.setInstallTriggeredBy(undefined);
    kieSandboxExtendedServices.setModalOpen(true);
  }, [kieSandboxExtendedServices, settingsDispatch]);

  const dropdownToggleIcon = useMemo(
    () => (
      <>
        {kieSandboxExtendedServices.outdated && (
          <Tooltip
            className="kogito--editor__light-tooltip"
            key={"outdated"}
            content={i18n.kieSandboxExtendedServices.dropdown.tooltip.outdated}
            flipBehavior={["left"]}
            distance={20}
          >
            <ExclamationTriangleIcon
              data-testid="outdated-icon"
              className="kogito--editor__kie-sandbox-extended-services-dropdown-icon-outdated static-opacity"
              id="kie-sandbox-extended-services-outdated-icon"
            />
          </Tooltip>
        )}
        {!kieSandboxExtendedServices.outdated && (
          <>
            {kieSandboxExtendedServices.status === KieSandboxExtendedServicesStatus.RUNNING ? (
              <Tooltip
                className="kogito--editor__light-tooltip"
                key={"connected"}
                content={i18n.kieSandboxExtendedServices.dropdown.tooltip.connected}
                flipBehavior={["left"]}
                distance={20}
              >
                <ConnectedIcon
                  data-testid="connected-icon"
                  className="kogito--editor__kie-sandbox-extended-services-dropdown-icon-connected blink-opacity"
                  id="kie-sandbox-extended-services-connected-icon"
                />
              </Tooltip>
            ) : (
              <Tooltip
                className="kogito--editor__light-tooltip"
                key={"disconnected"}
                content={i18n.kieSandboxExtendedServices.dropdown.tooltip.disconnected}
                flipBehavior={["left"]}
                distance={20}
              >
                <DisconnectedIcon
                  data-testid="disconnected-icon"
                  className="static-opacity"
                  id="kie-sandbox-extended-services-disconnected-icon"
                />
              </Tooltip>
            )}
          </>
        )}
      </>
    ),
    [i18n, kieSandboxExtendedServices.outdated, kieSandboxExtendedServices.status]
  );

  return (
    <Dropdown
      toggle={
        <DropdownToggle
          id="kie-sandbox-extended-services-button"
          toggleIndicator={null}
          onToggle={toggleKieSandboxExtendedServices}
          className="kie-tools--masthead-hoverable-dark"
          data-testid="kie-sandbox-extended-services-button"
        >
          {dropdownToggleIcon}
        </DropdownToggle>
      }
      isPlain={true}
      position={DropdownPosition.right}
    />
  );
}
