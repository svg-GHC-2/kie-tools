/*
 * Copyright 2023 Red Hat, Inc. and/or its affiliates.
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

package command

import (
	"testing"

	"github.com/kiegroup/kie-tools/packages/kn-plugin-workflow/pkg/common"
	"github.com/spf13/afero"
)

func TestCreateWrokflow(t *testing.T) {
	var err error
	filePath := "new-workflow.sw.json"
	common.FS = afero.NewMemMapFs()

	err = CreateWorkflow(filePath)
	defer common.FS.Remove(filePath)
	if err != nil {
		t.Errorf("Error when creating workflow: %#v", err)
	}

	_, err = common.FS.Stat(filePath)
	if err != nil {
		t.Errorf("Error when opening workflow file: %#v", err)
	}
}
