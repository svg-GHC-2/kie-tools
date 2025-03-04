/*
 * Copyright 2023 Red Hat, Inc. and/or its affiliates.
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

package org.kie.workbench.common.stunner.client.yaml.mapper.api.internal.ser;

import org.kie.workbench.common.stunner.client.yaml.mapper.api.YAMLSerializer;
import org.kie.workbench.common.stunner.client.yaml.mapper.api.internal.ser.bean.AbstractBeanYAMLSerializer;
import org.kie.workbench.common.stunner.client.yaml.mapper.api.stream.YAMLSequenceWriter;
import org.kie.workbench.common.stunner.client.yaml.mapper.api.stream.YAMLWriter;

public class YamlTypeSerializerWrapper<T> extends AbstractBeanYAMLSerializer<T> {

  private YAMLSerializer<T> serializer;

  public YamlTypeSerializerWrapper(YAMLSerializer<T> serializer) {
    this.serializer = serializer;
  }

  @Override
  public void serialize(
          YAMLWriter writer, String propertyName, T value, YAMLSerializationContext ctx) {
    serializer.serialize(writer, propertyName, value, ctx);
  }

  @Override
  public void serialize(YAMLSequenceWriter writer, T value, YAMLSerializationContext ctx) {
    serializer.serialize(writer, value, ctx);
  }

  @Override
  public Class getSerializedType() {
    return serializer.getClass();
  }
}
