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
import { basename, extname, parse } from "path";
import { isOfKind } from "../constants/ExtensionHelper";

export function parseWorkspaceFileRelativePath(relativePath: string) {
  const extension = extractExtension(relativePath);
  return {
    relativePathWithoutExtension: relativePath.substring(0, relativePath.lastIndexOf("." + extension)) || relativePath,
    relativeDirPath: parse(relativePath).dir,
    extension: extension,
    nameWithoutExtension: basename(relativePath, `.${extension}`),
    name: basename(relativePath),
  };
}

export function extractExtension(relativePath: string) {
  const fileName = basename(relativePath);
  const ultimateExtension = fileName.substring(fileName.lastIndexOf("."));
  const fileWithoutUltimateExtension = fileName.substring(0, fileName.lastIndexOf(ultimateExtension));
  const penultimateExtension = fileWithoutUltimateExtension.substring(fileWithoutUltimateExtension.lastIndexOf("."));
  if (fileName.includes(".")) {
    if (isOfKind("supportedSingleExtensions", fileName)) {
      //technically not needed as the else statement does the same thing. Only here for clarity
      return ultimateExtension.replace(".", "");
    }
    if (isOfKind("supportedDoubleExtensions", fileName)) {
      return penultimateExtension.replace(".", "") + ultimateExtension;
    } else {
      return ultimateExtension.replace(".", "");
    }
  } else {
    return extname(relativePath);
  }
}
