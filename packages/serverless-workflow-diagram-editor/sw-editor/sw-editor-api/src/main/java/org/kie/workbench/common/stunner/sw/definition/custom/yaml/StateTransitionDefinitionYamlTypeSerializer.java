package org.kie.workbench.common.stunner.sw.definition.custom.yaml;

import com.amihaiemil.eoyaml.YamlMapping;
import com.amihaiemil.eoyaml.YamlNode;
import org.kie.workbench.common.stunner.client.yaml.mapper.api.YAMLDeserializer;
import org.kie.workbench.common.stunner.client.yaml.mapper.api.YAMLSerializer;
import org.kie.workbench.common.stunner.client.yaml.mapper.api.exception.YAMLDeserializationException;
import org.kie.workbench.common.stunner.client.yaml.mapper.api.internal.deser.StringYAMLDeserializer;
import org.kie.workbench.common.stunner.client.yaml.mapper.api.internal.deser.YAMLDeserializationContext;
import org.kie.workbench.common.stunner.client.yaml.mapper.api.internal.ser.StringYAMLSerializer;
import org.kie.workbench.common.stunner.client.yaml.mapper.api.internal.ser.YAMLSerializationContext;
import org.kie.workbench.common.stunner.client.yaml.mapper.api.stream.YAMLSequenceWriter;
import org.kie.workbench.common.stunner.client.yaml.mapper.api.stream.YAMLWriter;
import org.kie.workbench.common.stunner.sw.definition.StateTransition;
import org.kie.workbench.common.stunner.sw.definition.StateTransition_YamlMapperImpl;

public class StateTransitionDefinitionYamlTypeSerializer implements YAMLDeserializer, YAMLSerializer {

    private static final StateTransition_YamlMapperImpl mapper =
            StateTransition_YamlMapperImpl.INSTANCE;

    private static final StringYAMLSerializer stringYAMLSerializer = new StringYAMLSerializer();
    private static final StringYAMLDeserializer stringYAMLDeserializer = new StringYAMLDeserializer();

    @Override
    public Object deserialize(YamlMapping yaml, String key, YAMLDeserializationContext ctx) throws YAMLDeserializationException {
        YamlNode value = yaml.value(key);
        if (value == null) {
            return null;
        }
        return deserialize(value, ctx);
    }

    @Override
    public Object deserialize(YamlNode node, YAMLDeserializationContext ctx) {
        if (node == null) {
            return null;
        }
        if(node.type() == com.amihaiemil.eoyaml.Node.SCALAR) {
            return stringYAMLDeserializer.deserialize(node, ctx);
        } else {
            return mapper.getDeserializer().deserialize(node, ctx);
        }
    }

    @Override
    public void serialize(YAMLWriter writer, String propertyName, Object value, YAMLSerializationContext ctx) {
        if (value instanceof String) {
            stringYAMLSerializer.serialize(writer, propertyName, (String) value, ctx);
        } else if (value instanceof StateTransition) {
            mapper.getSerializer().serialize(writer, propertyName, (StateTransition) value, ctx);
        }
    }

    @Override
    public void serialize(YAMLSequenceWriter writer, Object value, YAMLSerializationContext ctx) {
        if (value instanceof String) {
            stringYAMLSerializer.serialize(writer, (String) value, ctx);
        } else if (value instanceof StateTransition) {
            mapper.getSerializer().serialize(writer, (StateTransition) value, ctx);
        }
    }
}
