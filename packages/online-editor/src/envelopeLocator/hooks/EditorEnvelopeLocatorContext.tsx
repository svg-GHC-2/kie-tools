/*
 * Copyright 2022 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import { useContext, useMemo } from "react";
// import { EditorEnvelopeLocator } from "@kie-tools-core/editor/dist/api";
import { EditorEnvelopeLocatorFactory } from "../EditorEnvelopeLocatorFactory";
import { useEnv } from "../../env/hooks/EnvContext";
import { EditorConfig } from "../EditorEnvelopeLocatorApi";

export type SupportedFileExtensions = "bpmn" | "bpmn2" | "BPMN" | "BPMN2" | "dmn" | "DMN" | "pmml" | "PMML";

// FIXME: Chaging `any` to `EditorEnvelopeLocator` breaks --env live. Please adress this as part of https://github.com/kiegroup/kie-issues/issues/109
export const EditorEnvelopeLocatorContext = React.createContext<any>({} as any);

export function EditorEnvelopeLocatorContextProvider(props: { children: React.ReactNode }) {
  const editorsConfig = useEditorsConfig();
  const value = useMemo(
    () =>
      new EditorEnvelopeLocatorFactory().create({
        targetOrigin: window.location.origin,
        editorsConfig,
      }),
    [editorsConfig]
  );

  return <EditorEnvelopeLocatorContext.Provider value={value}>{props.children}</EditorEnvelopeLocatorContext.Provider>;
}

export function useEditorEnvelopeLocator() {
  return useContext(EditorEnvelopeLocatorContext);
}

export function useEditorsConfig() {
  const { env } = useEnv();
  return useMemo<EditorConfig[]>(() => env.KIE_SANDBOX_EDITORS, [env.KIE_SANDBOX_EDITORS]);
}
