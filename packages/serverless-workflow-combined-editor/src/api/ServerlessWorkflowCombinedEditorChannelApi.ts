/*
 * Copyright 2022 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { KogitoEditorChannelApi } from "@kie-tools-core/editor/dist/api";
import { Position } from "monaco-editor";
import { SwfLanguageServiceChannelApi } from "@kie-tools/serverless-workflow-language-service/dist/api/SwfLanguageServiceChannelApi";
import { SwfFeatureToggleChannelApi } from "./SwfFeatureToggleChannelApi";
import { SwfPreviewOptionsChannelApi } from "./SwfPreviewOptionsChannelApi";
import { SwfStaticEnvelopeContentProviderChannelApi } from "./SwfStaticEnvelopeContentProviderChannelApi";

export interface ServerlessWorkflowCombinedEditorChannelApi
  extends KogitoEditorChannelApi,
    SwfFeatureToggleChannelApi,
    SwfLanguageServiceChannelApi,
    SwfPreviewOptionsChannelApi,
    SwfStaticEnvelopeContentProviderChannelApi {
  /**
   * Moves the cursor in the editor to a specified position
   *
   * @param position
   * @returns
   */
  kogitoSwfCombinedEditor_moveCursorToPosition(position: Position): void;
  /**
   * Checks if combined editor is ready
   *
   * @returns
   */
  kogitoSwfCombinedEditor_combinedEditorReady(): void;
}
